// src/app/(main)/profile/page.tsx

import { redirect } from 'next/navigation';
import ProfileForm from './ProfileForm';
import prisma from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server'

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) {
    // return Response.json({ error: 'Unauthorized' }, { status: 401 })
    return redirect('/login');
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)

  const _username = user?.username;
  const _firstName = user?.firstName
  const _lastName = user?.lastName
  const _email = user?.primaryEmailAddress?.emailAddress
  const _phoneNumber = user?.primaryPhoneNumber?.phoneNumber

  if (!_username) {
    return <div>Error: Unable to fetch username from session.</div>;
  }

  var patient = await prisma.patient.findUnique({
    where: { username: user.username },
  });

  if (!patient) {
    patient = await prisma.patient.create({
      data: {
        username: user.username,
      }
    })
    return redirect('/profile');
    // return <div>Patient with username {username} not found.</div>;
  }

  return (
    <main>
      <ProfileForm _patient={patient} />
    </main>
  );
}
