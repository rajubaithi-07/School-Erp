function Achievements() {
  const achievements = [
    { title: "100%", subtitle: "Board Exam Results" },
    { title: "25+", subtitle: "Years of Excellence" },
    { title: "50+", subtitle: "Awards Won" },
    { title: "1500+", subtitle: "Happy Students" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Our Achievements
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-blue-600 text-white rounded-xl p-8 text-center shadow-lg"
            >
              <h1 className="text-5xl font-bold">
                {item.title}
              </h1>

              <p className="mt-4">
                {item.subtitle}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Achievements;