/* ========================================
   UTILITY HELPER FUNCTIONS
   ======================================== */

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} text - The text to escape
 * @returns {string} - The escaped HTML text
 */
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Generates a unique ID using timestamp and random string
 * @returns {string} - Unique identifier
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Creates a ripple effect element
 * @param {HTMLElement} button - The button element
 * @returns {void}
 */
export function createRipple(button) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = '10px';
    ripple.style.left = '20px';
    ripple.style.top = '20px';

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Scrolls an element into view smoothly
 * @param {HTMLElement} element - The element to scroll to
 * @returns {void}
 */
export function scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Shows a temporary notification on a button
 * @param {HTMLElement} button - The button element
 * @param {string} newText - The temporary text to show
 * @param {number} duration - Duration in milliseconds
 * @returns {void}
 */
export function showTemporaryNotification(button, newText, duration = 2000) {
    const originalText = button.textContent;
    button.textContent = newText;
    button.classList.add('copied');

    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
    }, duration);
}
