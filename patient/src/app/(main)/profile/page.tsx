import { redirect } from 'next/navigation';
import ProfileForm from './ProfileForm';
import prisma from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server';

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect('/login');
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const _username = user?.username;
  const _firstName = user?.firstName
  const _lastName = user?.lastName
  const _phoneNumber = user?.primaryPhoneNumber?.phoneNumber

  if (!_username) {
    return <div>Error: Unable to fetch username from session.</div>;
  }

  let patient = await prisma.patient.findUnique({
    where: { username: _username },
  });

  if (!patient) {
    patient = await prisma.patient.create({
      data: {
        username: _username,
        firstName: _firstName,
        lastName: _lastName,
        phoneNumber: _phoneNumber,
      },
    });
    return redirect('/profile');
  }

  // Fetch the emergency contacts separately by patient username
  const emergencyContacts = await prisma.emergencyContact.findMany({
    where: { patientId: _username }, // Access the emergency contacts using patientId
  });

  return (
    <div>
      <ProfileForm _patient={patient} _contacts={emergencyContacts} />
    </div>
  );
}
