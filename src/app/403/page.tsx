"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import AccessDeniedShimmer from "@/components/shimmer/403Shimmer";

export default function ForbiddenPage() {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-100 via-yellow-100 to-orange-100">
        <Header />
        <AuthLayout skeleton={<AccessDeniedShimmer />}>
          <main className="flex-1 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md text-center space-y-6">
              <div className="flex justify-center">
                <ShieldAlert className="h-16 w-16 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                Access Denied
              </h1>
              <p className="text-gray-600 text-sm">
                🚫 You do not have permission to view this page. This section is
                for{" "}
                <span className="font-medium text-red-600">admins only</span>.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-md"
              >
                Go to Home
              </Button>
            </div>
          </main>
        </AuthLayout>
        <Footer />
      </div>
    </>
  );
}
