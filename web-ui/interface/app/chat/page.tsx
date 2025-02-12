"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [copied, setCopied] = useState<string | null>(null); // Track which message is copied
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

      const response = await fetch(`${API_URL}/query`, {  
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

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(
      () => {
        toast.success("Response copied to clipboard!");
        setCopied(content);
        setTimeout(() => setCopied(null), 2000);
      },
      (err) => toast.error("Failed to copy response: " + err)
    );
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-8 relative">
      {/* Top Header Section */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-2xl font-bold">
          ISToresumido
        </Link>
      </div>

      <div className="absolute top-4 right-4 flex flex-col items-start">
        {/* Text near login button, shifted right */}
        <div className="mr-4 text-sm text-gray-600">
          Get access to more sources for your prompts:
        </div>

        {/* Login button below the text */}
        <Button
          variant="outline"
          className="w-full max-w-[200px] mt-2 z-10"
          onClick={() => router.push("/login")}
        >
          <Image
            src="/logo_ist-no-background.png"
            alt="FenixID Logo"
            width={24}
            height={24}
            className="mr-2"
          />
          Login with FenixID
        </Button>
      </div>

      {/* Chat Interface */}
      <Card className="flex flex-col w-[800px] min-h-[600px] shadow-sm z-10">
        <CardContent className="flex-grow p-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`} // Align user to the right
              >
                <div className="flex items-center">
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {message.content}
                  </span>
                  {message.role === "assistant" && (
                    <Button
                      variant="outline"
                      className={`ml-2 p-1 text-xs ${copied === message.content ? 'bg-green-500 text-white' : ''}`}
                      onClick={() => handleCopy(message.content)}
                    >
                      {copied === message.content ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span className="ml-1">Copied</span>
                        </>
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
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
            />
            <Button
              type="submit"
              className="bg-[#34D399] hover:bg-[#10B981] text-white transition-colors duration-200"
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
