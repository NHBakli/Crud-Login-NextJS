"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl font-bold">{JSON.stringify(data)}</h1>
    </main>
  );
}
