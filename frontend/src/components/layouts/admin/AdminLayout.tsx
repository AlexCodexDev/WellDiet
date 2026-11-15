import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
  breadcrumb?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, breadcrumb }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAF9F6] text-[#182B20]">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader onOpenSidebar={() => setSidebarOpen(true)} breadcrumb={breadcrumb} />
        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;