 
import { FaSearch, FaHeart, FaShoppingCart, FaBookOpen, FaStar } from 'react-icons/fa';  // Import icons
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewBanner = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
  };


  const slides = [
    {
      title: "Unleash Your Imagination: Dive into a World of Stories",
      description: "Explore curated collections, new releases, and timeless classics. Find your next adventure today.",
      buttonText: "Discover Books",
      image: "https://images.unsplash.com/photo-1507842214779-42e913a54479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",  //Replace with your actual image URL
      bgColor: '#f0f4f8',
      textColor: '#333'
    },
    {
      title: "Elevate Your Knowledge: Non-Fiction for the Curious Mind",
      description: "Expand your horizons with thought-provoking essays, biographies, and historical accounts.",
      buttonText: "Explore Non-Fiction",
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",  //Replace with your actual image URL
      bgColor: '#e8f5e9',
      textColor: '#333'
    },
    {
      title: "Curated Collections: Find Books Handpicked by Our Experts",
      description: "Let our team guide you through the best books on the market, from hidden gems to modern masterpieces.",
      buttonText: "View Collections",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",  //Replace with your actual image URL
      bgColor: '#ede7f6',
      textColor: '#333'
    }
  ];


  return (
    <div className="container mx-auto py-8">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[500px] rounded-lg overflow-hidden shadow-md" style={{ backgroundColor: slide.bgColor }}>
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover opacity-60"  // Reduced opacity
            />
            <div className="relative z-10 p-8 flex flex-col justify-center h-full text-center md:text-left">  {/* Added text-center for mobile */}
              <h2 className="text-2xl md:text-4xl font-semibold mb-4" style={{ color: slide.textColor }}>{slide.title}</h2>
              <p className="text-gray-700 md:text-lg mb-6" style={{ color: slide.textColor }}>{slide.description}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{slide.buttonText}</button>
            </div>
          </div>
        ))}
      </Slider>

      {/* Featured Categories (Optional - Add if you want to include categories below the banner) */}
      {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <FaBookOpen className="text-4xl text-blue-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Fiction</h3>
          <p className="text-gray-600">Explore thrilling adventures.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <FaBookOpen className="text-4xl text-green-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Non-Fiction</h3>
          <p className="text-gray-600">Expand your knowledge.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <FaBookOpen className="text-4xl text-purple-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Biographies</h3>
          <p className="text-gray-600">Discover inspiring stories.</p>
        </div>
      </div> */}
    </div>
  );
};

export default NewBanner;