# Backend Deployment Guide - ATS Optimizer

This guide will help you deploy both backends (Node.js and Python) to Render.

## 📁 Project Structure

```
project1/
├── backend-node/          # Node.js backend (Email functionality)
│   ├── server.js
│   ├── package.json
│   └── .env
├── backend-python/        # Python backend (ATS Analysis)
│   ├── app.py
│   ├── requirements.txt
│   └── Procfile
└── frontend/              # Frontend (Deployed on Vercel)
    ├── src/
    └── .env
```

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Deploy Node.js Backend (Email Service)

1. **Push to Git** (if not already done):
   ```bash
   git add backend-node/
   git commit -m "Add Node.js backend"
   git push origin main
   ```

2. **Go to Render**: https://render.com

3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

4. **Configure the Service**:
   - **Name**: `ats-optimizer-email-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend-node`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Environment Variables**:
   Add these in Render dashboard:
   ```
   EMAIL=surendrachavan367@gmail.com
   PASSWORD=jbwgfpnhwljsejso
   NODE_ENV=production
   ```

6. **Instance Type**: 
   - Free tier is fine for testing

7. **Click "Create Web Service"**

8. **Copy the URL** after deployment (e.g., `https://ats-optimizer-email-backend.onrender.com`)

---

### Step 2: Deploy Python Backend (ATS Analysis)

1. **Create New Web Service** in Render:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Service**:
   - **Name**: `ats-optimizer-analysis-backend`
   - **Region**: Same as Node.js backend
   - **Branch**: `main`
   - **Root Directory**: `backend-python`
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

3. **Environment Variables**:
   ```
   PORT=5000
   PYTHON_VERSION=3.9.0
   ```

4. **Instance Type**: 
   - Free tier (Note: Free tier spins down after inactivity)

5. **Click "Create Web Service"**

6. **Copy the URL** after deployment (e.g., `https://ats-optimizer-analysis-backend.onrender.com`)

---

### Step 3: Update Frontend Environment Variables

1. **Update `.env` file in frontend**:
   ```env
   VITE_BACKEND_EMAIL_URL=https://ats-optimizer-email-backend.onrender.com
   VITE_BACKEND_ANALYZE_URL=https://ats-optimizer-analysis-backend.onrender.com
   ```

2. **Update Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project
   - Settings → Environment Variables
   - Add/Update:
     - `VITE_BACKEND_EMAIL_URL` = Your Node.js backend URL
     - `VITE_BACKEND_ANALYZE_URL` = Your Python backend URL

3. **Redeploy Frontend**:
   - Go to Deployments tab
   - Redeploy the latest version
   - Or push a new commit to trigger redeployment

---

## 🔧 Testing

### Test Email Backend:
```bash
curl -X POST https://YOUR-NODEJS-BACKEND-URL/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

Expected response: `{"success": true}`

### Test ATS Backend:
```bash
curl -X POST https://YOUR-PYTHON-BACKEND-URL/analyze \
  -F "resume=@/path/to/resume.pdf" \
  -F "jd=@/path/to/jd.pdf"
```

Expected response: `{"score": 85.5}`

---

## ⚠️ Important Notes

### CORS Issues:
If you face CORS issues, update the backend CORS configuration:

**Node.js backend** (`server.js`):
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

**Python backend** (`app.py`):
```python
CORS(app, resources={r"/*": {"origins": "*"}})
```

### Render Free Tier Limitations:
- Services spin down after 15 minutes of inactivity
- First request takes 30-60 seconds to warm up
- Consider upgrading to paid tier for production use

### Environment Variables Security:
- NEVER commit `.env` files to Git
- Use Render's environment variable UI
- Keep your passwords secure

---

## 🐛 Troubleshooting

### Backend not starting?
1. Check build logs in Render dashboard
2. Verify `package.json` or `requirements.txt` is correct
3. Ensure Root Directory is set properly

### CORS errors?
1. Add your Vercel domain to CORS allowed origins
2. Check browser console for specific error messages

### API requests failing?
1. Verify environment variables are set correctly in Vercel
2. Check if backend services are running (not in sleep mode)
3. Review network tab in browser DevTools

---

## 📊 Post-Deployment Checklist

- [ ] Node.js backend deployed and URL copied
- [ ] Python backend deployed and URL copied
- [ ] Frontend `.env` updated with production URLs
- [ ] Vercel environment variables updated
- [ ] Frontend redeployed on Vercel
- [ ] Email functionality tested
- [ ] ATS analysis functionality tested
- [ ] CORS issues resolved (if any)
- [ ] Both backends responding properly

---

## 🎯 Quick Reference

**Node.js Backend URL**: Handles `/send` endpoint for email
**Python Backend URL**: Handles `/analyze` endpoint for ATS scoring
**Frontend**: Already deployed on Vercel

Good luck with your deployment! 🚀
