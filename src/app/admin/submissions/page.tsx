import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/stack";
import SubmissionsClient from "./SubmissionsClient";

export default async function SubmissionsPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Convert user to plain object for client component
  const userData = {
    id: user.id,
    displayName: user.displayName,
    primaryEmail: user.primaryEmail,
    primaryEmailVerified: user.primaryEmailVerified,
    profileImageUrl: user.profileImageUrl,
  };

  return <SubmissionsClient user={userData} />;
}
