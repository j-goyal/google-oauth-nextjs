import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthLayout from "@/components/AuthLayout";
import SuperAdminOnly from "@/components/SuperAdminOnly";
import UserAccessContent from "@/components/admin/users/access/UserAccessContent";
import UserAccessShimmer from "@/components/shimmer/UserAccessShimmer";

interface AdminManageAccessPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function AdminManageAccessPage({
  params,
}: AdminManageAccessPageProps) {
  const { userId } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
      <Header />
      <AuthLayout skeleton={<UserAccessShimmer />}>
        <SuperAdminOnly>
          <UserAccessContent userId={userId} />
        </SuperAdminOnly>
      </AuthLayout>
      <Footer />
    </div>
  );
}
