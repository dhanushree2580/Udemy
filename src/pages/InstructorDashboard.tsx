import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockCourses, mockLessons } from "@/data/mockData";
import { formatINR } from "@/lib/format";
import { Plus, Pencil, Trash2, GripVertical, Eye } from "lucide-react";

export default function InstructorDashboard() {
  const [courses] = useState(mockCourses.slice(0, 3));
  const [showCreate, setShowCreate] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", description: "", price: "", category: "Development" });

  return (
    <Layout>
      <div className="container py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <Button variant="udemy" onClick={() => setShowCreate(!showCreate)}>
            <Plus className="h-4 w-4 mr-1" /> New Course
          </Button>
        </div>

        {showCreate && (
          <div className="border p-6 mb-8 bg-card rounded-lg" style={{ boxShadow: "var(--shadow-card)" }}>
            <h2 className="text-lg font-bold mb-4">Create a new course</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-bold">Course Title</Label>
                <Input className="mt-1" value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="e.g., Complete React Developer Course" />
              </div>
              <div>
                <Label className="text-sm font-bold">Price (₹)</Label>
                <Input className="mt-1" type="number" value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                  placeholder="1499" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-bold">Description</Label>
                <Textarea className="mt-1" value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Describe your course..." rows={3} />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="udemy">Create Course</Button>
              <Button variant="udemy-outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {courses.map((course) => {
            const lessons = mockLessons.filter((l) => l.courseId === course.id);
            return (
              <div key={course.id} className="border bg-card rounded-lg overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-start gap-4 p-4">
                  <img src={course.thumbnail} alt={course.title} className="w-32 h-20 object-cover shrink-0 rounded" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {lessons.length} lessons · {formatINR(course.price)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-udemy-success" />
                      <span className="text-xs text-muted-foreground">Published</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
                {lessons.length > 0 && (
                  <div className="border-t">
                    <div className="px-4 py-2 bg-secondary/50">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lessons</p>
                    </div>
                    {lessons.slice(0, 5).map((lesson, idx) => (
                      <div key={lesson.id} className="flex items-center gap-3 px-4 py-2 text-sm border-t">
                        <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                        <span className="text-muted-foreground w-6">{idx + 1}.</span>
                        <span className="flex-1">{lesson.title}</span>
                        <span className="text-xs text-muted-foreground">{Math.floor(lesson.durationSeconds / 60)}min</span>
                      </div>
                    ))}
                    {lessons.length > 5 && (
                      <div className="px-4 py-2 text-xs text-muted-foreground border-t">+{lessons.length - 5} more lessons</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
