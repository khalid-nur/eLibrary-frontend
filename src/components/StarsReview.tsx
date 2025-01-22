import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiStarHalfFill } from "react-icons/pi";

interface StarsReviewProps {
  rating: number;
}

const StarsReview = ({ rating }: StarsReviewProps) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center mt-4">
      {[...Array(fullStars)].map((_, i) => (
        <AiFillStar key={`full-${i}`} className="w-5 h-5 fill-yellow-300" />
      ))}

      {halfStars > 0 && (
        <PiStarHalfFill key="half" className="w-5 h-5 fill-yellow-300" />
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <AiOutlineStar key={`empty-${i}`} className="w-5 h-5 fill-yellow-300" />
      ))}
    </div>
  );
};

export default StarsReview;
