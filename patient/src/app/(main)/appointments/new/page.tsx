'use client';

import { useState } from 'react';
import { useClerk } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { bookAppointment } from '@/app/actions/bookAppointment';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const NewAppointment = () => {
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useClerk();

  if (!user) {
    redirect('/login');
  }

  const _username = user.username;
  if (!_username) {
    return <div>Error Occurred</div>;
  }

  const handleBookAppointment = async () => {
    setLoading(true);
    console.debug('Attempting to book appointment for user:', _username);

    try {
      const result = await bookAppointment(_username);

      if (result.success) {
        console.debug('Appointment booked successfully. Appointment ID:', result.appointmentId);
        if (result.appointmentId) setAppointmentId(result.appointmentId);
      } else {
        console.error('Error booking appointment:', result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error('Unexpected error occurred:', error);
    }

    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Schedule New Appointment</h2>
      </CardHeader>

      {appointmentId ? (
        <CardContent>
          <h2>Appointment Scheduled!</h2>
          <p>Your appointment ID is: <Button variant='secondary' size='icon'>{appointmentId}</Button></p>
        </CardContent>
      ) : (
        <CardContent>
          <Button onClick={handleBookAppointment} disabled={loading}>
            {loading ? 'Scheduling...' : 'Book Appointment'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default NewAppointment;
