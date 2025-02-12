"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const redirectToChat = () => {
    if (isClient) {
      router.push('/chat')
    }
  }

  const redirectToDemo = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
  }

  if (!isClient) return null

  return (
    <section className="min-h-screen relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-neutral-DEFAULT">
              <a href="https://tecnico.ulisboa.pt/pt/">IST's</a> information
              <span className="text-primary-DEFAULT"><br />1 prompt away</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-neutral-light">
              AI-powered summarization
            </h2>
            <p className="text-lg md:text-xl text-neutral-light mb-8 max-w-2xl mx-auto lg:mx-0">
              Avoid countless time finding that specific regulation. <br />
              Know the sources for a deeper inspection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                className="px-8 py-4 bg-[#00A3FF] text-white rounded-full text-lg font-medium transition-colors duration-300 hover:bg-[#0082CC]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={redirectToChat}
              >
                Try for Free
                <ArrowRight className="w-5 h-5 inline-block ml-2" />
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-[#00A3FF] text-[#00A3FF] rounded-full text-lg font-medium transition-colors duration-300 hover:bg-[#00A3FF] hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={redirectToDemo}
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-2xl mx-auto aspect-square">
              <Image
                src="/logo_istoresumido.png"
                alt="ISToresumido logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-screen bg-secondary-light opacity-10 -skew-x-12 transform origin-top-right" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-primary-light opacity-10 -skew-x-12 transform origin-bottom-left" />
    </section>
  )
}
