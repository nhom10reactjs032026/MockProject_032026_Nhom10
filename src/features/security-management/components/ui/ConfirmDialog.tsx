import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-5 shadow-xl">
          <div className="text-lg font-bold text-slate-900">{title}</div>
          {description && (
            <div className="mt-2 text-sm text-slate-600">{description}</div>
          )}

          <div className="mt-5 flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              variant={danger ? "danger" : "primary"}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}