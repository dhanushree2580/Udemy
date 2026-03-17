import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CourseCard from "@/components/courses/CourseCard";
import { mockCourses, categories } from "@/data/mockData";
import { formatINR } from "@/lib/format";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const priceFilters = ["All", "Free", "Paid"];

export default function CourseListing() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [showFilters, setShowFilters] = useState(true);

  const filtered = mockCourses.filter((c) => {
    if (selectedCategory && c.category !== selectedCategory) return false;
    if (query && !c.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (selectedPrice === "Free" && c.price > 0) return false;
    if (selectedPrice === "Paid" && c.price === 0) return false;
    return true;
  });

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">
          {query ? `Results for "${query}"` : selectedCategory || "All Courses"}
        </h1>
        <p className="text-muted-foreground mb-6">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>

        <div className="flex gap-6">
          <div className={`${showFilters ? "w-64 shrink-0" : "hidden"} hidden lg:block`}>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-sm mb-3 flex items-center gap-1">
                  Category <ChevronDown className="h-4 w-4" />
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="category" checked={!selectedCategory}
                      onChange={() => setSelectedCategory("")} className="accent-primary" />
                    All Categories
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.name} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="category" checked={selectedCategory === cat.name}
                        onChange={() => setSelectedCategory(cat.name)} className="accent-primary" />
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-3">Price</h3>
                <div className="space-y-2">
                  {priceFilters.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="price" checked={selectedPrice === p}
                        onChange={() => setSelectedPrice(p)} className="accent-primary" />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Button variant="udemy-outline" size="sm" className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-1" /> Filter
              </Button>
              <span className="text-sm text-muted-foreground">Sort by: <strong>Most Popular</strong></span>
            </div>

            {filtered.length > 0 ? (
              <div className="space-y-4">
                {filtered.map((course) => (
                  <Link key={course.id} to={`/course/${course.id}`} className="block">
                    <div className="flex gap-4 udemy-card bg-card p-3 rounded-lg hover:bg-accent/30 transition-colors">
                      <img src={course.thumbnail} alt={course.title}
                        className="w-60 h-36 object-cover shrink-0 hidden sm:block rounded-md" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold line-clamp-2">{course.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{course.instructor}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-sm udemy-star">{course.rating.toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">({course.reviewCount.toLocaleString()})</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {course.totalHours} total hours · {course.lectureCount} lectures · {course.level}
                        </p>
                        {course.bestseller && (
                          <span className="udemy-badge-bestseller inline-block mt-2 rounded-sm">Bestseller</span>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold">{formatINR(course.price)}</p>
                        {course.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">{formatINR(course.originalPrice)}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No courses found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
