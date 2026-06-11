import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ImageSlider({ photos }) {
  const [current, setCurrent] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">No Images</div>
    );
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={photos[current]}
        alt="listing"
        className="object-cover w-full h-full rounded-t-2xl sm:rounded-t-3xl"
      />

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/40 text-white"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/40 text-white"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className="absolute flex gap-1.5 sm:gap-2 -translate-x-1/2 bottom-3 sm:bottom-4 left-1/2">
        {photos.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
