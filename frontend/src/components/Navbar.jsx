import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {

    
    if (id === "analyzer") {
      navigate("/analyzer");
      return;
    }

    
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        section?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  
  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src={logo}
            alt="ATS Optimizer"
            className="w-20 h-20 object-contain transition duration-300 group-hover:scale-110"
          />

          <span className="text-xl font-semibold text-gray-800 group-hover:text-green-500 transition">
            ATS Optimizer AI
          </span>
        </div>

       
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">

          {[
            { name: "Home", id: "home" },
            { name: "ATS Checker", id: "analyzer" },
            { name: "Features", id: "features" },
            { name: "About Us", id: "about" },
            { name: "Resources", id: "resources" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => handleScroll(item.id)}
              className="relative group"
            >
              <span className="group-hover:text-green-500 transition">
                {item.name}
              </span>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}

        </div>

        
        <Link
          to="/analyzer"
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
        >
          Get Started
        </Link>

      </div>
    </nav>
  );
}