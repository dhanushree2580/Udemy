import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/courses/StarRating";
import { mockCourses, mockLessons } from "@/data/mockData";
import { formatINR } from "@/lib/format";
import { Check, PlayCircle, Clock, BarChart3, Award, Globe, ChevronDown, ChevronUp, Monitor } from "lucide-react";
import { useState } from "react";

export default function CourseDetail() {
  const { id } = useParams();
  const course = mockCourses.find((c) => c.id === id) || mockCourses[0];
  const lessons = mockLessons.filter((l) => l.courseId === course.id);
  const [curriculumOpen, setCurriculumOpen] = useState(true);

  const whatYouLearn = [
    "Build 16+ web development projects for your portfolio",
    "Learn the latest technologies including JavaScript, React, Node and more",
    "Master frontend development with React",
    "Build fully-fledged websites and web apps for your startup or business",
    "Master backend development with Node",
    "Learn professional developer best practices",
  ];

  return (
    <Layout>
      <section className="udemy-section-dark">
        <div className="container py-8 lg:py-12">
          <div className="max-w-2xl">
            <nav className="text-sm mb-3 opacity-70" style={{ color: "hsl(var(--udemy-dark-fg))" }}>
              <Link to="/courses" className="hover:underline">{course.category || "Development"}</Link>
              {" > "}<span>Web Development</span>
            </nav>
            <h1 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: "hsl(var(--udemy-dark-fg))" }}>
              {course.title}
            </h1>
            <p className="text-base mb-3 opacity-90" style={{ color: "hsl(var(--udemy-dark-fg))" }}>
              Learn web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real projects!
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              {course.bestseller && <span className="udemy-badge-bestseller rounded-sm">Bestseller</span>}
              <StarRating rating={course.rating} count={course.reviewCount} size="md" />
            </div>
            <p className="text-sm opacity-80" style={{ color: "hsl(var(--udemy-dark-fg))" }}>
              Created by <span className="underline">{course.instructor}</span>
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm opacity-70" style={{ color: "hsl(var(--udemy-dark-fg))" }}>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Last updated 11/2024</span>
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> English</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 max-w-2xl">
            <div className="border p-6 mb-8 rounded-lg bg-accent/20">
              <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {whatYouLearn.map((item, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Course content</h2>
              <p className="text-sm text-muted-foreground mb-3">
                {lessons.length} lectures · {course.totalHours || 65} total hours
              </p>
              <div className="border rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  onClick={() => setCurriculumOpen(!curriculumOpen)}
                >
                  <span className="font-bold text-sm">Section 1: Getting Started</span>
                  {curriculumOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {curriculumOpen && (
                  <div className="border-t">
                    {lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 text-sm border-b last:border-b-0">
                        <PlayCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="flex-1">{lesson.title}</span>
                        <span className="text-muted-foreground text-xs">
                          {Math.floor(lesson.durationSeconds / 60)}:{String(lesson.durationSeconds % 60).padStart(2, "0")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Instructor</h2>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-primary text-lg">{course.instructor}</h3>
                  <p className="text-sm text-muted-foreground">Developer and Lead Instructor</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><BarChart3 className="h-3.5 w-3.5" /> 4.7 Rating</span>
                    <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5" /> 2,891,654 Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-80">
            <div className="lg:sticky lg:top-20 border bg-card rounded-lg overflow-hidden" style={{ boxShadow: "var(--shadow-sticky)" }}>
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16" style={{ color: "hsl(var(--udemy-dark-fg))" }} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl font-bold">{formatINR(course.price)}</span>
                  {course.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">{formatINR(course.originalPrice)}</span>
                  )}
                </div>
                {course.originalPrice && (
                  <p className="text-sm text-primary font-semibold mb-4">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                  </p>
                )}
                <Link to={`/checkout/${course.id}`}>
                  <Button variant="udemy" className="w-full h-12 text-base mb-2">Buy now</Button>
                </Link>
                <Button variant="udemy-outline" className="w-full h-12 text-base mb-4">Add to cart</Button>
                <p className="text-xs text-center text-muted-foreground mb-4">30-Day Money-Back Guarantee</p>

                <div className="space-y-2 text-sm">
                  <h4 className="font-bold">This course includes:</h4>
                  {[
                    { icon: Monitor, text: `${course.totalHours || 65} hours on-demand video` },
                    { icon: Award, text: "Certificate of completion" },
                    { icon: Globe, text: "Access on mobile and TV" },
                    { icon: Clock, text: "Full lifetime access" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
