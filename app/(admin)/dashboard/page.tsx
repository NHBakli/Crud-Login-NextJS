"use client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const { data } = useSession();

  const handleCreateProduct = () => {
    router.push("/create-product");
  };
  if (data?.user?.role && data.user.role.toUpperCase() === "ADMIN") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-xl font-bold">Welcome back, {data.user.name}</h1>
      </main>
    );
  } else {
    redirect("/");
  }
};

export default DashboardPage;
