import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  retry?: () => void;
  className?: string;
}

export const ErrorState = ({
  title = "Something went wrong",
  message = "An error occurred while loading this section. Please try again.",
  retry,
  className = "",
}: ErrorStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 text-center w-full min-h-[40vh] bg-red-50/50 rounded-xl border border-red-100 ${className}`}
    >
      <div className="w-12 h-12 bg-red-100 flex items-center justify-center rounded-full mb-4">
        <AlertCircle className="w-6 h-6 text-red-600" />
      </div>
      <h3 className="text-lg font-bold text-red-900 mb-2">{title}</h3>
      <p className="text-sm text-red-600/80 max-w-sm mb-6">{message}</p>
      {retry && (
        <Button
          onClick={retry}
          variant="outline"
          className="bg-white border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      )}
    </div>
  );
};
