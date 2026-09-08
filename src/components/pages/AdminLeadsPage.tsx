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
  KeyRound,
  RefreshCw,
  ExternalLink,
  Plus,
  ArrowLeft,
  Copy,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { ClientLead, LeadStatus } from '../../types';
import {
  getStoredLeads,
  saveLead,
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
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // Manual Add Form
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Chennai',
    timeline: 'Immediate (0 – 30 Days)',
    interestedUnit: 'MYSA Luxe 4BHK Villa with Private Pool',
    source: 'Manual Admin Entry',
    notes: ''
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loadData = () => {
    setLeads(getStoredLeads());
    setIsUnlocked(isVillaAccessUnlocked());
  };

  useEffect(() => {
    loadData();

    // Listen for storage / custom updates
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
    showToast(`Lead status updated to "${newStatus}"`);
    loadData();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete lead for ${name}?`)) {
      deleteLead(id);
      showToast(`Removed ${name} from CRM records`);
      loadData();
    }
  };

  const handleToggleGateLock = () => {
    if (isUnlocked) {
      setVillaAccessUnlocked(false);
      setIsUnlocked(false);
      showToast('Villa Showcase Locked! You can now test entering from the Menu or Cards to see the Access Form.');
    } else {
      setVillaAccessUnlocked(true);
      setIsUnlocked(true);
      showToast('Villa Showcase Unlocked! Bypassing gating form.');
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard: ${text}`);
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Timeline', 'Interested Unit', 'Source', 'Status', 'Date Registered', 'Notes'];
    const rows = leads.map((lead) => [
      `"${lead.id}"`,
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${lead.phone.replace(/"/g, '""')}"`,
      `"${lead.city.replace(/"/g, '""')}"`,
      `"${lead.timeline.replace(/"/g, '""')}"`,
      `"${(lead.interestedUnit || '').replace(/"/g, '""')}"`,
      `"${lead.source.replace(/"/g, '""')}"`,
      `"${lead.status}"`,
      `"${lead.formattedDate}"`,
      `"${(lead.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `unifra_crm_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported leads to CSV file.');
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
      notes: ''
    });
    showToast('New client lead added successfully!');
    loadData();
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.source.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Metrics
  const totalLeads = leads.length;
  const immediateLeads = leads.filter(l => l.timeline.includes('Immediate') || l.timeline.includes('30')).length;
  const visitScheduled = leads.filter(l => l.status === 'VIP Visit Scheduled').length;
  const newLeads = leads.filter(l => l.status === 'New Lead').length;

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
            <span className="text-xs font-mono text-[#dfb776] tracking-wider uppercase font-semibold">
              Admin CRM Portal (/admin)
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
                  <span>Villa Unlocked (Click to Re-lock & Test Gate)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Villa Gated (Form Required)</span>
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

        {/* Page Title & Luxury Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#dfb776]/15 border border-[#dfb776]/30 text-[#dfb776] text-[10px] font-mono uppercase tracking-widest font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>EXECUTIVE SALES CONSOLE • CLIENT INTELLIGENCE</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal">
            Private Client Leads & <span className="italic text-[#dfb776]">Villa Showcase Access</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1.5 max-w-3xl font-light leading-relaxed">
            All user registrations, phone numbers, and email addresses collected from the Villa Showcase unlock gate and concierge booking requests are securely stored here.
          </p>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-sm bg-[#121418] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">TOTAL CLIENT LEADS</span>
              <Users className="w-4 h-4 text-[#dfb776]" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              {totalLeads}
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>100% Verified Phone & Email</span>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[#121418] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">NEW UNTOUCHED LEADS</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-400">
              {newLeads}
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1">
              Awaiting sales advisory call
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[#121418] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">IMMEDIATE BUYERS (0-30D)</span>
              <Clock className="w-4 h-4 text-[#dfb776]" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#dfb776]">
              {immediateLeads}
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1">
              High purchase urgency
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[#121418] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">SITE VISITS SCHEDULED</span>
              <Calendar className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-emerald-400">
              {visitScheduled}
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1">
              On-site concierge booked
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-[#121418] p-4 rounded-sm border border-white/10 mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Name, Email, Phone, City, or Source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-sm border border-white/15 focus:outline-none focus:border-[#dfb776] bg-[#0b0c0e] text-white text-xs placeholder:text-gray-500"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-[#0b0c0e] p-1 rounded-sm border border-white/10 text-xs font-mono">
            {['All', 'New Lead', 'Contacted', 'VIP Visit Scheduled', 'Converted'].map((st) => (
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

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
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

        {/* Leads Table Card */}
        <div className="bg-[#121418] rounded-sm border border-white/10 overflow-hidden shadow-2xl">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h3 className="font-serif-luxury text-lg text-white font-semibold">No Leads Found</h3>
              <p className="text-gray-400 text-xs max-w-sm mx-auto mt-1 mb-4">
                {searchQuery || statusFilter !== 'All'
                  ? 'No client leads matched your current filters.'
                  : 'No client details have been recorded yet. Enter your details from the Villa Showcase unlock form to test!'}
              </p>
              <button
                onClick={resetSampleLeads}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#dfb776] text-[#0b0c0e] text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Sample VIP Leads</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0b0c0e]/80 text-[10px] font-mono uppercase tracking-widest text-gray-400">
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4">Phone Number</th>
                    <th className="py-3 px-4">Location / Timeline</th>
                    <th className="py-3 px-4">Interest / Source</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {filteredLeads.map((lead) => {
                    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                    return (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                        {/* Client Name & Registered Time */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-semibold text-white group-hover:text-[#dfb776] transition-colors">
                            {lead.name}
                          </div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                            {lead.formattedDate}
                          </div>
                          {lead.notes && (
                            <div className="text-[10px] text-gray-400 italic mt-1 line-clamp-1 max-w-[200px]" title={lead.notes}>
                              "{lead.notes}"
                            </div>
                          )}
                        </td>

                        {/* Email Address */}
                        <td className="py-4 px-4 align-top">
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
                              className="text-gray-500 hover:text-white p-1 rounded-xs transition-colors cursor-pointer"
                              title="Copy Email"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </td>

                        {/* Phone Number */}
                        <td className="py-4 px-4 align-top">
                          <div className="flex items-center gap-1.5 font-mono font-medium text-white">
                            <Phone className="w-3 h-3 text-[#dfb776] shrink-0" />
                            <a
                              href={`tel:${cleanPhone}`}
                              className="hover:text-[#dfb776] hover:underline underline-offset-2"
                            >
                              {lead.phone}
                            </a>
                            <button
                              onClick={() => handleCopyText(lead.phone, 'Phone')}
                              className="text-gray-500 hover:text-white p-1 rounded-xs transition-colors cursor-pointer"
                              title="Copy Phone"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-1.5">
                            <a
                              href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(lead.name)},%20thank%20you%20for%20inquiring%20about%20UNIFRA%20MYSA%20Luxe%20Villas.`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono hover:bg-emerald-500/25 transition-colors"
                            >
                              <MessageSquare className="w-2.5 h-2.5" />
                              <span>WhatsApp</span>
                            </a>
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
                            Timeline: <span className="text-[#dfb776]">{lead.timeline}</span>
                          </div>
                        </td>

                        {/* Interest / Source */}
                        <td className="py-4 px-4 align-top">
                          <div className="text-white font-medium text-xs truncate max-w-[180px]">
                            {lead.interestedUnit || 'MYSA Luxe Villas'}
                          </div>
                          <div className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 mt-1 rounded-xs bg-white/5 border border-white/10 text-gray-400">
                            <KeyRound className="w-2.5 h-2.5 text-[#dfb776]" />
                            <span>{lead.source}</span>
                          </div>
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

                        {/* Delete Action */}
                        <td className="py-4 px-4 align-top text-right">
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

          {/* Footer Bar of Table */}
          <div className="p-4 bg-[#0b0c0e] border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400 font-mono">
            <span>Showing {filteredLeads.length} of {leads.length} recorded leads</span>
            <div className="flex items-center gap-3">
              <button
                onClick={clearAllLeads}
                className="text-red-400 hover:text-red-300 transition-colors cursor-pointer text-[10px] uppercase tracking-wider"
              >
                Clear All Leads
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#121418] rounded-sm shadow-2xl border border-[#dfb776]/40 overflow-hidden text-[#f3f4f6] p-6">
            <h3 className="font-serif-luxury text-2xl text-white font-normal mb-1">
              Add Client Lead Manually
            </h3>
            <p className="text-gray-400 text-xs mb-4">
              Enter inquiry details gathered from a walk-in, phone call, or email.
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
                  className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white"
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
                    className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white"
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
                    className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white"
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
                    className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                    PURCHASE TIMELINE
                  </label>
                  <select
                    value={newLeadForm.timeline}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, timeline: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white"
                  >
                    <option>Immediate (0 – 30 Days)</option>
                    <option>Within 1 to 3 Months</option>
                    <option>3 to 6 Months</option>
                    <option>Exploring / Real Estate Portfolio</option>
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
                  className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white"
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
                  className="w-full px-3 py-2 rounded-sm border border-white/15 bg-[#0b0c0e] text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 rounded-sm border border-white/15 text-gray-400 hover:text-white"
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
