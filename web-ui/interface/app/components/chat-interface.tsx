"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send } from "lucide-react"

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Simple Chat Interface</h1>
        <div className="space-x-2">
          <Button className="bg-[#009fe3] hover:bg-[#007bb1] transition-colors duration-200">Login</Button>
          <Button className="bg-[#009fe3] hover:bg-[#007bb1] transition-colors duration-200">Sign Up</Button>
        </div>
      </header>

      <Card className="flex-grow m-4 flex flex-col">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
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
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
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

