"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LougoutPage() {
  const { data } = useSession();
  const router = useRouter();
  if (!data?.user) {
    router.push("/login");
  } else {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-indigo-600 sm:text-3xl mb-8">
          Logout
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Sign out
        </button>
      </main>
    );
  }
}
