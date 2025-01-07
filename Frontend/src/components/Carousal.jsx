import React, { useState } from "react";
import first from "../assets/aboutus/first.jpg";
import second from "../assets/aboutus/second.jpg";
import third from "../assets/aboutus/third.jpg";
import fourth from "../assets/aboutus/fourth.jpg";
import fifth from "../assets/aboutus/fifth.jpg";
import sixth from "../assets/aboutus/sixth.jpg";

const Carousel = () => {
  const images = [first, second, third, fifth, fourth, sixth];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img 
              src={image} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-gray-800 text-white p-1 sm:p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-gray-800 text-white p-1 sm:p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
      >
        &#8594;
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

