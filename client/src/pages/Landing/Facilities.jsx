function Facilities() {

  const facilities = [

    "Smart Classrooms",

    "Computer Labs",

    "School Transport",

    "Sports Complex",

    "Science Laboratories"

  ];

  return (

    <section className="py-20 bg-slate-100">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16">

          School Facilities

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {facilities.map((item,index)=>(

            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition"
            >

              <h3 className="text-2xl font-semibold text-blue-700">

                {item}

              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}

export default Facilities;