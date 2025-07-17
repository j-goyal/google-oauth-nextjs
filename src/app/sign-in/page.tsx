"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function SignInPage() {
  const router = useRouter();
  const { userLogged } = useAuthStore();

  useEffect(() => {
    if (userLogged.isAuthenticated) {
      router.replace("/dashboard");
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [userLogged.isAuthenticated, router]);

  const handleGoogleSignInRedirect = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/callback`;

    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=id_token&` +
      `scope=openid%20profile%20email&` +
      `nonce=${Math.random().toString(36).substring(2, 15)}`;

    window.location.href = googleAuthUrl;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20 pt-30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2 text-center">
            Welcome Back 👋
          </h2>
          <p className="text-gray-700 text-sm sm:text-md mb-6 text-center ">
            Sign in with Google to access your dashboard and manage your account
            easily.
          </p>

          <div className="mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleSignInRedirect}
              className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 w-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="h-5 w-5" />
              <span>Sign in with Google</span>
            </motion.button>
          </div>

          <ul className="text-left text-sm text-gray-600 space-y-2 mb-6 list-disc list-inside">
            <li>Secure, one-click login with Google</li>
            <li>Access your personalized dashboard</li>
            <li>No passwords to remember</li>
            <li>Quick and seamless experience</li>
          </ul>
          <div className="border-t border-gray-200 pt-4 mb-6">
            <h3 className="font-semibold text-gray-700 mb-1">
              Why Google Sign-In?
            </h3>
            <p className="text-sm text-gray-600">
              Skip the hassle of registrations and enjoy fast, secure
              authentication. We only use essential data to personalize your
              experience.
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Need help? Contact{" "}
            <a href="mailto:jating07925@gmail.com" className="underline">
              jating07925@gmail.com
            </a>
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
