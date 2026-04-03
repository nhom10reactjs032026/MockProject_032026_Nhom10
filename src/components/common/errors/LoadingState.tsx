import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState = ({
  message = "Loading...",
  className = "",
}: LoadingStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center min-h-[50vh] w-full ${className}`}
    >
      <Loader2 className="w-8 h-8 text-[#c4a484] animate-spin mb-4" />
      <p className="text-muted-foreground font-medium text-sm">{message}</p>
    </div>
  );
};
