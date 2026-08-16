import Button from "../../components/common/Button";

function HeroSection() {
  return (
    <section className="bg-slate-100 py-24">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>

          <h1 className="text-6xl font-bold text-blue-700 leading-tight">

            Modern School

            <br />

            Management System

          </h1>

          <p className="text-xl text-gray-600 mt-8">

            Complete ERP Solution for Schools

          </p>

          <div className="flex gap-5 mt-10">

            <Button>
              Get Started
            </Button>

            <Button className="bg-green-600 hover:bg-green-700">
              Watch Demo
            </Button>

          </div>

        </div>

        <div className="flex justify-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="School"
            className="w-96"
          />

        </div>

      </div>

    </section>
  );
}

export default HeroSection;