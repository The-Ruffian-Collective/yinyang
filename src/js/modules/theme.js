/* ========================================
   THEME MANAGEMENT (DARK/LIGHT MODE)
   ======================================== */

import { createRipple } from '../utils/helpers.js';

export function initTheme() {
    const toggleBtn = document.querySelector('.toggle-btn');

    if (!toggleBtn) {
        console.error('Toggle button not found');
        return;
    }

    // Listen for theme toggle button clicks
    toggleBtn.addEventListener('click', toggleMode);

    // Listen for keyboard shortcuts (Space or Enter)
    document.addEventListener('keydown', handleThemeKeyboard);
}

/**
 * Toggles between dark and light mode
 * @param {Event} event - The click event
 */
function toggleMode(event) {
    document.body.classList.toggle('dark');
    createRipple(event.currentTarget);

    // Persist theme preference to localStorage if needed
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/**
 * Handles keyboard shortcuts for theme toggle
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleThemeKeyboard(event) {
    // Don't trigger if focused on input elements
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }

    // Toggle on Space or Enter key
    if (event.code === 'Space' || event.code === 'Enter') {
        const toggleBtn = document.querySelector('.toggle-btn');
        if (toggleBtn) {
            toggleMode({ currentTarget: toggleBtn });
            event.preventDefault();
        }
    }
}

/**
 * Set theme based on system preference
 */
export function setThemeFromPreference() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // Use saved preference
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Use system preference
        document.body.classList.add('dark');
    }

    // Listen for system preference changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark');
                } else {
                    document.body.classList.remove('dark');
                }
            }
        });
    }
}
