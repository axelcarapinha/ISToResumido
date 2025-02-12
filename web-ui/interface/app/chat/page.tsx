"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, ArrowRight } from "lucide-react"
import { toast } from "sonner"

const FREE_QUESTIONS_LIMIT = 3
const INITIAL_FREE_TIME = 120
const TIME_PER_MESSAGE = 2

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [freeTime, setFreeTime] = useState(INITIAL_FREE_TIME)
  const [questionCount, setQuestionCount] = useState(0)
  const [response, setResponse] = useState("") // Added state variable
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    if (questionCount >= FREE_QUESTIONS_LIMIT) {
      toast.error("You've reached your free question limit.")
      setIsLoading(false)
      return
    }

    setMessages([...messages, { role: "user", content: input }])
    const response = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: input,
      }),
    })
    const data = await response.json()
    setMessages([...messages, { role: "user", content: input }, { role: "assistant", content: data.answer }])
    setResponse(data.answer)
    setQuestionCount(questionCount + 1)
    setFreeTime(Math.max(0, freeTime - TIME_PER_MESSAGE))
    setInput("")
    setIsLoading(false)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white relative">
      <Button
        className="absolute top-4 left-4 bg-[#00A3FF] hover:bg-[#0082CC] text-white transition-all duration-200 px-6 py-2 rounded-full text-sm font-medium"
        onClick={() => router.push("/about")}
      >
        About
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>

      <div className="flex justify-center items-center p-8 min-h-screen">
        <div className="flex flex-col space-y-4 mr-8 min-w-[200px]">
          <h1 className="text-2xl font-bold">ISToresumido</h1>

          <div className="text-sm text-gray-600">
            Questions Remaining:{" "}
            <span className="text-[#009fe3] font-medium">{Math.max(0, FREE_QUESTIONS_LIMIT - questionCount)}</span>
          </div>

          <hr className="border-t border-gray-200" />

          <div className="text-sm text-gray-600">Get access to more queries</div>

          <div className="flex flex-col space-y-2">
            <Button
              className="bg-[#00A3FF] hover:bg-[#0082CC] text-white transition-all duration-200 px-6 py-2 rounded-full text-sm font-medium"
              onClick={() => router.push("/login")}
            >
              Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-[#00A3FF] text-[#00A3FF] hover:bg-[#00A3FF] hover:text-white transition-all duration-200 px-6 py-2 rounded-full text-sm font-medium"
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </Button>
          </div>
        </div>

        <Card className="flex flex-col w-[800px] min-h-[600px] shadow-sm">
          <CardContent className="flex-grow p-4">
            <ScrollArea className="h-[calc(100vh-200px)]">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                  >
                    {message.content}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <span className="inline-block p-2 rounded-lg bg-gray-200">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </span>
                </div>
              )}
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
                disabled={isLoading || questionCount >= FREE_QUESTIONS_LIMIT}
              />
              <Button
                type="submit"
                className="bg-[#34D399] hover:bg-[#10B981] text-white transition-colors duration-200"
                disabled={isLoading || questionCount >= FREE_QUESTIONS_LIMIT}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Send
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

