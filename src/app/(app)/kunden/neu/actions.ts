'use server';

import { generateKid } from '@/lib/ids';
import { Kunde } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import api from '@/lib/api';

// This is a temporary function to simulate saving data.
// In a real application, this would write to a database like Firestore.
export async function addKunde(data: { name: string; email: string; phone: string; address: string; }) {
    
    console.log("Simulating: Add new customer to database...");
    
    const newKunde: Kunde = {
        id: `kunde-${Date.now()}`,
        kid: generateKid(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        pferde_ids: [],
    };

    // In a real app, you would add the new customer to your database.
    // For this mock API, we can't modify the imported array directly in a server action.
    // The revalidation will ensure data is "refetched", though our mock API always returns the same initial list.
    console.log("New customer data (not persisted in this mock):", newKunde);

    // This function tells Next.js to re-fetch the data on the customers page
    // the next time it's visited.
    revalidatePath('/kunden');

    return { success: true, kunde: newKunde };
}
