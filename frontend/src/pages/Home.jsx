


import Hero from "../components/Hero";
import Features from "../components/Features";
import Analyzer from "./Analyzer";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Resources from "../components/Resources";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>

      <section id="home">
        <Hero />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="analyzer">
        <Analyzer />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="resources">
        <Resources />
      </section>

      <Footer />

    </div>
  );
}