'use server';

import prisma from '@/lib/prisma';

export async function bookAppointment(patientId: string) {
  try {
    console.debug('Booking appointment for patientId:', patientId);

    // Create a new appointment with patientId and other details.
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patientId,
        providerId: 'unassigned', // Placeholder, to be updated later
        date: new Date(),
        status: 'PENDING', // Default status
      },
    });

    console.debug('Appointment booked successfully:', appointment);

    return { success: true, appointmentId: appointment.id };
  } catch (error) {
    console.error('Failed to book appointment:', error);
    return { success: false, error: 'Failed to book appointment' };
  }
}
