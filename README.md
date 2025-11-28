# YinYang Dashboard

A modern, responsive web dashboard application featuring a prompt library, kanban board, drawing canvas, image gallery, and an app portfolio showcase. Built with vanilla JavaScript, pure CSS, and a mobile-first responsive design.

## ✨ Features

### 🌓 Theme Toggle
- **Dark/Light Mode**: Beautiful yin-yang animated toggle button
- **System Preference Detection**: Automatically detects system color scheme preference
- **Persistent Settings**: Theme choice is saved to localStorage
- **Keyboard Shortcuts**: Toggle theme with Space or Enter key (when not focused on input)

### 📝 Prompt Library
- **Create**: Add new prompts with title and content
- **Read**: Browse and search prompts by title in real-time
- **Update**: Edit existing prompts inline with form feedback
- **Delete**: Remove prompts with confirmation
- **Copy**: Quick copy-to-clipboard functionality for prompt content
- **Search**: Real-time search filtering across all prompts
- **Grid Layout**: Responsive card grid with smooth animations

### 📊 Kanban Board
- **Drag & Drop**: Move cards between columns (Backlog, In Progress, Done)
- **Cards**: Create project cards with title and description
- **Card Counts**: See the number of cards in each column at a glance
- **Delete Cards**: Remove cards with a single click
- **Persistent State**: All cards and their positions are saved to localStorage
- **Smooth Interactions**: Hardware-accelerated animations and transitions

### 🎨 Canvas Drawing Tool
- **Sketching**: Quick drawing and sketching workspace
- **Color Picker**: Choose from a wide color palette
- **Brush Controls**: Adjustable brush size for precision or bold strokes
- **Modal Interface**: Dedicated drawing space without distractions
- **Clear Canvas**: Reset and start fresh anytime

### 📸 Image Gallery
- **Drag & Drop Upload**: Drop images directly into the gallery
- **Multi-Select**: Upload multiple images at once
- **Thumbnail Grid**: Beautiful responsive image grid display
- **File Validation**: Auto-validates file size (5MB max) and types (JPEG, PNG, GIF, WebP, SVG)
- **Quick Delete**: Remove individual images with single click
- **Persistence Option**: Optional localStorage persistence across sessions
- **Metadata Display**: Shows filename, file size, and upload timestamp
- **Image Limit**: Safely handles up to 50 images per session

### 🚀 Portfolio/App Directory
- **Curated Showcase**: Display of 6 deployed projects and MVPs:
  - **WhereFlix** - Discover movies and shows based on where to watch them
  - **MenuCraft** - AI-powered recipe suggestion and meal planning
  - **WTF.PDF** - Fast PDF analysis and extraction
  - **Hungry Lens** - Professional menu photography generated instantly with AI
  - **Mise Please** - Kitchen organization and prep management
  - **YinYang Dashboard** - This dashboard itself
- **Card Layout**: 3-column grid (2 rows) on desktop, responsive on smaller screens
- **Rich Metadata**: App name, description, emoji icon, and live link
- **Interactive Cards**: Hover effects with smooth animations
- **Quick Links**: Direct access to all deployed projects
- **Staggered Animation**: Cards fade in with elegant timing

### 📱 Responsive Design
- **Mobile First**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Touch Friendly**: Adapted interactions for touch devices
- **Flexible Layout**: Adaptive grid system for different viewport sizes
- **Desktop Optimized**: Enhanced experience on larger screens
- **No Dependencies**: Pure CSS Grid and Flexbox

## 📂 Project Structure

```
yinyang/
├── README.md                    # Project documentation
├── index.html                   # Main HTML file
├── src/
│   ├── css/
│   │   ├── main.css            # Main stylesheet (imports all CSS)
│   │   ├── components/
│   │   │   ├── theme-toggle.css     # Theme toggle styles
│   │   │   ├── tabs.css             # Tab navigation styles
│   │   │   ├── prompt-library.css   # Prompt library styles
│   │   │   ├── kanban-board.css     # Kanban board styles
│   │   │   ├── canvas-drawing.css   # Canvas drawing tool styles
│   │   │   ├── image-gallery.css    # Image gallery styles
│   │   │   └── portfolio-apps.css   # Portfolio showcase styles
│   │   └── utilities/
│   │       ├── animations.css       # Keyframe animations
│   │       └── responsive.css       # Media queries & responsive styles
│   └── js/
│       ├── main.js             # Application initialization
│       ├── modules/
│       │   ├── theme.js             # Theme toggle logic
│       │   ├── tabs.js              # Tab navigation logic
│       │   ├── prompt-library.js    # Prompt CRUD logic
│       │   ├── kanban-board.js      # Kanban board logic
│       │   ├── canvas-drawing.js    # Canvas drawing tool
│       │   ├── image-gallery.js     # Image upload & gallery logic
│       │   └── portfolio-apps.js    # Portfolio showcase logic
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

- **Prompts**: Stored under key `prompts` (JSON array of prompt objects)
- **Kanban Cards**: Stored under key `kanbanCards` (JSON array with column positions)
- **Active Tab**: Stored under key `activeTab` (string: tab name)
- **Theme**: Stored under key `theme` (string: 'dark' or 'light')
- **Gallery Images**: Stored under key `galleryImages` (JSON array with base64 image data)
- **Gallery Persistence**: Stored under key `galleryPersist` (boolean flag)

All data remains on your device and is never sent to a server. The gallery images are stored as base64 strings, so no external storage is required.

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

### Using the Canvas Drawing Tool
1. Go to the **Canvas** tab
2. Click **Open Canvas** to launch the drawing modal
3. Use the color picker to select your brush color
4. Adjust brush size with the slider for finer or bolder strokes
5. Draw freely on the canvas
6. Click **Clear** to reset and start over
7. Close the modal to return to the dashboard

### Uploading Images to Gallery
1. Go to the **Gallery** tab
2. Drag and drop images into the upload area, or click to select files
3. Upload multiple images at once (up to 50 per session)
4. Images are validated for type (JPEG, PNG, GIF, WebP, SVG) and size (max 5MB)
5. Thumbnails appear in a responsive grid with metadata
6. Hover over an image to reveal the delete button
7. Optional: Check **Persist Gallery** to save images across sessions

### Browsing Your Portfolio
1. Go to the **Portfolio** tab
2. View your 6 curated deployed projects in a 3-column card layout
3. Each card shows:
   - **Emoji Icon**: Visual identifier for the app
   - **App Name**: Title of the project
   - **Description**: Brief overview of what the app does
   - **View Live Button**: Click to open the deployed app (links currently placeholder URLs)
4. Cards feature smooth hover effects and staggered fade-in animations
5. Responsive layout adapts to tablet (2 columns) and mobile (1 column)

### Toggling Dark/Light Mode
1. Click the yin-yang button in the top-left corner
2. Or press **Space** or **Enter** (when not typing in a field)
3. The entire interface switches themes
4. Your preference is saved

## 🎨 Responsive Design Features

### Mobile (≤480px)
- Single column layout for prompt grid
- Single column layout for portfolio cards
- Single column image gallery
- Touch-friendly button sizes (minimum 44x44px tap targets)
- Optimized spacing and padding for small screens
- Readable font sizes and proper line-height
- Kanban board displays one column at a time
- Canvas and drawing tools fully functional
- Text sizes and spacing adjusted for mobile readability

### Tablet (481px - 1024px)
- 2-column grid for prompts
- 2-column grid for portfolio cards
- 2-column image gallery
- Adaptive kanban board layout
- Balanced spacing and interactions
- Optimized touch targets for tablet use

### Desktop (1025px+)
- 3-column responsive grid for prompts
- 3-column grid (2 rows) for portfolio showcase
- Auto-fill responsive image gallery
- Full kanban board with multiple visible columns
- Optimized spacing and whitespace
- Enhanced hover effects and animations
- Full use of screen real estate

### Touch Devices
- Hover effects gracefully degraded on touch
- Active states provide visual feedback instead
- Larger tap targets (minimum 12px padding)
- Smooth scrolling and touch-optimized interactions
- No hover-based hidden content (all information visible)

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

### Completed Features ✅
- [x] Theme toggle (dark/light mode)
- [x] Prompt library with CRUD operations
- [x] Kanban board with drag & drop
- [x] Canvas drawing tool
- [x] Image gallery with drag & drop upload
- [x] Portfolio showcase section
- [x] Responsive design (mobile, tablet, desktop)

### Future Enhancements 🚀
- [ ] Markdown support in prompts
- [ ] Categories/Tags for organization
- [ ] Export/Import data functionality
- [ ] Cloud sync option
- [ ] Prompt templates library
- [ ] Advanced canvas features (layers, undo/redo)
- [ ] Gallery filters and search
- [ ] Custom theme colors/variants
- [ ] Analytics dashboard
- [ ] Collaborative features (sharing)
- [ ] Mobile app version
- [ ] AI-powered prompt suggestions

## 🙏 Acknowledgments

- Inspired by modern dashboard design patterns
- Built with accessibility in mind (ARIA labels, semantic HTML, keyboard navigation)
- Responsive design using CSS Grid and Flexbox
- Smooth animations with hardware-accelerated transforms

---

**Version**: 2.1.0 (Portfolio & Gallery Complete)
**Last Updated**: 2024
