# YinYang Dashboard

A modern, responsive web dashboard application featuring a prompt library, kanban board, and theme toggle functionality. Built with a clean hierarchical file structure and mobile-first responsive design.

## ✨ Features

### 🌓 Theme Toggle
- **Dark/Light Mode**: Beautiful yin-yang animated toggle button
- **System Preference Detection**: Automatically detects system color scheme preference
- **Persistent Settings**: Theme choice is saved to localStorage
- **Keyboard Shortcuts**: Toggle theme with Space or Enter key (when not focused on input)

### 📝 Prompt Library
- **Create**: Add new prompts with title and content
- **Read**: Browse and search prompts by title
- **Update**: Edit existing prompts inline
- **Delete**: Remove prompts with confirmation
- **Copy**: Quick copy-to-clipboard functionality for prompt content
- **Search**: Real-time search filtering across all prompts

### 📊 Kanban Board
- **Drag & Drop**: Move cards between columns (Backlog, In Progress, Done)
- **Cards**: Create project cards with title and description
- **Card Counts**: See the number of cards in each column at a glance
- **Delete Cards**: Remove cards with a single click
- **Persistent State**: All cards and their positions are saved to localStorage

### 📱 Responsive Design
- **Mobile First**: Optimized for all screen sizes
- **Touch Friendly**: Adapted interactions for touch devices
- **Flexible Layout**: Adaptive grid system for different viewport sizes
- **Desktop Optimized**: Enhanced experience on larger screens

### 🎨 Additional Tabs
- **Canvas**: Placeholder for creative workspace
- **Gallery**: Placeholder for media gallery
- **Portfolio**: Placeholder for portfolio showcase

## 📂 Project Structure

```
yinyang/
├── README.md                    # Project documentation
├── index.html                   # Main HTML file
├── src/
│   ├── css/
│   │   ├── main.css            # Main stylesheet (imports all CSS)
│   │   ├── components/
│   │   │   ├── theme-toggle.css # Theme toggle styles
│   │   │   ├── tabs.css        # Tab navigation styles
│   │   │   ├── prompt-library.css # Prompt library styles
│   │   │   └── kanban-board.css  # Kanban board styles
│   │   └── utilities/
│   │       ├── animations.css   # Keyframe animations
│   │       └── responsive.css   # Media queries & responsive styles
│   └── js/
│       ├── main.js             # Application initialization
│       ├── modules/
│       │   ├── theme.js        # Theme toggle logic
│       │   ├── tabs.js         # Tab navigation logic
│       │   ├── prompt-library.js # Prompt CRUD logic
│       │   └── kanban-board.js  # Kanban board logic
│       └── utils/
│           ├── helpers.js      # Utility functions
│           └── storage.js      # localStorage management
└── assets/                      # (Reserved for future assets)
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required - vanilla JavaScript & CSS

### Installation

1. Clone or download the repository:
```bash
git clone <repository-url>
cd yinyang
```

2. Open in your browser:
```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js (if you have it)
npx http-server

# Or simply open index.html directly in your browser
```

3. Navigate to `http://localhost:8000` (if using a server)

## 💾 Data Storage

The application uses **localStorage** to persist all data locally in your browser:

- **Prompts**: Stored under key `prompts` (JSON array)
- **Kanban Cards**: Stored under key `kanbanCards` (JSON array)
- **Active Tab**: Stored under key `activeTab` (string)
- **Theme**: Stored under key `theme` (string: 'dark' or 'light')

All data remains on your device and is never sent to a server.

## 🎮 How to Use

### Adding a Prompt
1. Go to the **Prompts** tab
2. Fill in the **Title** and **Content** fields
3. Click **Save Prompt**
4. Your prompt appears in the grid below

### Searching Prompts
1. Use the search bar to filter prompts by title in real-time
2. Clear the search box to see all prompts

### Editing a Prompt
1. Click the **Edit** button on a prompt card
2. The form fills with the prompt's current content
3. Make your changes
4. Click **Save Prompt** to update
5. Or click **Cancel** to discard changes

### Copying Prompt Content
1. Click the **Copy** button on a prompt card
2. The content is copied to your clipboard
3. Button temporarily shows "Copied!" confirmation

### Deleting a Prompt
1. Click the **Delete** button on a prompt card
2. Confirm the deletion when prompted

### Creating Kanban Cards
1. Go to the **Projects** tab
2. Fill in the card **Title** (required) and **Description** (optional)
3. Click **Add Card**
4. Card appears in the Backlog column

### Moving Cards Between Columns
1. Click and drag a card to another column
2. The column header shows the card count
3. Drag and drop works smoothly across all columns

### Deleting Kanban Cards
1. Click the **Delete** button on a card
2. Card is immediately removed

### Toggling Dark/Light Mode
1. Click the yin-yang button in the top-left corner
2. Or press **Space** or **Enter** (when not typing in a field)
3. The entire interface switches themes
4. Your preference is saved

## 🎨 Responsive Design Features

### Mobile (≤480px)
- Single column layout for prompt grid
- Touch-friendly button sizes (12px+ minimum)
- Optimized spacing and padding
- Readable font sizes on small screens
- Kanban board displays one column at a time

### Tablet (481px - 1024px)
- 2-column grid for prompts
- Adaptive kanban board layout
- Balanced spacing and interactions

### Desktop (1025px+)
- Multi-column responsive grid
- Full kanban board with multiple visible columns
- Optimized spacing and whitespace

### Touch Devices
- Hover effects disabled for better touch experience
- Larger tap targets
- No transform animations on hover (to prevent jank)

## 🔒 Security Features

- **XSS Protection**: HTML content is escaped to prevent injection attacks
- **Client-Side Only**: No external API calls or server communication
- **Data Privacy**: All data stored locally on your device

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Space | Toggle dark/light mode (when not in input field) |
| Enter | Toggle dark/light mode (when not in input field) |

## 🌐 Browser Support

| Browser | Status |
|---------|--------|
| Chrome 90+ | ✅ Full Support |
| Firefox 88+ | ✅ Full Support |
| Safari 14+ | ✅ Full Support |
| Edge 90+ | ✅ Full Support |

## 📱 Device Compatibility

- ✅ Desktop Computers
- ✅ Tablets & iPad
- ✅ Smartphones
- ✅ Large Displays (4K+)

## 🛠️ Development

### Code Organization

The project uses **ES6 modules** for clean, maintainable code:

```javascript
// Modules are self-contained with clear responsibilities
import { initTheme } from './modules/theme.js';
import { loadPrompts } from './utils/storage.js';
```

### Adding New Features

1. Create a new module in `src/js/modules/` if it's a major feature
2. Import and initialize it in `src/js/main.js`
3. Add corresponding styles in `src/css/components/`
4. Update this README

### Styling

CSS is organized by component and utility:

- **Components**: Feature-specific styles (theme-toggle.css, etc.)
- **Utilities**: General styles (animations.css, responsive.css)
- **main.css**: Imports all stylesheets and global styles

## 🚀 Performance

- **No Build Step**: Loads instantly without compilation
- **Minimal Dependencies**: Only vanilla JavaScript & CSS
- **Small Bundle**: ~30KB of uncompressed assets
- **Smooth Animations**: 60 FPS with hardware-accelerated transforms

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues, questions, or suggestions, please open an issue on the repository.

## 🎯 Roadmap

Future enhancements planned:

- [ ] Markdown support in prompts
- [ ] Categories/Tags for prompts
- [ ] Export/Import functionality
- [ ] Cloud sync option
- [ ] Collaborative features
- [ ] Dark mode variants
- [ ] Custom theme colors
- [ ] Prompt templates
- [ ] Advanced analytics

## 🙏 Acknowledgments

- Inspired by modern dashboard design patterns
- Built with accessibility in mind (ARIA labels, semantic HTML)
- Responsive design using CSS Grid and Flexbox

---

**Version**: 2.0.0 (Refactored)
**Last Updated**: 2024
