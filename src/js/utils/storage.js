/* ========================================
   LOCALSTORAGE MANAGEMENT
   ======================================== */

const PROMPTS_KEY = 'prompts';
const KANBAN_KEY = 'kanbanCards';
const ACTIVE_TAB_KEY = 'activeTab';

/**
 * Gets data from localStorage
 * @param {string} key - The storage key
 * @param {*} defaultValue - Default value if key not found
 * @returns {*} - The stored data or default value
 */
export function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from storage (${key}):`, error);
        return defaultValue;
    }
}

/**
 * Saves data to localStorage
 * @param {string} key - The storage key
 * @param {*} value - The value to store
 * @returns {boolean} - Success status
 */
export function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error saving to storage (${key}):`, error);
        return false;
    }
}

/**
 * Removes data from localStorage
 * @param {string} key - The storage key
 * @returns {boolean} - Success status
 */
export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from storage (${key}):`, error);
        return false;
    }
}

/* ========================================
   PROMPTS STORAGE
   ======================================== */

export function loadPrompts() {
    return getFromStorage(PROMPTS_KEY, []);
}

export function savePrompts(prompts) {
    return saveToStorage(PROMPTS_KEY, prompts);
}

/* ========================================
   KANBAN STORAGE
   ======================================== */

export function loadKanbanCards() {
    return getFromStorage(KANBAN_KEY, []);
}

export function saveKanbanCards(cards) {
    return saveToStorage(KANBAN_KEY, cards);
}

/* ========================================
   TAB STORAGE
   ======================================== */

export function getActiveTab() {
    return getFromStorage(ACTIVE_TAB_KEY, 'prompts');
}

export function setActiveTab(tabName) {
    return saveToStorage(ACTIVE_TAB_KEY, tabName);
}
