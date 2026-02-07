import NameForm from '@/components/NameForm'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-6">
            Make Her Valentine's Day
            <br />
            Unforgettable 💖
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Create a personalized Valentine surprise in 10 seconds.
            <br />
            No coding needed.
          </p>
        </div>

        {/* Name Form */}
        <NameForm />

        {/* Demo Link */}
        <div className="text-center mt-8">
          <Link
            href="/v/demo"
            className="text-pink-600 hover:text-pink-700 underline font-medium"
          >
            See a live demo →
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-3xl shadow-xl mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              ✍️
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Enter Her Name</h3>
            <p className="text-gray-600">Just type her name in the form above</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🔗
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Get Your Link</h3>
            <p className="text-gray-600">Receive a unique shareable link instantly</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              💕
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Watch Her Smile</h3>
            <p className="text-gray-600">Share it and make her day special</p>
          </div>
        </div>
      </section>

      {/* Features/Preview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          What She'll See
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/ss1.png"
              alt="Valentine Question"
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Romantic Question</h3>
              <p className="text-gray-600">A playful proposal with her name</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/ss2.png"
              alt="Pleading Animation"
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Fun Interactions</h3>
              <p className="text-gray-600">Cute animations if she clicks "No"</p>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Star CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Love This Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Give it a star on GitHub and help others create magical moments!
          </p>
          <a
            href="https://github.com/shivamtiwari3/valentinespecial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            ⭐ Star on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p className="mb-2">
          💖 Made with love by{' '}
          <a
            href="https://github.com/shivamtiwari3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 font-semibold"
          >
            Shivam Tiwari
          </a>
        </p>
        <p>
          <a
            href="https://www.instagram.com/shivamtiwari.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-600"
          >
            @shivamtiwari.in
          </a>
        </p>
      </footer>
    </main>
  )
}
