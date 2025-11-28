/* ========================================
   KANBAN BOARD MANAGEMENT
   ======================================== */

import { loadKanbanCards, saveKanbanCards } from '../utils/storage.js';
import { escapeHtml, generateId } from '../utils/helpers.js';

let kanbanCards = [];
let draggedCard = null;

export function initKanbanBoard() {
    // Load kanban cards from storage
    kanbanCards = loadKanbanCards();
    renderKanbanBoard();

    // Set up event listeners
    const addBtn = document.querySelector('.kanban-add-card .btn-primary');
    if (addBtn) {
        addBtn.addEventListener('click', addKanbanCard);
    }

    // Set up event delegation for delete buttons
    const kanbanBoard = document.querySelector('.kanban-board');
    if (kanbanBoard) {
        kanbanBoard.addEventListener('click', handleKanbanCardClick);
    }

    // Set up drag event listeners on kanban lists
    setupDragListeners();
}

/**
 * Sets up drag and drop event listeners on kanban lists
 */
function setupDragListeners() {
    const lists = document.querySelectorAll('.kanban-list');

    lists.forEach(list => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('dragleave', handleDragLeave);
        list.addEventListener('drop', handleDrop);
    });
}

/**
 * Adds a new kanban card
 */
function addKanbanCard() {
    const titleInput = document.getElementById('cardTitle');
    const descriptionInput = document.getElementById('cardDescription');

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title) {
        alert('Please enter a card title');
        return;
    }

    const newCard = {
        id: generateId(),
        title,
        description,
        column: 'backlog'
    };

    kanbanCards.push(newCard);
    saveKanbanCards(kanbanCards);
    clearKanbanForm();
    renderKanbanBoard();
}

/**
 * Clears the kanban form
 */
function clearKanbanForm() {
    document.getElementById('cardTitle').value = '';
    document.getElementById('cardDescription').value = '';
}

/**
 * Deletes a kanban card
 * @param {string} id - The card ID
 */
function deleteKanbanCard(id) {
    kanbanCards = kanbanCards.filter(card => card.id !== id);
    saveKanbanCards(kanbanCards);
    renderKanbanBoard();
}

/**
 * Handles clicks on kanban card buttons
 * @param {Event} e - The click event
 */
function handleKanbanCardClick(e) {
    const btn = e.target.closest('.btn-card-delete');
    if (!btn) return;

    const card = btn.closest('.kanban-card');
    if (!card) return;

    const cardId = card.dataset.cardId;
    if (!cardId) return;

    deleteKanbanCard(cardId);
}

/**
 * Handles drag start
 * @param {DragEvent} e - The drag event
 */
function handleDragStart(e) {
    const card = e.target.closest('.kanban-card');
    if (!card) return;

    draggedCard = card.dataset.cardId;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', card.innerHTML);
}

/**
 * Handles drag end
 * @param {DragEvent} e - The drag event
 */
function handleDragEnd(e) {
    const card = e.target.closest('.kanban-card');
    if (card) {
        card.classList.remove('dragging');
    }
    document.querySelectorAll('.kanban-list').forEach(list => {
        list.classList.remove('drag-over');
    });
}

/**
 * Handles drag over
 * @param {DragEvent} e - The drag event
 */
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const list = e.currentTarget;
    list.classList.add('drag-over');
}

/**
 * Handles drag leave
 * @param {DragEvent} e - The drag event
 */
function handleDragLeave(e) {
    if (e.currentTarget === e.target) {
        e.currentTarget.classList.remove('drag-over');
    }
}

/**
 * Handles drop
 * @param {DragEvent} e - The drag event
 */
function handleDrop(e) {
    e.preventDefault();
    const list = e.currentTarget;
    list.classList.remove('drag-over');

    if (!draggedCard) return;

    const columnName = list.dataset.column;
    const cardIndex = kanbanCards.findIndex(card => card.id === draggedCard);

    if (cardIndex !== -1) {
        kanbanCards[cardIndex].column = columnName;
        saveKanbanCards(kanbanCards);
        renderKanbanBoard();
    }

    draggedCard = null;
}

/**
 * Renders the kanban board
 */
function renderKanbanBoard() {
    const columns = ['backlog', 'in-progress', 'done'];

    columns.forEach(columnName => {
        const list = document.querySelector(`[data-column="${columnName}"]`);
        const count = document.getElementById(`${columnName}-count`);
        const cardsInColumn = kanbanCards.filter(card => card.column === columnName);

        if (count) {
            count.textContent = cardsInColumn.length;
        }

        if (!list) return;

        if (cardsInColumn.length === 0) {
            list.innerHTML = '<div class="empty-state">Drop cards here</div>';
            return;
        }

        list.innerHTML = cardsInColumn.map(card => `
            <div class="kanban-card" draggable="true" data-card-id="${card.id}">
                <div class="kanban-card-title">${escapeHtml(card.title)}</div>
                ${card.description ? `<div class="kanban-card-description">${escapeHtml(card.description)}</div>` : ''}
                <div class="kanban-card-actions">
                    <button class="btn-card-delete" type="button">Delete</button>
                </div>
            </div>
        `).join('');

        // Re-attach drag listeners
        attachDragHandlersToCards(list);
    });
}

/**
 * Attaches drag event handlers to kanban cards
 * @param {HTMLElement} list - The kanban list element
 */
function attachDragHandlersToCards(list) {
    const cards = list.querySelectorAll('.kanban-card');

    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
}

// Export functions for global access if needed
export const KanbanBoard = {};
