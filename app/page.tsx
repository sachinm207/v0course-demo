import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
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
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
              Courses
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Admin
            </Link>
            <Button size="sm" className="rounded-full">
              Install App
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <GraduationCap className="h-4 w-4" />
            New Course: Python for AI
          </div>

          <h1 className="mb-6 max-w-4xl text-balance text-5xl font-bold leading-tight lg:text-7xl">
            Master Coding with <span className="text-primary">AI-Powered</span> Mentorship
          </h1>

          <p className="mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            Experience the future of interactive learning. No setup required. Get instant feedback from our LLM-powered
            tutors and build real-world skills.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="h-12 rounded-full px-8 text-base" asChild>
              <Link href="/courses">
                Explore Courses
                <span className="ml-2">→</span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-full px-8 text-base bg-transparent" asChild>
              <Link href="/admin">View Syllabus</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
