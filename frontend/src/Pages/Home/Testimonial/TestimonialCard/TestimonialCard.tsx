import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { TReview } from "../../../../utils/Types/GlobalType";

interface TestimonialCardProps {
  testimonial: TReview;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { image, desc, rating, name, position } = testimonial;

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-slate-800 p-6 shadow-lg md:flex-row">
      {/* Image Section */}
      <div className="flex justify-center md:w-1/4 md:justify-start">
        <img
          src={image}
          alt={`${name}'s testimonial`}
          className="h-32 w-32 rounded-full object-cover ring-2 ring-slate-700"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <blockquote className="text-center text-base italic text-zinc-300 md:text-left">
          “{desc}”
        </blockquote>
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
          <span className="text-sm text-amber-400">{rating.toFixed(1)}/5</span>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-zinc-500">{position}</p>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;