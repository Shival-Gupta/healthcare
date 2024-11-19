'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateProfile(
  username: string,
  data: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    gender?: string;
    address?: string;
  }
) {
  try {
    await prisma.patient.update({
      where: { username },
      data: {
        firstName: data.firstName || undefined,
        lastName: data.lastName || undefined,
        phoneNumber: data.phoneNumber || undefined,
        gender: data.gender || undefined,
        address: data.address || undefined,
      },
    });
    revalidatePath('/profile');
    return { success: true };
  } catch (error) {
    console.error('Failed to update profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}
