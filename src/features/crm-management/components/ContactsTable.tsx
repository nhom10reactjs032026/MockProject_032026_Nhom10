import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageSquare,
  MoreVertical,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Contact {
  id: string | number;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
  notificationPreferences?: boolean;
  avatarUrl?: string;
}

interface ContactsTableProps {
  contacts: Contact[];
}

/**
 * Extracts the first letters of the first and last name to create an avatar initial.
 * E.g., "Sarah Jenkins" -> "SJ"
 */
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Deterministically assigns a background color for the fallback avatar
 * based on the contact's index in the array to ensure visual variety.
 */
const getAvatarColor = (idx: number) => {
  const colors = [
    "bg-[#bfdbfe] text-[#1e40af]",
    "bg-[#fed7aa] text-[#9a3412]",
    "bg-[#fecaca] text-[#991b1b]",
    "bg-[#e2e8f0] text-[#334155]",
  ];
  return colors[idx % colors.length];
};

/**
 * Component to display a tabular list of customer contacts.
 */
export const ContactsTable = ({ contacts }: ContactsTableProps) => {
  return (
    <Card className="border-slate-100 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <div>
          <h3 className="text-[15px] font-bold text-[#c4a47c]">
            Contacts Management
          </h3>
          <p className="text-sm font-medium text-slate-500 mt-0.5">
            View and manage primary touchpoints.
          </p>
        </div>
        <Button className="bg-[#c4a47c] hover:bg-[#b08d65] text-white font-semibold px-5 h-10 flex items-center gap-2 rounded-lg transition-colors">
          <Plus size={18} strokeWidth={2.5} />
          Add
        </Button>
      </div>

      {/* Main Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {/* ... column headers ... */}
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-[5%]">
                #
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-[22%]">
                NAME
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-[12%]">
                ROLE
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-[22%]">
                EMAIL
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-[15%] whitespace-nowrap">
                PHONE
              </th>

              <th className="px-2 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-[8%] whitespace-nowrap">
                PRIMARY
              </th>
              <th className="px-2 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-[12%] whitespace-nowrap">
                NOTIFICATION PREFERENCES
              </th>
              <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-[4%]">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* Map through contact list and generate table rows */}
            {contacts.map((contact, idx) => {
              // Extract first name for bolding, and the rest for the last name
              const [firstName, ...lastNameParts] = contact.name.split(" ");
              const lastName = lastNameParts.join(" ");

              return (
                <tr
                  key={contact.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-5 text-slate-500 font-medium">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      {/* Avatar Rendering Logic: Show image if exists, else show colored initials */}
                      {/* Note: avatarUrl is hypothetical in the provided type, checking just in case */}
                      {contact.avatarUrl ? (
                        <img
                          src={contact.avatarUrl}
                          alt={contact.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 ${getAvatarColor(idx)} rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}
                        >
                          {getInitials(contact.name)}
                        </div>
                      )}

                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 leading-tight">
                          {firstName}
                        </span>
                        {lastName && (
                          <span className="font-bold text-slate-900 leading-tight">
                            {lastName}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600 font-medium">
                    {contact.role}
                  </td>
                  <td className="px-6 py-5 text-[#c4a47c] font-medium">
                    {contact.email}
                  </td>
                  <td className="px-6 py-5 text-slate-600 font-medium whitespace-nowrap">
                    {contact.phone}
                  </td>

                  {/* Settings Checkboxes and Icons */}
                  <td className="px-2 py-5 text-center">
                    <input
                      type="checkbox"
                      checked={contact.isPrimary || false}
                      readOnly
                      className="w-4 h-4 rounded text-[#c4a47c] focus:ring-[#c4a47c] accent-[#c4a47c] cursor-pointer"
                    />
                  </td>
                  <td className="px-2 py-5">
                    <div className="flex justify-center gap-4">
                      <button
                        className={
                          contact.notificationPreferences
                            ? "text-[#c4a47c]"
                            : "text-slate-300"
                        }
                      >
                        <Mail className="w-[18px] h-[18px]" strokeWidth={2} />
                      </button>
                      <button
                        className={
                          contact.notificationPreferences
                            ? "text-[#c4a47c]"
                            : "text-slate-300"
                        }
                      >
                        <MessageSquare
                          className="w-[18px] h-[18px]"
                          strokeWidth={2}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors mx-auto block">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-b-xl border-t border-slate-100 bg-white px-4 py-5 sm:flex-row sm:gap-0 sm:px-8">
        <p className="text-center text-sm font-medium text-slate-500 sm:text-left">
          Showing 1-10 of 422 customers
        </p>

        <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
          {/* ... pagination buttons ... */}
          <button className="flex h-8 w-8 items-center justify-center rounded text-slate-400 hover:bg-slate-100">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="h-8 w-8 rounded bg-[#c4a47c] text-sm font-bold text-white">
            1
          </button>
          <button className="h-8 w-8 rounded text-sm font-medium text-slate-600 hover:bg-slate-100">
            2
          </button>
          <button className="hidden h-8 w-8 rounded text-sm font-medium text-slate-600 hover:bg-slate-100 sm:block">
            3
          </button>
          <span className="flex items-center justify-center px-1 font-bold text-slate-400">
            ...
          </span>
          <button className="h-8 w-8 rounded text-sm font-medium text-slate-600 hover:bg-slate-100">
            42
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded text-slate-400 hover:bg-slate-100">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};
