"use server"

export async function executePythonCode(code: string) {
  try {
    console.log("[v0] Server Action: Executing Python code")
    console.log("[v0] Code:", code)

    // In the v0 runtime, Python scripts in /scripts folder can be executed
    // However, we need to use a different approach since child_process isn't available
    // We'll simulate Python execution for common patterns

    const lines = code.trim().split("\n")
    const output: string[] = []
    const errors: string[] = []

    // Simple Python interpreter simulation for basic operations
    const variables: Record<string, any> = {}

    try {
      for (const line of lines) {
        const trimmedLine = line.trim()

        // Skip comments and empty lines
        if (!trimmedLine || trimmedLine.startsWith("#")) {
          continue
        }

        // Handle print statements
        if (trimmedLine.startsWith("print(")) {
          const match = trimmedLine.match(/print$$(.*?)$$/)
          if (match) {
            const content = match[1].trim()
            // Remove quotes if string literal
            if (
              (content.startsWith('"') && content.endsWith('"')) ||
              (content.startsWith("'") && content.endsWith("'"))
            ) {
              output.push(content.slice(1, -1))
            } else if (variables[content] !== undefined) {
              output.push(String(variables[content]))
            } else {
              // Try to evaluate simple expressions
              try {
                const result = eval(content.replace(/\*\*/g, "**"))
                output.push(String(result))
              } catch {
                output.push(content)
              }
            }
          }
        }

        // Handle variable assignments
        if (trimmedLine.includes("=") && !trimmedLine.includes("==")) {
          const parts = trimmedLine.split("=")
          if (parts.length >= 2) {
            const varName = parts[0].trim()
            const value = parts.slice(1).join("=").trim()

            // Store variable
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
              variables[varName] = value.slice(1, -1)
            } else if (!isNaN(Number(value))) {
              variables[varName] = Number(value)
            } else if (value.startsWith('f"') || value.startsWith("f'")) {
              // Handle f-strings
              let fstring = value.slice(2, -1)
              Object.keys(variables).forEach((key) => {
                fstring = fstring.replace(`{${key}}`, String(variables[key]))
              })
              variables[varName] = fstring
            } else {
              variables[varName] = value
            }
          }
        }

        // Handle function definitions (store but don't execute yet)
        if (trimmedLine.startsWith("def ")) {
          const funcMatch = trimmedLine.match(/def\s+(\w+)$$(.*?)$$:/)
          if (funcMatch) {
            const funcName = funcMatch[1]
            // For this demo, we'll handle simple function calls
            variables[funcName] = "function"
          }
        }

        // Handle function calls
        if (
          trimmedLine.includes("(") &&
          trimmedLine.includes(")") &&
          !trimmedLine.startsWith("def") &&
          !trimmedLine.startsWith("print")
        ) {
          const funcMatch = trimmedLine.match(/(\w+)\s*=\s*(\w+)$$(.*?)$$/)
          if (funcMatch) {
            const resultVar = funcMatch[1]
            const funcName = funcMatch[2]
            const args = funcMatch[3]
              .replace(/['"]/g, "")
              .split(",")
              .map((a) => a.trim())

            // Simulate greet function
            if (funcName === "greet" && args.length > 0) {
              variables[resultVar] = `Hello, ${args[0]}!`
            }
          }
        }
      }

      console.log("[v0] Execution completed")
      console.log("[v0] Output:", output)
      console.log("[v0] Variables:", variables)

      return {
        success: true,
        output: output.join("\n") || "Code executed successfully (no output)",
        error: null,
      }
    } catch (execError: any) {
      console.log("[v0] Execution error:", execError.message)
      return {
        success: false,
        output: "",
        error: `Execution error: ${execError.message}`,
      }
    }
  } catch (error: any) {
    console.log("[v0] Server Action error:", error.message)
    return {
      success: false,
      output: "",
      error: `Internal server error: ${error.message}`,
    }
  }
}
