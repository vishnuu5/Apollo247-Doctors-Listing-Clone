"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ShoppingCart, User } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-32">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-[#02475b]">
                    Apollo
                  </span>
                  <span className="text-2xl font-bold text-[#fc9916]">247</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#"
              className="text-[#02475b] hover:text-[#fc9916] font-medium"
            >
              Doctors
            </Link>
            <Link
              href="#"
              className="text-[#02475b] hover:text-[#fc9916] font-medium"
            >
              Pharmacy
            </Link>
            <Link
              href="#"
              className="text-[#02475b] hover:text-[#fc9916] font-medium"
            >
              Lab Tests
            </Link>
            <Link
              href="#"
              className="text-[#02475b] hover:text-[#fc9916] font-medium"
            >
              Health Records
            </Link>
          </nav>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-[#02475b] hover:text-[#fc9916]">
              <Search size={20} />
            </button>
            <button className="p-2 text-[#02475b] hover:text-[#fc9916]">
              <ShoppingCart size={20} />
            </button>
            <button className="p-2 text-[#02475b] hover:text-[#fc9916]">
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#02475b]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-3">
              <Link
                href="#"
                className="text-[#02475b] hover:text-[#fc9916] font-medium"
              >
                Doctors
              </Link>
              <Link
                href="#"
                className="text-[#02475b] hover:text-[#fc9916] font-medium"
              >
                Pharmacy
              </Link>
              <Link
                href="#"
                className="text-[#02475b] hover:text-[#fc9916] font-medium"
              >
                Lab Tests
              </Link>
              <Link
                href="#"
                className="text-[#02475b] hover:text-[#fc9916] font-medium"
              >
                Health Records
              </Link>
              <div className="flex items-center space-x-4 pt-2">
                <button className="p-2 text-[#02475b] hover:text-[#fc9916]">
                  <Search size={20} />
                </button>
                <button className="p-2 text-[#02475b] hover:text-[#fc9916]">
                  <ShoppingCart size={20} />
                </button>
                <button className="p-2 text-[#02475b] hover:text-[#fc9916]">
                  <User size={20} />
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
