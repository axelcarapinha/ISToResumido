"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"; // Corrected to use NEXT_PUBLIC_

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setMounted(true); // Ensures the component is mounted before rendering
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;
    try {
      setMessages((prev) => [...prev, { role: "user", content: input }]);
      setInput("");
      setIsLoading(true);
      setQuestionCount((prev) => prev + 1);

      const response = await fetch(`${API_URL}/query`, {  // Ensure correct endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const responseMessage = data.answer || "I received your message but couldn't generate a proper response.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responseMessage,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const FREE_QUESTIONS_LIMIT = 5; // Example value

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-8">
      <div className="flex flex-col space-y-4 mr-8 min-w-[200px]">
        <h1 className="text-2xl font-bold">ISToresumido</h1>

        <hr className="border-t border-gray-200" />

        <div className="text-sm text-gray-600">Get access to customized responses:</div>

        <div className="space-x-2 flex">
          <Button
            className="bg-[#009fe3] hover:bg-[#007bb1] transition-colors duration-200"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            className="bg-[#009fe3] hover:bg-[#007bb1] transition-colors duration-200"
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
  );
}
