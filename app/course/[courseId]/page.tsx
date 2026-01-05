import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, ChevronRight, ChevronDown, CheckCircle2, Circle, Play } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Demo data structure
const courseData = {
  "python-beginners": {
    title: "Python for Beginners",
    progress: 27,
    modules: [
      {
        id: 1,
        title: "Introduction to Python",
        lessons: [
          { id: 1, title: "What is Python?", completed: true, type: "video" },
          { id: 2, title: "Comments & Basic Syntax", completed: true, type: "article" },
          { id: 3, title: "Your First Program", completed: false, type: "code" },
        ],
      },
      {
        id: 2,
        title: "Variables and Data Types",
        lessons: [{ id: 4, title: "Variables Explained", completed: false, type: "article" }],
      },
      {
        id: 3,
        title: "Control Flow",
        lessons: [
          { id: 5, title: "Conditional Logic with if", completed: false, type: "code" },
          { id: 6, title: "Exercise: if-else", completed: false, type: "code" },
          { id: 7, title: "Comparison Quiz", completed: false, type: "quiz" },
        ],
      },
      {
        id: 4,
        title: "Advanced Topics",
        lessons: [
          { id: 8, title: "Introduction to Functions", completed: false, type: "article" },
          { id: 9, title: "Exploring Python Docs", completed: false, type: "article" },
        ],
      },
    ],
  },
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = courseData[params.courseId as keyof typeof courseData]

  if (!course) {
    return <div>Course not found</div>
  }

  const currentLesson = course.modules[0].lessons[2] // "Your First Program"

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top Navigation */}
      <nav className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/courses" className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 rotate-180" />
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold">{course.title}</div>
          <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
          </div>
          <div className="text-sm text-muted-foreground">{course.progress}% done</div>
        </div>

        <Button className="rounded-full">Continue</Button>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-96 overflow-y-auto border-r bg-background">
          <div className="p-6">
            {course.modules.map((module, moduleIndex) => (
              <Collapsible key={module.id} defaultOpen={moduleIndex === 0} className="mb-2">
                <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">
                      {module.id}. {module.title}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=closed]:-rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-3 mt-1 space-y-1 border-l pl-3">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/course/${params.courseId}/${lesson.id}`}
                        className={`flex items-center gap-3 rounded-lg p-3 text-sm transition-colors ${
                          lesson.id === currentLesson.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 shrink-0" />
                        )}
                        <span className="flex-1">{lesson.title}</span>
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl p-8">
            <Badge className="mb-4">Code</Badge>
            <h1 className="mb-6 text-4xl font-bold">{currentLesson.title}</h1>

            <Card className="mb-6 p-6">
              <h2 className="mb-4 text-lg font-semibold">Posted In: Code</h2>
              <p className="mb-6 text-muted-foreground">Write a program that prints 'Hello, Data!' to the console.</p>

              <div className="rounded-lg border bg-muted/50 p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Code Editor</span>
                  <span className="text-sm text-muted-foreground">main.py</span>
                </div>
                <div className="min-h-[200px] rounded-md bg-background p-4 font-mono text-sm">
                  <div className="text-green-600"># Write your code below</div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button>
                    <Play className="mr-2 h-4 w-4" />
                    Run Code
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
