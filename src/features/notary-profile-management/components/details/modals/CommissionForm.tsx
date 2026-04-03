import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Upload, Loader2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { commissionSchema, type CommissionFormValues } from '../../../schemas/notary-commission.schema';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import type { Commission } from '../../../types/notary.types';

interface CommissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CommissionFormValues) => void;
  initialData?: Commission | null;
  isSubmitting?: boolean;
}

export const CommissionForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData, 
  isSubmitting 
}: CommissionFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CommissionFormValues>({
    resolver: zodResolver(commissionSchema),
    defaultValues: {
      commissionNumber: '',
      state: '',
      issueDate: '',
      expiryDate: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file format. Allowed formats: PDF, JPG, PNG.'); // FUNC_10
      return;
    }

    setSelectedFile(file);
    form.setValue('document', file);
  };

  useEffect(() => {
    if (initialData) {
      form.reset({
        commissionNumber: initialData.commissionNumber,
        state: initialData.state,
        issueDate: initialData.issueDate,
        expiryDate: initialData.expiryDate,
      });
    } else {
      form.reset({
        commissionNumber: '',
        state: '',
        issueDate: '',
        expiryDate: '',
      });
    }
  }, [initialData, form, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            {initialData ? 'Edit Commission' : 'Upload Commission'}
          </DialogTitle>
          <DialogDescription className="text-slate-400 font-medium">
            System displays the "Configure Commission" form with all required fields (State, Commission Number, Issue Date, Expiration Date, Document)
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="commissionNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 font-bold">Commission Number</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Ex: CA-20248847" 
                        className="rounded-xl h-12 bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 font-bold">State</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl h-12 bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-slate-100">
                        <SelectItem value="California">California</SelectItem>
                        <SelectItem value="Texas">Texas</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Florida">Florida</SelectItem>
                        <SelectItem value="Washington">Washington</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-bold">Issue Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          className="rounded-xl h-12 bg-slate-50 border-slate-100 focus:bg-white transition-all" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-bold">Expiration Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          className="rounded-xl h-12 bg-slate-50 border-slate-100 focus:bg-white transition-all" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <FormLabel className="text-slate-600 font-bold">Commission Document (Required for Upload)</FormLabel>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed ${selectedFile ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-slate-50/50'} rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer group`}
                >
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${selectedFile ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-400 group-hover:text-blue-500'}`}>
                    {selectedFile ? <CheckCircle2 size={24} /> : <Upload size={24} />}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-bold ${selectedFile ? 'text-emerald-700' : 'text-slate-700'}`}>
                      {selectedFile ? selectedFile.name : 'Click to upload or drag & drop'}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">Allowed formats: PDF, PNG, JPG (max. 10MB)</p>
                  </div>
                </div>
                {form.formState.errors.document && (
                  <p className="text-sm font-medium text-rose-500 flex items-center gap-1 mt-1">
                    <AlertCircle size={14} />
                    {form.formState.errors.document.message as string}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="pt-4 gap-3 sm:gap-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="rounded-xl h-12 px-8 border-slate-200 text-slate-500 font-bold hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="rounded-xl h-12 px-8 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                {initialData ? 'Update Record' : 'Upload Commission'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
