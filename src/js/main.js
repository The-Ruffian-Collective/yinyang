/* ========================================
   APPLICATION INITIALIZATION
   ======================================== */

import { setThemeFromPreference, initTheme } from './modules/theme.js';
import { initTabs } from './modules/tabs.js';
import { initPromptLibrary } from './modules/prompt-library.js';
import { initKanbanBoard } from './modules/kanban-board.js';
import { initCanvasDrawing } from './modules/canvas-drawing.js';

/**
 * Initializes the application
 */
function init() {
    // Set theme based on user preference or system setting
    setThemeFromPreference();

    // Initialize all modules
    initTheme();
    initTabs();
    initPromptLibrary();
    initKanbanBoard();
    initCanvasDrawing();

    console.log('Application initialized successfully');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Handle page visibility changes to refresh UI if needed
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page is visible again, app is still running
    }
});
