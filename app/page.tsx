import NameForm from '@/components/NameForm'
import Testimonials from '@/components/Testimonials'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 relative overflow-hidden">
      {/* Enhanced floating hearts background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 text-6xl animate-float" style={{ animationDelay: '0s' }}>💕</div>
        <div className="absolute top-40 right-20 text-5xl animate-float" style={{ animationDelay: '1s' }}>💖</div>
        <div className="absolute bottom-32 left-1/4 text-4xl animate-float" style={{ animationDelay: '2s' }}>❤️</div>
        <div className="absolute bottom-20 right-1/3 text-5xl animate-float" style={{ animationDelay: '1.5s' }}>💗</div>
        <div className="absolute top-1/2 left-1/2 text-6xl animate-float" style={{ animationDelay: '3s' }}>💝</div>
      </div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-12 sm:py-16 md:py-24 animate-fade-in">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-2" style={{ fontFamily: 'var(--font-outfit)' }}>
            <span className="gradient-text block">
              Make Her Valentine's Day
            </span>
            <span className="gradient-text block mt-2">
              Unforgettable 💖
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            Create a <span className="font-semibold text-pink-600">personalized Valentine surprise</span> in 10 seconds.
            <br className="hidden sm:block" />
            <span className="block sm:inline"> No coding needed.</span>
          </p>

          {/* Enhanced trust badges with hover effects */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 text-sm sm:text-base px-4">
            <div className="flex items-center gap-2 glass px-3 sm:px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-premium hover:scale-105 cursor-default">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="text-gray-700 font-medium">4.9/5</span>
            </div>
            <div className="flex items-center gap-2 glass px-3 sm:px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-premium hover:scale-105 cursor-default">
              <span className="text-pink-500 animate-pulse">💕</span>
              <span className="text-gray-700 font-medium">200+ Happy Couples</span>
            </div>
            <div className="flex items-center gap-2 glass px-3 sm:px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-premium hover:scale-105 cursor-default">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700 font-medium">100% Free</span>
            </div>
          </div>
        </div>

        {/* Name Form */}
        <NameForm />

        {/* Enhanced Demo Link */}
        <div className="text-center mt-6 sm:mt-8 animate-bounce-smooth">
          <Link
            href="/v/demo"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-premium transform hover:scale-110 px-5 py-2.5 rounded-full hover:bg-pink-50 border-2 border-transparent hover:border-pink-200 group"
          >
            <span>✨ See a live demo</span>
            <span className="transform transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className="relative container mx-auto px-4 py-12 sm:py-16 mb-12 sm:mb-16">
        <div className="glass-strong rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 animate-fade-in-scale">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12" style={{ fontFamily: 'var(--font-outfit)' }}>
            How It Works ✨
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4 shadow-lg transform transition-premium group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-2xl">
                ✍️
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 transition-premium group-hover:text-pink-600" style={{ fontFamily: 'var(--font-outfit)' }}>1. Enter Her Name</h3>
              <p className="text-gray-600 px-2 leading-relaxed">Just type her name in the form above</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4 shadow-lg transform transition-premium group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-2xl">
                🔗
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 transition-premium group-hover:text-purple-600" style={{ fontFamily: 'var(--font-outfit)' }}>2. Get Your Link</h3>
              <p className="text-gray-600 px-2 leading-relaxed">Receive a unique shareable link instantly</p>
            </div>

            <div className="text-center group sm:col-span-2 md:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4 shadow-lg transform transition-premium group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-2xl">
                💕
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 transition-premium group-hover:text-red-600" style={{ fontFamily: 'var(--font-outfit)' }}>3. Watch Her Smile</h3>
              <p className="text-gray-600 px-2 leading-relaxed">Share it and make her day special</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Preview */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12 px-2" style={{ fontFamily: 'var(--font-outfit)' }}>
          What She'll See ✨
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transform transition-premium hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group">
            <div className="relative overflow-hidden">
              <Image
                src="/ss1.png"
                alt="Valentine Question"
                width={600}
                height={400}
                className="w-full h-auto transform transition-premium group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-premium"></div>
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 group-hover:text-pink-600 transition-premium" style={{ fontFamily: 'var(--font-outfit)' }}>Romantic Question 💌</h3>
              <p className="text-gray-600 leading-relaxed">A playful proposal with her name personalized just for her</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transform transition-premium hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group">
            <div className="relative overflow-hidden">
              <Image
                src="/ss2.png"
                alt="Pleading Animation"
                width={600}
                height={400}
                className="w-full h-auto transform transition-premium group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-premium"></div>
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition-premium" style={{ fontFamily: 'var(--font-outfit)' }}>Fun Interactions 🎭</h3>
              <p className="text-gray-600 leading-relaxed">Cute animations if she clicks "No" - guaranteed to make her laugh!</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transform transition-premium hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group sm:col-span-2 lg:col-span-1">
            <div className="relative overflow-hidden">
              <Image
                src="/ss3.png"
                alt="Final Romantic Screen"
                width={600}
                height={400}
                className="w-full h-auto transform transition-premium group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-premium"></div>
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 group-hover:text-red-600 transition-premium" style={{ fontFamily: 'var(--font-outfit)' }}>Romantic Finale 💖</h3>
              <p className="text-gray-600 leading-relaxed">Beautiful hearts animation with your photo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* GitHub Star CTA - Enhanced */}
      <section className="relative container mx-auto px-4 py-12 sm:py-16 mb-12 sm:mb-16">
        <div className="glass-strong rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center animate-fade-in-scale border-2 border-purple-100">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
            Love This Project? 🌟
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            Give it a star on GitHub and help others create magical moments!
          </p>
          <a
            href="https://github.com/shivamtiwari3/valentinespecial"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-base sm:text-lg hover:from-purple-600 hover:to-pink-600 transition-premium transform hover:scale-110 active:scale-95 shadow-xl hover:shadow-2xl"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span>Star on GitHub</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 border-t border-pink-100">
        <p className="mb-4 text-sm sm:text-base">
          💖 Made with love by{' '}
          <a
            href="https://github.com/shivamtiwari3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
          >
            Shivam Tiwari
          </a>
        </p>

        {/* Enhanced Social Links */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <a
            href="https://github.com/shivamtiwari3"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-premium px-4 py-2 rounded-full hover:bg-gray-100"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-125 group-hover:rotate-12 transition-premium" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm sm:text-base font-medium">GitHub</span>
          </a>

          <a
            href="https://www.instagram.com/shivamtiwari.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-premium px-4 py-2 rounded-full hover:bg-pink-50"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-125 group-hover:rotate-12 transition-premium" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm sm:text-base font-medium">Instagram</span>
          </a>
        </div>
      </footer>
    </main>
  )
}
