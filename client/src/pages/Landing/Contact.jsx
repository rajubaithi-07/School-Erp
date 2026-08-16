import Button from "../../components/common/Button";

function Contact() {
  return (
    <section className="py-20 bg-slate-100">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Contact Us
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-10">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-4 rounded-lg mb-5"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-4 rounded-lg mb-5"
          />

          <textarea
            rows="5"
            placeholder="Message"
            className="w-full border p-4 rounded-lg mb-5"
          />

          <Button className="w-full">
            Send Message
          </Button>

        </div>

      </div>

    </section>
  );
}

export default Contact;