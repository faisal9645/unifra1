export interface Hotspot {
  id: string;
  name: string;
  subtitle: string;
  position: [number, number, number]; // 3D coordinates
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
  description: string;
  imageUrl?: string;
  categoryLabel?: string;
  specs: { label: string; value: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryLabel?: string;
  location: string;
  imageUrl: string;
  description: string;
  area: string;
  heroEyebrow?: string;
  heroHeadlineMain?: string;
  heroHeadlineItalic?: string;
  heroSubtitle?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  location: string;
  type: string;
  units: string;
  carpetArea: string;
  priceStarting: string;
  status: 'Under Construction' | 'Ready to Move' | 'Upcoming';
  statusBadge?: string;
  badgeDays?: string;
  badgeSold?: string;
  description?: string;
  imageUrl: string;
  highlights: string[];
  specs: {
    bedrooms: string;
    bathrooms: string;
    levels: string;
    parking: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  tag: 'Sustainability' | 'Lifestyle' | 'Real Estate' | 'Innovation';
  readTime: string;
  date: string;
  imageUrl: string;
  summary: string;
  content: string[];
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  iconName: 'Compass' | 'Zap' | 'Shield';
}

export type LeadStatus = 'New Lead' | 'Contacted' | 'VIP Visit Scheduled' | 'Converted' | 'Archived';

export interface ClientLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  timeline: string;
  interestedUnit?: string;
  source: string;
  notes?: string;
  createdAt: string; // ISO string
  formattedDate: string;
  status: LeadStatus;
  budget?: string;
  assignedAgent?: string;
  tags?: string[];
  followUpDate?: string;
  visitDate?: string;
}
