import { useEffect, useRef, useState } from "react";
import { TBannerImage } from "../../../utils/Types/BannerImageType";

const Banner = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch("/sliderimages.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setImages(data);
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, [images.length, currentIndex]); // Reset interval when currentIndex changes

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
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      startX.current = null;
    } else if (deltaX < -50) {
      // Swipe left
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      startX.current = null;
    }
  };

  const handleEnd = () => {
    startX.current = null;
  };

  return (
    <div
      className="relative w-full h-[200px] md:h-[500px] overflow-hidden "
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      {images.map((image: TBannerImage, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "0",
            left: `${index * 100}%`,
            width: "100%",
            height: "100%",
            transition: "transform 0.5s ease",
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          className="flex items-center justify-center"
        >
          <img
            src={image.image}
            alt={`Image ${index}`}
            className={`w-full h-full   rounded-xl`}
          />
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 rounded-xl">
        {images.map((_, index) => (
          <p
            key={index}
            className={`w-[10px] h-[10px] bg-white rounded-full transition-width duration-500 ease-in-out ${
              currentIndex === index ? "w-[35px]" : "w-[10px]"
            } `}
          ></p>
        ))}
      </div>
    </div>
  );
};

export default Banner;
