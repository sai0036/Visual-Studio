"use client"
import { posters,sliders } from "@/lib/exports"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, ArrowRight, Search, Menu, X } from "lucide-react"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Featured slider data

  // Digital poster collection data
  // const sliders = [
  //   { id: 1, title: "Cybernetic Vision", artist: "Lena Park", category: "Sci-Fi" },
  //   { id: 2, title: "Digital Flora", artist: "Jordan Blake", category: "Abstract" },
  //   { id: 3, title: "Pixel Symphony", artist: "Marco Diaz", category: "Pixel Art" },
  //   { id: 4, title: "Neural Networks", artist: "Aisha Johnson", category: "AI Art" },
  //   { id: 5, title: "Fractalized Thoughts", artist: "Theo Wright", category: "Fractal" },
  //   { id: 6, title: "Hyperspace Junction", artist: "Nina Rodriguez", category: "Sci-Fi" },
  //   { id: 7, title: "Crypto Constellations", artist: "David Chen", category: "Crypto Art" },
  //   { id: 8, title: "Virtual Reality Dreams", artist: "Emma Wilson", category: "VR Art" },
  // ]

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliders.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [sliders.length])

  // Next/Previous slide handlers
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliders.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliders.length - 1 : prev - 1))
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <header className="bg-black/50 backdrop-blur-md fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Visual<span className="text-blue-500">Hub</span>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-white hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-blue-400 transition-colors">
              <Search size={20} />
            </button>
            <Link href="#" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-md"
            >
              <nav className="container mx-auto px-4 py-4">
                <ul className="space-y-4">
                  <li>
                    <Link href="/" className="block text-white hover:text-blue-400 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block text-white hover:text-blue-400 transition-colors">
                      Explore
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block text-white hover:text-blue-400 transition-colors">
                      Artists
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block text-white hover:text-blue-400 transition-colors">
                      Collections
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block text-white hover:text-blue-400 transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Sign In
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Slider Section */}
      <section className="relative h-screen hidden lg:block">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="h-full w-full relative"
            >
              <Image
                src={sliders[currentSlide].url || "/placeholder.svg"}
                alt={sliders[currentSlide].name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{sliders[currentSlide].name}</h1>
              <p className="text-xl text-gray-300 mb-2">Category: {sliders[currentSlide].category}</p>
              <p className="text-gray-300 mb-6">{sliders[currentSlide].description}</p>
              {/* <Link
                href={`/poster/${sliders[currentSlide].id}`}
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Artwork <ArrowRight className="ml-2 h-5 w-5" />
              </Link> */}
            </motion.div>
          </AnimatePresence>

          {/* Slider controls */}
          <div className="absolute bottom-10 right-10 flex space-x-4">
            <button
              onClick={prevSlide}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Slider indicators */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {sliders.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-500" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="lg:text-3xl text-xl font-bold text-center w-full">Featured Digital Art</h2>
            {/* <Link href="#" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              Explore all <ChevronRight className="ml-1 h-4 w-4" />
            </Link> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posters.map((poster) => (
              <motion.div
                key={poster.id}
                className="bg-gray-800 rounded-xl overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-64 w-full group">
                  <Image
                    src={poster.url}
                    alt={poster.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Link
                    href={`/poster/${poster.id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      View Details
                    </span>
                  </Link>
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-900 text-blue-200 rounded-full mb-2">
                    {poster.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-1">{poster.name}</h3>
                  <p className="text-gray-400">by {poster.creator}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Spotlight */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Artist Spotlight</h2>

          <div className="flex flex-col md:flex-row items-center bg-gray-800 rounded-xl overflow-hidden">
            <div className="md:w-1/2 relative h-80 md:h-auto">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Featured Artist"
                alt="Featured Artist"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-2">Alex Rivera</h3>
              <p className="text-gray-400 mb-6">Digital Artist & Illustrator</p>
              <p className="text-gray-300 mb-6">
                Alex Rivera is a digital artist specializing in cyberpunk and futuristic digital landscapes. With over a
                decade of experience in digital media, his work explores the intersection of technology, humanity, and
                urban environments.
              </p>
              <Link href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                View artist profile <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Submit Your Digital Artwork</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Are you a digital artist? Submit your work and join our community of creative minds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#"
              className="bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Submit Artwork
            </Link>
            <Link
              href="#"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                DIGITAL<span className="text-blue-500">sliders</span>
              </h3>
              <p className="text-gray-400 mb-4">Showcasing the best in digital poster art from around the world.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Trending
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    New Releases
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Popular Artists
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Collections
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Artist Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-4">Stay updated with the latest digital artwork and news.</p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} sliders. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

