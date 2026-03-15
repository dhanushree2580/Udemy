import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import CourseGrid from "@/components/courses/CourseGrid";
import { mockCourses, categories } from "@/data/mockData";
import { Users, Award, Globe, Monitor } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-secondary">
        <div className="container py-12 lg:py-16">
          <div className="max-w-lg bg-card p-8" style={{ boxShadow: "var(--shadow-card-hover)" }}>
            <h1 className="text-3xl lg:text-4xl font-black mb-3 leading-tight">
              Learning that gets you
            </h1>
            <p className="text-base text-muted-foreground mb-4">
              Skills for your present (and your future). Get started with us.
            </p>
            <Link to="/courses">
              <Button variant="udemy" size="lg" className="text-base px-6">
                Explore courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <div className="container">
        <CourseGrid
          courses={mockCourses.slice(0, 5)}
          title="A broad selection of courses"
          subtitle="Choose from over 210,000 online video courses with new additions published every month"
        />
      </div>

      {/* Categories */}
      <section className="container py-8">
        <h2 className="text-2xl font-bold mb-6">Top categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              to={`/courses?category=${encodeURIComponent(cat.name)}`}
              key={cat.name}
              className="udemy-card bg-card p-6 text-center hover:bg-accent/50 transition-colors"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h3 className="font-bold text-sm">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* More Courses */}
      <div className="container">
        <CourseGrid
          courses={mockCourses.slice(5, 10)}
          title="Students are viewing"
        />
      </div>

      {/* Stats banner */}
      <section className="udemy-section-dark mt-12">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Monitor, value: "210,000+", label: "Courses" },
              { icon: Users, value: "62M+", label: "Learners" },
              { icon: Globe, value: "75+", label: "Languages" },
              { icon: Award, value: "830M+", label: "Enrollments" },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.icon className="h-8 w-8 mx-auto mb-2 opacity-80" style={{ color: "hsl(var(--udemy-dark-fg))" }} />
                <div className="text-2xl font-bold" style={{ color: "hsl(var(--udemy-dark-fg))" }}>{stat.value}</div>
                <div className="text-sm opacity-70" style={{ color: "hsl(var(--udemy-dark-fg))" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-3">Become an instructor</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Instructors from around the world teach millions of learners on Udemy. We provide the tools and skills to teach what you love.
        </p>
        <Link to="/instructor">
          <Button variant="udemy" size="lg" className="text-base px-8">
            Start teaching today
          </Button>
        </Link>
      </section>
    </Layout>
  );
}
