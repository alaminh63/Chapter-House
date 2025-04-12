import { useEffect, useState } from "react";
import Banner1 from "../../../assets/Banner/Banner_1.jpg";
import Banner2 from "../../../assets/Banner/Banner_2.jpg";
import Banner3 from "../../../assets/Banner/Banner_3.jpg";
import Banner4 from "../../../assets/Banner/Banner_4.jpg";

const slides = [
  {
    id: "slide1",
    image: Banner1,
    title: "📚 Welcome to Book Haven",
    subtitle: "Your Ultimate Reading Destination!",
    description:
      "Explore thousands of books, from bestsellers to rare finds. Join a community of passionate readers today!",
    primaryBtn: "Browse Collection",
    secondaryBtn: "Join Now",
    gradient: "from-[#3b82f6] to-[rgba(0,0,0,0.7)]",
  },
  {
    id: "slide2",
    image: Banner2,
    title: "📖 30% Off Bestsellers!",
    subtitle: "Special Offer",
    description:
      "Get your hands on the most popular books at unbeatable prices. Limited-time offer!",
    primaryBtn: "Shop Bestsellers",
    secondaryBtn: "View Deals",
    gradient: "from-[#22c55e] to-[rgba(0,0,0,0.7)]",
  },
  {
    id: "slide3",
    image: Banner3,
    title: "🚀 Exclusive Membership",
    subtitle: "Unlock Premium Perks",
    description:
      "Join our premium membership for free shipping, early access to new releases, and exclusive discounts.",
    primaryBtn: "Become a Member",
    secondaryBtn: "Learn More",
    gradient: "from-[#06b6d4] to-[rgba(0,0,0,0.7)]",
  },
  {
    id: "slide4",
    image: Banner4,
    title: "🎁 Buy 2, Get 1 Free",
    subtitle: "Limited Time Deal!",
    description:
      "Fill your bookshelf with our special 'Buy 2, Get 1 Free' offer. Don't miss out!",
    primaryBtn: "Start Shopping",
    secondaryBtn: "Browse Offers",
    gradient: "from-[#8b5cf6] to-[rgba(0,0,0,0.7)]",
  },
];

const NewBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          style={{
            top: 0,
            left: 0,
          }}
          role="tabpanel"
          aria-label={`Slide ${index + 1}`}
        >
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt={slide.title}
          />
          <div
            className={`bg-gradient-to-r ${slide.gradient} absolute inset-0 flex items-center`}
          >
            <div className="text-white space-y-6 w-full md:w-1/2 px-6 md:px-16 animate-slide-up">
              <h3 className="text-lg md:text-2xl font-semibold">
                {slide.subtitle}
              </h3>
              <h2 className="text-2xl md:text-5xl font-bold leading-tight">
                {slide.title}
              </h2>
              <p className="text-sm md:text-lg">{slide.description}</p>
              <div className="flex gap-4">
                <button className="btn btn-primary px-6 py-3 text-base font-medium transition-transform hover:scale-105">
                  {slide.primaryBtn}
                </button>
                <button className="btn btn-outline btn-secondary px-6 py-3 text-base font-medium transition-transform hover:scale-105">
                  {slide.secondaryBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Navigation Buttons */}
      <div className="absolute flex justify-between w-full px-4 md:px-8 bottom-6 left-0">
        <button
          onClick={handlePrev}
          className="btn btn-circle bg-white/80 text-gray-800 hover:bg-white transition-all"
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="btn btn-circle bg-white/80 text-gray-800 hover:bg-white transition-all"
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.7s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NewBanner;