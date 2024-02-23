"use client";
import FormLogin from "../components/formLogin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data } = useSession();
  const router = useRouter();
  if (data?.user) {
    router.push("/logout");
  } else {
    return <FormLogin />;
  }
}
