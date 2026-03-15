import { useParams, useSearchParams, Link } from "react-router-dom";
import { mockCourses, mockLessons } from "@/data/mockData";
import { PlayCircle, ChevronLeft, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function VideoPlayer() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const course = mockCourses.find((c) => c.id === id) || mockCourses[0];
  const lessons = mockLessons.filter((l) => l.courseId === course.id);

  const currentLessonId = searchParams.get("v") || lessons[0]?.id;
  const currentLesson = lessons.find((l) => l.id === currentLessonId) || lessons[0];
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  };

  const selectLesson = (lessonId: string) => {
    setSearchParams({ v: lessonId });
  };

  return (
    <div className="h-screen flex flex-col bg-foreground">
      {/* Top bar */}
      <div className="h-14 flex items-center px-4 border-b border-muted/20 shrink-0" style={{ background: "hsl(var(--udemy-dark-bg))" }}>
        <Link to={`/course/${course.id}`} className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--udemy-dark-fg))" }}>
          <ChevronLeft className="h-4 w-4" />
          <span className="font-bold truncate max-w-md">{course.title}</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-xs" style={{ color: "hsl(var(--udemy-dark-fg))", opacity: 0.7 }}>
            {completedLessons.size}/{lessons.length} completed
          </span>
          <button
            className="text-sm px-3 py-1 border border-muted/30"
            style={{ color: "hsl(var(--udemy-dark-fg))" }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Course content
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="flex-1 flex items-center justify-center" style={{ background: "#000" }}>
          {currentLesson ? (
            <iframe
              className="w-full h-full max-h-[calc(100vh-56px)]"
              src={`https://www.youtube.com/embed/${currentLesson.youtubeVideoId}?autoplay=0&rel=0`}
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p style={{ color: "hsl(var(--udemy-dark-fg))" }}>No lesson selected</p>
          )}
        </div>

        {/* Lesson sidebar */}
        {sidebarOpen && (
          <aside className="w-80 bg-background border-l overflow-y-auto shrink-0">
            <div className="p-4 border-b">
              <h2 className="font-bold text-sm">Course content</h2>
            </div>
            <div>
              {lessons.map((lesson, idx) => {
                const isActive = lesson.id === currentLessonId;
                const isCompleted = completedLessons.has(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => selectLesson(lesson.id)}
                    className={`w-full text-left flex items-start gap-3 px-4 py-3 border-b text-sm transition-colors ${
                      isActive ? "bg-accent" : "hover:bg-secondary"
                    }`}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleComplete(lesson.id); }}
                      className="mt-0.5"
                    >
                      <CheckCircle className={`h-4 w-4 ${isCompleted ? "text-udemy-success fill-current" : "text-muted-foreground"}`} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-tight ${isActive ? "font-bold" : ""}`}>
                        {idx + 1}. {lesson.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <PlayCircle className="h-3 w-3" />
                        {Math.floor(lesson.durationSeconds / 60)}min
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
