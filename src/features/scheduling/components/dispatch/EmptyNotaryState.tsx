import React from "react";
import { Search } from "lucide-react";

interface EmptyNotaryStateProps {
  onExpandSearch?: () => void;
}

export const EmptyNotaryState: React.FC<EmptyNotaryStateProps> = ({ onExpandSearch }) => {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-sm text-gray-500 mb-2">
        Not finding the right notary?
      </p>
      <p className="text-xs text-gray-400 mb-4">
        Try expanding your search radius or adjusting the required certifications for this dispatch.
      </p>
      <button
        onClick={onExpandSearch}
        className="px-4 py-2 text-sm text-[#c4a484] border border-[#c4a484] rounded-lg hover:bg-[#fdf6ef] transition-colors"
      >
        Expand Search
      </button>
    </div>
  );
};