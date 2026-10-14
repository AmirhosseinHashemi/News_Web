import { LoginForm } from "@/features/auth/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود",
  description: "ورود امن به پنل کاربری اخبار رحق",
};

export default function LoginPage() {
  return <LoginForm />;
}
