// Canvas Drawing Module
// Provides a modal-based drawing interface with color picking, brush sizing, and image export

let isDrawing = false;
let canvas = null;
let ctx = null;
let modal = null;
let startX = 0;
let startY = 0;

// Drawing state
const drawingState = {
    color: '#000000',
    brushSize: 5,
    isInitialized: false
};

/**
 * Initialize the canvas drawing module
 * Creates modal, attaches event listeners, and sets up canvas
 */
export function initCanvasDrawing() {
    const canvasTab = document.querySelector('[data-panel="canvas"]');
    if (!canvasTab) return;

    // Create the modal structure
    createModal();

    // Attach event listeners to the button
    const openBtn = canvasTab.querySelector('.open-canvas-btn');
    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    // Set initial theme-aware colors
    updateThemeColors();

    drawingState.isInitialized = true;
}

/**
 * Create the modal structure and append to DOM
 */
function createModal() {
    const canvasTab = document.querySelector('[data-panel="canvas"]');
    if (!canvasTab) return;

    // Create modal HTML
    const modalHTML = `
        <div class="canvas-modal" id="canvasModal">
            <div class="canvas-modal-overlay" id="canvasOverlay"></div>
            <div class="canvas-modal-container">
                <div class="canvas-modal-header">
                    <h2>Canvas Sketch</h2>
                    <button class="canvas-close-btn" id="canvasCloseBtn" aria-label="Close canvas modal">
                        <span>&times;</span>
                    </button>
                </div>

                <div class="canvas-modal-content">
                    <canvas
                        id="drawingCanvas"
                        width="800"
                        height="600"
                        aria-label="Drawing canvas"
                    ></canvas>
                </div>

                <div class="canvas-controls">
                    <div class="control-group">
                        <label for="colorPicker">Pen Color:</label>
                        <input
                            type="color"
                            id="colorPicker"
                            value="#000000"
                            class="color-picker"
                            aria-label="Pen color">
                    </div>

                    <div class="control-group">
                        <label for="brushSize">Brush Size:</label>
                        <div class="brush-size-container">
                            <input
                                type="range"
                                id="brushSize"
                                min="1"
                                max="20"
                                value="5"
                                class="brush-slider"
                                aria-label="Brush size">
                            <span class="brush-size-display" id="brushDisplay">5</span>px
                        </div>
                    </div>

                    <div class="control-buttons">
                        <button class="btn btn-secondary" id="clearCanvasBtn">Clear</button>
                        <button class="btn btn-primary" id="saveImageBtn">Save as PNG</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert modal into the canvas tab
    canvasTab.innerHTML = modalHTML;

    // Store references
    modal = document.getElementById('canvasModal');
    canvas = document.getElementById('drawingCanvas');
    ctx = canvas.getContext('2d');

    // Attach event listeners
    attachEventListeners();
}

/**
 * Attach all event listeners for the canvas and controls
 */
function attachEventListeners() {
    const overlay = document.getElementById('canvasOverlay');
    const closeBtn = document.getElementById('canvasCloseBtn');
    const colorPicker = document.getElementById('colorPicker');
    const brushSlider = document.getElementById('brushSize');
    const brushDisplay = document.getElementById('brushDisplay');
    const clearBtn = document.getElementById('clearCanvasBtn');
    const saveBtn = document.getElementById('saveImageBtn');

    // Close modal
    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    // Color picker
    colorPicker?.addEventListener('change', (e) => {
        drawingState.color = e.target.value;
    });

    // Brush size slider
    brushSlider?.addEventListener('input', (e) => {
        drawingState.brushSize = parseInt(e.target.value);
        brushDisplay.textContent = e.target.value;
    });

    // Canvas drawing
    canvas?.addEventListener('mousedown', startDrawing);
    canvas?.addEventListener('mousemove', draw);
    canvas?.addEventListener('mouseup', stopDrawing);
    canvas?.addEventListener('mouseout', stopDrawing);

    // Touch support
    canvas?.addEventListener('touchstart', handleTouchStart, false);
    canvas?.addEventListener('touchmove', handleTouchMove, false);
    canvas?.addEventListener('touchend', stopDrawing, false);

    // Buttons
    clearBtn?.addEventListener('click', clearCanvas);
    saveBtn?.addEventListener('click', saveAsImage);
}

/**
 * Start drawing when mouse is pressed
 */
function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
}

/**
 * Draw on canvas as mouse moves
 */
function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawLine(startX, startY, x, y);
    startX = x;
    startY = y;
}

/**
 * Stop drawing when mouse is released
 */
function stopDrawing() {
    isDrawing = false;
}

/**
 * Handle touch start event
 */
function handleTouchStart(e) {
    e.preventDefault();
    isDrawing = true;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    startX = touch.clientX - rect.left;
    startY = touch.clientY - rect.top;
}

/**
 * Handle touch move event
 */
function handleTouchMove(e) {
    e.preventDefault();
    if (!isDrawing) return;

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    drawLine(startX, startY, x, y);
    startX = x;
    startY = y;
}

/**
 * Draw a line from one point to another
 */
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = drawingState.color;
    ctx.lineWidth = drawingState.brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.closePath();
}

/**
 * Clear the canvas
 */
function clearCanvas() {
    if (confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

/**
 * Save canvas as PNG image
 */
function saveAsImage() {
    const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(/[/:,\s]/g, '-');

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `sketch-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Open the canvas modal
 */
function openModal() {
    if (modal) {
        modal.classList.add('active');
        // Set canvas to visible and ensure it's initialized
        if (canvas && !canvas.style.display) {
            canvas.focus();
        }
    }
}

/**
 * Close the canvas modal
 */
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Update theme-aware colors based on dark mode
 */
function updateThemeColors() {
    const isDark = document.body.classList.contains('dark');

    // Update canvas background color
    if (canvas) {
        ctx.fillStyle = isDark ? '#1a1a1a' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Set initial color to black (works on both themes)
    drawingState.color = '#000000';
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.value = '#000000';
    }
}

/**
 * Listen for theme changes and update colors accordingly
 */
export function syncCanvasTheme() {
    updateThemeColors();
}
