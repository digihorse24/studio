'use server';

import { revalidatePath } from 'next/cache';
import { addKunde as addKundeToMockData } from '@/lib/data';
import type { Kunde } from '@/lib/types';

// This is a server action to simulate saving data.
// In a real application, this would write to a database like Firestore.
export async function addKunde(data: { name: string; email: string; phone: string; address: string; }) {
    
    console.log("Simulating: Add new customer to mock data store...", data);
    addKundeToMockData(data);
    
    // This function tells Next.js to re-fetch the data on the customers page
    // the next time it's visited.
    revalidatePath('/kunden');

    return { success: true };
}
