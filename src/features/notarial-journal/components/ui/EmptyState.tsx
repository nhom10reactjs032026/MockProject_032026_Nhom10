import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export const EmptyState = ({
  title = "No Data Found",
  message = "There are currently no records to display.",
  className = "",
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 text-center w-full ${className}`}
    >
      <div className="w-16 h-16 bg-[#f8f8f8] border border-[#ebebeb] flex items-center justify-center rounded-full mb-4 shadow-sm">
        <Inbox className="w-8 h-8 text-[#c4a484]" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};
