"use client";

import BookingPage from "../components/pages/ServicePage";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function Booking() {
  return (
    <ProtectedRoute roles={["admin", "user"]}>
      <BookingPage />
    </ProtectedRoute>
  );
}
