import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, FileText, TestTube, Clock, User, Settings } from "lucide-react";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

const quickActions = [
  { title: "Past Appointment", description: "View past appointment", icon: CalendarDays, href: "/appointments/history" },
  // { title: "View Records", description: "Access your medical records", icon: FileText, href: "/records" },
  { title: "Check Test Results", description: "View your latest test results", icon: TestTube, href: "/test-results" },
  { title: "Manage Profile", description: "Update your personal information", icon: User, href: "/profile" },
];

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    // return Response.json({ error: 'Unauthorized' }, { status: 401 })
    return redirect('/login');
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)

  const _username = user?.username

  if (!_username) {
    return <div>Error: Unable loading user data.</div>;
  }

  let patient = await prisma.patient.findUnique({
    where: { username: _username },
  });

  if (!patient) {
    return redirect('/profile');
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {patient.firstName}</h1>
        <Button asChild variant="outline">
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </Button>
      </div>

      <Card className="border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* This would be replaced with actual appointment data */}
          <p className="text-muted-foreground">You have no upcoming appointments.</p>
          <Button asChild className="mt-4">
            <Link href="/appointments/new">Schedule an Appointment</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <Link href={action.href}>
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <action.icon className="mr-2 h-5 w-5" />
                  {action.title}
                </CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}