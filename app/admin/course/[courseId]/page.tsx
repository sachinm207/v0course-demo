import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, Plus, GripVertical, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EditCoursePage({ params }: { params: { courseId: string } }) {
  const isNew = params.courseId === "new"

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to Admin
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button>Publish Course</Button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">{isNew ? "Create New Course" : "Edit Course"}</h1>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Python for Beginners"
                    defaultValue={isNew ? "" : "Python for Beginners"}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn..."
                    rows={4}
                    defaultValue={
                      isNew ? "" : "Learn Python from scratch with interactive lessons and real-world projects."
                    }
                    className="mt-1.5"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="level">Difficulty Level</Label>
                    <Select defaultValue={isNew ? "" : "beginner"}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="image">Course Image URL</Label>
                    <Input id="image" placeholder="https://..." className="mt-1.5" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6">
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Modules & Lessons</h2>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Module
                </Button>
              </div>

              <div className="space-y-4">
                {/* Module 1 */}
                <Card className="border-2">
                  <div className="flex items-center gap-3 border-b bg-muted/50 p-4">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Input
                        placeholder="Module title"
                        defaultValue="Introduction to Python"
                        className="border-0 bg-transparent p-0 text-base font-semibold focus-visible:ring-0"
                      />
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Lesson
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <div className="space-y-2">
                      {/* Lesson 1 */}
                      <div className="flex items-center gap-3 rounded-lg border p-3">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <Input
                            placeholder="Lesson title"
                            defaultValue="What is Python?"
                            className="border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
                          />
                        </div>
                        <Select defaultValue="video">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="code">Code</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Lesson 2 */}
                      <div className="flex items-center gap-3 rounded-lg border p-3">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <Input
                            placeholder="Lesson title"
                            defaultValue="Comments & Basic Syntax"
                            className="border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
                          />
                        </div>
                        <Select defaultValue="article">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="code">Code</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Module 2 */}
                <Card className="border-2">
                  <div className="flex items-center gap-3 border-b bg-muted/50 p-4">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Input
                        placeholder="Module title"
                        defaultValue="Variables and Data Types"
                        className="border-0 bg-transparent p-0 text-base font-semibold focus-visible:ring-0"
                      />
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Lesson
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 rounded-lg border p-3">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <Input
                            placeholder="Lesson title"
                            defaultValue="Variables Explained"
                            className="border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
                          />
                        </div>
                        <Select defaultValue="article">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="code">Code</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
