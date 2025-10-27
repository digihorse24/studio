'use server';

import { generateKid } from '@/lib/ids';
import { promises as fs } from 'fs';
import path from 'path';
import { Kunde } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import api from '@/lib/api';

// This is a temporary solution to simulate a database.
// In a real application, you would use a database like Firestore.
const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');

export async function addKunde(data: { name: string; email: string; phone: string; address: string; }) {
    
    const kunden = await api.getKunden();

    const newKunde: Kunde = {
        id: `kunde-${Date.now()}`,
        kid: generateKid(),
        ...data,
        pferde_ids: [],
    };

    const updatedKunden = [...kunden, newKunde];

    // This is a temporary workaround to "update" the mock data.
    // We are recreating the content of data.ts with the new customer array.
    // This is NOT how you would do this in a real application.
    // A real implementation would write to a database.
    const fileHeader = `import { Kunde, Pferd, Termin, Partner, Consent } from './types';
import { generateKid, generateEqid, generatePid } from './ids';
import { subDays, addDays, format } from 'date-fns';

const today = new Date();
`;

    const serialize = (k: Kunde) => `{
    id: '${k.id}',
    kid: '${k.kid}',
    name: '${k.name}',
    email: '${k.email}',
    phone: '${k.phone}',
    address: '${k.address}',
    pferde_ids: [${k.pferde_ids.map(p => `'${p}'`).join(', ')}],
  }`;

    const newFileContent = `${fileHeader}
export const mockKunden: Kunde[] = [
  ${updatedKunden.map(serialize).join(',\n  ')}
];
// Keep the rest of the file as is. This is a hack for demo purposes.
const originalFile = await fs.readFile(dataFilePath, 'utf-8');
const pferdePart = originalFile.substring(originalFile.indexOf('export const mockPferde: Pferd[]'));

${pferdePart}
`;

    await fs.writeFile(dataFilePath, newFileContent, 'utf-8');
    
    revalidatePath('/kunden');
    revalidatePath('/kunden/neu');

    return JSON.parse(JSON.stringify(newKunde));
}