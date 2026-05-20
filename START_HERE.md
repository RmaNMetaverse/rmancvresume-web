# 🎯 START HERE - 5 Minute Quick Start

## ✅ Prerequisites (Do This First If You Haven't)

### 1. Install Node.js
- Download from: https://nodejs.org/ (LTS version recommended)
- Run installer, accept defaults
- Restart your computer
- Verify: Open PowerShell and type:
  ```bash
  node --version
  npm --version
  ```
  Should show version numbers, not errors.

---

## 🚀 Running Locally (5 Minutes)

### Step 1: Open Terminal
```bash
# Navigate to project folder
cd g:\Desktop\rman-resume
```

### Step 2: Start Development Server
```bash
npm run dev
```

**You should see:**
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 3: Open Browser
- Click link or manually type: `http://localhost:5173`
- 🎉 Your interactive resume loads!

### Step 4: Test Features
- **Dark mode:** Click moon icon (top right)
- **Print/PDF:** Click printer icon
- **Mobile view:** Resize browser window
- **Edit:** Change text in `src/App.jsx`, save, browser updates automatically ✨

### Step 5: Stop Server
Press `Ctrl+C` in terminal

---

## 🏗️ Building for Production (2 Minutes)

### Step 1: Build
```bash
npm run build
```

**You should see:**
```
✓ 1418 modules transformed.
dist/index.html                     0.48 kB
dist/assets/index-B80c59r5.css     12.46 kB
dist/assets/index-VIA8hPrb.js     153.35 kB
✓ built in 3.60s
```

### Step 2: Test Production Build (Optional)
```bash
npm run preview
```
Visit: `http://localhost:4173` to test production version

### Step 3: Upload to Hosting
Copy everything from `dist/` folder to your hosting's `public_html` folder (via FTP or cPanel)

---

## 📝 Customizing Your Resume

### Quick Edits

**File to edit:** `src/App.jsx`

1. **Change your name** (find line 67):
   ```jsx
   <h1 className="text-3xl font-extrabold...">Arman Jangmiri</h1>
   ```
   Replace "Arman Jangmiri" with your name

2. **Change phone number** (find line 86):
   ```jsx
   <ContactItem icon={<Phone size={18} />} text="+989124150452" darkMode={darkMode} />
   ```
   Replace "+989124150452" with your number

3. **Change email** (find line 87):
   ```jsx
   <ContactItem icon={<Mail size={18} />} text="RmaN.Metaverse@Gmail.com" darkMode={darkMode} />
   ```
   Replace with your email

4. **Change experience** (find line 190+):
   Look for `<ExperienceItem>` components and update:
   - `year` - Years worked
   - `title` - Job title
   - `company` - Company/location
   - `description` - What you did

5. **Save and see changes instantly:**
   ```bash
   npm run dev
   # Make edits to src/App.jsx
   # Browser auto-updates!
   ```

---

## 🌐 Deploying to Web Hosting (5 Minutes)

### Using cPanel (Easiest)

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Log into cPanel:**
   - Visit: `https://your-domain.com:2083` or check your hosting email
   - Username/Password: From hosting provider

3. **File Manager:**
   - Click "File Manager"
   - Navigate to `public_html`

4. **Upload files:**
   - Click "Upload"
   - Drag these from your `dist/` folder:
     ```
     index.html        (main file)
     assets/           (entire folder)
     ```

5. **Done!**
   - Visit: `https://your-domain.com`
   - Your resume is live! 🎉

### Using FTP (Alternative)

1. **Download FileZilla:**
   - https://filezilla-project.org/

2. **Connect:**
   - Host: your-domain.com
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

3. **Upload:**
   - Navigate to `public_html`
   - Drag `dist/` contents here

4. **Done!**
   - Visit: `https://your-domain.com`

---

## 📚 Full Documentation

For detailed information, read:

1. **QUICK_START.md** - Overview
2. **COMPLETE_GUIDE.md** - Comprehensive guide
3. **DEPLOYMENT.md** - Hosting details
4. **ARCHITECTURE.md** - How it works
5. **README.md** - Feature documentation

---

## ⚡ TL;DR (Absolute Minimum)

```bash
# Setup
cd g:\Desktop\rman-resume
npm install

# Development
npm run dev                    # Visit http://localhost:5173

# Production
npm run build                  # Creates dist/ folder
# Upload dist/ contents to hosting via FTP/cPanel
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "npm not found" | Install Node.js from nodejs.org |
| Port 5173 in use | `npm run dev -- --port 5174` |
| Changes not showing | Clear cache: Ctrl+Shift+Delete |
| Build fails | Run `npm install terser` then try again |
| Blank page on host | Clear browser cache, check upload folder |

---

## 🎓 What You Have

✅ Complete React app with:
- Dark/Light mode
- Print to PDF
- Mobile responsive
- No external dependencies
- Production ready
- All files bundled (166 KB)

✅ Full documentation
✅ Everything to run locally
✅ Everything to deploy to hosting

---

## 📞 What's Next?

**Option 1: Learn More**
- Read COMPLETE_GUIDE.md for deep dive
- Check React docs: https://react.dev

**Option 2: Deploy Now**
1. Edit contact info
2. Run `npm run build`
3. Upload `dist/` to hosting
4. Done!

**Option 3: Customize More**
- Edit experience entries
- Add profile photo
- Change colors
- Add more skills

---

**Ready? Start with:**
```bash
npm run dev
```

Visit: **http://localhost:5173** 🚀

---

*Questions? Check the full docs in this folder.*
