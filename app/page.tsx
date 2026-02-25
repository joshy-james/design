import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  )
}
