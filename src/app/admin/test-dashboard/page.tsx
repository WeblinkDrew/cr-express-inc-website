import { stackServerApp } from "@/lib/stack";
import { redirect } from "next/navigation";

export default async function TestDashboardPage() {
  console.log("1. Test Dashboard: Starting");

  try {
    console.log("2. Test Dashboard: Getting user");
    const user = await stackServerApp.getUser();
    console.log("3. Test Dashboard: User result:", user ? "Found" : "Not found");

    if (!user) {
      console.log("4. Test Dashboard: Redirecting to login");
      redirect("/admin/login");
    }

    console.log("5. Test Dashboard: User authenticated successfully");

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Test Dashboard - Auth Works!</h1>
        <p>User: {user.primaryEmail}</p>
        <p>If you see this, authentication is working.</p>
      </div>
    );
  } catch (error) {
    console.error("Test Dashboard Error:", error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Error in Test Dashboard</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
}