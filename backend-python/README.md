# Python Backend - ATS Analysis Service

This backend handles ATS score analysis for resumes and job descriptions.

## 🚀 Deploy to Render

### Option 1: Using Render Dashboard (Recommended)

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ats-analysis-backend`
   - **Root Directory**: `backend-python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

5. Add Environment Variables:
   ```
   PORT=5000
   PYTHON_VERSION=3.9.0
   ```

6. Click "Create Web Service"

### Option 2: Render CLI

```bash
render deploy --name ats-analysis-backend --root-dir backend-python
```

## 📦 Local Development

```bash
# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

Server runs on `http://localhost:5000`

## 🔌 API Endpoints

### POST /analyze
Analyzes resume against job description and returns ATS score.

**Request:**
- Content-Type: `multipart/form-data`
- Files:
  - `resume`: PDF file
  - `jd`: PDF file

**Response:**
```json
{
  "score": 85.5
}
```

### GET /test-upload
Test endpoint for file uploads.

### POST /test-upload
Test file upload functionality.

## ⚙️ Environment Variables

- `PORT`: Server port (default: 5000)
- `PYTHON_VERSION`: Python version for Render

## 📦 Dependencies

- `flask`: Web framework
- `flask-cors`: CORS support
- `PyPDF2`: PDF text extraction
- `spacy`: NLP processing
- `scikit-learn`: TF-IDF vectorization
- `gunicorn`: Production WSGI server

## 📝 Files

- `app.py` - Main Flask application
- `requirements.txt` - Python dependencies
- `Procfile` - Process configuration for Render
- `.gitignore` - Git ignore rules

## ⚠️ Important Notes

### Spacy Model
The app uses `en_core_web_sm` model. It's installed automatically during deployment via requirements.txt.

### PDF Processing
Make sure uploaded PDFs are text-based (not scanned images) for accurate text extraction.

### Free Tier Limitations
- Render free tier services spin down after 15 minutes of inactivity
- First request takes 30-60 seconds to warm up
- Consider upgrading for production use
