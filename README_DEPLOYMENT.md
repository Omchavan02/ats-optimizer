# 🚀 ATS Optimizer - Complete Deployment Instructions

## Overview

Your ATS Optimizer project consists of:
- **Frontend** (React + Vite) - Already deployed on Vercel ✅
- **Email Backend** (Node.js/Express) - To be deployed on Render
- **Analysis Backend** (Python/Flask) - To be deployed on Render

---

## 📋 Step-by-Step Deployment Guide

### STEP 1: Push Code to GitHub

First, commit and push all the organized backend files:

```bash
git add .
git commit -m "Organize backends for Render deployment"
git push origin main
```

---

### STEP 2: Deploy Node.js Backend (Email Service)

1. **Go to Render**: https://render.com
2. **Sign in** with your GitHub account
3. **Click "New +"** → Select "Web Service"
4. **Connect Repository**: Choose your ATS Optimizer repository
5. **Configure the service**:

   | Setting | Value |
   |---------|-------|
   | Name | `ats-email-backend` |
   | Region | Choose closest to you |
   | Branch | `main` |
   | Root Directory | `backend-node` |
   | Runtime | `Node` |
   | Build Command | `npm install` |
   | Start Command | `npm start` |

6. **Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   Key: EMAIL
   Value: surendrachavan367@gmail.com
   
   Key: PASSWORD
   Value: jbwgfpnhwljsejso
   
   Key: NODE_ENV
   Value: production
   ```

7. **Instance Type**: Keep it as "Free"

8. **Click "Create Web Service"**

9. **Wait for deployment** (2-3 minutes)

10. **Copy the URL** once deployed (e.g., `https://ats-email-backend-xyz.onrender.com`)

---

### STEP 3: Deploy Python Backend (ATS Analysis)

1. **Go back to Render Dashboard**
2. **Click "New +"** → "Web Service" again
3. **Select the same repository**
4. **Configure the service**:

   | Setting | Value |
   |---------|-------|
   | Name | `ats-analysis-backend` |
   | Region | Same as Node.js backend |
   | Branch | `main` |
   | Root Directory | `backend-python` |
   | Runtime | `Python` |
   | Build Command | `pip install -r requirements.txt` |
   | Start Command | `gunicorn app:app` |

5. **Environment Variables**:
   ```
   Key: PORT
   Value: 5000
   
   Key: PYTHON_VERSION
   Value: 3.9.0
   ```

6. **Instance Type**: Keep it as "Free"

7. **Click "Create Web Service"**

8. **Wait for deployment** (3-5 minutes - Spacy model takes time)

9. **Copy the URL** once deployed (e.g., `https://ats-analysis-backend-abc.onrender.com`)

---

### STEP 4: Update Frontend Configuration

#### Option A: Update via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Select your ATS Optimizer project**
3. **Go to "Settings"** tab
4. **Click "Environment Variables"** in the left sidebar
5. **Add or Update variables**:
   
   Click "New Variable" or edit existing ones:
   
   ```
   Variable 1:
   Name: VITE_BACKEND_EMAIL_URL
   Value: https://your-nodejs-backend-url.onrender.com
   
   Variable 2:
   Name: VITE_BACKEND_ANALYZE_URL
   Value: https://your-python-backend-url.onrender.com
   ```

6. **Click "Save"** for each variable
7. **Redeploy the frontend**:
   - Go to "Deployments" tab
   - Find the latest deployment
   - Click the three dots (•••) → "Redeploy"

#### Option B: Update .env File

If you prefer to update via code:

1. Open `frontend/.env` file
2. Update the URLs:
   ```env
   VITE_BACKEND_EMAIL_URL=https://your-nodejs-backend-url.onrender.com
   VITE_BACKEND_ANALYZE_URL=https://your-python-backend-url.onrender.com
   ```
3. Commit and push:
   ```bash
   git add frontend/.env
   git commit -m "Update backend URLs"
   git push origin main
   ```
4. Vercel will automatically redeploy

---

### STEP 5: Test Everything

#### Test Email Backend:

**Method 1: Using cURL (Terminal)**
```bash
curl -X POST https://YOUR-NODEJS-URL/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing email functionality"
  }'
```

**Method 2: Using your Frontend**
1. Go to your Vercel-deployed website
2. Scroll to the contact form
3. Fill in the form and submit
4. You should receive a success message

#### Test ATS Backend:

**Method 1: Browser Test**
```
Visit: https://YOUR-PYTHON-URL/test-upload
```
You should see a test upload page.

**Method 2: Using your Frontend**
1. Go to your Vercel website
2. Navigate to the ATS Analyzer page
3. Upload a resume PDF and job description PDF
4. Click "Check Score"
5. You should see an ATS score

---

## ⚠️ Important Notes

### Gmail App Password Security

The password you're using (`jbwgfpnhwljsejso`) appears to be an app password. Make sure:
- ✅ It's a 16-character app password (not your regular Gmail password)
- ✅ 2-Factor Authentication is enabled on your Google account
- ✅ Keep this password secure and never share it

### Render Free Tier Limitations

**Important to know:**
- Services go to sleep after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up (this is normal!)
- Subsequent requests are fast
- Consider upgrading to paid tier ($7/month) for production use

### CORS Configuration

If you encounter CORS errors, the backends need to allow your Vercel domain. The current CORS settings allow all origins (`*`), which works for development but you may want to restrict it:

**For Node.js backend** (`backend-node/server.js`):
```javascript
app.use(cors({
  origin: 'https://your-frontend.vercel.app'
}));
```

**For Python backend** (`backend-python/app.py`):
```python
CORS(app, resources={r"/*": {"origins": "https://your-frontend.vercel.app"}})
```

---

## 🐛 Troubleshooting

### Problem: Backend deployment fails
**Solution:**
1. Check the build logs in Render dashboard
2. Verify the Root Directory is correct
3. Ensure package.json/requirements.txt has all dependencies

### Problem: "Cannot connect to backend" error
**Solution:**
1. Verify the backend URLs in Vercel environment variables are correct
2. Check if backend services are running (visit the URLs directly)
3. Remember: Free tier services may be in sleep mode

### Problem: Email not sending
**Solution:**
1. Verify EMAIL and PASSWORD environment variables in Render
2. Check if it's a valid Gmail app password
3. Look at Render logs for error messages

### Problem: ATS analysis returns error
**Solution:**
1. Ensure PDFs are text-based (not scanned images)
2. Check Python backend logs in Render
3. Verify both files are being uploaded correctly

### Problem: Slow responses
**Solution:**
- This is normal for free tier (service waking up)
- Wait for the first request to complete (~30-60 seconds)
- Subsequent requests will be faster

---

## 📊 Final Checklist

Before considering deployment complete, verify:

- [ ] Node.js backend is deployed and accessible
- [ ] Python backend is deployed and accessible
- [ ] Vercel environment variables are updated
- [ ] Frontend is redeployed with new URLs
- [ ] Contact form successfully sends emails
- [ ] ATS analyzer successfully analyzes PDFs
- [ ] No errors in browser console
- [ ] Both backends respond to direct requests

---

## 🎉 Success!

Once everything is working, your ATS Optimizer will be:

✅ **Frontend**: Hosted on Vercel (fast, global CDN)  
✅ **Email Backend**: Running on Render (Node.js)  
✅ **Analysis Backend**: Running on Render (Python/Flask)  

**Total Cost**: $0/month (using free tiers)

---

## 📞 Support

If you encounter any issues during deployment:

1. Check Render logs: Dashboard → Your Service → Logs
2. Check Vercel function logs: Dashboard → Project → Functions
3. Review browser console for frontend errors (F12)
4. Test backend endpoints directly using cURL or Postman

---

## 🔗 Useful Links

- Render Dashboard: https://render.com/dashboard
- Vercel Dashboard: https://vercel.com/dashboard
- Render Documentation: https://render.com/docs
- Vercel Documentation: https://vercel.com/docs

**Good luck with your deployment! 🚀**
