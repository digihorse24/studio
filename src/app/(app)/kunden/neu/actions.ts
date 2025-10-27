'use server';

import { generateKid } from '@/lib/ids';
import { promises as fs } from 'fs';
import path from 'path';

// This is a temporary solution to simulate a database.
// In a real application, you would use a database like Firestore.
const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');

export async function addKunde(data: { name: string; email: string; phone: string; address: string; }) {
    
    const newKunde = {
        id: `kunde-${Date.now()}`,
        kid: generateKid(),
        ...data,
        pferde_ids: [],
    };

    // This is a temporary workaround to "update" the mock data.
    // It's not a proper database, just for demonstration.
    // We're reading the file, finding the array, and inserting the new customer.
    // This is NOT how you would do this in a real application.
    let fileContent = await fs.readFile(dataFilePath, 'utf-8');
    
    const newKundeString = `
  {
    id: '${newKunde.id}',
    kid: '${newKunde.kid}',
    name: '${newKunde.name}',
    email: '${newKunde.email}',
    phone: '${newKunde.phone}',
    address: '${newKunde.address}',
    pferde_ids: [],
  },`;

    const insertionPoint = fileContent.indexOf('export const mockKunden: Kunde[] = [');
    if (insertionPoint !== -1) {
        const closingBracketIndex = fileContent.indexOf('];', insertionPoint);
        if (closingBracketIndex !== -1) {
            fileContent = fileContent.slice(0, closingBracketIndex) + newKundeString + fileContent.slice(closingBracketIndex);
            await fs.writeFile(dataFilePath, fileContent, 'utf-8');
        } else {
             throw new Error("Could not find closing bracket for mockKunden array.");
        }
    } else {
        throw new Error("Could not find mockKunden array in data.ts.");
    }

    return newKunde;
}
