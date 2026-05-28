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
    <div className="relative w-full h-full">
      <img
        src={photos[current]}
        alt="listing"
        className="object-cover w-full h-full rounded-t-3xl"
      />

      <button
        onClick={prevSlide}
        className="absolute p-2 -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/40"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute p-2 -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/40"
      >
        <ChevronRight />
      </button>

      <div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
        {photos.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
