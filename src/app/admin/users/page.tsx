"use client";

import AuthLayout from "@/components/AuthLayout";
import AdminOnly from "@/components/AdminOnly";
import dynamic from "next/dynamic";

const AdminUsersContent = dynamic(() => import("@/components/admin/AdminGetAllUsersContent"));

export default function AdminUsersPage() {
  return (
    <AuthLayout>
      <AdminOnly>
        <AdminUsersContent />
      </AdminOnly>
    </AuthLayout>
  );
}
