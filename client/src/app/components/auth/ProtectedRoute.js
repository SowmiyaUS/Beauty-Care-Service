"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, roles: allowedRoles = [] }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      router.replace("/login");
      return;
    }

    try {
      const decoded = jwtDecode(userToken);
      const userRole = decoded.role;
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        console.warn("Token expired. Logging out...");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        router.replace("/login");
        return;
      }

      if (!allowedRoles.includes(userRole)) {
        router.replace("/unauthorized");
        return;
      }

      setAuthorized(true);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("userToken");
      router.replace("/login");
    }
  }, [router, allowedRoles]);

  return authorized ? children : null;
};

export default ProtectedRoute;
