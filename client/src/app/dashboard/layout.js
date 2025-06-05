"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  BellIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Service Controller", path: "/dashboard/AdminOrderController", icon: UsersIcon },
  { name: "Academy Enquiry", path: "/dashboard/Enquirys", icon: FolderIcon },
  { name: "Bookings", path: "/dashboard/bookings", icon: CalendarIcon },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-pink-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md flex flex-col">
        
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                pathname === item.path
                  ? "bg-pink-100 text-pink-700"
                  : "text-gray-700 hover:bg-pink-50"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t flex items-center justify-between text-sm text-gray-500">
          <span>&copy; ALC Admin</span>
          <Link href="/" className="text-pink-600 hover:underline">Exit</Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b shadow flex items-center justify-between px-6">
          <div className="text-lg font-semibold text-pink-600">Admin Dashboard</div>
          <div className="flex items-center gap-4">
            
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
