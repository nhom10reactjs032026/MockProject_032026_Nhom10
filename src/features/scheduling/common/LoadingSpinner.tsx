import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-3 border-[#c4a484] border-t-transparent rounded-full animate-spin" />
    </div>
  );
};