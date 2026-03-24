import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

export default function Hero() {
  const images = [hero1, hero2, hero3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">

      
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`absolute w-full h-full object-cover transition-all duration-1000 ${
            i === index
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        />
      ))}

      
      <div className="absolute w-full h-full bg-black/40"></div>

      
      <div className="relative z-10 max-w-3xl px-6 flex flex-col items-center">

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
          Land Your Dream Job
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
          Optimize your resume for modern ATS systems using AI-powered insights
        </p>

        <Link
          to="/analyzer"
          className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105"
        >
          Check Your Score Now 
        </Link>
      </div>

     
      <div className="absolute bottom-6 flex gap-2 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === index ? "bg-green-500 w-6" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>

    </section>
  );
}