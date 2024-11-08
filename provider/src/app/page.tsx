import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Stethoscope, CalendarDays } from "lucide-react"

const features = [
  { title: "Patient Records", description: "Access patient records with consent", icon: Users, href: "/provider/patient-records" },
  { title: "Write Prescription", description: "Create a new prescription for a patient", icon: FileText, href: "/provider/write-prescription" },
  { title: "Manage Appointments", description: "View and manage your upcoming appointments", icon: CalendarDays, href: "/provider/appointments" },
  { title: "Patient Consultations", description: "Start or resume patient consultations", icon: Stethoscope, href: "/provider/consultations" },
]

export default function ProviderDashboard() {
  return (
    <main className="container mx-auto p-6 flex min-h-screen flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Welcome to the Provider Portal</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Manage patient care, appointments, and consultations efficiently.
        </p>
        <div className="mt-8 space-x-4">
          <Button asChild variant="default">
            <Link href="/provider/profile">My Profile</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/provider/settings">Settings</Link>
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
    </main>
  )
}