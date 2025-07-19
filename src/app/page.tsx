"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { CheckCircle, Rocket, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const userLogged = useAuthStore((state) => state.userLogged);
  const isAuthResolved = useAuthStore((state) => state.isAuthResolved);
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 to-pink-100">
      <Header />

      <main className="flex-1 pt-20 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 relative z-10">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Welcome to{" "}
            <motion.span
              className="text-indigo-600 inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              GoogleOAuth
            </motion.span>
          </h1>
          <motion.p
            className="text-gray-600 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            A sleek authentication login experience with Google Sign-In.
          </motion.p>
          {!isAuthResolved ? (
            <div className="h-12 w-44 bg-gray-300 rounded-xl animate-pulse" />
          ) : (
            <Link
              href={userLogged.isAuthenticated ? "/dashboard" : "/sign-in"}
              className="inline-block bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition transform"
            >
              {userLogged.isAuthenticated ? "Go to Dashboard" : "Get Started"}
            </Link>
          )}
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Why Use Our App?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <motion.div
                className="p-6 rounded-xl bg-indigo-100 shadow-sm hover:shadow-md transition"
                whileHover={{ scale: 1.05 }}
              >
                <ShieldCheck className="text-indigo-600 w-8 h-8 mb-2 mx-auto" />
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  Quick & Secure Login
                </h3>
                <p className="text-gray-600 text-sm">
                  Sign in with your Google account in seconds — no passwords, no
                  hassle.
                </p>
              </motion.div>
              <motion.div
                className="p-6 rounded-xl bg-pink-50 shadow-sm hover:shadow-md transition"
                whileHover={{ scale: 1.05 }}
              >
                <Rocket className="text-pink-600 w-8 h-8 mb-2 mx-auto" />
                <h3 className="text-xl font-semibold text-pink-700 mb-2">
                  Smooth Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  Enjoy a clean, responsive interface built for ease of use on
                  any device.
                </p>
              </motion.div>
              <motion.div
                className="p-6 rounded-xl bg-yellow-50 shadow-sm hover:shadow-md transition"
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="text-yellow-600 w-8 h-8 mb-2 mx-auto" />
                <h3 className="text-xl font-semibold text-yellow-700 mb-2">
                  More Features Coming
                </h3>
                <p className="text-gray-600 text-sm">
                  We’re working on features like user profiles, preferences, and
                  more — stay tuned!
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  1. Sign In with Google
                </h3>
                <p className="text-sm text-gray-600">
                  Use your Google account to log in — it’s fast, secure, and
                  hassle-free.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  2. Redirect to Dashboard
                </h3>
                <p className="text-sm text-gray-600">
                  Once you’re signed in, you’ll be taken to a personalized space
                  just for you.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  3. More Features Coming Soon
                </h3>
                <p className="text-sm text-gray-600">
                  We’re working on exciting features like profile management,
                  activity logs, and more.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 text-center bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Get Started?
          </h2>
          {!isAuthResolved ? (
            <div className="h-12 w-56 bg-gray-300 rounded-xl animate-pulse mx-auto" />
          ) : (
            <Link
              href={userLogged.isAuthenticated ? "/dashboard" : "/sign-in"}
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
            >
              {userLogged.isAuthenticated
                ? "Go to Dashboard"
                : "Sign In with Google"}
            </Link>
          )}
        </section>

        {/* FAQ Section */}
        <section className="bg-indigo-100 py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <details className="bg-white p-4 rounded-lg shadow mb-4">
              <summary className="cursor-pointer font-medium text-indigo-700">
                Is this secure?
              </summary>
              <p className="text-gray-600 mt-2 text-sm">
                Yes, we use Google OAuth which ensures your data is protected.
              </p>
            </details>
            <details className="bg-white p-4 rounded-lg shadow mb-4">
              <summary className="cursor-pointer font-medium text-indigo-700">
                Is this free to use?
              </summary>
              <p className="text-gray-600 mt-2 text-sm">
                Yes! It’s completely free for Google OAuth login integration.
              </p>
            </details>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
