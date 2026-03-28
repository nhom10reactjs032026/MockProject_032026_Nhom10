import React from "react";
import { Star, Clock, Briefcase, Calendar, CheckCircle, MapPin } from "lucide-react";
import type { Notary } from "../../types/scheduling.types";

interface NotaryCardProps {
  notary: Notary;
  isSelected: boolean;
  onSelect: () => void;
  onViewProfile: () => void;
}

export const NotaryCard: React.FC<NotaryCardProps> = ({
  notary,
  isSelected,
  onSelect,
  onViewProfile,
}) => {
  // Kiểm tra availability
  const isAvailable = notary.available !== "Not available this time slot";

  return (
    <div
      onClick={onSelect}
      className={`
        flex items-start gap-3 p-4 rounded-xl border cursor-pointer
        transition-all duration-200
        ${
          isSelected
            ? "border-[#c4a484] bg-[#fdf6ef] ring-1 ring-[#c4a484]/20"
            : "border-[#ebebeb] bg-white hover:border-[#c4a484] hover:shadow-md"
        }
      `}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base"
          style={{ background: notary.avatarColor }}
        >
          {notary.avatarInitials}
        </div>
        {notary.verified && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
            <CheckCircle className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between flex-wrap gap-1 mb-1">
          <h4 className="font-bold text-gray-800 text-sm">{notary.name}</h4>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{notary.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {notary.services}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {notary.jobs} jobs
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{notary.distance}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{notary.available}</span>
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-400">
          EXP: {notary.exp}
        </div>

        {!isAvailable && (
          <div className="mt-2 text-xs text-red-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Not available this time slot
          </div>
        )}
      </div>

      {/* View Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewProfile();
        }}
        className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-[#c4a484] text-[#c4a484] text-xs font-semibold hover:bg-[#fdf6ef] transition-colors"
      >
        View
      </button>
    </div>
  );
};