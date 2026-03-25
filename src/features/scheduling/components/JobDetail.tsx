import React from "react";
import { mockJobDetail } from "../data/mockData";

export const JobDetail: React.FC = () => {
  const job = mockJobDetail;

  return (
    <div className="flex flex-col gap-6">

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CLIENT */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">
            Client Info
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="font-medium">{job.client.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Type</p>
              <p>{job.client.type}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Contact</p>
              <p>{job.client.contact}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p>{job.client.email}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Address</p>
              <p>{job.client.address}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Ref #</p>
              <p>{job.client.ref}</p>
            </div>
          </div>
        </div>

        {/* SERVICE */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">
            Service Details
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-gray-400">Service</p>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs">
                {job.service.name}
              </span>
            </div>

            <div>
              <p className="text-xs text-gray-400">Signers</p>
              <p>{job.service.signers.join(", ")}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Docs</p>
              <p>{job.service.docs}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Time</p>
              <p>
                {job.service.date} | {job.service.time}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">State</p>
              <p>{job.service.state}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Fee</p>
              <p className="text-blue-600 font-semibold">
                ${job.service.fee.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Meeting Link</p>
              <p className="text-gray-400">
                {job.service.meetingLink || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* NOTARY */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">
            Notary Info
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-gray-400">Assigned</p>
              <p className="font-medium">{job.notary.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p>{job.notary.phone}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Cert</p>
              <p>{job.notary.cert}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p>{job.notary.email}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Distance</p>
              <p>{job.notary.distance}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Rating</p>
              <p className="text-yellow-500">
                ★★★★★{" "}
                <span className="text-gray-700 ml-1">
                  {job.notary.rating}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="bg-gray-50 border rounded-2xl p-4 flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Confirm
          </button>
          <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg">
            Cancel
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">
            Re-assign
          </button>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-gray-200 rounded-lg">
            Re-schedule
          </button>
          <button className="px-4 py-2 border rounded-lg">
            Print / PDF
          </button>
        </div>
      </div>
    </div>
  );
};