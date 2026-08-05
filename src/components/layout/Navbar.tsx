'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLink =
    'text-[15px] font-medium text-[#E9EDE7] hover:text-white transition-colors duration-200';

  return (
    <nav className="sticky top-0 z-50 bg-[#16281F] border-b border-[#2A4232]">
      <div
        className="mx-auto w-full max-w-[1400px]"
        style={{ paddingLeft: 'max(24px, 4vw)', paddingRight: 'max(24px, 4vw)' }}
      >
        <div className="flex h-[68px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md bg-[#E3A23D] text-[#16281F] text-base transition-transform duration-200 group-hover:rotate-6">
              🌱
            </span>
            <span
              className="text-[22px] font-bold tracking-tight text-white"
              style={{ fontFamily: 'var(--font-fraunces, serif)' }}
            >
              EcoSpark
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            <Link href="/ideas" className={navLink}>Ideas</Link>
            <Link href="/blog" className={navLink}>Blog</Link>
            <Link href="/about" className={navLink}>About</Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-5 pl-2 border-l border-[#2A4232]">
                <Link href="/dashboard" className={navLink}>Dashboard</Link>

                {user?.role === 'ADMIN' && (
                  <Link
                    href="/admin/dashboard"
                    className="rounded-tl-lg rounded-br-lg rounded-tr-sm rounded-bl-sm bg-[#2A4232] px-3.5 py-1.5 text-sm font-semibold text-[#E3A23D] hover:bg-[#34503E] transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}

                <div className="relative group">
                  <button className="flex items-center gap-2 text-[15px] font-medium text-[#E9EDE7] hover:text-white transition-colors duration-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2A4232] text-sm">
                      👤
                    </span>
                    <span>{user?.name}</span>
                  </button>

                  <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute right-0 mt-3 w-52 origin-top-right rounded-xl border border-[#EAE6D8] bg-white shadow-xl transition-all duration-150 overflow-hidden">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#1C2620] hover:bg-[#F1F4EC] transition-colors"
                    >
                      👤 Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-[#B0473C] hover:bg-[#FBEDEB] transition-colors"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-2 border-l border-[#2A4232]">
                <Link
                  href="/login"
                  className="text-[15px] font-medium text-[#E9EDE7] hover:text-white transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="rounded-tl-lg rounded-br-lg rounded-tr-sm rounded-bl-sm bg-[#E3A23D] px-4 py-2 text-sm font-bold text-[#16281F] hover:bg-[#EEB35A] transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-[#2A4232] transition-colors"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition-transform duration-200 ${
                  mobileOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-5 bg-current transition-opacity duration-200 ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-[2px] w-5 bg-current transition-transform duration-200 ${
                  mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-t border-[#2A4232] ${
          mobileOpen ? 'max-h-[26rem]' : 'max-h-0 border-t-0'
        }`}
      >
        <div
          className="flex flex-col gap-1 py-4"
          style={{ paddingLeft: 'max(24px, 4vw)', paddingRight: 'max(24px, 4vw)' }}
        >
          <Link onClick={() => setMobileOpen(false)} href="/ideas" className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#E9EDE7] hover:bg-[#2A4232]">Ideas</Link>
          <Link onClick={() => setMobileOpen(false)} href="/blog" className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#E9EDE7] hover:bg-[#2A4232]">Blog</Link>
          <Link onClick={() => setMobileOpen(false)} href="/about" className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#E9EDE7] hover:bg-[#2A4232]">About</Link>

          {isAuthenticated ? (
            <>
              <Link onClick={() => setMobileOpen(false)} href="/dashboard" className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#E9EDE7] hover:bg-[#2A4232]">Dashboard</Link>
              {user?.role === 'ADMIN' && (
                <Link onClick={() => setMobileOpen(false)} href="/admin/dashboard" className="rounded-lg px-3 py-3 text-[15px] font-semibold text-[#E3A23D] hover:bg-[#2A4232]">Admin</Link>
              )}
              <Link onClick={() => setMobileOpen(false)} href="/profile" className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#E9EDE7] hover:bg-[#2A4232]">👤 Profile</Link>
              <button
                onClick={() => { setMobileOpen(false); logout(); }}
                className="rounded-lg px-3 py-3 text-left text-[15px] font-medium text-[#F1A398] hover:bg-[#2A4232]"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <div className="mt-2 flex flex-col gap-2 border-t border-[#2A4232] pt-3">
              <Link
                onClick={() => setMobileOpen(false)}
                href="/login"
                className="rounded-lg px-3 py-3 text-center text-[15px] font-semibold text-white border border-[#2A4232] hover:bg-[#2A4232]"
              >
                Log In
              </Link>
              <Link
                onClick={() => setMobileOpen(false)}
                href="/register"
                className="rounded-lg px-3 py-3 text-center text-[15px] font-bold text-[#16281F] bg-[#E3A23D] hover:bg-[#EEB35A]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}