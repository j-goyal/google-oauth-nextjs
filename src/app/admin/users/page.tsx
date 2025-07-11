import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthLayout from "@/components/AuthLayout";
import AdminOnly from "@/components/AdminOnly";
import GridShimmer from "@/components/shimmer/GridShimmer";

const AdminUsersContent = dynamic(() => import("@/components/admin/AdminGetAllUsersContent"));

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
      <Header />
      <AuthLayout skeleton={<GridShimmer filters={8} rowCount={5} columns={["Name", "Email", "Role", "Created"]} />}>
        <AdminOnly>
          <AdminUsersContent />
        </AdminOnly>
      </AuthLayout>
      <Footer />
    </div>
  );
}
