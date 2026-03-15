import CourseCard, { type CourseCardData } from "./CourseCard";

interface CourseGridProps {
  courses: CourseCardData[];
  title?: string;
  subtitle?: string;
}

export default function CourseGrid({ courses, title, subtitle }: CourseGridProps) {
  return (
    <section className="py-8">
      {title && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
