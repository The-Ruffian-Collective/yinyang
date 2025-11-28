/* ========================================
   PROMPT LIBRARY MANAGEMENT
   ======================================== */

import { loadPrompts, savePrompts } from '../utils/storage.js';
import { escapeHtml, generateId, scrollToElement, showTemporaryNotification } from '../utils/helpers.js';

let prompts = [];
let editingId = null;

export function initPromptLibrary() {
    // Load prompts from storage
    prompts = loadPrompts();
    renderPrompts();

    // Set up event listeners
    const searchBar = document.getElementById('searchBar');
    const saveBtn = document.querySelector('.add-prompt-form .btn-primary');
    const cancelBtn = document.getElementById('cancelBtn');
    const promptsGrid = document.getElementById('promptsGrid');

    if (searchBar) {
        searchBar.addEventListener('input', handleSearch);
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', savePrompt);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', cancelEdit);
    }

    // Use event delegation for prompt card actions
    if (promptsGrid) {
        promptsGrid.addEventListener('click', handlePromptCardClick);
    }
}

/**
 * Saves or updates a prompt
 */
function savePrompt() {
    const titleInput = document.getElementById('promptTitle');
    const contentInput = document.getElementById('promptContent');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert('Please fill in both title and content');
        return;
    }

    if (editingId) {
        // Update existing prompt
        const index = prompts.findIndex(p => p.id === editingId);
        if (index !== -1) {
            prompts[index] = { id: editingId, title, content };
        }
        editingId = null;
        document.getElementById('formTitle').textContent = 'Add New Prompt';
        document.getElementById('cancelBtn').style.display = 'none';
    } else {
        // Add new prompt
        prompts.unshift({ id: generateId(), title, content });
    }

    savePrompts(prompts);
    clearForm();
    renderPrompts();
}

/**
 * Clears the prompt form
 */
function clearForm() {
    document.getElementById('promptTitle').value = '';
    document.getElementById('promptContent').value = '';
}

/**
 * Cancels edit mode
 */
function cancelEdit() {
    editingId = null;
    document.getElementById('formTitle').textContent = 'Add New Prompt';
    document.getElementById('cancelBtn').style.display = 'none';
    clearForm();
}

/**
 * Edits an existing prompt
 * @param {string} id - The prompt ID
 */
export function editPrompt(id) {
    const prompt = prompts.find(p => p.id === id);
    if (!prompt) return;

    editingId = id;
    document.getElementById('promptTitle').value = prompt.title;
    document.getElementById('promptContent').value = prompt.content;
    document.getElementById('formTitle').textContent = 'Edit Prompt';
    document.getElementById('cancelBtn').style.display = 'inline-block';

    // Scroll to form
    const form = document.querySelector('.add-prompt-form');
    scrollToElement(form);
}

/**
 * Deletes a prompt
 * @param {string} id - The prompt ID
 */
export function deletePrompt(id) {
    if (!confirm('Are you sure you want to delete this prompt?')) return;

    prompts = prompts.filter(p => p.id !== id);
    savePrompts(prompts);
    renderPrompts();
}

/**
 * Copies prompt content to clipboard
 * @param {string} id - The prompt ID
 * @param {HTMLElement} btn - The button element for visual feedback
 */
async function copyToClipboard(id, btn) {
    const prompt = prompts.find(p => p.id === id);
    if (!prompt) return;

    try {
        await navigator.clipboard.writeText(prompt.content);

        // Visual feedback
        if (btn) {
            showTemporaryNotification(btn, 'Copied!', 2000);
        }
    } catch (err) {
        alert('Failed to copy to clipboard');
    }
}

/**
 * Handles clicks on prompt card action buttons
 * @param {Event} e - The click event
 */
function handlePromptCardClick(e) {
    const btn = e.target.closest('button');
    if (!btn) return;

    // Find the closest prompt card to get the ID
    const card = btn.closest('.prompt-card');
    if (!card) return;

    // Extract ID from button's data attribute
    const promptId = card.dataset.promptId;
    if (!promptId) return;

    if (btn.classList.contains('btn-copy')) {
        copyToClipboard(promptId, btn);
    } else if (btn.classList.contains('btn-edit')) {
        editPrompt(promptId);
    } else if (btn.classList.contains('btn-delete')) {
        deletePrompt(promptId);
    }
}

/**
 * Handles search input
 * @param {Event} e - The input event
 */
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
        renderPrompts();
        return;
    }

    const filtered = prompts.filter(prompt =>
        prompt.title.toLowerCase().includes(query)
    );

    renderPrompts(filtered);
}

/**
 * Renders the prompts grid
 * @param {Array} filtered - Optional filtered prompts array
 */
function renderPrompts(filtered = null) {
    const grid = document.getElementById('promptsGrid');
    const displayPrompts = filtered !== null ? filtered : prompts;

    if (displayPrompts.length === 0) {
        grid.innerHTML = `
            <div class="no-prompts">
                <h3>No prompts found</h3>
                <p>${filtered !== null ? 'Try a different search term' : 'Add your first prompt using the form above'}</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = displayPrompts.map(prompt => `
        <div class="prompt-card" data-prompt-id="${prompt.id}">
            <div class="prompt-card-title">${escapeHtml(prompt.title)}</div>
            <div class="prompt-card-content">${escapeHtml(prompt.content)}</div>
            <div class="prompt-card-actions">
                <button class="btn btn-small btn-copy" type="button">Copy</button>
                <button class="btn btn-small btn-edit" type="button">Edit</button>
                <button class="btn btn-small btn-delete" type="button">Delete</button>
            </div>
        </div>
    `).join('');
}

// Export functions for global access if needed
export const PromptLibrary = {
    editPrompt,
    deletePrompt
};
