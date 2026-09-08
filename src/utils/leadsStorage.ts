import { ClientLead, LeadStatus } from '../types';

const LEADS_STORAGE_KEY = 'unifra_crm_leads';
const UNLOCKED_KEY = 'unifra_villa_unlocked';

export const INITIAL_LEADS: ClientLead[] = [
  {
    id: 'lead-1',
    name: 'Vikramaditya Singhania',
    email: 'v.singhania@apexholding.sg',
    phone: '+91 98840 91823',
    city: 'Singapore (NRI)',
    timeline: 'Immediate (0 – 30 Days)',
    interestedUnit: 'MYSA Luxe 4BHK Villa with Private Pool',
    source: 'Villa Showcase Gate (VIP Unlock)',
    notes: 'Inquired about East-facing elevation and private chauffeur quarters.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    formattedDate: new Date(Date.now() - 1000 * 60 * 60 * 3).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: 'VIP Visit Scheduled'
  },
  {
    id: 'lead-2',
    name: 'Dr. Ananya Sundaram',
    email: 'ananya.sundaram@apollohospitals.org',
    phone: '+91 94441 55209',
    city: 'Chennai (Boat Club)',
    timeline: 'Within 1 to 3 Months',
    interestedUnit: 'MYSA Luxe 4BHK Villa with Private Pool',
    source: 'Menu - Mysa Villas',
    notes: 'Looking for coastal quietude with high-spec EV charging for two vehicles.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    formattedDate: new Date(Date.now() - 1000 * 60 * 60 * 26).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: 'Contacted'
  }
];

export function getStoredLeads(): ClientLead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      // Initialize with sample leads for preview
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_LEADS;
  } catch (err) {
    console.error('Failed to read stored leads', err);
    return INITIAL_LEADS;
  }
}

export function saveLead(
  leadInput: {
    name: string;
    email: string;
    phone: string;
    city?: string;
    timeline?: string;
    interestedUnit?: string;
    source?: string;
    notes?: string;
    status?: LeadStatus;
  }
): ClientLead {
  const currentLeads = getStoredLeads();
  const now = new Date();

  const newLead: ClientLead = {
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: leadInput.name.trim() || 'Anonymous Client',
    email: leadInput.email.trim(),
    phone: leadInput.phone.trim(),
    city: leadInput.city?.trim() || 'Chennai',
    timeline: leadInput.timeline || 'Immediate (0 – 30 Days)',
    interestedUnit: leadInput.interestedUnit || 'MYSA Luxe 4BHK Villa with Private Pool',
    source: leadInput.source || 'Villa Showcase Gate',
    notes: leadInput.notes || '',
    createdAt: now.toISOString(),
    formattedDate: now.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: leadInput.status || 'New Lead'
  };

  const updatedLeads = [newLead, ...currentLeads];

  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    // Also save latest user credentials to quick session
    sessionStorage.setItem('unifra_client_name', newLead.name);
    sessionStorage.setItem('unifra_client_phone', newLead.phone);
    sessionStorage.setItem('unifra_client_email', newLead.email);
    localStorage.setItem(UNLOCKED_KEY, 'true');
    sessionStorage.setItem(UNLOCKED_KEY, 'true');

    // Notify listeners across app
    window.dispatchEvent(new CustomEvent('unifra_leads_updated', { detail: newLead }));
  } catch (err) {
    console.error('Failed to persist lead', err);
  }

  return newLead;
}

export function updateLeadStatus(id: string, status: LeadStatus): void {
  const currentLeads = getStoredLeads();
  const updated = currentLeads.map((item) =>
    item.id === id ? { ...item, status } : item
  );
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('unifra_leads_updated'));
  } catch (err) {
    console.error('Failed to update lead status', err);
  }
}

export function deleteLead(id: string): void {
  const currentLeads = getStoredLeads();
  const updated = currentLeads.filter((item) => item.id !== id);
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('unifra_leads_updated'));
  } catch (err) {
    console.error('Failed to delete lead', err);
  }
}

export function clearAllLeads(): void {
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('unifra_leads_updated'));
  } catch (err) {
    console.error('Failed to clear leads', err);
  }
}

export function resetSampleLeads(): void {
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
    window.dispatchEvent(new CustomEvent('unifra_leads_updated'));
  } catch (err) {
    console.error('Failed to reset sample leads', err);
  }
}

export function isVillaAccessUnlocked(): boolean {
  try {
    return (
      sessionStorage.getItem(UNLOCKED_KEY) === 'true' ||
      localStorage.getItem(UNLOCKED_KEY) === 'true'
    );
  } catch {
    return false;
  }
}

export function setVillaAccessUnlocked(unlocked: boolean): void {
  try {
    if (unlocked) {
      sessionStorage.setItem(UNLOCKED_KEY, 'true');
      localStorage.setItem(UNLOCKED_KEY, 'true');
    } else {
      sessionStorage.removeItem(UNLOCKED_KEY);
      localStorage.removeItem(UNLOCKED_KEY);
      sessionStorage.removeItem('unifra_client_name');
      sessionStorage.removeItem('unifra_client_phone');
      sessionStorage.removeItem('unifra_client_email');
    }
    window.dispatchEvent(new CustomEvent('unifra_unlock_state_changed', { detail: { unlocked } }));
  } catch (err) {
    console.error('Failed to toggle unlock state', err);
  }
}
