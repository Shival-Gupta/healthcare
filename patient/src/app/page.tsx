import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function PatientPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
      <Label>Patient Portal</Label>
        <p className="mt-4 text-lg">Manage appointments, view medical records, and access telemedicine services.</p>
        {/* Add more patient-specific components here */}
        <Button>yes</Button>
        <Button variant="secondary">yes</Button>
      </div>
    </main>
  );
}
