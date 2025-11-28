// Image Gallery Module
// Provides drag-and-drop image upload, thumbnail grid display, deletion, and file validation

import { generateId, showTemporaryNotification } from '../utils/helpers.js';
import { getFromStorage, saveToStorage, removeFromStorage } from '../utils/storage.js';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
const GALLERY_STORAGE_KEY = 'galleryImages';
const GALLERY_PERSIST_KEY = 'galleryPersist';

// Gallery state
const galleryState = {
    images: [],
    isPersisting: false,
    isInitialized: false
};

/**
 * Initialize the image gallery module
 */
export function initImageGallery() {
    const galleryTab = document.querySelector('[data-panel="gallery"]');
    if (!galleryTab) return;

    // Create gallery UI
    createGalleryUI(galleryTab);

    // Load images from localStorage if persisting was enabled
    loadGalleryImages();

    // Attach event listeners
    attachEventListeners(galleryTab);

    galleryState.isInitialized = true;
}

/**
 * Create the gallery UI structure
 */
function createGalleryUI(container) {
    const galleryHTML = `
        <div class="image-gallery">
            <div class="gallery-header">
                <h2>Image Gallery</h2>
                <div class="gallery-controls">
                    <label class="persist-checkbox">
                        <input
                            type="checkbox"
                            id="persistGallery"
                            aria-label="Persist gallery across page refresh">
                        <span>Save gallery across sessions</span>
                    </label>
                </div>
            </div>

            <div class="gallery-drop-zone" id="galleryDropZone">
                <div class="drop-zone-content">
                    <svg class="drop-zone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <h3>Drag and drop images here</h3>
                    <p>or click to select files</p>
                    <input
                        type="file"
                        id="imageInput"
                        multiple
                        accept="image/*"
                        class="hidden-input"
                        aria-label="Select image files">
                </div>
            </div>

            <div class="gallery-info">
                <small>Max 5MB per file • Supported: JPEG, PNG, GIF, WebP, SVG • Max 50 images per session</small>
            </div>

            <div class="gallery-thumbnails" id="galleryThumbnails">
                <div class="gallery-empty-state">
                    <p>No images yet. Upload some images to get started!</p>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = galleryHTML;
}

/**
 * Attach event listeners for drag-drop and file input
 */
function attachEventListeners(container) {
    const dropZone = container.querySelector('#galleryDropZone');
    const imageInput = container.querySelector('#imageInput');
    const persistCheckbox = container.querySelector('#persistGallery');

    // Restore persist state
    const shouldPersist = getFromStorage(GALLERY_PERSIST_KEY, false);
    if (persistCheckbox && shouldPersist) {
        persistCheckbox.checked = true;
        galleryState.isPersisting = true;
    }

    // Drag and drop
    dropZone?.addEventListener('dragover', handleDragOver);
    dropZone?.addEventListener('dragleave', handleDragLeave);
    dropZone?.addEventListener('drop', handleDrop);
    dropZone?.addEventListener('click', () => imageInput?.click());

    // File input
    imageInput?.addEventListener('change', handleFileSelect);

    // Persist checkbox
    persistCheckbox?.addEventListener('change', (e) => {
        galleryState.isPersisting = e.target.checked;
        saveToStorage(GALLERY_PERSIST_KEY, galleryState.isPersisting);

        if (galleryState.isPersisting) {
            saveGalleryImages();
            showNotification('Gallery will be saved across sessions');
        } else {
            showNotification('Gallery will not be saved on refresh');
        }
    });
}

/**
 * Handle drag over event
 */
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

/**
 * Handle drag leave event
 */
function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

/**
 * Handle file drop
 */
function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const files = Array.from(e.dataTransfer?.files || []);
    processFiles(files);
}

/**
 * Handle file input selection
 */
function handleFileSelect(e) {
    const files = Array.from(e.target.files || []);
    processFiles(files);

    // Reset input so the same file can be selected again
    e.target.value = '';
}

/**
 * Process selected files
 */
function processFiles(files) {
    if (!files || files.length === 0) return;

    const validFiles = files.filter(validateFile);

    if (validFiles.length === 0) {
        showNotification('No valid image files to upload', 'error');
        return;
    }

    validFiles.forEach((file) => {
        readFileAsBase64(file);
    });
}

/**
 * Validate file type and size
 */
function validateFile(file) {
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
        showNotification(`${file.name}: Invalid file type. Only images allowed.`, 'error');
        return false;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        showNotification(`${file.name}: File size exceeds 5MB limit.`, 'error');
        return false;
    }

    // Check image count limit
    if (galleryState.images.length >= 50) {
        showNotification('Gallery is full (max 50 images per session).', 'error');
        return false;
    }

    return true;
}

/**
 * Read file as base64 and add to gallery
 */
function readFileAsBase64(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        const imageData = {
            id: generateId(),
            src: e.target?.result,
            name: file.name,
            size: file.size,
            type: file.type,
            timestamp: new Date().toLocaleTimeString()
        };

        galleryState.images.push(imageData);
        renderThumbnail(imageData);

        // Save to localStorage if persistence is enabled
        if (galleryState.isPersisting) {
            saveGalleryImages();
        }

        showNotification(`${file.name} uploaded successfully`);
    };

    reader.onerror = () => {
        showNotification(`Error reading ${file.name}`, 'error');
    };

    reader.readAsDataURL(file);
}

/**
 * Render a single thumbnail
 */
function renderThumbnail(imageData) {
    const container = document.querySelector('#galleryThumbnails');
    if (!container) return;

    // Remove empty state if this is the first image
    const emptyState = container.querySelector('.gallery-empty-state');
    if (emptyState && galleryState.images.length === 1) {
        emptyState.remove();
    }

    const thumbnail = document.createElement('div');
    thumbnail.className = 'gallery-thumbnail';
    thumbnail.dataset.imageId = imageData.id;

    const fileSizeMB = (imageData.size / (1024 * 1024)).toFixed(2);

    thumbnail.innerHTML = `
        <div class="thumbnail-image-wrapper">
            <img
                src="${imageData.src}"
                alt="${imageData.name}"
                class="thumbnail-image"
                loading="lazy">
            <div class="thumbnail-overlay">
                <button class="btn-delete-image" aria-label="Delete image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        </div>
        <div class="thumbnail-info">
            <p class="thumbnail-name">${imageData.name}</p>
            <small class="thumbnail-meta">${fileSizeMB} MB • ${imageData.timestamp}</small>
        </div>
    `;

    // Attach delete listener
    const deleteBtn = thumbnail.querySelector('.btn-delete-image');
    deleteBtn?.addEventListener('click', () => deleteImage(imageData.id));

    container.appendChild(thumbnail);
}

/**
 * Delete an image from the gallery
 */
function deleteImage(imageId) {
    const index = galleryState.images.findIndex(img => img.id === imageId);
    if (index === -1) return;

    const image = galleryState.images[index];
    galleryState.images.splice(index, 1);

    // Remove thumbnail from DOM
    const thumbnail = document.querySelector(`[data-image-id="${imageId}"]`);
    thumbnail?.remove();

    // Show empty state if no images left
    const container = document.querySelector('#galleryThumbnails');
    if (container && galleryState.images.length === 0) {
        container.innerHTML = '<div class="gallery-empty-state"><p>No images yet. Upload some images to get started!</p></div>';
    }

    // Update storage if persisting
    if (galleryState.isPersisting) {
        saveGalleryImages();
    }

    showNotification(`${image.name} deleted`);
}

/**
 * Save gallery images to localStorage
 */
function saveGalleryImages() {
    // Only save image metadata (src as base64, which can be large)
    // This might hit storage limits with many large images
    try {
        saveToStorage(GALLERY_STORAGE_KEY, galleryState.images);
        return true;
    } catch (error) {
        console.error('Error saving gallery to localStorage:', error);
        showNotification('Could not save gallery (storage full or too large)', 'error');
        return false;
    }
}

/**
 * Load gallery images from localStorage
 */
function loadGalleryImages() {
    const images = getFromStorage(GALLERY_STORAGE_KEY, []);
    if (images.length === 0) return;

    galleryState.images = images;

    // Render all thumbnails
    const container = document.querySelector('#galleryThumbnails');
    if (container) {
        const emptyState = container.querySelector('.gallery-empty-state');
        if (emptyState) emptyState.remove();

        images.forEach(image => renderThumbnail(image));
    }
}

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `gallery-notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        border-radius: 6px;
        font-size: 14px;
        z-index: 1000;
        animation: slideInUp 0.3s ease-out;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Export function to get current gallery images (useful for export features)
 */
export function getGalleryImages() {
    return [...galleryState.images];
}

/**
 * Export function to clear all images
 */
export function clearGallery() {
    if (confirm('Are you sure you want to delete all images? This cannot be undone.')) {
        galleryState.images = [];
        const container = document.querySelector('#galleryThumbnails');
        if (container) {
            container.innerHTML = '<div class="gallery-empty-state"><p>No images yet. Upload some images to get started!</p></div>';
        }

        if (galleryState.isPersisting) {
            removeFromStorage(GALLERY_STORAGE_KEY);
        }

        showNotification('All images deleted');
    }
}
