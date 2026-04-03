import React from "react";
import { Building2, User, Mail, MapPin, Hash, Clock, FileText, Users, DollarSign, Phone, Award, Star } from "lucide-react";
import { InfoCard } from "../components/detail/InfoCard";
import { InfoRow } from "../components/detail/InfoRow";
import { ActionButtons } from "../components/detail/ActionButtons";
import { mockJobDetail } from "../data/mockData";
import { useUIStore } from "../store/useUIStore";

interface JobDetailProps {
  onBack?: () => void;
}

export const JobDetail: React.FC<JobDetailProps> = ({ onBack }) => {
  const { showToast } = useUIStore();
  const job = mockJobDetail; // ✅ Tạm thời dùng mock data

  const handleConfirm = () => {
    showToast("Job confirmed!", "success");
  };

  const handleCancel = () => {
    showToast("Job cancelled", "info");
    if (onBack) onBack();
  };

  const handleReassign = () => {
    showToast("Redirecting to dispatch page...", "info");
  };

  const handleReschedule = () => {
    showToast("Reschedule feature coming soon", "info");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-6">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Job Details</h1>
          <p className="text-sm text-gray-400 mt-1">
            Job #{job.id} • {job.service.name}
          </p>
        </div>
      </div>

      {/* 3 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Client Info Card */}
        <InfoCard title="Client Info" icon={<Building2 className="w-4 h-4" />}>
          <InfoRow label="NAME" value={job.client.name} highlight />
          <InfoRow label="TYPE" value={job.client.type} />
          <InfoRow 
            label="CONTACT" 
            value={
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span>{job.client.contact}</span>
              </div>
            } 
          />
          <InfoRow 
            label="EMAIL" 
            value={
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[#c4a484]">{job.client.email}</span>
              </div>
            } 
          />
          <InfoRow 
            label="ADDRESS" 
            value={
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                <span className="text-gray-600 text-sm leading-relaxed">
                  {job.client.address}
                </span>
              </div>
            } 
          />
          <InfoRow 
            label="REF #" 
            value={
              <div className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-mono text-sm">{job.client.ref}</span>
              </div>
            } 
          />
        </InfoCard>

        {/* Service Details Card */}
        <InfoCard title="Service Details" icon={<FileText className="w-4 h-4" />}>
          <InfoRow label="SERVICE" value={job.service.name} badge />
          <InfoRow 
            label="SIGNERS" 
            value={
              <div className="flex items-start gap-2">
                <Users className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                <span>{job.service.signers.join(", ")}</span>
              </div>
            } 
          />
          <InfoRow 
            label="DOCS" 
            value={
              <div className="flex items-start gap-2">
                <FileText className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                <span className="text-gray-600 text-sm">{job.service.docs}</span>
              </div>
            } 
          />
          <InfoRow 
            label="TIME" 
            value={
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{job.service.date} | {job.service.time}</span>
              </div>
            } 
          />
          <InfoRow label="STATE" value={job.service.state} />
          <InfoRow 
            label="FEE" 
            value={
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-[#c4a484]" />
                <span className="text-lg font-bold text-[#c4a484]">
                  ${job.service.fee.toFixed(2)}
                </span>
              </div>
            } 
            highlight
          />
        </InfoCard>

        {/* Notary Info Card */}
        <InfoCard title="Notary Info" icon={<Award className="w-4 h-4" />}>
          <InfoRow label="ASSIGNED" value={job.notary.name} highlight />
          <InfoRow 
            label="PHONE" 
            value={
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{job.notary.phone}</span>
              </div>
            } 
          />
          <InfoRow 
            label="CERT" 
            value={
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-mono">{job.notary.cert}</span>
              </div>
            } 
          />
          <InfoRow 
            label="EMAIL" 
            value={
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[#c4a484] text-sm">{job.notary.email}</span>
              </div>
            } 
          />
          <InfoRow 
            label="DISTANCE" 
            value={
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{job.notary.distance}</span>
              </div>
            } 
          />
          <InfoRow 
            label="RATING" 
            value={
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-gray-800">{job.notary.rating}</span>
                <span className="text-xs text-gray-400">/ 5.0</span>
              </div>
            } 
          />
        </InfoCard>
      </div>

      {/* Action Buttons */}
      <ActionButtons
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onReassign={handleReassign}
        onReschedule={handleReschedule}
        onPrint={handlePrint}
      />
    </div>
  );
};