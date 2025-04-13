import { useEffect, useState, useCallback } from "react";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import SectionTitle from "../../SharedPage/SectionTitle/SectionTitle";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/testimonial.json");
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  // Swipe navigation
  const handleSwipe = useCallback(
    (direction: "prev" | "next") => {
      setCurrentIndex((prev) =>
        direction === "next"
          ? (prev + 1) % testimonials.length
          : prev === 0
            ? testimonials.length - 1
            : prev - 1
      );
    },
    [testimonials.length]
  );

  return (
    <section className=" py-16">
      <div className="container mx-auto px-4 text-center">

        <SectionTitle
          subHeading={"Explore feedback from our  clients"}
          heading={" What Our Customers Say"}
        />
        {testimonials.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => handleSwipe("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-700 p-3 text-white transition-colors hover:bg-slate-600"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              onClick={() => handleSwipe("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-700 p-3 text-white transition-colors hover:bg-slate-600"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        ) : (
          <p className="text-zinc-500">Loading testimonials...</p>
        )}
      </div>
    </section>
  );
};

export default Testimonial;