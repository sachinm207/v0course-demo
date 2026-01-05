import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Code2, Plus, BookOpen, Layers, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const stats = [
  { label: "Total Courses", value: "3", icon: BookOpen },
  { label: "Total Modules", value: "18", icon: Layers },
  { label: "Total Lessons", value: "54", icon: FileText },
]

const courses = [
  {
    id: "python-beginners",
    title: "Python for Beginners",
    level: "Beginner",
    modules: 4,
    lessons: 12,
    published: true,
  },
  {
    id: "data-science",
    title: "Data Science Fundamentals",
    level: "Intermediate",
    modules: 6,
    lessons: 18,
    published: true,
  },
  {
    id: "ai-advanced",
    title: "Advanced AI Engineering",
    level: "Advanced",
    modules: 8,
    lessons: 24,
    published: false,
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">LLM-Camp Admin</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/courses"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Course Management</h1>
            <p className="mt-1 text-muted-foreground">Create and manage courses, modules, and lessons</p>
          </div>
          <Button asChild>
            <Link href="/admin/course/new">
              <Plus className="mr-2 h-4 w-4" />
              New Course
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Courses Table */}
        <Card>
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold">All Courses</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex flex-1 items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{course.title}</h3>
                        <Badge variant={course.published ? "default" : "secondary"}>
                          {course.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {course.level} • {course.modules} modules • {course.lessons} lessons
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/course/${course.id}`}>Edit</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/course/${course.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
