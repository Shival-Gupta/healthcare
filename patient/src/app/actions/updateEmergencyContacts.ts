'use server';

import prisma from '@/lib/prisma';

export async function updateEmergencyContacts(
	patientId: string,
	contacts: Array<{ id?: number; name: string; relationship: string; phoneNumber: string }>
) {
	try {
		const existingContacts = await prisma.emergencycontact.findMany({ where: { patientId } });

		// Delete removed contacts
		const contactIds = contacts.map((c) => c.id).filter(Boolean);
		await prisma.emergencycontact.deleteMany({
			where: {
				patientId,
				id: { notIn: contactIds.filter((id): id is number => id !== undefined) }
			}
		});

		// Upsert contacts
		for (const contact of contacts) {
			await prisma.emergencycontact.upsert({
				where: { id: contact.id || 0 },
				create: { ...contact, patientId },
				update: { ...contact },
			});
		}
		return { success: true };
	} catch (error) {
		console.error('Failed to update emergency contacts:', error);
		return { success: false };
	}
}
