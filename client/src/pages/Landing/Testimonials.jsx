function Testimonials() {
  return (
    <section className="py-20 bg-slate-100">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          What Parents Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8">
            <p>
              Excellent school management system with amazing support.
            </p>

            <h3 className="mt-6 font-bold text-blue-700">
              Ravi Kumar
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <p>
              Attendance and fee tracking became extremely easy.
            </p>

            <h3 className="mt-6 font-bold text-blue-700">
              Priya Sharma
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <p>
              Teachers and parents communicate efficiently now.
            </p>

            <h3 className="mt-6 font-bold text-blue-700">
              Anil Reddy
            </h3>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Testimonials;