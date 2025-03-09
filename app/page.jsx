import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <header className="w-full flex flex-col items-center py-24 text-center bg-gradient-to-br from-purple-600 via-blue-500 to-teal-500 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={"/landingpage.jpg"} // Replace with an AI/tech-themed image
            alt="AI Quiz Background"
            layout="fill"
            objectFit="cover"
            className="opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-lg tracking-tight">
            Master Your Mind
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl text-blue-100 font-light leading-relaxed">
            Challenge yourself with our AI-powered quiz that adapts to your
            skill level in real-time.
          </p>
          <Link href="/dashboard">
            <Button className="px-8 py-4 text-lg font-semibold bg-teal-400 text-gray-900 rounded-full hover:bg-teal-300 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Quizzing Now
            </Button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 text-center max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">
          Why Our Quiz Stands Out
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-500">
            <h3 className="text-2xl font-semibold mb-4 text-purple-600">
              Adaptive Difficulty
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Questions evolve based on your answers—easy or tough, it’s up to
              you!
            </p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              AI-Powered Insights
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get personalized feedback and tips from our smart AI engine.
            </p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-teal-500">
            <h3 className="text-2xl font-semibold mb-4 text-teal-600">
              Engaging Experience
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Sleek design and interactive quizzes keep you hooked for hours.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 w-full bg-gradient-to-r from-purple-700 to-teal-600 text-center text-white">
        <p className="text-sm font-medium">
          © 2025 AI Quiz App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
