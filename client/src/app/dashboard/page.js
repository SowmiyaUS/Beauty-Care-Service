// app/dashboard/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/bookings"); // or /dashboard/AdminOrderController
  }, [router]);

  return null;
}
