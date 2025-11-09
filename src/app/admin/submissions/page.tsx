import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/stack";
import SubmissionsClient from "./SubmissionsClient";

export default async function SubmissionsPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <SubmissionsClient />;
}
