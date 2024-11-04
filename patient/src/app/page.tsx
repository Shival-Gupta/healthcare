import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to the Patient Portal</h1>
        <p className="mt-4 text-lg text-gray-600">
          Access all your health records, book appointments, and manage your medical information seamlessly.
        </p>
        <div className="mt-8 space-x-4">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="secondary">Sign Up</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
        {[
          { title: "Appointments", description: "Book and manage your appointments easily." },
          { title: "Medical Records", description: "View and download your medical records securely." },
          { title: "Telemedicine", description: "Consult with doctors online from anywhere." },
        ].map((feature, index) => (
          <Card key={index} className="p-6 text-center">
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
