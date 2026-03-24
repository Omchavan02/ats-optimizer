import {
  FaSearch,
  FaBolt,
  FaChartBar,
  FaShieldAlt,
  FaGlobe,
  FaBrain,
} from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaSearch />,
      title: "Keyword Optimization",
      desc: "Identify missing industry-specific keywords.",
      color: "blue",
    },
    {
      icon: <FaBolt />,
      title: "Instant Analysis",
      desc: "Get ATS score instantly.",
      color: "yellow",
    },
    {
      icon: <FaChartBar />,
      title: "Visual Scoreboard",
      desc: "Track your progress visually.",
      color: "green",
    },
    {
      icon: <FaShieldAlt />,
      title: "Privacy First",
      desc: "Your data is secure and protected.",
      color: "purple",
    },
    {
      icon: <FaGlobe />,
      title: "Global Standards",
      desc: "Built using international ATS benchmarks.",
      color: "indigo",
    },
    {
      icon: <FaBrain />,
      title: "AI Insights",
      desc: "Smart suggestions to improve your resume.",
      color: "red",
    },
  ];

  const colorMap = {
    blue: "bg-blue-100 text-blue-500",
    yellow: "bg-yellow-100 text-yellow-500",
    green: "bg-green-100 text-green-500",
    purple: "bg-purple-100 text-purple-500",
    indigo: "bg-indigo-100 text-indigo-500",
    red: "bg-red-100 text-red-500",
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* HEADING */}
        <h2 className="text-4xl font-bold mb-4">
          Powerful Features
        </h2>

        <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
          Our comprehensive suite of tools ensures your resume is perfectly tailored for success.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">

          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 relative overflow-hidden"
            >

              {/* GLOW EFFECT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-green-100/20 to-transparent"></div>

              {/* ICON */}
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl mb-6 mx-auto text-xl transition-transform duration-300 group-hover:scale-110 ${colorMap[f.color]}`}
              >
                {f.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold mb-2">
                {f.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {f.desc}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}