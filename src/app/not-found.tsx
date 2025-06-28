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
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md text-center space-y-6">
          <div className="flex justify-center animate-bounce">
            <Ghost className="h-16 w-16 text-indigo-500 drop-shadow-md" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
          <p className="text-gray-600 text-sm">
            👻 Oops! The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md"
          >
            Go To Home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
