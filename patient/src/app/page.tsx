import { Calendar, LibraryBig, User, Settings, HelpCircle } from "lucide-react"; // Import icons as needed
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Card items
const cardItems = [
  {
    title: "Appointments",
    url: "/appointments",
    description: "Manage your appointments",
    icon: Calendar,
  },
  {
    title: "Medical Records",
    url: "/records",
    description: "View your medical records",
    icon: LibraryBig,
  },
  {
    title: "Profile",
    url: "/profile",
    description: "View and edit your profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    description: "Manage your account settings",
    icon: Settings,
  },
  {
    title: "Support",
    url: "/support",
    description: "Get help and support",
    icon: HelpCircle,
  },
  // Add more items as needed
];

export default function PatientPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg">
          Manage appointments, view medical records, and access telemedicine services.
        </p>
        <hr className="pb-5" />
        <div className="grid grid-cols-4 gap-4">
          {cardItems.map((item, index) => (
            <div key={index + 1}>
              <a href={item.url} className="block">
                <Card className="min-w-[150px] max-w-[300px] min-h-[200px] max-h-[400px]">
                  <CardHeader>
                    <CardTitle>
                      <item.icon className="inline-block mr-2" />
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Click to go to {item.title}</p>
                  </CardContent>
                  <CardFooter>
                    <p>Footer info for {item.title}</p>
                  </CardFooter>
                </Card>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
