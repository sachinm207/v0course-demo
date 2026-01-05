import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Code2, ArrowRight, Calendar, Clock } from "lucide-react"

const blogPosts = [
  {
    slug: "which-llm-to-select",
    title: "Which LLM Should You Choose?",
    description: "Interactive guide to selecting the perfect AI model based on your needs, budget, and use case.",
    category: "AI Tools",
    readTime: "8 min read",
    publishedAt: "2024-01-15",
    featured: true,
  },
  {
    slug: "python-for-beginners",
    title: "Python for Beginners: Interactive Exercises",
    description: "Learn Python with hands-on exercises featuring AI feedback and live code execution.",
    category: "Programming",
    readTime: "12 min read",
    publishedAt: "2024-01-20",
    featured: true,
  },
]

export default function BlogPage() {
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
            <Link
              href="/courses"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Courses
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
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
          <h1 className="mb-4 text-balance text-5xl font-bold">Blog</h1>
          <p className="text-pretty text-lg text-muted-foreground">
            Insights, tutorials, and guides on AI, coding, and technology.
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="p-8">
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h2 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="mb-4 text-muted-foreground leading-relaxed">{post.description}</p>
                  <div className="flex items-center gap-2 font-medium text-primary">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
