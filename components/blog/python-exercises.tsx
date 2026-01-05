"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlayCircle, Sparkles, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { executePythonCode } from "@/app/actions/execute-python"

interface FeedbackResult {
  type: "success" | "error" | "info"
  message: string
  details?: string
}

export default function PythonExercises() {
  // Exercise 1: LLM Feedback
  const [code1, setCode1] = useState("")
  const [feedback1, setFeedback1] = useState<FeedbackResult | null>(null)
  const [loading1, setLoading1] = useState(false)

  // Exercise 2: Python Runtime
  const [code2, setCode2] = useState("")
  const [output2, setOutput2] = useState<FeedbackResult | null>(null)
  const [loading2, setLoading2] = useState(false)

  const handleLLMFeedback = () => {
    setLoading1(true)
    setFeedback1(null)

    // Simulate LLM analysis
    setTimeout(() => {
      const codeAnalysis = analyzeCode(code1)
      setFeedback1(codeAnalysis)
      setLoading1(false)
    }, 1500)
  }

  const analyzeCode = (code: string): FeedbackResult => {
    if (!code.trim()) {
      return {
        type: "error",
        message: "No code provided",
        details: "Please write some Python code before getting feedback.",
      }
    }

    // Check for function definition
    if (!code.includes("def ")) {
      return {
        type: "error",
        message: "Missing function definition",
        details:
          'Your code should define a function called "calculate_area" that takes two parameters: length and width.',
      }
    }

    // Check for function name
    if (!code.includes("calculate_area")) {
      return {
        type: "error",
        message: "Incorrect function name",
        details: 'The function should be named "calculate_area", not something else.',
      }
    }

    // Check for return statement
    if (!code.includes("return")) {
      return {
        type: "info",
        message: "Missing return statement",
        details:
          "Your function should return the calculated area (length * width). Add a return statement at the end of your function.",
      }
    }

    // Check for multiplication
    if (!code.includes("*")) {
      return {
        type: "info",
        message: "Check your calculation",
        details: "To calculate area, you need to multiply length by width. Use the * operator.",
      }
    }

    // Check for proper parameters
    const hasParams = /def calculate_area\s*$$\s*\w+\s*,\s*\w+\s*$$/.test(code)
    if (!hasParams) {
      return {
        type: "info",
        message: "Check your parameters",
        details:
          "Your function should accept two parameters (length and width). Example: def calculate_area(length, width):",
      }
    }

    return {
      type: "success",
      message: "Excellent work!",
      details:
        "Your function correctly calculates the area! You've properly defined the function with two parameters and returned the result of multiplying them. This is exactly how Python functions work—they take inputs and return outputs. Great job!",
    }
  }

  const handleRunPython = async () => {
    setLoading2(true)
    setOutput2(null)

    if (!code2.trim()) {
      setOutput2({
        type: "error",
        message: "No code provided",
        details: "Please write some Python code before running.",
      })
      setLoading2(false)
      return
    }

    try {
      console.log("[v0] Client: Sending code to Server Action:", code2)
      const result = await executePythonCode(code2)
      console.log("[v0] Client: Result:", result)

      if (result.success) {
        setOutput2({
          type: "success",
          message: "Program executed successfully!",
          details: result.output || "Code executed successfully (no output)",
        })
      } else {
        setOutput2({
          type: "error",
          message: "Execution error",
          details: result.error || "An unknown error occurred",
        })
      }
    } catch (error) {
      console.log("[v0] Client: Caught error:", error)
      setOutput2({
        type: "error",
        message: "Execution error",
        details: `Failed to execute Python code: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setLoading2(false)
    }
  }

  return (
    <div className="mt-16 space-y-12">
      <div>
        <h2 className="mb-6 text-3xl font-bold">Interactive Exercises</h2>
        <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
          Now it's your turn! Complete these hands-on exercises to practice what you've learned. The first exercise uses
          AI to give you personalized feedback, while the second runs your code in a real Python environment.
        </p>
      </div>

      {/* Exercise 1: LLM Feedback */}
      <Card className="overflow-hidden">
        <div className="border-b bg-primary/5 p-6">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Exercise 1: Calculate Rectangle Area (AI Feedback)</h3>
          </div>
          <p className="text-sm text-muted-foreground">Get intelligent feedback from our AI tutor</p>
        </div>

        <div className="p-6">
          <div className="mb-4 rounded-lg bg-muted/50 p-4">
            <p className="mb-2 font-medium">Your Task:</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Write a function called <code className="rounded bg-muted px-1.5 py-0.5 font-mono">calculate_area</code>{" "}
              that takes two parameters: <code className="rounded bg-muted px-1.5 py-0.5 font-mono">length</code> and{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono">width</code>. The function should return the
              area by multiplying these two values.
            </p>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Your Code:</label>
            <Textarea
              value={code1}
              onChange={(e) => setCode1(e.target.value)}
              placeholder="# Write your function here&#10;def calculate_area(length, width):&#10;    # Your code here&#10;    pass"
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <Button onClick={handleLLMFeedback} disabled={loading1} className="w-full gap-2">
            {loading1 ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing your code...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Get AI Feedback
              </>
            )}
          </Button>

          {feedback1 && (
            <div
              className={`mt-4 rounded-lg border p-4 ${
                feedback1.type === "success"
                  ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950"
                  : feedback1.type === "error"
                    ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
                    : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                {feedback1.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : feedback1.type === "error" ? (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                ) : (
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
                <p className="font-semibold">{feedback1.message}</p>
              </div>
              {feedback1.details && (
                <p className="text-sm leading-relaxed text-muted-foreground">{feedback1.details}</p>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Exercise 2: Python Runtime */}
      <Card className="overflow-hidden">
        <div className="border-b bg-emerald-50 p-6 dark:bg-emerald-950">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-full bg-emerald-600/10 p-2">
              <PlayCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold">Exercise 2: Create a Greeting (Live Python Execution)</h3>
          </div>
          <p className="text-sm text-muted-foreground">Run real Python code and see the output instantly</p>
        </div>

        <div className="p-6">
          <div className="mb-4 rounded-lg bg-muted/50 p-4">
            <p className="mb-2 font-medium">Your Task:</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Create a variable called <code className="rounded bg-muted px-1.5 py-0.5 font-mono">name</code> and assign
              it a string value (your name or any name). Then use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono">print()</code> function to display a greeting
              message like "Hello, [name]!".
            </p>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Your Code:</label>
            <Textarea
              value={code2}
              onChange={(e) => setCode2(e.target.value)}
              placeholder="# Write your code here&#10;name = 'Your Name'&#10;print(f'Hello, {name}!')"
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <Button
            onClick={handleRunPython}
            disabled={loading2}
            className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            {loading2 ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running Python...
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4" />
                Run Code
              </>
            )}
          </Button>

          {output2 && (
            <div
              className={`mt-4 rounded-lg border p-4 ${
                output2.type === "success"
                  ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950"
                  : output2.type === "error"
                    ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
                    : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                {output2.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
                <p className="font-semibold">{output2.message}</p>
              </div>
              {output2.details && (
                <pre className="mt-2 whitespace-pre-wrap rounded bg-muted/50 p-3 text-sm leading-relaxed text-muted-foreground">
                  {output2.details}
                </pre>
              )}
            </div>
          )}
        </div>
      </Card>

      <div className="rounded-lg border bg-muted/30 p-6">
        <h4 className="mb-3 text-lg font-semibold">💡 Learning Tips</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Don't worry if you don't get it right the first time—programming is all about trial and error</li>
          <li>• Read the feedback carefully—it's designed to guide you toward the solution</li>
          <li>• Experiment with variations of your code to see what works and what doesn't</li>
          <li>• The AI feedback helps you learn coding best practices, while runtime execution shows real results</li>
        </ul>
      </div>
    </div>
  )
}
