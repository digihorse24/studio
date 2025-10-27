export interface Kunde {
  id: string; // Internal UUID
  kid: string; // Human-readable ID, e.g., #KID202407-123
  name: string;
  email: string;
  phone: string;
  address: string;
  pferde_ids: string[]; // Array of horse IDs
}

export interface Pferd {
  id: string; // Internal UUID
  eqid: string; // Human-readable ID, e.g., EqID-BLITZ-A4B7
  name: string;
  rasse: string;
  alter: number;
  besitzer_id: string; // Kunde ID
  imageUrl: string;
  imageHint: string;
}

export interface Termin {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  kunde_id: string;
  pferd_id: string;
  service: string;
  status: 'geplant' | 'abgeschlossen' | 'storniert';
}

export interface Partner {
  id: string;
  pid: string; // Human-readable ID, e.g., #PidXYZ123
  name: string;
  profession: string;
  email: string;
  phone: string;
}

export type ConsentScope = 'stammdaten_lesen' | 'termine_lesen' | 'dokumente_lesen' | 'hufanalyse_lesen';

export interface Consent {
  id: string;
  kunde_id: string;
  pferd_id: string;
  partner_id: string;
  profi_id: string;
  status: 'pending' | 'approved' | 'denied' | 'revoked';
  scopes: ConsentScope[];
  requested_at: string; // ISO Date
  approved_at?: string; // ISO Date
}

export interface HufAnalyse {
  id: string;
  pferd_id: string;
  datum: string; // YYYY-MM-DD
  basics: {
    hufschmied: string;
    letzter_beschlag: string;
    hufgroesse_vl: string;
    hufgroesse_vr: string;
    hufgroesse_hl: string;
    hufgroesse_hr: string;
  };
  hoof_images: {
    [key: string]: string | undefined; // e.g., vl_frontal, vr_frontal
  };
  assessment: {
    [key: string]: 'good' | 'average' | 'bad' | null;
  };
  notes: string;
  dsgvo_accepted: boolean;
  signature: string; // data URL of signature image
}