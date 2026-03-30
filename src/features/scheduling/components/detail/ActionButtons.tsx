import React from "react";

interface ActionButtonsProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  onReassign?: () => void;
  onReschedule?: () => void;
  onPrint?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onConfirm,
  onCancel,
  onReassign,
  onReschedule,
  onPrint,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm p-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-[#c4a484] hover:bg-[#b89474] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            Confirm Assignment
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-semibold transition-colors"
          >
            Cancel Job
          </button>
          <button
            onClick={onReassign}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
          >
            Re-assign
          </button>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onReschedule}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
          >
            Re-schedule
          </button>
          <button
            onClick={onPrint}
            className="px-5 py-2.5 border border-[#ebebeb] hover:bg-gray-50 text-gray-600 rounded-xl text-sm font-semibold transition-colors"
          >
            Print / PDF
          </button>
        </div>
      </div>
    </div>
  );
};