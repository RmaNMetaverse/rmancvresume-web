# 🚀 Quick Start Guide - Arman Jangmiri Resume

## What You Just Got

A **complete, production-ready React portfolio/resume** that:
- ✅ Works completely offline (all libraries bundled)
- ✅ Runs locally on your PC
- ✅ Builds into static files for PHP/Apache hosting
- ✅ Has dark/light mode + print-to-PDF
- ✅ Mobile responsive

---

## 📂 Project Structure Explained

```
rman-resume/
├── src/                    # Your React source code
│   ├── App.jsx            # Main resume component (EDIT THIS to customize)
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind styles
├── dist/                  # ✅ Production build (ready to upload!)
│   ├── index.html         # Main file
│   └── assets/            # CSS & JavaScript (bundled, minified)
├── node_modules/          # All libraries (npm packages)
├── package.json           # Project configuration
├── vite.config.js         # Build tool config
├── tailwind.config.js     # Styling config
└── README.md              # Full documentation
```

---

## 🎯 3-Step Setup

### Step 1: Install Dependencies (One-time only)
```bash
cd rman-resume
npm install
```
✅ Done! All packages downloaded (~500MB but only needed locally)

### Step 2: Run Development Server
```bash
npm run dev
```
Output:
```
  ➜  Local:   http://localhost:5173/
```
✅ Open that URL in browser - your resume is live locally!

### Step 3: Build for Deployment
```bash
npm run build
```
Creates optimized `dist/` folder (~166 KB total - all bundled!)

---

## 💻 For Local Testing

1. **Start server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   - Go to `http://localhost:5173`
   - Test dark mode (moon icon)
   - Test print (printer icon) → Print to PDF
   - Resize browser to test mobile view

3. **Stop server:**
   - Press `Ctrl+C` in terminal

---

## 🎨 Customizing Your Resume

### Edit Contact Info
File: `src/App.jsx` (Line ~86)
```jsx
<ContactItem icon={<Phone size={18} />} text="+989124150452" darkMode={darkMode} />
```

### Add Profile Photo
1. Save image as `public/profile.jpg`
2. In `src/App.jsx` replace lines 71-73:
```jsx
<img 
  src="/profile.jpg" 
  alt="Arman" 
  className="w-full h-full object-cover"
/>
```

### Edit Experience/Skills
Find sections in `src/App.jsx`:
- Line ~190: Experience items
- Line ~110: Skills tags
- Line ~120: Tools list

Change text and rebuild with `npm run build`

---

## 🌐 Deploy to Web Hosting

### Prerequisites
- Web hosting with FTP/cPanel (PHP hosting)
- No Node.js required on server!

### Step-by-Step

**Step 1: Build locally (generates production files)**
```bash
npm run build
```

**Step 2: Connect to Hosting via FTP**
- Use FileZilla, WinSCP, or cPanel File Manager
- FTP into: `your-domain.com`
- Navigate to: `public_html` (or `www` folder)

**Step 3: Upload Files**
Copy **all files inside `dist/` folder**:
```
dist/index.html          → public_html/index.html
dist/assets/             → public_html/assets/
```

**Step 4: (Optional) Create .htaccess**
Create file `public_html/.htaccess`:
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

**Step 5: Done!**
Visit: `https://your-domain.com` ✅

---

## 🛠️ Technology Explained

| Tool | What it does |
|------|-------------|
| **React** | Framework that makes the UI interactive |
| **Vite** | Fast build tool (packages everything) |
| **Tailwind CSS** | CSS framework (styling) |
| **lucide-react** | Icon library (dark/light mode icons) |

**Result:** All packaged into 3 tiny files in `dist/`:
- `index.html` (0.48 KB)
- CSS file (12.46 KB)
- JavaScript file (153.35 KB)
- **Total: ~166 KB** - loads in <1 second!

---

## 📋 Available Commands

```bash
npm run dev      # Start local development (hot reload)
npm run build    # Create production files in dist/
npm run preview  # Test production build locally
```

---

## ❓ FAQ

**Q: Do I need Node.js installed after deployment?**  
A: No! Only to build locally. Once in `dist/`, it's pure HTML/CSS/JS.

**Q: Can I edit it after uploading?**  
A: Edit locally in `src/App.jsx`, rebuild with `npm run build`, re-upload `dist/` contents.

**Q: Will it work without internet?**  
A: Yes! Everything is bundled. No external requests.

**Q: How big is the final file?**  
A: Only ~166 KB (gzipped: ~49 KB). Loads instantly!

**Q: Can I add more content?**  
A: Yes, edit `src/App.jsx` - add more `<ExperienceItem>` or skills.

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js from nodejs.org |
| Port 5173 already in use | `npm run dev -- --port 5174` |
| Changes not showing | Restart dev server (Ctrl+C then npm run dev) |
| dist/ not created | Run `npm run build` first |
| Upload fails | Check hosting has FTP enabled |

---

## 📞 Need Help?

- **Vite docs:** https://vitejs.dev/
- **React docs:** https://react.dev/
- **Tailwind docs:** https://tailwindcss.com/

---

**You're all set! 🎉**

Start with:
```bash
npm run dev
```

Then visit `http://localhost:5173` 🚀
