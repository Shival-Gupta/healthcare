'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
export async function updateProfile(
  username: string,
  data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    address: string;
    dob: Date;
  }>
) {
  try {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    await prisma.patient.update({
      where: { username },
      data: filteredData,
    });

    revalidatePath('/profile');
    return { success: true };
  } catch (error) {
    console.error('Failed to update profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}
