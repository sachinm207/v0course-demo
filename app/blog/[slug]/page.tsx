import { notFound } from "next/navigation"
import Link from "next/link"
import { Code2, ChevronRight } from "lucide-react"
import LLMComparison from "@/components/blog/llm-comparison"
import PythonExercises from "@/components/blog/python-exercises"

const blogPosts = {
  "which-llm-to-select": {
    title: "Which LLM Should You Choose?",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
  },
  "python-for-beginners": {
    title: "Python for Beginners: Interactive Exercises",
    publishedAt: "2024-01-20",
    readTime: "12 min read",
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  if (params.slug === "python-for-beginners") {
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

        <article className="mx-auto max-w-4xl px-4 py-12">
          {/* Breadcrumbs */}
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Python for Beginners</span>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="mb-4 text-balance text-4xl font-bold leading-tight lg:text-5xl">
              Python for Beginners: Interactive Exercises
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="mb-6 text-3xl font-bold">Welcome to Python Programming</h2>

            <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
              Python is one of the most popular and beginner-friendly programming languages in the world. Whether you're
              interested in web development, data science, automation, or artificial intelligence, Python provides the
              perfect foundation for your coding journey.
            </p>

            <h3 className="mb-4 text-2xl font-bold">Why Learn Python?</h3>

            <div className="mb-8 space-y-4">
              <div>
                <h4 className="mb-2 text-xl font-semibold text-primary">Simple and Readable Syntax</h4>
                <p className="leading-relaxed text-muted-foreground">
                  Python's syntax resembles natural English, making it incredibly easy to read and write. Unlike other
                  languages that require complex symbols and structures, Python emphasizes clean, readable code.
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xl font-semibold text-primary">Versatile Applications</h4>
                <p className="leading-relaxed text-muted-foreground">
                  From building websites with Django and Flask to analyzing data with Pandas and NumPy, Python powers
                  applications across every domain. It's the language of choice for machine learning, scientific
                  computing, and automation.
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xl font-semibold text-primary">Huge Community Support</h4>
                <p className="leading-relaxed text-muted-foreground">
                  With millions of developers worldwide, Python has an extensive ecosystem of libraries, frameworks, and
                  resources. You'll never be stuck without help or tools to solve your problems.
                </p>
              </div>
            </div>

            <h3 className="mb-4 text-2xl font-bold">Python Basics: Variables and Functions</h3>

            <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
              Let's start with the fundamentals. In Python, variables store data, and functions perform actions. Here's
              what you need to know:
            </p>

            <div className="mb-6 rounded-lg border bg-muted/30 p-6">
              <h4 className="mb-3 text-lg font-semibold">Variables</h4>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Variables are containers for storing data values. In Python, you don't need to declare a variable's
                type—it's automatically inferred.
              </p>
              <pre className="rounded bg-muted p-4 text-sm">
                <code>{`# Creating variables
name = "Alice"
age = 25
is_student = True
height = 5.6`}</code>
              </pre>
            </div>

            <div className="mb-8 rounded-lg border bg-muted/30 p-6">
              <h4 className="mb-3 text-lg font-semibold">Functions</h4>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Functions are reusable blocks of code that perform specific tasks. They help organize your code and
                avoid repetition.
              </p>
              <pre className="rounded bg-muted p-4 text-sm">
                <code>{`# Defining a function
def greet(name):
    return f"Hello, {name}!"

# Calling the function
message = greet("Bob")
print(message)  # Output: Hello, Bob!`}</code>
              </pre>
            </div>
          </div>

          {/* Interactive Exercises */}
          <div className="not-prose">
            <PythonExercises />
          </div>

          {/* Conclusion */}
          <div className="prose prose-lg mt-12 max-w-none">
            <h3 className="mb-4 text-2xl font-bold">Next Steps in Your Python Journey</h3>

            <p className="mb-4 text-pretty leading-relaxed text-muted-foreground">
              Congratulations on completing these foundational exercises! You've taken your first steps in Python
              programming. To continue your learning:
            </p>

            <ul className="mb-6 space-y-2 text-muted-foreground">
              <li>Practice writing functions daily to build muscle memory</li>
              <li>Explore Python's built-in functions like len(), range(), and enumerate()</li>
              <li>Learn about data structures: lists, dictionaries, tuples, and sets</li>
              <li>Start working on small projects that interest you</li>
              <li>Join Python communities on Reddit, Discord, or Stack Overflow</li>
            </ul>

            <p className="text-pretty leading-relaxed text-muted-foreground">
              Remember, the key to mastering Python is consistent practice. Start small, build projects, make mistakes,
              and learn from them. Every expert programmer was once a beginner. Keep coding, and you'll be amazed at how
              quickly you progress!
            </p>
          </div>
        </article>
      </div>
    )
  }

  if (params.slug === "which-llm-to-select") {
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

        <article className="mx-auto max-w-4xl px-4 py-12">
          {/* Breadcrumbs */}
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Which LLM Should You Choose?</span>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="mb-4 text-balance text-4xl font-bold leading-tight lg:text-5xl">
              Which LLM Should You Choose?
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Interactive Comparison Tool */}
          <LLMComparison />

          {/* Article Content */}
          <div className="prose prose-lg mt-16 max-w-none">
            <h2 className="mb-6 text-3xl font-bold">Understanding Large Language Models</h2>

            <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
              Choosing the right Large Language Model (LLM) can significantly impact your productivity, project
              outcomes, and budget. With so many options available—ChatGPT, Claude, Gemini, and Perplexity—each offering
              unique strengths and pricing tiers, making an informed decision is crucial.
            </p>

            <h3 className="mb-4 text-2xl font-bold">The Four Major Players</h3>

            <div className="mb-12 space-y-6">
              <div>
                <h4 className="mb-2 text-xl font-semibold text-primary">ChatGPT (OpenAI)</h4>
                <p className="leading-relaxed text-muted-foreground">
                  ChatGPT, powered by GPT-4 and GPT-4o, is widely regarded as the most versatile LLM. It excels at
                  creative writing, code generation, and general problem-solving. With a massive training dataset and
                  continuous improvements, ChatGPT offers consistent performance across diverse tasks. The latest GPT-4o
                  model provides faster responses while maintaining high quality output.
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xl font-semibold text-primary">Claude (Anthropic)</h4>
                <p className="leading-relaxed text-muted-foreground">
                  Claude 3.5 Sonnet represents a breakthrough in AI safety and nuanced understanding. Known for its
                  exceptional reasoning abilities and longer context windows (up to 200K tokens), Claude shines in
                  complex analysis, research tasks, and detailed content creation. It's particularly strong at
                  understanding subtle instructions and maintaining coherent conversations over extended interactions.
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xl font-semibold text-primary">Gemini (Google)</h4>
                <p className="leading-relaxed text-muted-foreground">
                  Google's Gemini 2.0 Pro integrates seamlessly with Google's ecosystem, offering real-time web search
                  capabilities and multimodal understanding. It's exceptional for research tasks, fact-checking, and
                  scenarios requiring up-to-date information. Gemini Advanced provides access to the most powerful
                  models and longer conversation limits.
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xl font-semibold text-primary">Perplexity</h4>
                <p className="leading-relaxed text-muted-foreground">
                  Perplexity specializes in research and information retrieval, combining LLM capabilities with
                  real-time web search and citation. Unlike other models, Perplexity focuses on providing accurate,
                  sourced information with inline citations. It's the go-to choice for academic research, fact-checking,
                  and staying current with recent events.
                </p>
              </div>
            </div>

            <h3 className="mb-4 text-2xl font-bold">Key Selection Factors</h3>

            <div className="mb-12 space-y-6">
              <div>
                <h4 className="mb-2 text-xl font-semibold">Use Case</h4>
                <p className="leading-relaxed text-muted-foreground">
                  Your primary use case should drive your decision. For creative writing and content generation, ChatGPT
                  often delivers the most engaging results. For technical analysis and coding, Claude's reasoning
                  abilities shine. Research tasks benefit from Perplexity's citations and Gemini's web access.
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xl font-semibold">Context Length & Token Limits</h4>
                <p className="leading-relaxed text-muted-foreground">
                  Token limits determine how much information the model can process at once. Claude leads with 200K
                  tokens, ideal for analyzing long documents or maintaining extended conversations. ChatGPT and Gemini
                  offer 32K-128K tokens depending on the tier, while Perplexity focuses on concise, sourced responses.
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xl font-semibold">Cost & Subscription Models</h4>
                <p className="leading-relaxed text-muted-foreground">
                  Pricing varies significantly. ChatGPT Plus costs $20/month for GPT-4 access. Claude Pro is also
                  $20/month with higher usage limits. Gemini Advanced is $19.99/month bundled with Google One.
                  Perplexity Pro costs $20/month for unlimited queries. Free tiers offer limited access to older or
                  smaller models.
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-xl font-semibold">Output Quality & Style</h4>
                <p className="leading-relaxed text-muted-foreground">
                  Each model has a distinct "voice" and output style. ChatGPT tends toward conversational and engaging
                  responses. Claude produces more formal, detailed analysis. Gemini balances between the two while
                  incorporating web knowledge. Perplexity prioritizes conciseness and factual accuracy.
                </p>
              </div>
            </div>

            <h3 className="mb-4 text-2xl font-bold">Making Your Decision</h3>

            <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
              The "best" LLM doesn't exist—only the best choice for your specific needs. Consider starting with free
              tiers to test different models with your actual workflows. Many professionals maintain subscriptions to
              multiple services, using each for its strengths. The interactive tool above can help narrow down your
              options based on your priorities.
            </p>

            <p className="text-pretty leading-relaxed text-muted-foreground">
              Remember that the AI landscape evolves rapidly. New models and capabilities launch regularly, so staying
              informed about updates helps ensure you're always using the best tool for your needs. The investment in
              the right LLM pays dividends through increased productivity, better outputs, and time saved.
            </p>
          </div>
        </article>
      </div>
    )
  }

  return notFound()
}
