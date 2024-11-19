import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, FileText, TestTube, Clock } from "lucide-react";

const features = [
  { title: "Book Appointments", description: "Schedule new appointments with doctors", icon: CalendarDays },
  { title: "Medical Records", description: "View and manage your medical history", icon: FileText },
  { title: "Test Results", description: "Access your latest test results", icon: TestTube },
  { title: "Manage Appointments", description: "View and manage your scheduled appointments", icon: Clock },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to Patient Portal
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Manage your health records, book appointments, and access medical services all in one place.
              </p>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="bg-accent/50 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <feature.icon className="w-6 h-6 mr-2" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}