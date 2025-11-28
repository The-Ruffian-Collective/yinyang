/* ========================================
   TAB NAVIGATION MANAGEMENT
   ======================================== */

import { getActiveTab, setActiveTab } from '../utils/storage.js';

export function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (!tabButtons.length || !tabPanels.length) {
        console.error('Tab elements not found');
        return;
    }

    // Add click listeners to tab buttons
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });

    // Load the active tab from storage or default to 'prompts'
    const activeTab = getActiveTab();
    switchTab(activeTab);
}

/**
 * Switches to a specific tab
 * @param {string} tabName - The name of the tab to switch to
 */
function switchTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Update button active states
    tabButtons.forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update panel visibility
    tabPanels.forEach(panel => {
        if (panel.dataset.panel === tabName) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });

    // Save the active tab to storage
    setActiveTab(tabName);
}
