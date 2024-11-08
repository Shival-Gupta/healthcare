import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, FileText, TestTube, Clock } from "lucide-react"

const features = [
  { title: "Book Appointment", description: "Schedule a new appointment with a doctor", icon: CalendarDays, href: "/book-appointment" },
  { title: "Medical Records", description: "View your previous medical records and prescriptions", icon: FileText, href: "/medical-records" },
  { title: "Test Results", description: "Access your latest test results", icon: TestTube, href: "/test-results" },
  { title: "Upcoming Appointments", description: "View and manage your scheduled appointments", icon: Clock, href: "/appointments" },
]

export default function PatientDashboard() {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Welcome to the Patient Portal</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Access all your health records, book appointments, and manage your medical information seamlessly.
        </p>
        <div className="mt-8 space-x-4">
          <Button asChild variant="default">
            <Link href="/profile">My Profile</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/settings">Settings</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <feature.icon className="mr-2 h-5 w-5" />
                {feature.title}
              </CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={feature.href}>
                  Access
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}