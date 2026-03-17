import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import CourseGrid from "@/components/courses/CourseGrid";
import { mockCourses, categories } from "@/data/mockData";
import { Users, Award, Globe, Monitor, Sparkles, TrendingUp } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/20 to-secondary" />
        <div className="container relative py-16 lg:py-24">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="h-4 w-4" /> New courses added weekly
            </div>
            <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">
              Unlock your <span className="text-primary">potential</span> with expert-led courses
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Join millions of learners worldwide. Skills for your present and your future, all in one place.
            </p>
            <div className="flex gap-3">
              <Link to="/courses">
                <Button variant="udemy" size="lg" className="text-base px-8 h-12">
                  Explore courses
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="udemy-outline" size="lg" className="text-base px-8 h-12">
                  Join free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-accent/30 px-4 py-2.5 rounded-lg">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span><strong className="text-foreground">Trending:</strong> React, Python, Machine Learning, AWS, JavaScript, Data Science</span>
        </div>
      </section>

      {/* Featured Courses */}
      <div className="container">
        <CourseGrid
          courses={mockCourses.slice(0, 5)}
          title="Featured courses"
          subtitle="Hand-picked by our team for quality and relevance"
        />
      </div>

      {/* Categories */}
      <section className="container py-8">
        <h2 className="text-2xl font-bold mb-6">Browse by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link to={`/courses?category=${encodeURIComponent(cat.name)}`} key={cat.name}
              className="group bg-card border p-6 text-center rounded-lg hover:border-primary hover:shadow-md transition-all">
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{cat.courseCount.toLocaleString()} courses</p>
            </Link>
          ))}
        </div>
      </section>

      {/* More Courses */}
      <div className="container">
        <CourseGrid courses={mockCourses.slice(5, 10)} title="Popular with learners" />
      </div>

      {/* Stats */}
      <section className="mt-12 bg-gradient-to-r from-primary to-accent">
        <div className="container py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Monitor, value: "210,000+", label: "Courses" },
              { icon: Users, value: "62M+", label: "Learners" },
              { icon: Globe, value: "75+", label: "Languages" },
              { icon: Award, value: "830M+", label: "Enrollments" },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary-foreground opacity-80" />
                <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-3">Share your knowledge</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Create an online course and reach millions of learners worldwide. We provide the tools and platform.
        </p>
        <Link to="/instructor">
          <Button variant="udemy" size="lg" className="text-base px-8">Start teaching today</Button>
        </Link>
      </section>
    </Layout>
  );
}
