// src/app/(main)/appointments/page.tsx
'use client'; // This is to tell Next.js to render this component on the client-side

import { useEffect, useState } from 'react';

// Define a type for the Appointment data
interface Appointment {
  id: number;
  patientName: string;
  providerName: string;
  date: string;
  status: 'PENDING' | 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Assuming an API endpoint '/api/appointments' returns the appointments data
        const response = await fetch('/api/appointments');
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Appointments</h1>
        <p className="mt-2">Loading your appointments...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Appointments</h1>
      <p className="mt-2">Manage your appointments here.</p>

      {/* Display appointments list */}
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="mt-4">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Patient</th>
                <th className="border px-4 py-2">Provider</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="border px-4 py-2">{appointment.patientName}</td>
                  <td className="border px-4 py-2">{appointment.providerName}</td>
                  <td className="border px-4 py-2">{new Date(appointment.date).toLocaleString()}</td>
                  <td className="border px-4 py-2">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
