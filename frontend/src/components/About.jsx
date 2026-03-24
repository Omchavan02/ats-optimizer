import aboutImg from "../assets/hero5.png"; 
import { FaBullseye, FaBolt } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        
        <div>

  
  <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
    We're changing the way{" "}
    <span className="text-green-500 relative">
      people find jobs
      <span className="absolute left-0 bottom-0 w-full h-1 bg-green-200 rounded-full"></span>
    </span>
  </h2>

  
  <p className="text-gray-600 text-lg leading-relaxed mb-6">
    Most job applications today feel like a{" "}
    <span className="font-semibold text-gray-800">black box</span>.
    You apply, wait… and never know what went wrong.
  </p>

  
  <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8">
    <p className="text-gray-700 text-sm leading-relaxed">
       <span className="font-semibold">ATS Optimizer AI</span> gives you clarity.
      It analyzes your resume like recruiters do and shows exactly what to fix
      so you can{" "}
      <span className="text-green-600 font-semibold">
        land interviews faster.
      </span>
    </p>
  </div>

  
  <div className="space-y-4">

    <div className="flex items-start gap-4 p-4 bg-white border rounded-xl hover:shadow-lg transition-all duration-300">

      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-500">
        <FaBullseye />
      </div>

      <div>
        <h4 className="font-semibold text-gray-800">Our Mission</h4>
        <p className="text-gray-500 text-sm">
          Empower every job seeker with tools used by top recruiters.
        </p>
      </div>

    </div>

    <div className="flex items-start gap-4 p-4 bg-white border rounded-xl hover:shadow-lg transition-all duration-300">

      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
        <FaBolt />
      </div>

      <div>
        <h4 className="font-semibold text-gray-800">Our Technology</h4>
        <p className="text-gray-500 text-sm">
          AI + NLP powered deep resume analysis with real-time feedback.
        </p>
      </div>

    </div>

  </div>
</div>

        
        <div className="relative">

          <img
            src={aboutImg}
            className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
          />

          
          <div className="absolute -z-10 top-10 left-10 w-full h-full bg-green-100 rounded-2xl"></div>

        </div>

      </div>
    </section>
  );
}