import Banner1 from "../../../assets/Banner/Banner_1.jpg";
import Banner2 from "../../../assets/Banner/Banner_2.jpg";
import Banner3 from "../../../assets/Banner/Banner_3.jpg";
import Banner4 from "../../../assets/Banner/Banner_4.jpg";
const NewBanner = () => {
  return (
    <div className="carousel w-full h-[450px]">
      {/* Slide 1 - Welcome */}
      <div id="slide1" className="carousel-item relative w-full">
        <img src={Banner1} className="w-full rounded-xl" />
        <div className="bg-gradient-to-r rounded-xl from-[#4b85bc] to-[rgba(21,21,21,0)] absolute h-full flex transform items-center left-0 top-0">
          <div className="text-white space-y-5 w-full md:w-1/2 pl-12">
            <h2 className="text-base md:text-4xl font-bold">
              📚 Welcome to Book Haven - Your Ultimate Reading Destination!
            </h2>
            <p className="text-sm md:text-lg">
              Explore thousands of books, from bestsellers to rare finds. Join a
              community of passionate readers today!
            </p>
            <div>
              <button className="btn btn-primary mr-3">
                Browse Collection
              </button>
              <button className="btn btn-outline btn-secondary">
                Join Now
              </button>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
          <a href="#slide4" className="btn btn-circle mr-3">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 2 - Discount Offer */}
      <div id="slide2" className="carousel-item relative w-full">
        <img src={Banner2} className="w-full rounded-xl" />
        <div className="bg-gradient-to-r rounded-xl from-[#6bc268] to-[rgba(21,21,21,0)] absolute h-full flex transform items-center left-0 top-0">
          <div className="text-white space-y-5 w-full md:w-1/2 pl-12">
            <h2 className="text-base md:text-4xl font-bold">
              📖 Special Offer: 30% Off on Bestsellers!
            </h2>
            <p className="text-sm md:text-lg">
              Get your hands on the most popular books at unbeatable prices.
              Limited-time offer!
            </p>
            <div>
              <button className="btn btn-primary mr-3">Shop Bestsellers</button>
              <button className="btn btn-outline btn-secondary">
                View Deals
              </button>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
          <a href="#slide1" className="btn btn-circle mr-3">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 3 - Membership Perks */}
      <div id="slide3" className="carousel-item relative w-full">
        <img src={Banner3} className="w-full rounded-xl" />
        <div className="bg-gradient-to-r rounded-xl from-[#57b6d9] to-[rgba(21,21,21,0)] absolute h-full flex transform items-center left-0 top-0">
          <div className="text-white space-y-5 w-full md:w-1/2 pl-12">
            <h2 className="text-base md:text-4xl font-bold">
              🚀 Exclusive Membership Perks
            </h2>
            <p className="text-sm md:text-lg">
              Join our premium membership to enjoy free shipping, early access
              to new releases, and exclusive discounts.
            </p>
            <div>
              <button className="btn btn-primary mr-3">Become a Member</button>
              <button className="btn btn-outline btn-secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
          <a href="#slide2" className="btn btn-circle mr-3">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 4 - Buy 2 Get 1 Free */}
      <div id="slide4" className="carousel-item relative w-full">
        <img src={Banner4} className="w-full rounded-xl" />
        <div className="bg-gradient-to-r rounded-xl from-[#a357ad] to-[rgba(21,21,21,0)] absolute h-full flex transform items-center left-0 top-0">
          <div className="text-white space-y-5 w-full md:w-1/2 pl-12">
            <h2 className="text-base md:text-4xl font-bold">
              🎁 Buy 2, Get 1 Free - Limited Time!
            </h2>
            <p className="text-sm md:text-lg">
              Fill your bookshelf with our special "Buy 2, Get 1 Free" offer.
              Don't miss out on this fantastic deal!
            </p>
            <div>
              <button className="btn btn-primary mr-3">Start Shopping</button>
              <button className="btn btn-outline btn-secondary">
                Browse Offers
              </button>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
          <a href="#slide3" className="btn btn-circle mr-3">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewBanner;
