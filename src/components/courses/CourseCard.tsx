import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { formatINR } from "@/lib/format";

export interface CourseCardData {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  bestseller?: boolean;
  category?: string;
  totalHours?: number;
  lectureCount?: number;
  level?: string;
}

interface CourseCardProps {
  course: CourseCardData;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/course/${course.id}`} className="block group">
      <div className="udemy-card bg-card rounded-lg overflow-hidden">
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-3">
          <h3 className="font-bold text-sm leading-tight line-clamp-2 mb-0.5">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate">{course.instructor}</p>
          <StarRating rating={course.rating} count={course.reviewCount} />
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-foreground">
              {formatINR(course.price)}
            </span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatINR(course.originalPrice)}
              </span>
            )}
          </div>
          {course.bestseller && (
            <span className="udemy-badge-bestseller inline-block mt-1.5 rounded-sm">Bestseller</span>
          )}
        </div>
      </div>
    </Link>
  );
}
