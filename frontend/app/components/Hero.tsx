import Image from "next/image"
import { Button } from "@/components/ui/button"
import { HeroVideoHover } from "./hero-video-hover"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Your Digital Life{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover the latest smartphones, tablets, smartwatches, and accessories.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 text-lg">
            Shop Now
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-muted/50 to-muted rounded-3xl p-8">
            <HeroVideoHover
              src="/Create_a_short_high_quality_a.mp4"         // place hero.mp4 in /public
              poster="/hero-poster.jpg"
              className="aspect-video max-h-[480px] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
