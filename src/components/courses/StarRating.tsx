import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}

export default function StarRating({ rating, count, size = "sm" }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-1">
      <span className={`font-bold udemy-star ${size === "sm" ? "text-sm" : "text-base"}`}>
        {rating.toFixed(1)}
      </span>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className={`${sizeClass} udemy-star fill-current`} />;
          }
          if (i === fullStars && hasHalf) {
            return <StarHalf key={i} className={`${sizeClass} udemy-star fill-current`} />;
          }
          return <Star key={i} className={`${sizeClass} text-muted-foreground/30`} />;
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count.toLocaleString()})</span>
      )}
    </div>
  );
}
