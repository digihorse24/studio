import { Kunde, Pferd, Termin, Partner, Consent } from './types';
import { generateKid, generateEqid, generatePid } from './ids';
import { subDays, addDays, format } from 'date-fns';

const today = new Date();

export const mockKunden: Kunde[] = [
  {
    id: 'kunde-1',
    kid: generateKid(),
    name: 'Erika Mustermann',
    email: 'erika.mustermann@example.com',
    phone: '0123 456789',
    address: 'Musterstraße 1, 12345 Musterstadt',
    pferde_ids: ['pferd-1', 'pferd-2'],
  },
  {
    id: 'kunde-2',
    kid: generateKid(),
    name: 'Max Power',
    email: 'max.power@example.com',
    phone: '0987 654321',
    address: 'Powerweg 10, 54321 Kraftort',
    pferde_ids: ['pferd-3'],
  },
];

export const mockPferde: Pferd[] = [
  {
    id: 'pferd-1',
    eqid: generateEqid('Blitz'),
    name: 'Blitz',
    rasse: 'Hannoveraner',
    alter: 8,
    besitzer_id: 'kunde-1',
    imageUrl: 'https://picsum.photos/seed/h1/400/300',
    imageHint: 'brown horse'
  },
  {
    id: 'pferd-2',
    eqid: generateEqid('Amadeus'),
    name: 'Amadeus',
    rasse: 'Haflinger',
    alter: 15,
    besitzer_id: 'kunde-1',
    imageUrl: 'https://picsum.photos/seed/h2/400/300',
    imageHint: 'white horse'
  },
  {
    id: 'pferd-3',
    eqid: generateEqid('Fury'),
    name: 'Fury',
    rasse: 'Mustang',
    alter: 10,
    besitzer_id: 'kunde-2',
    imageUrl: 'https://picsum.photos/seed/h3/400/300',
    imageHint: 'black horse'
  },
];

export const mockTermine: Termin[] = [
  {
    id: 'termin-1',
    date: format(today, 'yyyy-MM-dd'),
    time: '10:00',
    kunde_id: 'kunde-1',
    pferd_id: 'pferd-1',
    service: 'Hufbeschlag erneuern',
    status: 'geplant',
  },
  {
    id: 'termin-2',
    date: format(today, 'yyyy-MM-dd'),
    time: '14:00',
    kunde_id: 'kunde-2',
    pferd_id: 'pferd-3',
    service: 'Hufpflege',
    status: 'geplant',
  },
  {
    id: 'termin-3',
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    time: '09:00',
    kunde_id: 'kunde-1',
    pferd_id: 'pferd-2',
    service: 'Barhufpflege',
    status: 'geplant',
  },
    {
    id: 'termin-4',
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    time: '11:00',
    kunde_id: 'kunde-1',
    pferd_id: 'pferd-1',
    service: 'Hufbeschlag erneuern',
    status: 'abgeschlossen',
  },
];

export const mockPartner: Partner[] = [
  {
    id: 'partner-1',
    pid: generatePid(),
    name: 'Dr. Anja Schmidt',
    profession: 'Tierarzt',
    email: 'dr.schmidt@tierklinik.de',
    phone: '0111 222333',
  },
  {
    id: 'partner-2',
    pid: generatePid(),
    name: 'Peter Klaus',
    profession: 'Hufschmied (Kollege)',
    email: 'peter.klaus@schmiede.com',
    phone: '0444 555666',
  },
];


export const mockConsents: Consent[] = [
    {
        id: 'consent-1',
        kunde_id: 'kunde-1',
        pferd_id: 'pferd-1',
        partner_id: 'partner-1',
        profi_id: 'profi-1',
        status: 'approved',
        scopes: ['hufanalyse_lesen', 'dokumente_lesen'],
        requested_at: subDays(today, 10).toISOString(),
        approved_at: subDays(today, 9).toISOString(),
    },
    {
        id: 'consent-2',
        kunde_id: 'kunde-1',
        pferd_id: 'pferd-2',
        partner_id: 'partner-1',
        profi_id: 'profi-1',
        status: 'pending',
        scopes: ['stammdaten_lesen', 'termine_lesen'],
        requested_at: subDays(today, 2).toISOString(),
    }
]
