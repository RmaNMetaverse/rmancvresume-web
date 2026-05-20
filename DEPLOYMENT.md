# 🌐 Deployment Guide - PHP/Apache Hosting (Godaddy, Bluehost, etc)

## Overview

Your built website (`dist/` folder) is **static HTML/CSS/JavaScript** - no PHP/backend needed.

Works with:
- ✅ GoDaddy
- ✅ Bluehost
- ✅ HostGator
- ✅ Any Apache hosting with FTP

---

## Method 1: Using cPanel File Manager (Easiest)

### Step 1: Build Locally
```bash
npm run build
```
Creates `dist/` folder with 3 files.

### Step 2: Log into cPanel
- Visit: `your-domain.com:2083` or `cpanel.your-domain.com`
- Enter username/password

### Step 3: Open File Manager
- cPanel → File Manager
- Navigate to: `public_html`

### Step 4: Upload Files
- Click "Upload" 
- Drag-and-drop from `dist/` folder:
  - `index.html`
  - `assets/` folder (entire folder)

### Step 5: Verify
- Visit: `https://your-domain.com`
- Should see your resume! ✅

---

## Method 2: Using FTP Client (FileZilla, WinSCP)

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Download FTP Client
- **FileZilla** (free): https://filezilla-project.org/
- **WinSCP** (free): https://winscp.net/

### Step 3: Connect via FTP
- Host: `your-domain.com`
- Username: Your cPanel username
- Password: Your cPanel password
- Port: 21 (or 22 for SFTP)

### Step 4: Navigate to public_html
- In FileZilla: Remote site panel
- Open: `public_html` folder

### Step 5: Upload dist/ Contents
- Local site: Find your `dist/` folder
- Drag all files to `public_html`:
  ```
  dist/index.html       → public_html/index.html
  dist/assets/          → public_html/assets/
  ```

### Step 6: Visit Your Site
- Open: `https://your-domain.com`
- 🎉 Live!

---

## Method 3: Using SSH (Advanced)

If your host supports SSH:

```bash
# From your PC (in rman-resume folder)
scp -r dist/* your-username@your-domain.com:~/public_html/
```

---

## Optional: .htaccess Configuration

If you plan to add more pages later, create `.htaccess` in `public_html`:

1. **Via cPanel File Manager:**
   - Create new file: `.htaccess`
   - Content:
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

2. **Via FTP:**
   - Create `.htaccess` file locally
   - Upload to `public_html/`

This ensures routing works properly if you expand the site.

---

## Updating Your Resume

### To Make Changes:

1. **Edit locally:**
   - Edit `src/App.jsx`
   - Change text, experience, etc.

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Upload updated files:**
   - Via FTP: Upload `dist/assets/` folder
   - Via cPanel: Upload files again

4. **Clear browser cache:**
   - Press `Ctrl+Shift+Delete` → Clear cache
   - Or use private/incognito mode

---

## SSL/HTTPS

Most modern hosting includes free SSL (Let's Encrypt).

- GoDaddy: Usually enabled by default
- Bluehost: Auto-installs SSL
- If not enabled: Check hosting control panel for "SSL Certificates"

Your resume will be at: `https://your-domain.com` ✅

---

## File Size & Performance

After build:
- HTML: 0.48 KB
- CSS: 12.46 KB  
- JS: 153.35 KB
- **Total: ~166 KB**
- **Gzipped: ~49 KB**

✅ Loads in <1 second
✅ Works on slow connections
✅ Mobile optimized

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank page showing | Clear browser cache (Ctrl+Shift+Delete) |
| 404 error | Ensure files in correct folder (public_html) |
| Dark mode not working | Upload `assets/` folder too |
| Print doesn't work | Browser issue - try Chrome/Firefox |
| Domain not pointing | Check DNS settings in registrar |

---

## Important Notes

- ❌ Do NOT upload `node_modules/` folder
- ❌ Do NOT upload `src/` folder (not needed)
- ✅ Only upload contents of `dist/` folder
- ✅ Minimum hosting requirements: FTP + Apache + PHP (PHP not even needed!)

---

## Quick Checklist

- [ ] `npm run build` completed successfully
- [ ] Connected to hosting via cPanel/FTP
- [ ] Navigated to `public_html` folder
- [ ] Uploaded `index.html` + `assets/` folder
- [ ] Visited domain - resume appears
- [ ] Dark mode works
- [ ] Print to PDF works
- [ ] Mobile view works (resize browser)

---

## Support

- **Hosting Issues:** Contact your hosting provider
- **Build Issues:** Check `npm run build` output
- **Browser Issues:** Try Chrome/Firefox latest version

---

**Your resume is now live! 🎉**

---

## Advanced: CI/CD Deployment (Optional)

If you want to auto-deploy on every change:

1. **Push to GitHub**
2. **Connect to Netlify** (free) - auto-deploys from Git
3. **Or use cPanel Git** - if available

But for simple static hosting, manual upload is fine.

---

**Last Updated:** 2026  
**Framework:** React 18 + Vite  
**Bundle Size:** ~166 KB (production)
