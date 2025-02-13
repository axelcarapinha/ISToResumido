import Hero from "../components/Hero"
import Features from "../components/Features"
import UseCases from "../components/UseCases"
import Testimonials from "../components/Testimonials"
import Contact from "../components/Contact"
import FloatingNav from "../components/floating-nav"

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <FloatingNav />
      <Hero />
      <Features />
      <UseCases />
      <Testimonials />
      <Contact />
    </main>
  )
}

