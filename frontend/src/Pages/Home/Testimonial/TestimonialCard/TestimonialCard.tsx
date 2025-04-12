import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { TReview } from "../../../../utils/Types/GlobalType";

interface IProps {
  testimonial: TReview;
}
const TestimonialCard = ({ testimonial }: IProps) => {
  const { image, desc, rating, name, position } = testimonial;

  return (
    <div className="flex flex-col md:flex-row w-full md:w-[80%] mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
      {/* Left Div */}
      <div className="w-full md:w-[20%] flex justify-center md:justify-between">
        <div className="flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-[150px] h-[150px] rounded-full object-cover shadow-lg"
          />
        </div>
        <div className="h-full relative hidden md:flex items-center">
          <div className="absolute w-[25px] h-[2px] bg-gray-300 top-[50%] right-0"></div>
          <div className="w-[1px] h-[150px] bg-gray-300"></div>
        </div>
      </div>

      {/* Right Div */}
      <div className="w-full md:w-[80%] flex flex-col gap-4 px-5 mt-10 md:mt-0">
        <div className="text-center text-lg text-gray-200 italic">"{desc}"</div>
        <div className="flex justify-center md:justify-start items-center space-x-2">
          <div>
            <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
          </div>
          <span className="text-yellow-500">{rating.toFixed(1)} / 5</span>
        </div>
        <div className="flex flex-col items-center md:items-start justify-center text-xl">
          <h1 className="font-bold text-white">{name}</h1>
          <p className="text-gray-400">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

/**
 * urls: https://github.com/smastrom/react-rating
 */
