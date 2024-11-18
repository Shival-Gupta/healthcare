import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, FileText, TestTube, Clock, User, Settings } from "lucide-react";

const quickActions = [
  { title: "Book Appointment", description: "Schedule a new appointment", icon: CalendarDays, href: "/appointments" },
  { title: "View Records", description: "Access your medical records", icon: FileText, href: "/records" },
  { title: "Check Test Results", description: "View your latest test results", icon: TestTube, href: "/test-results" },
  { title: "Manage Profile", description: "Update your personal information", icon: User, href: "/profile" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, [Patient Name]</h1>
        <Button asChild variant="outline">
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </div>
      
      <Card>
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
            <Link href="/appointments">Schedule an Appointment</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <action.icon className="mr-2 h-5 w-5" />
                {action.title}
              </CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={action.href}>Access</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}