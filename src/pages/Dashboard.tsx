import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { mockCourses } from "@/data/mockData";
import { PlayCircle, BarChart } from "lucide-react";

export default function Dashboard() {
  const enrolledCourses = mockCourses.slice(0, 4);

  return (
    <Layout>
      <div className="udemy-section-dark py-10">
        <div className="container">
          <h1 className="text-3xl font-bold" style={{ color: "hsl(var(--udemy-dark-fg))" }}>My learning</h1>
        </div>
      </div>

      <div className="container py-8">
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {enrolledCourses.map((course) => {
              const progress = Math.floor(Math.random() * 80) + 10;
              return (
                <Link key={course.id} to={`/course/${course.id}/learn`} className="block group">
                  <div className="udemy-card bg-card">
                    <div className="aspect-video overflow-hidden relative">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                        <PlayCircle className="h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "hsl(var(--udemy-dark-fg))" }} />
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm line-clamp-2 mb-1">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>
                      {/* Progress bar */}
                      <div className="w-full bg-secondary h-1.5 mb-1">
                        <div className="bg-primary h-full" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground">{progress}% complete</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <BarChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-lg font-bold mb-2">Start learning!</h2>
            <p className="text-muted-foreground mb-4">Your courses will appear here.</p>
            <Link to="/courses" className="text-primary font-bold hover:underline">Browse courses</Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
