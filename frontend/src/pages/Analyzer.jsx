import { useState } from "react";

export default function Analyzer() {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (type === "resume") setResume(file);
    else setJd(file);
  };

  const handleSubmit = async () => {
    if (!resume || !jd) {
      alert("Upload both files");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    setResult(null);
    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_ANALYZE_URL;
      console.log("Calling backend:", backendUrl);

      const res = await fetch(`${backendUrl}/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Analysis error:", err);
      alert(`Error: ${err.message}. Check backend connection.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#020617] text-white">
      <div className="w-full max-w-xl p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-6">
          ATS Score Analyzer
        </h1>

        <div className="space-y-5">

          
          <label className="block cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => setResume(e.target.files[0])}
            />
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "resume")}
              className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-green-400 transition"
            >
              <p className="text-gray-400 text-sm">
                {resume
                  ? "📄 " + resume.name
                  : "Drag & Drop OR Click to Upload Resume"}
              </p>
            </div>
          </label>

          
          <label className="block cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => setJd(e.target.files[0])}
            />
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "jd")}
              className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-green-400 transition"
            >
              <p className="text-gray-400 text-sm">
                {jd
                  ? "📄 " + jd.name
                  : "Drag & Drop OR Click to Upload Job Description"}
              </p>
            </div>
          </label>

        </div>

        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/30 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Check Score"}
        </button>

        
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        
        {result && !loading && (
  <div className="mt-8 text-center">

    <h2 className="text-6xl font-bold text-green-400 tracking-wide">
      {result.score ?? 0}%
    </h2>

    <p className="text-gray-400 mt-2 text-sm">
      ATS Compatibility Score
    </p>

  </div>
)}

      </div>
    </div>
  );
}