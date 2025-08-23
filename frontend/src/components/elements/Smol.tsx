import { FaStar } from "react-icons/fa";

export const RatingStars = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <FaStar
                    key={i}
                    className={`size-3 ${
                        i < rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                    }`}
                />
            ))}
        </div>
    );
};
