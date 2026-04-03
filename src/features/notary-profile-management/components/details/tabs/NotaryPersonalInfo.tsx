import { useState, useRef, useEffect } from 'react';
import { useNotaryDetail, useUpdateNotary } from '../../../hooks/useNotaries';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit3, Save, Upload, Camera, Loader2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { personalInfoSchema, type PersonalInfoFormValues } from '../../../schemas/notary-personal-info.schema';

interface NotaryPersonalInfoProps {
  notaryId: string;
}

export const NotaryPersonalInfo = ({ notaryId }: NotaryPersonalInfoProps) => {
  const { data: notary, isLoading } = useNotaryDetail(notaryId);
  const updateNotary = useUpdateNotary();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      phone: '',
      addressLine1: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  useEffect(() => {
    if (notary) {
      form.reset({
        firstName: notary.firstName || '',
        lastName: notary.lastName || '',
        dob: notary.dob || '',
        email: notary.email || '',
        phone: notary.phone || '',
        addressLine1: notary.addressLine1 || '',
        city: notary.city || '',
        state: notary.state || '',
        zipCode: notary.zipCode || '',
      });
      if (notary.image) setProfileImage(notary.image);
    }
  }, [notary, form]);

  const onSubmit = async (data: PersonalInfoFormValues) => {
    try {
      await updateNotary.mutateAsync({
        id: notaryId,
        data: {
          ...data,
          name: `${data.firstName} ${data.lastName}`,
          image: profileImage || undefined,
        },
      });
      toast.success('Information updated successfully.'); // FUNC_01, FUNC_08
      setIsEditing(false);
    } catch (error: any) {
      if (error.field === 'email') {
         form.setError('email', { message: error.message }); // FUNC_05
      } else {
        toast.error('Failed to update profile');
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
        toast.error('Invalid file format. Allowed formats: JPG, PNG. Max 5MB.'); // FUNC_09
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success('Photo updated successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 p-8">
        <Skeleton className="h-48 w-48 rounded-full mx-auto" />
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!notary) return null;

  // Format date for display yyyy-mm-dd (GUI_PI_17)
  const formatDOB = (dateStr?: string) => {
     if (!dateStr) return 'Not provided';
     try {
       const date = new Date(dateStr);
       return date.toISOString().split('T')[0];
     } catch (e) {
       return dateStr;
     }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm animate-in fade-in duration-700 relative overflow-hidden group">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12 relative z-10">
        <div>
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight leading-none mb-3">Personal Information</h2>
          <p className="text-slate-400 font-medium">Detailed secure identification and contact records</p>
        </div>
        {!isEditing ? (
          <Button 
            onClick={() => setIsEditing(true)}
            className="group/btn bg-blue-600 hover:bg-blue-700 text-white rounded-[1.25rem] px-8 h-12 flex items-center gap-3 shadow-xl shadow-blue-100 transition-all active:scale-95"
          >
            <Edit3 size={18} className="group-hover/btn:rotate-12 transition-transform" />
            <span className="font-bold">Edit Section</span>
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                form.reset();
              }}
              disabled={updateNotary.isPending}
              className="rounded-[1.25rem] border-gray-200 h-12 px-8 font-bold text-slate-500 hover:bg-slate-50 transition-all"
            >
              Cancel
            </Button>
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={updateNotary.isPending}
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-[1.25rem] px-8 h-12 flex items-center gap-3 shadow-xl shadow-emerald-100 transition-all font-bold active:scale-95"
            >
              {updateNotary.isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {updateNotary.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        {/* Photo Section */}
        <div className="lg:col-span-3 flex flex-col items-center">
          <div 
            className={`relative group/image ${isEditing ? 'cursor-pointer hover:scale-105' : 'cursor-default'} transition-all duration-500`} 
            onClick={() => isEditing && fileInputRef.current?.click()}
          >
            <div className="h-52 w-52 rounded-[3.5rem] border-[8px] border-slate-50 overflow-hidden bg-slate-100 shadow-xl flex items-center justify-center relative">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="h-full w-full object-cover group-hover/image:scale-110 transition-transform duration-700" />
              ) : (
                <Camera size={56} className="text-slate-300" />
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-blue-600/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300">
                   <Upload className="text-white animate-bounce" size={40} />
                </div>
              )}
            </div>
            {isEditing && (
              <Button 
                size="icon" 
                className="absolute -bottom-2 -right-2 rounded-2xl h-12 w-12 bg-white text-blue-600 hover:bg-blue-50 shadow-xl border-4 border-slate-50 group-hover/image:rotate-12 transition-all active:scale-90"
              >
                <Camera size={20} />
              </Button>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-1">Official Identification</p>
            <p className="text-[11px] text-slate-400 font-medium">Headshot updated Mar 2026</p>
          </div>
        </div>

        {/* Info Form */}
        <div className="lg:col-span-9">
          {!isEditing ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <InfoField label="First Name" value={notary.firstName} />
                <InfoField label="Last Name" value={notary.lastName} />
                <InfoField label="Date of Birth" value={formatDOB(notary.dob)} isHighLight />
                <InfoField label="Email Address" value={notary.email} />
                <InfoField label="Phone Number" value={notary.phone} />
                <InfoField label="Street Address" value={notary.addressLine1} />
                <InfoField label="Zip Code" value={notary.zipCode} />
                <InfoField label="City" value={notary.city} />
                <InfoField label="State" value={notary.state} />
             </div>
          ) : (
            <Form {...form}>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 font-bold text-sm tracking-tight ml-1">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="First Name" 
                          className="rounded-[1.25rem] h-14 bg-slate-50/50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all text-base font-medium px-6" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 font-bold text-sm tracking-tight ml-1">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Last Name" 
                          className="rounded-[1.25rem] h-14 bg-slate-50/50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all text-base font-medium px-6" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 font-bold text-sm tracking-tight ml-1">Date of Birth</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          className="rounded-[1.25rem] h-14 bg-slate-50/50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all text-base font-medium px-6" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 font-bold text-sm tracking-tight ml-1">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="email@example.com" 
                          className="rounded-[1.25rem] h-14 bg-slate-50/50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all text-base font-medium px-6" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 font-bold text-sm tracking-tight ml-1">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Phone Number" 
                          className="rounded-[1.25rem] h-14 bg-slate-50/50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all text-base font-medium px-6" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 font-bold text-sm tracking-tight ml-1">Street Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Street Address" 
                          className="rounded-[1.25rem] h-14 bg-slate-50/50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all text-base font-medium px-6" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 font-bold text-sm tracking-tight ml-1">Zip Code</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Zip Code" 
                          className="rounded-[1.25rem] h-14 bg-slate-50/50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all text-base font-medium px-6" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 font-bold text-sm tracking-tight ml-1">City</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="City" 
                          className="rounded-[1.25rem] h-14 bg-slate-50/50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all text-base font-medium px-6" 
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
                      <FormLabel className="text-slate-800 font-bold text-sm tracking-tight ml-1">State</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-[1.25rem] h-14 bg-slate-50/50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all text-base font-medium px-6 outline-none">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-2xl border-gray-100 shadow-2xl p-2">
                          <SelectItem value="California" className="rounded-xl">California</SelectItem>
                          <SelectItem value="Texas" className="rounded-xl">Texas</SelectItem>
                          <SelectItem value="New York" className="rounded-xl">New York</SelectItem>
                          <SelectItem value="Florida" className="rounded-xl">Florida</SelectItem>
                          <SelectItem value="Washington" className="rounded-xl">Washington</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

interface InfoFieldProps {
  label: string;
  value?: string;
  isFullWidth?: boolean;
  isHighLight?: boolean;
}

const InfoField = ({ label, value, isFullWidth, isHighLight }: InfoFieldProps) => (
  <div className={`space-y-3 ${isFullWidth ? 'md:col-span-2' : ''} group/field`}>
    <Label className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.15em] ml-1 group-hover/field:text-blue-500 transition-colors">
      {label}
    </Label>
    <div className={`h-14 w-full ${isHighLight ? 'bg-blue-50/50' : 'bg-slate-50/50'} rounded-[1.25rem] px-6 flex items-center border ${isHighLight ? 'border-blue-100' : 'border-slate-50/50'} group-hover/field:border-blue-200 transition-all shadow-sm shadow-transparent group-hover/field:shadow-blue-50 group-hover/field:translate-x-1`}>
       <span className={`text-slate-800 text-base font-bold tracking-tight ${isHighLight ? 'text-blue-700' : ''}`}>
         {value || 'Not provided'}
       </span>
    </div>
  </div>
);
