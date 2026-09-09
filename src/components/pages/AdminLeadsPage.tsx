import React, { useState, useEffect } from 'react';
import {
  Users,
  Phone,
  Mail,
  Calendar,
  Search,
  Download,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  MapPin,
  Lock,
  Unlock,
  RefreshCw,
  ExternalLink,
  Plus,
  ArrowLeft,
  Copy,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Building2,
  TrendingUp,
  DollarSign,
  CheckSquare,
  Square,
  UserCheck,
  Tag,
  ChevronRight,
  Send,
  Eye,
  Activity,
  FileSpreadsheet,
  Layers,
  ArrowUpRight,
  MoreVertical,
  X
} from 'lucide-react';
import { ClientLead, LeadStatus } from '../../types';
import {
  getStoredLeads,
  saveLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  clearAllLeads,
  resetSampleLeads,
  isVillaAccessUnlocked,
  setVillaAccessUnlocked
} from '../../utils/leadsStorage';

interface AdminLeadsPageProps {
  onNavigateHome: () => void;
  onNavigateVilla: () => void;
}

export const AdminLeadsPage: React.FC<AdminLeadsPageProps> = ({
  onNavigateHome,
  onNavigateVilla
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'visits' | 'whatsapp'>('leads');
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [tagFilter, setTagFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'budget'>('newest');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Bulk Actions Selection
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  // Drawer / Inspection Modal State
  const [inspectLead, setInspectLead] = useState<ClientLead | null>(null);
  const [inspectNotes, setInspectNotes] = useState('');
  const [inspectAgent, setInspectAgent] = useState('');
  const [newTagInput, setNewTagInput] = useState('');

  // Add Lead Modal
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Chennai',
    timeline: 'Immediate (0 – 30 Days)',
    interestedUnit: 'MYSA Luxe 4BHK Villa with Private Pool',
    source: 'Manual Admin Entry',
    budget: '₹ 5.85 Cr',
    assignedAgent: 'Rajesh Sharma (Senior VP)',
    notes: ''
  });

  // Schedule Visit Modal
  const [visitModalLead, setVisitModalLead] = useState<ClientLead | null>(null);
  const [visitFormDate, setVisitFormDate] = useState('');
  const [visitFormTime, setVisitFormTime] = useState('11:00 AM');
  const [visitFormAgent, setVisitFormAgent] = useState('Priya V. (VIP Concierge)');

  // WhatsApp Suite State
  const [waSelectedLead, setWaSelectedLead] = useState<ClientLead | null>(null);
  const [waTemplate, setWaTemplate] = useState<'welcome' | 'visit' | 'pricing' | 'followup'>('welcome');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loadData = () => {
    const loaded = getStoredLeads();
    setLeads(loaded);
    setIsUnlocked(isVillaAccessUnlocked());
    if (inspectLead) {
      const refreshed = loaded.find(l => l.id === inspectLead.id);
      if (refreshed) {
        setInspectLead(refreshed);
        setInspectNotes(refreshed.notes || '');
        setInspectAgent(refreshed.assignedAgent || 'Unassigned');
      }
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('unifra_leads_updated', handleUpdate);
    window.addEventListener('unifra_unlock_state_changed', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('unifra_leads_updated', handleUpdate);
      window.removeEventListener('unifra_unlock_state_changed', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    updateLeadStatus(id, newStatus);
    showToast(`Status updated to "${newStatus}"`);
    loadData();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete lead for ${name}?`)) {
      deleteLead(id);
      setSelectedLeadIds(prev => prev.filter(i => i !== id));
      if (inspectLead?.id === id) setInspectLead(null);
      showToast(`Removed ${name} from CRM records`);
      loadData();
    }
  };

  const handleToggleGateLock = () => {
    if (isUnlocked) {
      setVillaAccessUnlocked(false);
      setIsUnlocked(false);
      showToast('Villa Showcase Gated! Visitors will be prompted for name & phone.');
    } else {
      setVillaAccessUnlocked(true);
      setIsUnlocked(true);
      showToast('Villa Showcase Unlocked! Gating form bypassed.');
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard: ${text}`);
  };

  // Bulk Actions
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLeadIds(filteredLeads.map(l => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedLeadIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = (status: LeadStatus) => {
    selectedLeadIds.forEach(id => updateLeadStatus(id, status));
    showToast(`Updated ${selectedLeadIds.length} leads to "${status}"`);
    setSelectedLeadIds([]);
    loadData();
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedLeadIds.length} selected leads?`)) {
      selectedLeadIds.forEach(id => deleteLead(id));
      showToast(`Deleted ${selectedLeadIds.length} leads`);
      setSelectedLeadIds([]);
      loadData();
    }
  };

  const handleExportCSV = () => {
    const leadsToExport = selectedLeadIds.length > 0
      ? leads.filter(l => selectedLeadIds.includes(l.id))
      : leads;

    if (leadsToExport.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Timeline', 'Interested Unit', 'Budget', 'Assigned Agent', 'Source', 'Status', 'Date Registered', 'Notes'];
    const rows = leadsToExport.map((lead) => [
      `"${lead.id}"`,
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${lead.phone.replace(/"/g, '""')}"`,
      `"${lead.city.replace(/"/g, '""')}"`,
      `"${lead.timeline.replace(/"/g, '""')}"`,
      `"${(lead.interestedUnit || '').replace(/"/g, '""')}"`,
      `"${(lead.budget || '').replace(/"/g, '""')}"`,
      `"${(lead.assignedAgent || 'Unassigned').replace(/"/g, '""')}"`,
      `"${lead.source.replace(/"/g, '""')}"`,
      `"${lead.status}"`,
      `"${lead.formattedDate}"`,
      `"${(lead.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `unifra_executive_crm_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${leadsToExport.length} leads to CSV.`);
  };

  const handleManualAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name.trim() || !newLeadForm.phone.trim() || !newLeadForm.email.trim()) {
      alert('Please fill in Name, Phone, and Email.');
      return;
    }
    saveLead(newLeadForm);
    setIsAddLeadModalOpen(false);
    setNewLeadForm({
      name: '',
      email: '',
      phone: '',
      city: 'Chennai',
      timeline: 'Immediate (0 – 30 Days)',
      interestedUnit: 'MYSA Luxe 4BHK Villa with Private Pool',
      source: 'Manual Admin Entry',
      budget: '₹ 5.85 Cr',
      assignedAgent: 'Rajesh Sharma (Senior VP)',
      notes: ''
    });
    showToast('New client lead added successfully!');
    loadData();
  };

  const handleSaveInspectLead = () => {
    if (!inspectLead) return;
    updateLead(inspectLead.id, {
      notes: inspectNotes,
      assignedAgent: inspectAgent
    });
    showToast(`Saved updates for ${inspectLead.name}`);
    loadData();
  };

  const handleAddTagToInspect = () => {
    if (!inspectLead || !newTagInput.trim()) return;
    const currentTags = inspectLead.tags || [];
    if (!currentTags.includes(newTagInput.trim())) {
      const updatedTags = [...currentTags, newTagInput.trim()];
      updateLead(inspectLead.id, { tags: updatedTags });
      setNewTagInput('');
      showToast(`Added tag "${newTagInput.trim()}"`);
      loadData();
    }
  };

  const handleRemoveTagFromInspect = (tagToRemove: string) => {
    if (!inspectLead) return;
    const updatedTags = (inspectLead.tags || []).filter(t => t !== tagToRemove);
    updateLead(inspectLead.id, { tags: updatedTags });
    showToast(`Removed tag "${tagToRemove}"`);
    loadData();
  };

  const handleConfirmVisitSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitModalLead || !visitFormDate) {
      alert('Please select a date.');
      return;
    }
    const formattedVisit = `${visitFormDate} • ${visitFormTime}`;
    updateLead(visitModalLead.id, {
      status: 'VIP Visit Scheduled',
      visitDate: formattedVisit,
      assignedAgent: visitFormAgent
    });
    setVisitModalLead(null);
    showToast(`Scheduled VIP Visit for ${visitModalLead.name} on ${formattedVisit}`);
    loadData();
  };

  // Unique Tags for filtering
  const allTags = Array.from(
    new Set(leads.flatMap(l => l.tags || []))
  );

  // Filtered & Sorted Leads
  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.assignedAgent || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesTag = tagFilter === 'All' || (lead.tags || []).includes(tagFilter);

      return matchesSearch && matchesStatus && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'budget') {
        const getVal = (s?: string) => parseFloat((s || '0').replace(/[^0-9.]/g, '')) || 0;
        return getVal(b.budget) - getVal(a.budget);
      }
      return 0;
    });

  // KPI Metrics
  const totalLeads = leads.length;
  const immediateLeads = leads.filter(l => l.timeline.includes('Immediate') || l.timeline.includes('30')).length;
  const visitScheduled = leads.filter(l => l.status === 'VIP Visit Scheduled' || l.visitDate).length;
  const newLeads = leads.filter(l => l.status === 'New Lead').length;
  const convertedLeads = leads.filter(l => l.status === 'Converted').length;

  // Pipeline Financial Valuation (approx Cr)
  const totalPipelineVal = leads.reduce((acc, l) => {
    const val = parseFloat((l.budget || '5.85').replace(/[^0-9.]/g, '')) || 5.85;
    return acc + val;
  }, 0).toFixed(2);

  // WhatsApp Messaging Template Text Builder
  const getWhatsAppMessageText = (lead: ClientLead) => {
    const firstName = lead.name.split(' ')[0];
    if (waTemplate === 'welcome') {
      return `Hello ${firstName}, thank you for registering with UNIFRA Luxury Properties! 🏛️ We are pleased to provide you with exclusive digital access to the MYSA Luxe Villa Showcase on East Coast Road, Chennai. View the 4K brochure & 3D Walkthrough: https://unifra.in/mysa. Best regards, UNIFRA Concierge.`;
    }
    if (waTemplate === 'visit') {
      return `Dear ${firstName}, your private VIP site inspection for MYSA Luxe Villas on ECR Chennai has been reserved. Location: Vettuvankeni, ECR. Assigned Concierge: ${lead.assignedAgent || 'VIP Sales Executive'}. We look forward to welcoming you!`;
    }
    if (waTemplate === 'pricing') {
      return `Dear ${firstName}, following up regarding your interest in MYSA Luxe Villas (Starting ₹ 5.85 Cr*). We have shared the complete payment schedule and floor plans for Villa Layout 01. Please let us know if you would like a private consultation.`;
    }
    return `Hello ${firstName}, checking in from UNIFRA Properties! Our architectural team is available to showcase the Scandinavian Butterfly Roof & private lap pool features of MYSA Villas. Would you be free for a 10-minute call today?`;
  };

  return (
    <div className="pt-24 pb-20 bg-[#0b0c0e] text-[#f3f4f6] min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-sm bg-[#121418] border border-[#dfb776] text-white text-xs font-mono shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-[#dfb776]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Top Breadcrumb & Status Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#dfb776] uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </button>
            <span className="text-gray-600">/</span>
            <span className="text-xs font-mono text-[#dfb776] tracking-wider uppercase font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Executive CRM Console (/admin)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleGateLock}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
                isUnlocked
                  ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500/20'
              }`}
              title={isUnlocked ? 'Click to lock showcase and test entry gate' : 'Click to unlock'}
            >
              {isUnlocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Showcase Unlocked (Click to Re-lock)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Showcase Gated (Form Required)</span>
                </>
              )}
            </button>

            <button
              onClick={onNavigateVilla}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/40 text-[#dfb776] hover:bg-[#dfb776]/20 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>View Villa Showcase</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Page Title & Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#dfb776]/15 border border-[#dfb776]/30 text-[#dfb776] text-[10px] font-mono uppercase tracking-widest font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>UNIFRA EXECUTIVE SALES & PIPELINE INTELLIGENCE</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal">
              Private Client CRM & <span className="italic text-[#dfb776]">Pipeline Analytics</span>
            </h1>
          </div>

          {/* CRM Main Tab Switcher */}
          <div className="flex items-center gap-1 bg-[#121418] p-1 rounded-sm border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('leads')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Client Leads ({totalLeads})</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Pipeline Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('visits')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'visits'
                  ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>VIP Visits ({visitScheduled})</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Suite</span>
            </button>
          </div>
        </div>

        {/* Executive KPI Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="p-4 rounded-sm bg-[#121418] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">PIPELINE VALUE</span>
              <DollarSign className="w-4 h-4 text-[#dfb776]" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#dfb776]">
              ₹ {totalPipelineVal} Cr
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>Gross Potential Revenue</span>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[#121418] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">TOTAL LEADS</span>
              <Users className="w-4 h-4 text-gray-300" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              {totalLeads}
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>100% Verified Contact Info</span>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[#121418] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">NEW UNTOUCHED</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-400">
              {newLeads}
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1">
              Requires immediate callback
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[#121418] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">VIP SITE VISITS</span>
              <Calendar className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-emerald-400">
              {visitScheduled}
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1">
              Scheduled on-site tours
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[#121418] border border-white/10 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">CONVERTED DEALS</span>
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-blue-400">
              {convertedLeads}
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1">
              Closed booking deposits
            </div>
          </div>
        </div>

        {/* TAB 1: CLIENT LEADS MANAGEMENT TABLE */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Toolbar: Search, Filters, Sort & Actions */}
            <div className="bg-[#121418] p-4 rounded-sm border border-white/10 flex flex-wrap items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 min-w-[260px]">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Name, Email, Phone, City, Source, or Agent..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-sm border border-white/15 focus:outline-none focus:border-[#dfb776] bg-[#0b0c0e] text-white text-xs placeholder:text-gray-500"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-[#0b0c0e] p-1 rounded-sm border border-white/10 text-xs font-mono">
                {['All', 'New Lead', 'Contacted', 'VIP Visit Scheduled', 'Converted', 'Archived'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Tag Filter */}
              {allTags.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <Tag className="w-3.5 h-3.5 text-[#dfb776]" />
                  <select
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    className="px-2.5 py-1.5 rounded-sm border border-white/15 bg-[#0b0c0e] text-gray-300 text-xs focus:outline-none focus:border-[#dfb776]"
                  >
                    <option value="All">All Tags ({allTags.length})</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sort By */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-gray-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-sm border border-white/15 bg-[#0b0c0e] text-gray-300 text-xs focus:outline-none focus:border-[#dfb776]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="budget">Highest Budget</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddLeadModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lead</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-white/20 hover:border-[#dfb776] text-gray-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  title="Download CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-[#dfb776]" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={resetSampleLeads}
                  className="inline-flex items-center gap-1.5 p-2 rounded-sm border border-white/10 hover:border-white/30 text-gray-400 hover:text-white text-xs transition-colors cursor-pointer"
                  title="Reset sample VIP leads"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bulk Action Bar (Visible when items selected) */}
            {selectedLeadIds.length > 0 && (
              <div className="bg-[#dfb776]/15 border border-[#dfb776]/40 p-3 rounded-sm flex items-center justify-between text-xs font-mono text-[#dfb776] animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  <span className="font-semibold">{selectedLeadIds.length} Leads Selected</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-400">Bulk Actions:</span>
                  <button
                    onClick={() => handleBulkStatusChange('Contacted')}
                    className="px-2.5 py-1 bg-[#121418] border border-[#dfb776]/40 hover:bg-[#dfb776] hover:text-[#0b0c0e] text-white rounded-xs transition-colors"
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange('VIP Visit Scheduled')}
                    className="px-2.5 py-1 bg-[#121418] border border-[#dfb776]/40 hover:bg-[#dfb776] hover:text-[#0b0c0e] text-white rounded-xs transition-colors"
                  >
                    Mark Visit Scheduled
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="px-2.5 py-1 bg-[#121418] border border-white/20 hover:border-white text-white rounded-xs transition-colors"
                  >
                    Export Selected ({selectedLeadIds.length})
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-2.5 py-1 bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500 hover:text-white rounded-xs transition-colors"
                  >
                    Delete Selected
                  </button>
                </div>
              </div>
            )}

            {/* Leads Data Table */}
            <div className="bg-[#121418] rounded-sm border border-white/10 overflow-hidden shadow-2xl">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <h3 className="font-serif-luxury text-lg text-white font-semibold">No Client Leads Found</h3>
                  <p className="text-gray-400 text-xs max-w-sm mx-auto mt-1 mb-4">
                    {searchQuery || statusFilter !== 'All' || tagFilter !== 'All'
                      ? 'No client leads matched your current search & filter criteria.'
                      : 'No client details recorded yet. Use the form on Villa Showcase or click below to load sample VIP leads.'}
                  </p>
                  <button
                    onClick={resetSampleLeads}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#dfb776] text-[#0b0c0e] text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Reset Sample VIP Leads</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-[#0b0c0e]/90 text-[10px] font-mono uppercase tracking-widest text-gray-400">
                        <th className="py-3.5 px-4 w-10">
                          <input
                            type="checkbox"
                            checked={selectedLeadIds.length === filteredLeads.length && filteredLeads.length > 0}
                            onChange={handleSelectAll}
                            className="rounded-xs accent-[#dfb776] cursor-pointer"
                          />
                        </th>
                        <th className="py-3.5 px-4">Client Details</th>
                        <th className="py-3.5 px-4">Contact Info</th>
                        <th className="py-3.5 px-4">Location / Urgency</th>
                        <th className="py-3.5 px-4">Interest & Budget</th>
                        <th className="py-3.5 px-4">Assigned Agent</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                      {filteredLeads.map((lead) => {
                        const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                        const isSelected = selectedLeadIds.includes(lead.id);
                        return (
                          <tr
                            key={lead.id}
                            className={`transition-colors group ${
                              isSelected ? 'bg-[#dfb776]/10' : 'hover:bg-white/[0.02]'
                            }`}
                          >
                            {/* Checkbox */}
                            <td className="py-4 px-4 align-top">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleSelectOne(lead.id)}
                                className="rounded-xs accent-[#dfb776] cursor-pointer mt-1"
                              />
                            </td>

                            {/* Client Name & Tags */}
                            <td className="py-4 px-4 align-top">
                              <div
                                onClick={() => setInspectLead(lead)}
                                className="font-semibold text-white group-hover:text-[#dfb776] transition-colors cursor-pointer flex items-center gap-1.5"
                              >
                                <span>{lead.name}</span>
                                <Eye className="w-3 h-3 text-[#dfb776] opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                                Reg: {lead.formattedDate}
                              </div>

                              {/* Tags */}
                              {lead.tags && lead.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {lead.tags.map((t, idx) => (
                                    <span
                                      key={idx}
                                      className="text-[9px] font-mono px-1.5 py-0.5 rounded-xs bg-[#dfb776]/15 text-[#dfb776] border border-[#dfb776]/30"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </td>

                            {/* Contact Info */}
                            <td className="py-4 px-4 align-top space-y-1">
                              <div className="flex items-center gap-1.5 font-mono text-gray-200">
                                <Mail className="w-3 h-3 text-[#dfb776] shrink-0" />
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="hover:text-[#dfb776] hover:underline underline-offset-2"
                                >
                                  {lead.email}
                                </a>
                                <button
                                  onClick={() => handleCopyText(lead.email, 'Email')}
                                  className="text-gray-500 hover:text-white p-0.5 rounded-xs transition-colors cursor-pointer"
                                  title="Copy Email"
                                >
                                  <Copy className="w-2.5 h-2.5" />
                                </button>
                              </div>

                              <div className="flex items-center gap-1.5 font-mono text-white">
                                <Phone className="w-3 h-3 text-[#dfb776] shrink-0" />
                                <a
                                  href={`tel:${cleanPhone}`}
                                  className="hover:text-[#dfb776] hover:underline underline-offset-2"
                                >
                                  {lead.phone}
                                </a>
                                <button
                                  onClick={() => handleCopyText(lead.phone, 'Phone')}
                                  className="text-gray-500 hover:text-white p-0.5 rounded-xs transition-colors cursor-pointer"
                                  title="Copy Phone"
                                >
                                  <Copy className="w-2.5 h-2.5" />
                                </button>
                              </div>

                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  onClick={() => {
                                    setWaSelectedLead(lead);
                                    setActiveTab('whatsapp');
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono hover:bg-emerald-500/25 transition-colors cursor-pointer"
                                >
                                  <MessageSquare className="w-2.5 h-2.5" />
                                  <span>WhatsApp</span>
                                </button>
                                <a
                                  href={`tel:${cleanPhone}`}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-mono hover:bg-blue-500/25 transition-colors"
                                >
                                  <Phone className="w-2.5 h-2.5" />
                                  <span>Call</span>
                                </a>
                              </div>
                            </td>

                            {/* Location / Timeline */}
                            <td className="py-4 px-4 align-top">
                              <div className="text-gray-300 font-medium flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#dfb776] shrink-0" />
                                <span>{lead.city}</span>
                              </div>
                              <div className="text-[10px] font-mono text-gray-400 mt-1">
                                Timeline: <span className="text-[#dfb776] font-semibold">{lead.timeline}</span>
                              </div>
                              {lead.visitDate && (
                                <div className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-xs mt-1">
                                  <Calendar className="w-2.5 h-2.5" />
                                  <span>Visit: {lead.visitDate}</span>
                                </div>
                              )}
                            </td>

                            {/* Interest & Budget */}
                            <td className="py-4 px-4 align-top">
                              <div className="text-white font-medium text-xs truncate max-w-[180px]">
                                {lead.interestedUnit || 'MYSA Luxe Villas'}
                              </div>
                              <div className="text-[11px] font-mono text-[#dfb776] font-semibold mt-0.5">
                                Budget: {lead.budget || '₹ 5.85 Cr'}
                              </div>
                              <div className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 mt-1 rounded-xs bg-white/5 border border-white/10 text-gray-400">
                                <span>{lead.source}</span>
                              </div>
                            </td>

                            {/* Assigned Agent */}
                            <td className="py-4 px-4 align-top">
                              <select
                                value={lead.assignedAgent || 'Unassigned'}
                                onChange={(e) => {
                                  updateLead(lead.id, { assignedAgent: e.target.value });
                                  showToast(`Assigned ${lead.name} to ${e.target.value}`);
                                  loadData();
                                }}
                                className="px-2 py-1 rounded-xs text-[10px] font-mono border border-white/15 bg-[#0b0c0e] text-gray-300 focus:outline-none focus:border-[#dfb776] cursor-pointer"
                              >
                                <option value="Unassigned">Unassigned</option>
                                <option value="Rajesh Sharma (Senior VP)">Rajesh Sharma (VP)</option>
                                <option value="Priya V. (VIP Concierge)">Priya V. (Concierge)</option>
                                <option value="Karthik R. (Managing Director)">Karthik R. (MD)</option>
                              </select>
                            </td>

                            {/* Status Dropdown */}
                            <td className="py-4 px-4 align-top">
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                className={`px-2 py-1 rounded-xs text-[10px] font-mono uppercase tracking-wider font-semibold border bg-[#0b0c0e] focus:outline-none cursor-pointer ${
                                  lead.status === 'New Lead'
                                    ? 'border-amber-500/40 text-amber-400'
                                    : lead.status === 'Contacted'
                                    ? 'border-blue-500/40 text-blue-400'
                                    : lead.status === 'VIP Visit Scheduled'
                                    ? 'border-emerald-500/40 text-emerald-400'
                                    : lead.status === 'Converted'
                                    ? 'border-[#dfb776] text-[#dfb776]'
                                    : 'border-gray-600 text-gray-400'
                                }`}
                              >
                                <option value="New Lead">New Lead</option>
                                <option value="Contacted">Contacted</option>
                                <option value="VIP Visit Scheduled">VIP Visit Scheduled</option>
                                <option value="Converted">Converted (Deal Closed)</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-4 px-4 align-top text-right space-x-1">
                              <button
                                onClick={() => setInspectLead(lead)}
                                className="p-1.5 rounded-sm hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                title="Inspect & Edit Profile"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#dfb776]" />
                              </button>

                              <button
                                onClick={() => setVisitModalLead(lead)}
                                className="p-1.5 rounded-sm hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer"
                                title="Schedule VIP Site Visit"
                              >
                                <Calendar className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDelete(lead.id, lead.name)}
                                className="p-1.5 rounded-sm hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Table Footer */}
              <div className="p-4 bg-[#0b0c0e] border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400 font-mono">
                <span>Showing {filteredLeads.length} of {leads.length} recorded leads</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearAllLeads}
                    className="text-red-400 hover:text-red-300 transition-colors cursor-pointer text-[10px] uppercase tracking-wider"
                  >
                    Clear All Records
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PIPELINE ANALYTICS & VISUAL METRICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Conversion Funnel */}
            <div className="bg-[#121418] p-6 rounded-sm border border-white/10 shadow-2xl">
              <h3 className="font-serif-luxury text-xl text-white font-normal mb-1">
                Executive Lead Conversion Funnel
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Real-time tracking of buyer progression from initial showcase unlock to final closed booking.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-[#0b0c0e] p-5 rounded-sm border border-amber-500/30">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">STAGE 1: NEW LEADS</div>
                  <div className="font-serif-luxury text-3xl font-bold text-white mb-2">{newLeads}</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full" style={{ width: `${(newLeads / Math.max(totalLeads, 1)) * 100}%` }} />
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-2">
                    {Math.round((newLeads / Math.max(totalLeads, 1)) * 100)}% of total leads
                  </div>
                </div>

                <div className="bg-[#0b0c0e] p-5 rounded-sm border border-blue-500/30">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 mb-1">STAGE 2: CONTACTED</div>
                  <div className="font-serif-luxury text-3xl font-bold text-white mb-2">
                    {leads.filter(l => l.status === 'Contacted').length}
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full" style={{ width: `${(leads.filter(l => l.status === 'Contacted').length / Math.max(totalLeads, 1)) * 100}%` }} />
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-2">
                    In active sales conversation
                  </div>
                </div>

                <div className="bg-[#0b0c0e] p-5 rounded-sm border border-emerald-500/30">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1">STAGE 3: VIP VISIT BOOKED</div>
                  <div className="font-serif-luxury text-3xl font-bold text-white mb-2">{visitScheduled}</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full" style={{ width: `${(visitScheduled / Math.max(totalLeads, 1)) * 100}%` }} />
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-2">
                    Confirmed ECR site inspection
                  </div>
                </div>

                <div className="bg-[#0b0c0e] p-5 rounded-sm border border-[#dfb776]/40">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#dfb776] mb-1">STAGE 4: CONVERTED DEAL</div>
                  <div className="font-serif-luxury text-3xl font-bold text-[#dfb776] mb-2">{convertedLeads}</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#dfb776] h-full" style={{ width: `${(convertedLeads / Math.max(totalLeads, 1)) * 100}%` }} />
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-2">
                    Booking deposit received
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lead Sources Breakdown */}
              <div className="bg-[#121418] p-6 rounded-sm border border-white/10">
                <h4 className="font-serif-luxury text-lg text-white mb-4">Lead Origin Breakdown</h4>
                <div className="space-y-3.5 text-xs font-mono">
                  {[
                    { source: 'Villa Showcase Gate (VIP Unlock)', count: leads.filter(l => l.source.includes('Gate') || l.source.includes('Unlock')).length },
                    { source: 'Menu / Direct Navigation', count: leads.filter(l => l.source.includes('Menu')).length },
                    { source: 'Virtual Tour 3D', count: leads.filter(l => l.source.includes('Tour') || l.source.includes('3D')).length },
                    { source: 'Brochure Download', count: leads.filter(l => l.source.includes('Brochure')).length },
                    { source: 'Direct Phone / Concierge', count: leads.filter(l => l.source.includes('Phone') || l.source.includes('Manual')).length }
                  ].map((item, idx) => {
                    const pct = Math.round((item.count / Math.max(totalLeads, 1)) * 100);
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-gray-300">
                          <span>{item.source}</span>
                          <span className="text-[#dfb776] font-semibold">{item.count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-black h-2 rounded-full overflow-hidden">
                          <div className="bg-[#dfb776] h-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Geographic Buyer Distribution */}
              <div className="bg-[#121418] p-6 rounded-sm border border-white/10">
                <h4 className="font-serif-luxury text-lg text-white mb-4">Geographic Buyer Demographics</h4>
                <div className="space-y-3.5 text-xs font-mono">
                  {[
                    { region: 'Singapore / SE Asia (NRI)', count: leads.filter(l => l.city.includes('Singapore') || l.city.includes('NRI')).length },
                    { region: 'Chennai Metro (Boat Club, Adyar, ECR)', count: leads.filter(l => l.city.includes('Chennai')).length },
                    { region: 'Dubai / Middle East (NRI)', count: leads.filter(l => l.city.includes('Dubai') || l.city.includes('UAE')).length },
                    { region: 'Bengaluru / Interstate Tech Founders', count: leads.filter(l => l.city.includes('Bengaluru')).length },
                    { region: 'Other Industrial Metros', count: leads.filter(l => l.city.includes('Ahmedabad') || l.city.includes('Mumbai')).length }
                  ].map((item, idx) => {
                    const pct = Math.round((item.count / Math.max(totalLeads, 1)) * 100);
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-gray-300">
                          <span>{item.region}</span>
                          <span className="text-emerald-400 font-semibold">{item.count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-black h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VIP SITE VISITS & CALENDAR */}
        {activeTab === 'visits' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-[#121418] p-6 rounded-sm border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-luxury text-xl text-white font-normal mb-1">
                  Scheduled On-Site & 3D Walkthrough Inspections
                </h3>
                <p className="text-xs text-gray-400">
                  Manage upcoming concierge appointments for high-net-worth buyers at MYSA Luxe Villas, ECR.
                </p>
              </div>

              <button
                onClick={() => {
                  if (leads.length > 0) setVisitModalLead(leads[0]);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#dfb776] text-[#0b0c0e] font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-lg shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule New VIP Visit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads
                .filter(l => l.status === 'VIP Visit Scheduled' || l.visitDate)
                .map((lead) => (
                  <div key={lead.id} className="bg-[#121418] rounded-sm border border-[#dfb776]/40 p-5 space-y-4 shadow-xl text-left">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfb776] font-semibold bg-[#dfb776]/10 px-2.5 py-0.5 rounded-xs border border-[#dfb776]/30">
                        CONFIRMED VIP VISIT
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        {lead.visitDate || 'Date Pending'}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif-luxury text-lg text-white font-bold">{lead.name}</h4>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">{lead.city} • {lead.interestedUnit}</div>
                    </div>

                    <div className="space-y-1.5 text-xs font-mono bg-[#0b0c0e] p-3 rounded-sm border border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">CONCIERGE:</span>
                        <span className="text-gray-200">{lead.assignedAgent || 'Rajesh Sharma'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">PHONE:</span>
                        <a href={`tel:${lead.phone}`} className="text-[#dfb776] hover:underline">{lead.phone}</a>
                      </div>
                    </div>

                    {lead.notes && (
                      <p className="text-xs text-gray-300 font-light italic bg-black/40 p-2.5 rounded-sm border border-white/5">
                        "{lead.notes}"
                      </p>
                    )}

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setWaSelectedLead(lead);
                          setWaTemplate('visit');
                          setActiveTab('whatsapp');
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono hover:bg-emerald-500/25 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Pass</span>
                      </button>
                      <button
                        onClick={() => setInspectLead(lead)}
                        className="px-3 py-2 rounded-xs border border-white/20 text-gray-300 hover:text-white text-xs font-mono cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: WHATSAPP CONCIERGE SUITE */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-[#121418] p-6 rounded-sm border border-white/10 shadow-2xl">
              <h3 className="font-serif-luxury text-xl text-white font-normal mb-1">
                Automated WhatsApp Concierge & Digital Brochure Transmitter
              </h3>
              <p className="text-xs text-gray-400">
                Generate tailored high-converting WhatsApp invitations, 4K digital brochure passes, and site visit confirmations for VIP leads.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Select Client & Template */}
              <div className="lg:col-span-5 space-y-5 bg-[#121418] p-6 rounded-sm border border-white/10">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-300 mb-2 font-semibold">
                    1. SELECT TARGET CLIENT LEAD
                  </label>
                  <select
                    value={waSelectedLead?.id || ''}
                    onChange={(e) => {
                      const selected = leads.find(l => l.id === e.target.value);
                      if (selected) setWaSelectedLead(selected);
                    }}
                    className="w-full px-3 py-2.5 rounded-sm border border-white/20 bg-[#0b0c0e] text-white text-xs font-mono focus:outline-none focus:border-[#dfb776]"
                  >
                    <option value="">-- Choose Client Lead --</option>
                    {leads.map(l => (
                      <option key={l.id} value={l.id}>
                        {l.name} ({l.phone}) - {l.status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-300 mb-2 font-semibold">
                    2. SELECT CONCIERGE MESSAGE TEMPLATE
                  </label>
                  <div className="space-y-2 text-xs font-mono">
                    {[
                      { id: 'welcome', label: 'VIP Welcome & 4K Digital Brochure Pass' },
                      { id: 'visit', label: 'On-Site Inspection Confirmation & Location' },
                      { id: 'pricing', label: 'Custom Villa Pricing & Payment Schedule' },
                      { id: 'followup', label: 'Scandinavian Architecture Advisory Follow-up' }
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => setWaTemplate(tpl.id as any)}
                        className={`w-full text-left p-3 rounded-sm border transition-all cursor-pointer ${
                          waTemplate === tpl.id
                            ? 'bg-[#dfb776]/15 border-[#dfb776] text-[#dfb776] font-semibold'
                            : 'bg-[#0b0c0e] border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Message Preview & Dispatch */}
              <div className="lg:col-span-7 bg-[#121418] p-6 rounded-sm border border-white/10 space-y-5">
                <h4 className="font-serif-luxury text-lg text-white">Live WhatsApp Message Preview</h4>

                {waSelectedLead ? (
                  <div className="space-y-4">
                    <div className="bg-[#0b0c0e] p-5 rounded-sm border border-emerald-500/30 text-xs font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed shadow-inner">
                      {getWhatsAppMessageText(waSelectedLead)}
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <a
                        href={`https://wa.me/${waSelectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getWhatsAppMessageText(waSelectedLead))}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send via WhatsApp Web</span>
                      </a>

                      <button
                        onClick={() => handleCopyText(getWhatsAppMessageText(waSelectedLead), 'WhatsApp Message')}
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-sm border border-white/20 hover:border-[#dfb776] text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <Copy className="w-4 h-4 text-[#dfb776]" />
                        <span>Copy Text</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 text-xs font-mono border border-dashed border-white/15 rounded-sm">
                    Select a client lead on the left to generate their customized WhatsApp invitation.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* INSPECT LEAD DETAIL SLIDE-OVER / DRAWER MODAL */}
      {inspectLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-[#121418] h-full overflow-y-auto border-l border-[#dfb776]/40 shadow-2xl p-6 text-[#f3f4f6] flex flex-col justify-between">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#dfb776] animate-pulse" />
                  <span className="text-xs font-mono uppercase text-[#dfb776] font-semibold tracking-wider">
                    VIP CLIENT DOSSIER #{inspectLead.id.slice(-6).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => setInspectLead(null)}
                  className="p-1 rounded-xs hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Status */}
              <div className="mb-6 space-y-2">
                <h3 className="font-serif-luxury text-3xl font-bold text-white">{inspectLead.name}</h3>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-[#dfb776] font-semibold">{inspectLead.city}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-emerald-400 font-semibold">{inspectLead.budget || '₹ 5.85 Cr'} Budget</span>
                </div>
              </div>

              {/* Quick Contact Bar */}
              <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
                <a
                  href={`tel:${inspectLead.phone.replace(/[^0-9]/g, '')}`}
                  className="p-3 rounded-sm bg-[#0b0c0e] border border-white/15 hover:border-[#dfb776] text-white flex items-center gap-2.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#dfb776]" />
                  <span className="truncate">{inspectLead.phone}</span>
                </a>

                <a
                  href={`mailto:${inspectLead.email}`}
                  className="p-3 rounded-sm bg-[#0b0c0e] border border-white/15 hover:border-[#dfb776] text-white flex items-center gap-2.5 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#dfb776]" />
                  <span className="truncate">{inspectLead.email}</span>
                </a>
              </div>

              {/* Lead Management Form Controls */}
              <div className="space-y-4 text-xs font-mono pb-6 border-b border-white/10 mb-6">
                <div>
                  <label className="block text-[10px] uppercase text-gray-400 mb-1">ASSIGNED SALES EXECUTIVE</label>
                  <select
                    value={inspectAgent}
                    onChange={(e) => setInspectAgent(e.target.value)}
                    className="w-full px-3 py-2 rounded-sm border border-white/20 bg-[#0b0c0e] text-white focus:outline-none focus:border-[#dfb776]"
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Rajesh Sharma (Senior VP)">Rajesh Sharma (Senior VP)</option>
                    <option value="Priya V. (VIP Concierge)">Priya V. (VIP Concierge)</option>
                    <option value="Karthik R. (Managing Director)">Karthik R. (Managing Director)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-gray-400 mb-1">SALES ADVISORY NOTES</label>
                  <textarea
                    rows={4}
                    value={inspectNotes}
                    onChange={(e) => setInspectNotes(e.target.value)}
                    placeholder="Log conversation history, villa plot preferences, payment terms discussed..."
                    className="w-full px-3 py-2.5 rounded-sm border border-white/20 bg-[#0b0c0e] text-white focus:outline-none focus:border-[#dfb776]"
                  />
                </div>

                {/* Tags Manager */}
                <div>
                  <label className="block text-[10px] uppercase text-gray-400 mb-1">CLIENT TAGS & SEGMENTATION</label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(inspectLead.tags || []).map((t, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-xs bg-[#dfb776]/20 text-[#dfb776] border border-[#dfb776]/40 font-semibold">
                        <span>{t}</span>
                        <button
                          onClick={() => handleRemoveTagFromInspect(t)}
                          className="hover:text-red-400 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add custom tag (e.g. NRI, Hot Lead)..."
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-sm border border-white/15 bg-[#0b0c0e] text-white text-xs"
                    />
                    <button
                      onClick={handleAddTagToInspect}
                      className="px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase cursor-pointer"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>
              </div>

              {/* Registration Meta */}
              <div className="space-y-2 text-[11px] font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>Interested Unit:</span>
                  <span className="text-white font-semibold">{inspectLead.interestedUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Purchase Timeline:</span>
                  <span className="text-[#dfb776]">{inspectLead.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span>Source Channel:</span>
                  <span className="text-white">{inspectLead.source}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registered Date:</span>
                  <span className="text-gray-300">{inspectLead.formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => setInspectLead(null)}
                className="px-4 py-2.5 rounded-sm border border-white/20 text-gray-400 hover:text-white text-xs font-mono uppercase"
              >
                Close
              </button>
              <button
                onClick={handleSaveInspectLead}
                className="px-6 py-2.5 rounded-sm bg-[#dfb776] text-[#0b0c0e] font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-lg"
              >
                Save Dossier Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE VIP VISIT MODAL */}
      {visitModalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#121418] rounded-sm shadow-2xl border border-[#dfb776]/40 overflow-hidden text-[#f3f4f6] p-6">
            <h3 className="font-serif-luxury text-2xl text-white font-normal mb-1">
              Schedule VIP Site Inspection
            </h3>
            <p className="text-gray-400 text-xs mb-4">
              Book an on-site walkthrough for <strong className="text-white">{visitModalLead.name}</strong> at MYSA Luxe Villas, ECR.
            </p>

            <form onSubmit={handleConfirmVisitSchedule} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[10px] uppercase text-gray-300 mb-1">DATE OF VISIT *</label>
                <input
                  type="date"
                  required
                  value={visitFormDate}
                  onChange={(e) => setVisitFormDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-gray-300 mb-1">TIME SLOT *</label>
                <select
                  value={visitFormTime}
                  onChange={(e) => setVisitFormTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white"
                >
                  <option>10:00 AM (Morning Breeze)</option>
                  <option>11:30 AM (Sunlight Atrium)</option>
                  <option>03:00 PM (Afternoon Tour)</option>
                  <option>05:00 PM (Dusk Illumination Special)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-gray-300 mb-1">ASSIGNED VIP CONCIERGE</label>
                <select
                  value={visitFormAgent}
                  onChange={(e) => setVisitFormAgent(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white"
                >
                  <option value="Priya V. (VIP Concierge)">Priya V. (VIP Concierge)</option>
                  <option value="Rajesh Sharma (Senior VP)">Rajesh Sharma (Senior VP)</option>
                  <option value="Karthik R. (Managing Director)">Karthik R. (MD)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setVisitModalLead(null)}
                  className="px-4 py-2 rounded-sm border border-white/15 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-sm bg-[#dfb776] text-[#0b0c0e] font-semibold uppercase"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANUAL ADD LEAD MODAL */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#121418] rounded-sm shadow-2xl border border-[#dfb776]/40 overflow-hidden text-[#f3f4f6] p-6">
            <h3 className="font-serif-luxury text-2xl text-white font-normal mb-1">
              Add Client Lead Manually
            </h3>
            <p className="text-gray-400 text-xs mb-4">
              Enter inquiry details gathered from a walk-in, phone call, or executive referral.
            </p>

            <form onSubmit={handleManualAddSubmit} className="space-y-3.5 text-left text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Client Name"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98840 00000"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                    CITY / RESIDENCE
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                    ESTIMATED BUDGET
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.budget}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                    PURCHASE TIMELINE
                  </label>
                  <select
                    value={newLeadForm.timeline}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, timeline: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white font-mono"
                  >
                    <option>Immediate (0 – 30 Days)</option>
                    <option>Within 1 to 3 Months</option>
                    <option>3 to 6 Months</option>
                    <option>Exploring / Real Estate Portfolio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                    ASSIGNED EXECUTIVE
                  </label>
                  <select
                    value={newLeadForm.assignedAgent}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, assignedAgent: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white font-mono"
                  >
                    <option value="Rajesh Sharma (Senior VP)">Rajesh Sharma (Senior VP)</option>
                    <option value="Priya V. (VIP Concierge)">Priya V. (VIP Concierge)</option>
                    <option value="Karthik R. (Managing Director)">Karthik R. (MD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                  INTERESTED RESIDENCE
                </label>
                <input
                  type="text"
                  value={newLeadForm.interestedUnit}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, interestedUnit: e.target.value })}
                  className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                  NOTES
                </label>
                <textarea
                  rows={2}
                  placeholder="Specific requirements, plot preferences, etc."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 rounded-sm border border-white/15 text-gray-400 hover:text-white font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-sm bg-[#dfb776] text-[#0b0c0e] font-semibold font-mono uppercase"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
