import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Demo data - in production this would come from a database
const courses = [
  {
    id: "python-beginners",
    title: "Python for Beginners",
    description: "Learn Python from scratch with interactive lessons and real-world projects.",
    level: "Beginner",
    progress: 27,
    image: "/images/image.png",
    modules: 4,
    lessons: 12,
  },
  {
    id: "data-science",
    title: "Data Science Fundamentals",
    description: "Master data analysis, visualization, and machine learning basics.",
    level: "Intermediate",
    progress: 0,
    image: "/images/image.png",
    modules: 6,
    lessons: 18,
  },
  {
    id: "ai-advanced",
    title: "Advanced AI Engineering",
    description: "Build production-ready AI systems with cutting-edge frameworks.",
    level: "Advanced",
    progress: 0,
    image: "/images/image.png",
    modules: 8,
    lessons: 24,
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">LLM-Camp</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
              Courses
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="mb-4 text-balance text-5xl font-bold">Course Catalog</h1>
          <p className="mb-8 text-pretty text-lg text-muted-foreground">
            Explore our comprehensive library of courses designed to take you from beginner to pro.
          </p>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for Python, Data Science, AI..."
                className="h-14 rounded-full pl-12 text-base"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link key={course.id} href={`/course/${course.id}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <Badge className="absolute right-4 top-4 bg-background/90 text-foreground hover:bg-background/90">
                    {course.level}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {course.modules} modules • {course.lessons} lessons
                    </span>
                    {course.progress > 0 && <span className="font-medium text-primary">{course.progress}% done</span>}
                  </div>
                  {course.progress > 0 && (
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary transition-all" style={{ width: `${course.progress}%` }} />
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
