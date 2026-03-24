import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Software Engineer",
    text: "This tool was a game-changer. After optimizing my resume, I started getting callbacks within a week!",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    text: "The AI suggestions were incredibly accurate. It helped me bridge the gap recruiters were looking for.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    text: "Super clean UI and powerful insights. My ATS score improved massively!",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0B0F19] text-white">

      <div className="max-w-7xl mx-auto px-6">

        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-gray-400">
            Join thousands of professionals who improved their careers with us
          </p>
        </div>

        
        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >

              
              <div className="flex gap-1 text-green-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>

              
              <div className="flex items-center gap-4">

                <img
                  src={t.img}
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />

                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-gray-400 text-sm">{t.role}</p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}