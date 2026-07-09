'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold hover:text-green-100 transition duration-300">
          🌱 EcoSpark
        </Link>

        <div className="flex items-center space-x-8">
          <Link href="/ideas" className="hover:text-green-100 transition duration-300 font-medium">
            Ideas
          </Link>
          <Link href="/blog" className="hover:text-green-100 transition duration-300 font-medium">
            Blog
          </Link>
          <Link href="/about" className="hover:text-green-100 transition duration-300 font-medium">
            About
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="hover:text-green-100 transition duration-300 font-medium">
                Dashboard
              </Link>
              {user?.role === 'ADMIN' && (
                <Link href="/admin/dashboard" className="bg-green-800 px-3 py-1 rounded-lg hover:bg-green-900 transition duration-300 font-medium">
                  Admin
                </Link>
              )}
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-green-100 transition duration-300 font-medium">
                  <span>👤 {user?.name}</span>
                </button>
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl">
                  <Link
                    href="/profile"
                    className="block px-4 py-3 hover:bg-green-50 transition duration-300 rounded-t-lg"
                  >
                    👤 Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 transition duration-300 rounded-b-lg"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition duration-300"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-green-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-900 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
