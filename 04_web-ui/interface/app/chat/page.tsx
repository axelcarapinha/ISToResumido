"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send } from "lucide-react"

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [freeTime, setFreeTime] = useState(120) // Counter for free time (in minutes)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      setInput("")
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { role: "assistant", content: `You said: ${input}` }])
        setIsLoading(false)
      }, 1500) // Simulate a delay for the response
    }
  }

  if (!mounted) return null // Ensure no rendering until after the component mounts

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      {}
      <div className="flex flex-col space-y-4 mr-8">
        {}
        <h1 className="text-2xl font-bold mb-4">ISToresumido</h1>

        {}
        <div className="text-sm font-medium text-gray-700">
          Free Time Remaining: <span className="text-blue-500">{freeTime} minutes</span>
        </div>

        {}
        <hr className="border-t border-gray-300 w-full" />

        {}
        <div className="text-sm text-gray-700">
          Get access to more queries
        </div>

        {}
        <div className="space-x-2 flex justify-start">
          <Button className="bg-[#009fe3] hover:bg-[#007bb1] transition-colors duration-200">Login</Button>
          <Button className="bg-[#009fe3] hover:bg-[#007bb1] transition-colors duration-200">Sign Up</Button>
        </div>
      </div>

      {}
      <Card className="flex-grow m-4 flex flex-col max-w-[60%]">
        <CardContent className="flex-grow">
          <ScrollArea className="h-[calc(100vh-300px)]">
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

        {}
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow w-[60%]"
            />
            <Button
              type="submit"
              className="bg-[#34D399] hover:bg-[#10B981] text-white transition-colors duration-200"
              disabled={isLoading}
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
  )
}
