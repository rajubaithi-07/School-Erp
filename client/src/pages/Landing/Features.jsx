function Features() {
  const features = [
    "Student Management",
    "Teacher Management",
    "Attendance Tracking",
    "Online Exams",
    "Fee Management",
  ];

  return (
    <section className="bg-slate-100 py-20">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          Our Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-semibold text-blue-700">
                {feature}
              </h3>

              <p className="mt-4 text-gray-600">
                Complete solution for {feature.toLowerCase()}.
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;