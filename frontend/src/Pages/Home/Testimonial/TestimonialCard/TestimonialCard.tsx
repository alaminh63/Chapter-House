import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { TReview } from "../../../../utils/Types/GlobalType";

interface IProps {
  testimonial: TReview;
}

const TestimonialCard = ({ testimonial }: IProps) => {
  const { image, desc, rating, name, position } = testimonial;

  return (
    <div className="relative group bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 blur-2xl"></div>

      <div className="relative p-6">
        {/* Image */}
        <div className="relative rounded-full overflow-hidden w-24 h-24 mx-auto mb-4 ring-2 ring-gray-700 group-hover:ring-purple-400 transition-all duration-300">
          <img src={image} alt={name} className="object-cover w-full h-full" />
        </div>

        {/* Content */}
        <div className="text-center">
          <p className="text-white/80 text-lg leading-relaxed mb-4">{desc}</p>
          <div className="flex justify-center mb-2">
            <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
          </div>
          <h3 className="text-white font-semibold text-xl">{name}</h3>
          <p className="text-gray-400">{position}</p>
        </div>
      </div>

      {/* Subtle Hover Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
    </div>
  );
};

export default TestimonialCard;