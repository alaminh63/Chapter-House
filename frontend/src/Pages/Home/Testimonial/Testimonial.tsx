import { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import "./Testimonial.css";
import SectionTitle from "../../SharedPage/SectionTitle/SectionTitle";
const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    fetch("/testimonial.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  //   console.log("Testimonials: ", testimonials);
  //   console.log("Testimonials length: ", testimonials.length);

  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, [testimonials]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStart = (e: any) => {
    startX.current = e.clientX || e.touches[0].clientX;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMove = (e: any) => {
    if (startX.current === null) return;

    const x = e.clientX || e.touches[0].clientX;
    const deltaX = x - startX.current;

    if (deltaX > 50) {
      // Swipe right
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      startX.current = null;
    } else if (deltaX < -50) {
      // Swipe left
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      startX.current = null;
    }
  };

  const handleEnd = () => {
    startX.current = null;
  };
  return (
    <div>
      <SectionTitle subHeading={"Explore Fan's Review"} heading={"Review"} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-10">
          OUR SATISFIED CUSTOMERS FEEDBACK
        </h1>
      </div>

      <div
        className="testimonial-container  "
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div
          className="testimonial-wrapper"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-slide">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
