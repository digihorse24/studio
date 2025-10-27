import { mockKunden, mockPferde, mockTermine, mockPartner, mockConsents } from './data';
import type { Kunde, Pferd, Termin, Partner, Consent } from './types';

const DELAY = 500;

const api = {
  getKunden: (): Promise<Kunde[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockKunden), DELAY));
  },
  getKunde: (id: string): Promise<Kunde | undefined> => {
    return new Promise(resolve => setTimeout(() => resolve(mockKunden.find(k => k.id === id)), DELAY));
  },
  getPferde: (): Promise<Pferd[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockPferde), DELAY));
  },
  getPferdeByKunde: (kundeId: string): Promise<Pferd[]> => {
    const kunde = mockKunden.find(k => k.id === kundeId);
    if (!kunde) return new Promise(resolve => resolve([]));
    const pferde = mockPferde.filter(p => kunde.pferde_ids.includes(p.id));
    return new Promise(resolve => setTimeout(() => resolve(pferde), DELAY));
  },
  getPferd: (id: string): Promise<Pferd | undefined> => {
    return new Promise(resolve => setTimeout(() => resolve(mockPferde.find(p => p.id === id)), DELAY));
  },
  getTermine: (): Promise<Termin[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockTermine), DELAY));
  },
  getPartner: (): Promise<Partner[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockPartner), DELAY));
  },
  getConsentsByKunde: (kundeId: string): Promise<Consent[]> => {
     return new Promise(resolve => setTimeout(() => resolve(mockConsents.filter(c => c.kunde_id === kundeId)), DELAY));
  },
};

export default api;
