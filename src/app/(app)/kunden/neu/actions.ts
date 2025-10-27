'use server';

import { revalidatePath } from 'next/cache';
import type { Kunde } from '@/lib/types';

// This is a temporary function to simulate saving data.
// In a real application, this would write to a database like Firestore.
export async function addKunde(data: { name: string; email: string; phone: string; address: string; }) {
    
    console.log("Simulating: Add new customer to database...", data);
    
    // This function tells Next.js to re-fetch the data on the customers page
    // the next time it's visited.
    revalidatePath('/kunden');

    return { success: true };
}
