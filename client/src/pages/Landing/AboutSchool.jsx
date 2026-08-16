function AboutSchool() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        <div>

          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900"
            alt="School"
            className="rounded-2xl shadow-xl"
          />

        </div>

        <div>

          <h2 className="text-5xl font-bold text-blue-700">

            About Our School

          </h2>

          <p className="mt-8 text-gray-600 leading-8 text-lg">

            Our School Management System helps educational institutions
            manage students, teachers, attendance, fees, examinations,
            homework, report cards and communication efficiently.

          </p>

          <p className="mt-6 text-gray-600 leading-8">

            Built with modern technology, it offers a complete digital
            ecosystem for schools.

          </p>

        </div>

      </div>

    </section>
  );
}

export default AboutSchool;