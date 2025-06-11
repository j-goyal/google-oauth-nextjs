"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-indigo-100 to-pink-100 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 relative z-10">
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
              Welcome to{" "}
              <span className="text-indigo-600">GoogleOAuth</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              A beautiful app template with Google Sign-In using Next.js and
              Tailwind CSS.
            </p>
            <Link
              href="/sign-in"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Why Use Our App?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-indigo-50 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  Quick & Secure Login
                </h3>
                <p className="text-gray-600 text-sm">
                  Sign in with your Google account in seconds — no passwords, no
                  hassle.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-pink-50 shadow-sm">
                <h3 className="text-xl font-semibold text-pink-700 mb-2">
                  Smooth Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  Enjoy a clean, responsive interface built for ease of use on
                  any device.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-yellow-50 shadow-sm">
                <h3 className="text-xl font-semibold text-yellow-700 mb-2">
                  More Features Coming
                </h3>
                <p className="text-gray-600 text-sm">
                  We’re working on features like user profiles, preferences, and
                  more — stay tuned!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-6 bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  1. Sign In with Google
                </h3>
                <p className="text-sm text-gray-600">
                  {" "}
                  Use your Google account to log in — it’s fast, secure, and
                  hassle-free.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  2. Redirect to Dashboard
                </h3>
                <p className="text-sm text-gray-600">
                  Once you’re signed in, you’ll be taken to a personalized space
                  just for you.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  3. More Features Coming Soon
                </h3>
                <p className="text-sm text-gray-600">
                  We’re working on exciting features like profile management,
                  activity logs, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 text-center bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Get Started?
          </h2>
          <Link
            href="/sign-in"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            Sign In with Google
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
