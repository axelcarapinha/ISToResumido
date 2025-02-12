"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Joseph Cooper",
    role: "Pilot",
    company: "NASA",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "ISToresumido helped us quickly analyze data from different planets, streamlining our mission and saving valuable time.",
    rating: 5,
  },
  {
    name: "Dr. TARS",
    role: "AI Assistant",
    company: "NASA",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "I'm deeply impressed by its capabilities — almost on par with my own programs.",
    rating: 4,
  },
  {
    name: "Murph Cooper",
    role: "Scientist",
    company: "NASA",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "One thing only a few people know is that I decoded the gravitational anomaly thanks to the time I saved with ISToresumido. Highly recommend it!",
    rating: 5,
  }
]


export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-neutral-DEFAULT text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-light p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-300 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary-DEFAULT fill-current" />
                ))}
              </div>
              <p className="text-gray-300">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

