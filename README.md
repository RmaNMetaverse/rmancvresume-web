# Arman Jangmiri - Interactive Resume

A modern, responsive resume website built with React, Tailwind CSS, and Vite.

## 📋 Features
- ✨ Dark/Light mode toggle
- 🖨️ Print to PDF functionality
- 📱 Fully responsive design
- 🚀 Offline-first (no CDN dependencies)
- ⚡ Lightning-fast build with Vite

## 🏗️ Project Structure

```
rman-resume/
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Main resume component
│   └── index.css         # Tailwind + print styles
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── dist/                 # Built files (generated)
```

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool (10x faster than Webpack) |
| **Tailwind CSS** | Utility-first CSS framework |
| **lucide-react** | Beautiful icons |
| **PostCSS** | CSS processing |

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16+ (LTS recommended)
- npm or yarn

### Installation

1. **Navigate to project folder:**
   ```bash
   cd rman-resume
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs all packages **locally** (no internet needed after first install).

3. **Start development server:**
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:5173`
   - Hot reload enabled (changes show instantly)
   - Fully offline capable once dependencies are installed

4. **Open in browser:**
   - Go to `http://localhost:5173`
   - Toggle dark mode with moon icon
   - Print/PDF with printer icon

## 🏗️ Building for Production

### Build the Project

```bash
npm run build
```

This creates a `dist/` folder with:
- Optimized HTML, CSS, JS
- All assets bundled
- **No external dependencies** - completely self-contained

### Output Structure (dist folder)
```
dist/
├── index.html           # Main HTML file
├── assets/
│   ├── index-HASH.js    # Minified JavaScript
│   └── index-HASH.css   # Minified CSS
```

## 🌐 Deploying to Apache/PHP Hosting (No Node.js)

### Step 1: Build locally
```bash
npm run build
```

### Step 2: Upload to hosting

Copy **everything inside the `dist/` folder** to your web hosting:

**Option A: Using FTP/SFTP**
1. Connect via FTP client (FileZilla, WinSCP, etc.)
2. Navigate to your public_html or www folder
3. Upload all files from `dist/` folder

**Option B: Using cPanel File Manager**
1. Log into cPanel
2. Go to File Manager → public_html
3. Upload the contents of `dist/` folder

**Option C: Using SSH (if available)**
```bash
scp -r dist/* user@your-host.com:~/public_html/
```

### Step 3: Configure Apache (if needed)

Create `.htaccess` in your public_html:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures single-page app routing works correctly.

### Step 4: Access your resume

Visit: `https://your-domain.com/` 

✅ Your resume is now live!

## 📝 Customizing Your Resume

Edit `src/App.jsx`:
- Change contact info in `<ContactItem>`
- Update experience in `<ExperienceItem>`
- Modify skills in `<SkillTag>`
- Change colors via Tailwind classes

Then rebuild:
```bash
npm run build
```

## 🖼️ Adding a Profile Photo

In `src/App.jsx`, replace:
```jsx
<span className="text-4xl font-bold text-gray-400">AJ</span>
```

With:
```jsx
<img src="/profile.jpg" alt="Arman" className="w-full h-full object-cover" />
```

Add image to `public/profile.jpg` folder.

## 📦 Dependencies Explained

```json
{
  "react": "^18.2.0",           // UI framework
  "react-dom": "^18.2.0",       // React DOM renderer
  "lucide-react": "^0.308.0"    // Icon library (all bundled)
}
```

All bundled in `dist/` - **no CDN calls needed**.

## 🚀 Performance

- **First Load:** ~50-100KB gzipped
- **No external requests** after first load
- **Mobile Optimized:** Responsive from 320px
- **Print Optimized:** Perfect A4 PDF export

## 🎨 Customization Tips

### Change color scheme
Edit Tailwind classes in `src/App.jsx`:
- `bg-blue-600` → Change to `bg-green-600`, `bg-purple-600`, etc.
- `text-slate-900` → Other color variants

### Disable dark mode button
Remove from `src/App.jsx`:
```jsx
<button onClick={() => setDarkMode(!darkMode)}>...</button>
```

### Change font
Add to `tailwind.config.js`:
```js
theme: {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    }
  }
}
```

## ✅ Testing Before Deploy

1. Build locally: `npm run build`
2. Preview: `npm run preview`
3. Open DevTools (F12)
4. Test print: Press Ctrl+P
5. Check dark mode toggle
6. Test on mobile (F12 → toggle device toolbar)

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| npm install fails | Update Node.js to latest LTS |
| Port 5173 in use | `npm run dev -- --port 5174` |
| dist folder not created | Run `npm run build` |
| Upload to hosting fails | Check file permissions, use SCP |

## 📞 Support

For issues with the build process, see Vite docs: https://vitejs.dev/

---

**Built with ❤️ using React, Vite & Tailwind CSS**
