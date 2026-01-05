"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sparkles, CheckCircle2, DollarSign, Zap, FileText, Clock } from "lucide-react"

type UseCase = "coding" | "writing" | "research" | "ui-design" | "analysis" | "general"
type Budget = "free" | "budget" | "premium"
type Priority = "speed" | "quality" | "cost" | "context"

interface LLMResult {
  name: string
  score: number
  pricing: string
  strengths: string[]
  limitations: string[]
  recommendation: string
}

export default function LLMComparison() {
  const [useCase, setUseCase] = useState<UseCase>("general")
  const [budget, setBudget] = useState<Budget>("budget")
  const [priority, setPriority] = useState<Priority>("quality")
  const [result, setResult] = useState<LLMResult | null>(null)

  const calculateRecommendation = () => {
    const results: LLMResult[] = []

    // ChatGPT scoring
    let chatgptScore = 0
    if (useCase === "coding") chatgptScore += 35
    if (useCase === "writing") chatgptScore += 40
    if (useCase === "general") chatgptScore += 40
    if (useCase === "ui-design") chatgptScore += 30
    if (budget === "budget" || budget === "premium") chatgptScore += 20
    if (priority === "quality") chatgptScore += 30
    if (priority === "speed") chatgptScore += 25

    results.push({
      name: "ChatGPT (GPT-4)",
      score: chatgptScore,
      pricing: "$20/month (Plus) | Free tier available",
      strengths: [
        "Excellent at creative writing and content generation",
        "Strong coding capabilities with detailed explanations",
        "Large knowledge base with broad general knowledge",
        "Consistent performance across diverse tasks",
      ],
      limitations: [
        "Knowledge cutoff date limits recent information",
        "Can be verbose in responses",
        "Limited free tier usage",
      ],
      recommendation:
        "Best for creative tasks, code generation, and users who need a versatile all-purpose AI assistant.",
    })

    // Claude scoring
    let claudeScore = 0
    if (useCase === "coding") claudeScore += 40
    if (useCase === "analysis") claudeScore += 45
    if (useCase === "research") claudeScore += 35
    if (useCase === "writing") claudeScore += 35
    if (budget === "premium") claudeScore += 25
    if (priority === "quality") claudeScore += 40
    if (priority === "context") claudeScore += 45

    results.push({
      name: "Claude 3.5 Sonnet",
      score: claudeScore,
      pricing: "$20/month (Pro) | Free tier available",
      strengths: [
        "Exceptional reasoning and analytical capabilities",
        "Massive 200K token context window",
        "Excellent at following complex instructions",
        "Strong coding with detailed explanations",
      ],
      limitations: [
        "Can be overly cautious or formal",
        "Slower response times for complex queries",
        "Limited free tier compared to competitors",
      ],
      recommendation:
        "Ideal for complex analysis, long documents, detailed coding projects, and tasks requiring nuanced understanding.",
    })

    // Gemini scoring
    let geminiScore = 0
    if (useCase === "research") geminiScore += 45
    if (useCase === "analysis") geminiScore += 35
    if (useCase === "general") geminiScore += 35
    if (budget === "budget" || budget === "premium") geminiScore += 20
    if (priority === "speed") geminiScore += 30
    if (priority === "quality") geminiScore += 25

    results.push({
      name: "Gemini 2.0 Pro",
      score: geminiScore,
      pricing: "$19.99/month (Advanced + Google One) | Free tier available",
      strengths: [
        "Real-time web search integration",
        "Excellent for fact-checking and research",
        "Multimodal capabilities (text, images)",
        "Seamless Google ecosystem integration",
      ],
      limitations: [
        "Sometimes overly cautious with responses",
        "Can prioritize recent information over depth",
        "Variable response quality",
      ],
      recommendation:
        "Perfect for research tasks, staying current with news/trends, and users invested in the Google ecosystem.",
    })

    // Perplexity scoring
    let perplexityScore = 0
    if (useCase === "research") perplexityScore += 50
    if (useCase === "analysis") perplexityScore += 30
    if (budget === "budget" || budget === "premium") perplexityScore += 20
    if (priority === "quality") perplexityScore += 35
    if (priority === "speed") perplexityScore += 20

    results.push({
      name: "Perplexity",
      score: perplexityScore,
      pricing: "$20/month (Pro) | Generous free tier",
      strengths: [
        "Real-time web search with inline citations",
        "Excellent for academic research",
        "Focus on factual accuracy and sources",
        "Great free tier with many features",
      ],
      limitations: [
        "Less versatile for creative tasks",
        "Shorter, more concise responses",
        "Limited coding capabilities",
      ],
      recommendation: "Specialized for research, fact-checking, and scenarios where source citations are critical.",
    })

    // Sort by score and return top recommendation
    results.sort((a, b) => b.score - a.score)
    setResult(results[0])
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-primary">Interactive Tool</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold">Find Your Perfect LLM</h2>
        <p className="text-muted-foreground">Answer a few questions to get personalized recommendations</p>
      </div>

      <div className="p-8">
        <div className="space-y-8">
          {/* Use Case Selection */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <FileText className="h-4 w-4" />
              What will you primarily use the LLM for?
            </Label>
            <RadioGroup value={useCase} onValueChange={(value) => setUseCase(value as UseCase)}>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="coding" id="coding" />
                  <div>
                    <div className="font-medium">Coding & Development</div>
                    <div className="text-sm text-muted-foreground">Writing code, debugging, technical docs</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="writing" id="writing" />
                  <div>
                    <div className="font-medium">Content Writing</div>
                    <div className="text-sm text-muted-foreground">Articles, blogs, creative writing</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="research" id="research" />
                  <div>
                    <div className="font-medium">Research & Analysis</div>
                    <div className="text-sm text-muted-foreground">Deep research, fact-checking, citations</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="ui-design" id="ui-design" />
                  <div>
                    <div className="font-medium">UI/UX Design</div>
                    <div className="text-sm text-muted-foreground">Design feedback, mockups, layouts</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="analysis" id="analysis" />
                  <div>
                    <div className="font-medium">Data Analysis</div>
                    <div className="text-sm text-muted-foreground">Complex reasoning, document analysis</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="general" id="general" />
                  <div>
                    <div className="font-medium">General Purpose</div>
                    <div className="text-sm text-muted-foreground">Mix of different tasks</div>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Budget Selection */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <DollarSign className="h-4 w-4" />
              What's your budget?
            </Label>
            <RadioGroup value={budget} onValueChange={(value) => setBudget(value as Budget)}>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="free" id="free" />
                  <div>
                    <div className="font-medium">Free Tier</div>
                    <div className="text-sm text-muted-foreground">$0/month</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="budget" id="budget" />
                  <div>
                    <div className="font-medium">Budget Conscious</div>
                    <div className="text-sm text-muted-foreground">Up to $20/month</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="premium" id="premium" />
                  <div>
                    <div className="font-medium">Premium</div>
                    <div className="text-sm text-muted-foreground">Any price for best quality</div>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Priority Selection */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <Zap className="h-4 w-4" />
              What matters most to you?
            </Label>
            <RadioGroup value={priority} onValueChange={(value) => setPriority(value as Priority)}>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="speed" id="speed" />
                  <div>
                    <div className="font-medium">Response Speed</div>
                    <div className="text-sm text-muted-foreground">Fast answers matter most</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="quality" id="quality" />
                  <div>
                    <div className="font-medium">Output Quality</div>
                    <div className="text-sm text-muted-foreground">Accuracy and depth</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="cost" id="cost" />
                  <div>
                    <div className="font-medium">Cost Efficiency</div>
                    <div className="text-sm text-muted-foreground">Best value for money</div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="context" id="context" />
                  <div>
                    <div className="font-medium">Context Length</div>
                    <div className="text-sm text-muted-foreground">Long documents & conversations</div>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={calculateRecommendation} className="w-full" size="lg">
            Get Recommendation
          </Button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6 rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-primary">Best Match</span>
                </div>
                <h3 className="text-2xl font-bold">{result.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{result.pricing}</p>
              </div>
              <Badge variant="secondary" className="text-lg font-bold">
                {result.score}%
              </Badge>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Why this LLM is perfect for you:</h4>
              <p className="text-pretty leading-relaxed text-muted-foreground">{result.recommendation}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Key Strengths
                </h4>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      <span className="text-muted-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-amber-600">
                  <Clock className="h-4 w-4" />
                  Considerations
                </h4>
                <ul className="space-y-2">
                  {result.limitations.map((limitation, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                      <span className="text-muted-foreground">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
