import { useState } from "react";
import { FaFileAlt, FaVideo, FaBook, FaLightbulb } from "react-icons/fa";

export default function Resources() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section id="resources" className="py-28 bg-[#F8FAFC]">

      <div className="max-w-7xl mx-auto px-6">

        
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4">
            Career Resources
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to{" "}
            <span className="text-green-500 font-semibold">
              accelerate your career 
            </span>
          </p>
        </div>

        
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">

         
          <div className="flex flex-col gap-6">

            <div className="p-6 bg-white rounded-2xl border hover:shadow-lg transition">
              <p className="text-xs text-gray-400 mb-2">FREE</p>
              <FaFileAlt className="text-xl mb-3 text-gray-700" />
              <h3 className="font-bold text-lg">Resume Templates</h3>
              <p className="text-gray-600 text-sm">
                ATS-friendly templates that actually get shortlisted.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border hover:shadow-lg transition">
              <p className="text-xs text-gray-400 mb-2">GUIDES</p>
              <FaBook className="text-xl mb-3 text-gray-700" />
              <h3 className="font-bold text-lg">Career Blog</h3>
              <p className="text-gray-600 text-sm">
                Latest hiring trends, AI insights & career hacks.
              </p>
            </div>

          </div>

          
          <div className="relative">

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl h-full flex flex-col justify-between">

              {!playVideo ? (
                <>
                  <div>
                    <p className="text-xs opacity-80 mb-2">
                      VIDEO COURSE
                    </p>

                    <FaVideo className="text-3xl mb-4" />

                    <h3 className="text-2xl font-bold mb-3">
                      Interview Prep
                    </h3>

                    <p className="text-sm text-white/90">
                      Crack interviews with real-world questions,
                      structured answers, and AI guidance.
                    </p>
                  </div>

                  <button
                    onClick={() => setPlayVideo(true)}
                    className="mt-6 bg-white text-green-600 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
                  >
                    ▶ Explore
                  </button>
                </>
              ) : (
                <div className="w-full h-full">
                  <iframe
                    className="w-full h-64 md:h-full rounded-xl"
                    src="https://www.youtube.com/embed/NkWOzTEEcco"
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

            </div>

          </div>

          
          <div className="flex flex-col gap-6">

            <div className="p-6 bg-white rounded-2xl border hover:shadow-lg transition">
              <p className="text-xs text-gray-400 mb-2">AI TOOL</p>
              <FaLightbulb className="text-xl mb-3 text-gray-700" />
              <h3 className="font-bold text-lg">Skill Mapping</h3>
              <p className="text-gray-600 text-sm">
                Know exactly what skills you need to grow.
              </p>
            </div>

            
            <div className="p-6 rounded-2xl bg-green-50 border border-green-100 hover:shadow-lg transition">

  <p className="text-xs text-green-600 mb-2 font-semibold">BONUS</p>

  <h3 className="font-bold text-lg mb-2 text-gray-800">
    AI Resume Analyzer
  </h3>

  <p className="text-gray-600 text-sm mb-4">
    Get instant ATS score with smart suggestions.
  </p>

  <button className="text-green-600 text-sm font-semibold hover:underline">
    Try Now →
  </button>

</div>

          </div>

        </div>

      </div>
    </section>
  );
}