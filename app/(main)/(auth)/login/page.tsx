"use client";
import FormLogin from "@/app/components/formLogin";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data } = useSession();
  if (data?.user) {
    redirect("/logout");
  } else {
    return <FormLogin />;
  }
}
