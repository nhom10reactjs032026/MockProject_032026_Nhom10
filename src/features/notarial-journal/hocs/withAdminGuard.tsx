import { type ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type WithAdminGuardOptions =
  | { type: "redirect"; to: string }
  | { type: "dialog"; message: string };

export function withAdminGuard<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAdminGuardOptions,
): ComponentType<P> {
  const GuardedComponent = (props: P) => {
    const { user } = useAuthStore();
    const isAuthorized = user?.role === "admin";

    if (!isAuthorized) {
      if (options.type === "redirect") {
        return <Navigate to={options.to} replace />;
      }

      const { open, onOpenChange } = props as unknown as {
        open: boolean;
        onOpenChange: (open: boolean) => void;
      };

      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-md rounded-xl p-0 gap-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#ebebeb] bg-white">
              <DialogTitle className="text-lg font-bold text-foreground">
                Access Denied
              </DialogTitle>
            </div>
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center gap-4">
              <div className="p-4 bg-red-50 rounded-full">
                <ShieldAlert className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Unauthorized Access
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {options.message}
              </p>
              <Button
                variant="outline"
                className="border-[#ebebeb] mt-2"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    return <WrappedComponent {...props} />;
  };

  GuardedComponent.displayName = `withAdminGuard(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return GuardedComponent;
}
