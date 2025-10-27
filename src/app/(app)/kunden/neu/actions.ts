'use server';

import { generateKid } from '@/lib/ids';
import { Kunde } from '@/lib/types';
import { revalidatePath } from 'next/cache';

// This is a temporary function to simulate saving data.
// In a real application, this would write to a database like Firestore.
export async function addKunde(data: { name: string; email: string; phone: string; address: string; }) {
    
    console.log("Simulating: Add new customer to database...");
    
    const newKunde: Omit<Kunde, 'pferde_ids'> = {
        id: `kunde-${Date.now()}`,
        kid: generateKid(),
        ...data,
    };

    console.log("New customer data:", newKunde);

    // This function tells Next.js to re-fetch the data on the customers page
    // the next time it's visited.
    revalidatePath('/kunden');

    return JSON.parse(JSON.stringify(newKunde));
}
