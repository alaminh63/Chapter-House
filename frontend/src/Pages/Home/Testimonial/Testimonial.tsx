import { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import SectionTitle from "../../SharedPage/SectionTitle/SectionTitle";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    fetch("/testimonial.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

    // Touch/Mouse event handlers
    const handleStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
      startX.current = e.clientX || e.touches?.[0].clientX || null;
    };

    const handleMove = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
      if (startX.current === null) return;

      const x = e.clientX || e.touches?.[0].clientX || 0;
      const deltaX = x - startX.current;

      if (Math.abs(deltaX) > 50) { // Increased threshold
        setCurrentIndex(prevIndex =>
            deltaX > 0
                ? (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1)
                : (prevIndex + 1) % testimonials.length
        );
        startX.current = null;
      }
    };

    const handleEnd = () => {
      startX.current = null;
    };

    // Dot Indicator Click Handler
    const handleDotClick = (index: number) => {
      setCurrentIndex(index);
    };

  return (
    <section className="bg-white py-16">
      {/* Hero Banner */}
      <div className="text-center mb-12">
        <SectionTitle subHeading={"Hear From Our Users"} heading={"Testimonials"} />
        <p className="mt-4 text-gray-300 text-xl max-w-3xl mx-auto">
          Real stories from people who have experienced the benefits of our
          services.  Discover why they love what we do.
        </p>
      </div>

      {/* Testimonial Slider */}
      <div
        className="relative overflow-hidden mx-auto max-w-5xl"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-4 md:px-6 lg:px-8"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Slider Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? "bg-purple-400"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
                onClick={() => handleDotClick(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;