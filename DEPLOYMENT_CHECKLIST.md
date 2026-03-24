# Quick Deployment Checklist for ATS Optimizer Backend

## ✅ Pre-Deployment Checks

### 1. Git Repository Setup
- [ ] Initialize git (if not done): `git init`
- [ ] Add all files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Push to GitHub

### 2. Backend Files Ready
- [ ] `backend-node/` folder exists with:
  - server.js
  - package.json (with start script)
  - .gitignore
  
- [ ] `backend-python/` folder exists with:
  - app.py
  - requirements.txt
  - Procfile
  - .gitignore

---

## 🚀 Deploy Node.js Backend (Email Service)

### Step-by-Step:

1. **Login to Render**: https://render.com/dashboard

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub account
   - Select your repository

3. **Configure Service**:
   ```
   Name: ats-email-backend
   Region: (Choose your preferred region)
   Branch: main
   Root Directory: backend-node
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Environment Variables**:
   ```
   EMAIL=surendrachavan367@gmail.com
   PASSWORD=jbwgfpnhwljsejso
   NODE_ENV=production
   ```

5. **Instance Type**: Free

6. **Click "Create Web Service"**

7. **Wait for Deployment**: ~2-3 minutes

8. **Copy URL**: e.g., `https://ats-email-backend-xyz.onrender.com`

---

## 🐍 Deploy Python Backend (ATS Analysis)

### Step-by-Step:

1. **Create Another Web Service**:
   - Click "New +" → "Web Service"
   - Select same repository

2. **Configure Service**:
   ```
   Name: ats-analysis-backend
   Region: (Same as Node.js backend)
   Branch: main
   Root Directory: backend-python
   Runtime: Python
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn app:app
   ```

3. **Set Environment Variables**:
   ```
   PORT=5000
   PYTHON_VERSION=3.9.0
   ```

4. **Instance Type**: Free

5. **Click "Create Web Service"**

6. **Wait for Deployment**: ~3-5 minutes (Spacy model takes time to install)

7. **Copy URL**: e.g., `https://ats-analysis-backend-abc.onrender.com`

---

## 🔗 Update Frontend Configuration

### Option 1: Update Vercel Dashboard (Recommended)

1. Go to Vercel Dashboard
2. Select your ATS Optimizer project
3. Go to "Settings" → "Environment Variables"
4. Add/Update:
   ```
   VITE_BACKEND_EMAIL_URL=https://your-nodejs-backend-url.onrender.com
   VITE_BACKEND_ANALYZE_URL=https://your-python-backend-url.onrender.com
   ```
5. Click "Save"
6. Redeploy the frontend (Deployments → Redeploy)

### Option 2: Update .env File

1. Update `frontend/.env`:
   ```env
   VITE_BACKEND_EMAIL_URL=https://your-nodejs-backend-url.onrender.com
   VITE_BACKEND_ANALYZE_URL=https://your-python-backend-url.onrender.com
   ```
2. Commit and push
3. Vercel will auto-redeploy

---

## 🧪 Testing

### Test Email Backend:
```bash
curl -X POST https://YOUR-NODEJS-URL/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "message": "Testing"
  }'
```

Expected: `{"success": true}`

### Test ATS Backend:
Visit in browser: `https://YOUR-PYTHON-URL/test-upload`

Should show upload form.

### Test Full Integration:
1. Visit your Vercel-deployed frontend
2. Try "Contact" form (should send email)
3. Try ATS Analyzer (should analyze PDFs)

---

## ⚠️ Common Issues & Solutions

### Issue: Backend won't start
**Solution**: Check build logs in Render dashboard for errors

### Issue: CORS errors
**Solution**: Update CORS settings in both backends to include your Vercel domain

### Issue: 500 Error on email send
**Solution**: Verify Gmail credentials are correct in Render env variables

### Issue: Slow first request
**Solution**: This is normal for free tier. Services wake up after ~30 seconds

### Issue: PDF analysis fails
**Solution**: Ensure PDFs are text-based, not scanned images

---

## 📊 Final Checklist

- [ ] Node.js backend deployed successfully
- [ ] Python backend deployed successfully  
- [ ] Both backend URLs copied
- [ ] Vercel environment variables updated
- [ ] Frontend redeployed
- [ ] Email functionality tested ✅
- [ ] ATS analysis tested ✅
- [ ] No console errors in browser

---

## 🎉 Success!

Your ATS Optimizer is now fully deployed:
- **Frontend**: Vercel
- **Email Backend**: Render (Node.js)
- **Analysis Backend**: Render (Python)

All set! 🚀
