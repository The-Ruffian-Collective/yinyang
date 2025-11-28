// Portfolio Apps Module
// Displays a curated collection of deployed projects and MVPs

/**
 * Portfolio apps data - contains all deployed projects with metadata
 */
const portfolioApps = [
    {
        id: 'whereflix',
        name: 'WhereFlix',
        description: 'Discover movies and shows based on where to watch them. Search by title and find streaming availability across multiple platforms.',
        link: 'https://whereflix.vercel.app',
        icon: '🎬'
    },
    {
        id: 'menucraft',
        name: 'MenuCraft',
        description: 'AI-powered recipe suggestion and meal planning tool. Create custom menus and discover new recipes based on your ingredients.',
        link: 'https://menucraft-ai.vercel.app',
        icon: '🍳'
    },
    {
        id: 'wtf-pdf',
        name: 'WTF.PDF',
        description: 'Fast PDF analysis and extraction tool. Upload PDFs and extract text, tables, and metadata with ease.',
        link: 'https://wtf-pdf.vercel.app',
        icon: '📄'
    },
    {
        id: 'hungry-lens',
        name: 'Hungry Lens',
        description: 'AI-powered food recognition app. Take a photo of any dish and get instant nutritional info and recipe suggestions.',
        link: 'https://hungry-lens.vercel.app',
        icon: '📸'
    },
    {
        id: 'mise-please',
        name: 'Mise Please',
        description: 'Kitchen organization and prep management. Plan mise en place setups and organize your cooking workflow efficiently.',
        link: 'https://mise-please.vercel.app',
        icon: '🔪'
    },
    {
        id: 'yinyang-dashboard',
        name: 'YinYang Dashboard',
        description: 'This dashboard - a personal productivity hub with prompt library, kanban board, drawing canvas, and image gallery in one place.',
        link: 'https://yinyang-dashboard.vercel.app',
        icon: '⚡'
    }
];

/**
 * Initialize the portfolio apps module
 */
export function initPortfolioApps() {
    const portfolioTab = document.querySelector('[data-panel="portfolio"]');
    if (!portfolioTab) return;

    // Create portfolio UI
    createPortfolioUI(portfolioTab);
}

/**
 * Create the portfolio UI structure
 */
function createPortfolioUI(container) {
    const portfolioHTML = `
        <div class="portfolio-section">
            <div class="portfolio-header">
                <h2>App Portfolio</h2>
                <p class="portfolio-subtitle">A showcase of deployed projects and MVPs I've built</p>
            </div>
            <div class="portfolio-grid" id="portfolioGrid">
                ${generatePortfolioCards()}
            </div>
        </div>
    `;

    container.innerHTML = portfolioHTML;
    attachPortfolioEventListeners(container);
}

/**
 * Generate HTML for all portfolio app cards
 */
function generatePortfolioCards() {
    return portfolioApps
        .map(app => createAppCard(app))
        .join('');
}

/**
 * Create a single app card
 */
function createAppCard(app) {
    return `
        <article class="portfolio-card" data-app-id="${app.id}">
            <div class="portfolio-card-icon">${app.icon}</div>
            <div class="portfolio-card-content">
                <h3 class="portfolio-card-title">${escapeHtml(app.name)}</h3>
                <p class="portfolio-card-description">${escapeHtml(app.description)}</p>
            </div>
            <div class="portfolio-card-footer">
                <a href="${escapeHtml(app.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary portfolio-link">
                    View Live
                    <span class="external-icon">↗</span>
                </a>
            </div>
        </article>
    `;
}

/**
 * Attach event listeners to portfolio elements
 */
function attachPortfolioEventListeners(container) {
    // Event listeners for portfolio cards if needed in the future
    // Currently, all interactions are handled via CSS
    const cards = container.querySelectorAll('.portfolio-card');

    // Track click events for analytics if needed
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.portfolio-link')) {
                // Link click is handled by default behavior
                // Could add analytics tracking here
            }
        });
    });
}

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
