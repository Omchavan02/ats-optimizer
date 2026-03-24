import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function Footer() {
  const navigate = useNavigate();
  const form = useRef();

  
  const handleScroll = (id) => {
    navigate("/");

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert("Message sent successfully!!!!");
        form.current.reset();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send message!!!!");
      });
  };

  return (
    <footer className="bg-[#0B0F19] text-white py-20">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            ATS Optimizer AI
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Smart AI tools to help you crack ATS and land your dream job.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-4 text-xl">

            <a
              href="https://linkedin.com/in/omchavan02"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/Omchavan02"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaGithub />
            </a>

          </div>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="font-semibold mb-4">Navigation</h3>

          <ul className="space-y-2 text-gray-400 text-sm">

            <li onClick={() => handleScroll("home")} className="cursor-pointer hover:text-white">
              Home
            </li>

            <li onClick={() => handleScroll("features")} className="cursor-pointer hover:text-white">
              Features
            </li>

            <li onClick={() => handleScroll("about")} className="cursor-pointer hover:text-white">
              About
            </li>

            <li onClick={() => handleScroll("resources")} className="cursor-pointer hover:text-white">
              Resources
            </li>

          </ul>
        </div>

        {/* PRODUCT */}
        <div>
          <h3 className="font-semibold mb-4">Product</h3>

          <ul className="space-y-2 text-gray-400 text-sm">

            <li onClick={() => navigate("/analyzer")} className="cursor-pointer hover:text-white">
              ATS Checker
            </li>

            <li className="hover:text-white cursor-pointer">
              Resume Builder
            </li>

            <li className="hover:text-white cursor-pointer">
              AI Interview Prep
            </li>

          </ul>
        </div>

        {/* CONTACT FORM */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>

          <form ref={form} onSubmit={sendEmail} className="space-y-3">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-2 rounded bg-white/10 text-sm outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-2 rounded bg-white/10 text-sm outline-none"
            />

            <textarea
              name="message"
              placeholder="Message"
              required
              className="w-full p-2 rounded bg-white/10 text-sm outline-none"
            />

            <button
              type="submit"
              className="w-full bg-green-500 py-2 rounded hover:bg-green-600 transition text-sm font-semibold"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-gray-500 text-sm mt-16 border-t border-white/10 pt-6">
        © {new Date().getFullYear()} ATS Optimizer AI
      </div>

    </footer>
  );
}