"use client"

import { motion } from "framer-motion"
import { BookOpen, Newspaper, Briefcase, GraduationCap } from "lucide-react"

const useCases = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Institutional regulations summarized",
    description:
      "Summarized information that generic LLMs normally do not have access to.",
  },
  {
    icon: <Newspaper className="w-8 h-8" />,
    title: "Unlock authorized sources",
    description:
      "By authenticating with your Fenix credentials, you can get more sources for your responses.",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Help the Academic services",
    description:
      "Easily inform yourself before asking simple questions. Free them for the difficult ones.",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "In Development",
    description:
      "We recommend using this a filtering tool. Dig deeper into the sources when needed.",
  },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 bg-secondary-DEFAULT">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Real-World Applications</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover how O Resumido can transform your workflow across different scenarios
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg"
            >
              <div
                className={`${
                  useCase.title === "Content limitations" || useCase.title === "In Development"
                    ? "bg-[#FF4D4D]"
                    : "bg-secondary-light"
                } rounded-full w-16 h-16 flex items-center justify-center mb-6 text-white`}
              >
                {useCase.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-DEFAULT">{useCase.title}</h3>
              <p className="text-neutral-light">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
