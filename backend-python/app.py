import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy


# 🔥 SAFE LOAD (prevents crash if model not found)
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")


# 🔥 CLEAN FUNCTION
def clean_function(text):
    text = text.lower()
    doc = nlp(text)
    tokens = [t for t in doc if not t.is_punct and not t.is_stop]
    tokens = [t.lemma_ for t in tokens]
    tokens = [str(t) for t in tokens]
    return " ".join(tokens)


# 🔥 PDF EXTRACT
def extract_text_pdf(pdf):
    reader = PdfReader(pdf)
    text = ""
    for page in reader.pages:
        content = page.extract_text()
        if content:
            text += content
    return text


# 🔥 APP INIT
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# 🔥 HOME ROUTE
@app.route("/")
def home():
    return "ATS Backend Running"


# 🔥 MAIN ANALYZE ROUTE
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        resume_pdf = request.files.get("resume")
        jd_pdf = request.files.get("jd")

        if not resume_pdf or not jd_pdf:
            return jsonify({"error": "Both files required"}), 400

        # Extract text
        resume_text = extract_text_pdf(resume_pdf)
        jd_text = extract_text_pdf(jd_pdf)

        if not resume_text.strip() or not jd_text.strip():
            return jsonify({"error": "Empty PDF content"}), 400

        # Clean text
        clean_resume = clean_function(resume_text)
        clean_jd = clean_function(jd_text)

        # TF-IDF similarity
        tv = TfidfVectorizer()
        vectors = tv.fit_transform([clean_resume, clean_jd])

        score = cosine_similarity(vectors[0], vectors[1])[0][0]
        score = round(score * 100, 2)

        # Keywords
        resume_words = set(clean_resume.split())
        jd_words = set(clean_jd.split())

        matched = list(resume_words & jd_words)[:10]
        missing = list(jd_words - resume_words)[:10]

        return jsonify({
            "score": score,
            "matched_keywords": matched,
            "missing_keywords": missing,
            "suggestions": [
                f"Add skills like: {', '.join(missing[:3])}" if missing else "Good match",
                "Improve keyword alignment",
                "Use more industry-specific terms"
            ]
        })

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


# 🔥 TEST ROUTE (optional)
@app.route("/test-upload", methods=["GET", "POST"])
def test_upload():
    if request.method == "POST":
        resume = request.files.get("resume")
        jd = request.files.get("jd")
        return f"Resume: {resume.filename}, JD: {jd.filename}"

    return '''
    <h2>Test File Upload</h2>
    <form method="POST" enctype="multipart/form-data">
        Resume: <input type="file" name="resume"><br><br>
        JD: <input type="file" name="jd"><br><br>
        <button type="submit">Upload</button>
    </form>
    '''


# 🔥 RUN
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)