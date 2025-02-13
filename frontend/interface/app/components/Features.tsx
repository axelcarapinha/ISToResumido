"use client"

import { motion } from "framer-motion"
import { Zap, Clock, Brain, Lock, Globe, Sparkles } from "lucide-react"

const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Save Time",
    description: "Reduce reading time by up to 80% while retaining key information.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Secure & Private",
    description: "Your questions remain anonymous to us, even when you are logged in.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Multi-Language Support",
    description: "The quality of the question may downgrade, but it's possible",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Get summaries in seconds.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Accuracy",
    description: "It selects the most relevant information before answering your question.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Varied topics",
    description: "Internal regulations, general information, and more!",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-neutral-DEFAULT text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-light p-6 rounded-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary-DEFAULT rounded-full w-12 h-12 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

