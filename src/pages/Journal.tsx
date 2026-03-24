import React from "react";

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Journal Entry
        </h1>

        {/* CARD */}
        <div className="bg-white rounded-xl shadow p-4 md:p-8">
          
          {/* AUTO FIELDS */}
          <h2 className="font-semibold text-lg mb-4">
            Auto-Populated Fields
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Date and Time</label>
              <input
                className="input"
                value="2023-10-27 11:30 AM"
                readOnly
              />
            </div>

            <div>
              <label className="label">Act Type</label>
              <input
                className="input"
                value="Acknowledgment"
                readOnly
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="label">Signer Information</label>
            <textarea
              className="input w-full"
              rows={3}
              value="Alice Wonderland (Grantor) - ID: DL123456789 | Bob The Builder (Witness) - ID: PENDING"
              readOnly
            />
          </div>

          {/* MANUAL */}
          <h2 className="font-semibold text-lg mb-4">
            Manual Fields
          </h2>

          <div className="mb-4">
            <label className="label">Fee Charged</label>
            <input
              className="input w-full"
              placeholder="$15.00"
            />
          </div>

          <div className="mb-6">
            <label className="label">Notes</label>
            <textarea
              className="input w-full"
              rows={3}
              placeholder="Enter any additional notes for the journal entry..."
            />
          </div>

          {/* SIGNATURE */}
          <h2 className="font-semibold text-lg mb-4">
            Signature / Thumbprint
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* SIGNATURE */}
            <div>
              <p className="label mb-2">Signer Signature</p>
              <div className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400">
                Signer Signature Area
              </div>
            </div>

            {/* THUMBPRINT */}
            <div>
              <p className="label mb-2">Signer Thumbprint</p>
              <div className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400">
                Thumbprint Area
              </div>
            </div>
          </div>

          {/* COMPLIANCE */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">
              Journal Compliance Check
            </h3>

            <p className="font-medium">
              Compliance Status:{" "}
              <span className="text-green-600">
                All requirements met
              </span>
            </p>

            <div className="mt-3">
              <p className="font-medium">Link to Master Journal</p>
              <p className="text-sm text-gray-500">
                This entry will be automatically recorded in your Master Notary Journal.
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <button className="btn-secondary">
              Back
            </button>

            <button className="btn-primary">
              Save Journal Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}