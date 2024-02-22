"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-bold">
              Home
            </Link>
          </div>
          <div className="flex space-x-4">
            {!data?.user ? (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/logout"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
