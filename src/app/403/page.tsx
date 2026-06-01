"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import AccessDeniedShimmer from "@/components/shimmer/AccessDeniedShimmer";

export default function ForbiddenPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-100 via-yellow-100 to-orange-100">
      <Header />
      <AuthLayout skeleton={<AccessDeniedShimmer />}>
        <main className="flex-1 flex items-center justify-center px-4 py-10 pt-30">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center space-y-6">
            <div className="text-6xl font-bold text-red-500">403</div>
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-red-50">
                <ShieldAlert className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              🚫 You do not have sufficient permissions to access this page.
              <br />
              If you believe this is an error, please contact your
              administrator.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="cursor-pointer"
              >
                Go Back
              </Button>

              <Button
                onClick={() => router.push("/")}
                className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              >
                Go Home
              </Button>
            </div>
          </div>
        </main>
      </AuthLayout>
      <Footer />
    </div>
  );
}
