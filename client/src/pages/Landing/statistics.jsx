function Statistics() {
  const stats = [
    {
      title: "Students",
      value: "1500+",
    },
    {
      title: "Teachers",
      value: "120+",
    },
    {
      title: "Courses",
      value: "50+",
    },
    {
      title: "Success Rate",
      value: "100%",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-blue-600 text-white rounded-xl p-8 text-center shadow-lg"
          >
            <h2 className="text-4xl font-bold">
              {item.value}
            </h2>

            <p className="mt-3 text-lg">
              {item.title}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Statistics;