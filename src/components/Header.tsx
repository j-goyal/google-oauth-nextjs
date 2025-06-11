'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md top-0 w-full fixed z-50">
      <div className="max-w-7xl mx-auto px-3 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          GoogleOAuth
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-indigo-600 focus:outline-none"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          <Link
            href="/sign-in"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm shadow hover:bg-indigo-700 transition"
          >
            Sign In
          </Link>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow px-4 pb-4">
          <Link
            href="/sign-in"
            className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
