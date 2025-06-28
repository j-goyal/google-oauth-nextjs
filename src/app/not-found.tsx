"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 text-center space-y-6">
        <div className="animate-bounce">
          <Ghost className="h-24 w-24 text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-pulse" />
        </div>
        <h1 className="text-6xl font-extrabold text-gray-800 drop-shadow-md">
          404
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
        >
          Go Back Home
        </Button>
      </main>
      <Footer />
    </div>
  );
}
