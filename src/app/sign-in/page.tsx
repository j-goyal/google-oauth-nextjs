'use client';

import { GoogleLogin } from '@react-oauth/google';
//import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignInPage() {
  //const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-gray-700 text-sm sm:text-md mb-6">
            Sign in with Google to access your dashboard and manage your account with ease.
          </p>

          <div className="mb-6">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse)
                // send response to backend to create session
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>

          <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
            <li>✅ Secure, one-click login with Google</li>
            <li>✅ Access your personalized dashboard</li>
            <li>✅ No passwords to remember</li>
            <li>✅ Quick and seamless experience</li>
          </ul>
          <div className="border-t border-gray-200 pt-4 mb-6">
            <h3 className="font-semibold text-gray-700 mb-1">Why Google Sign-In?</h3>
            <p className="text-sm text-gray-600">
              Skip the hassle of registrations and enjoy fast, secure authentication.
              We only use the essential data to personalize your experience.
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Need help? Contact <a href="mailto:jating07925@gmail.com" className="underline">jating07925@gmail.com</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
