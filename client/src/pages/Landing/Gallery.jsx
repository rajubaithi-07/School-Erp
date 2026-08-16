function Gallery() {

  const images = [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
    "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600",
    "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600",
  ];

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-14">
          School Gallery
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <img
                src={image}
                alt="Gallery"
                className="w-full h-64 object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Gallery;