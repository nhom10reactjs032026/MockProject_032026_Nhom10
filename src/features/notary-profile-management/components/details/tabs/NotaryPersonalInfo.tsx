import { useState, useRef, useEffect } from 'react';
import { useNotaryDetail, useUpdateNotary } from '../../../hooks/useNotaries';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit3, Save, Upload, Camera, Loader2 } from 'lucide-react';
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
      
      toast.success('Information saved successfully!', {
        description: 'The notary profile has been updated.',
      });
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile', {
        description: 'An error occurred while saving changes.',
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large', { description: 'Maximum file size is 5MB' });
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
    return <Skeleton className="h-[500px] w-full rounded-3xl" />;
  }

  if (!notary) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm animate-in fade-in duration-500">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
          <p className="text-sm text-slate-400 font-medium">Manage the notary's basic personal details</p>
        </div>
        {!isEditing ? (
          <Button 
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2 h-11 flex items-center gap-2 shadow-lg shadow-blue-100"
          >
            <Edit3 size={18} />
            Edit Section
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                form.reset();
              }}
              disabled={updateNotary.isPending}
              className="rounded-xl border-gray-200 h-11 px-6"
            >
              Cancel
            </Button>
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={updateNotary.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6 py-2 h-11 flex items-center gap-2 shadow-lg shadow-emerald-100"
            >
              {updateNotary.isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {updateNotary.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Photo Section */}
        <div className="lg:col-span-1 flex flex-col items-center">
          <div 
            className={`relative group ${isEditing ? 'cursor-pointer' : 'cursor-default'}`} 
            onClick={() => isEditing && fileInputRef.current?.click()}
          >
            <div className="h-48 w-48 rounded-full border-4 border-slate-50 overflow-hidden bg-slate-100 shadow-inner flex items-center justify-center relative">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <Camera size={48} className="text-slate-300" />
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Upload className="text-white" size={32} />
                </div>
              )}
            </div>
            {isEditing && (
              <Button 
                size="icon" 
                className="absolute bottom-2 right-2 rounded-full h-10 w-10 bg-blue-600 hover:bg-blue-700 shadow-xl border-4 border-white"
              >
                <Camera size={18} />
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
          <p className="mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Profile Photo</p>
          {isEditing && (
            <p className="mt-2 text-[10px] text-slate-400 italic text-center">JPG or PNG, max 5MB</p>
          )}
        </div>

        {/* Info Form */}
        <div className="lg:col-span-3">
          {!isEditing ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <InfoField label="First Name" value={notary.firstName} />
                <InfoField label="Last Name" value={notary.lastName} />
                <InfoField label="Date of Birth" value={notary.dob} />
                <InfoField label="Email Address" value={notary.email} />
                <InfoField label="Phone Number" value={notary.phone} />
                <InfoField label="Street Address" value={notary.addressLine1} />
                <InfoField label="Zip Code" value={notary.zipCode} />
                <InfoField label="City" value={notary.city} />
                <InfoField label="State" value={notary.state} />
             </div>
          ) : (
            <Form {...form}>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-bold">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Ex: James" 
                          className="rounded-xl h-12 bg-gray-50 border-gray-100 focus:bg-white transition-all" 
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
                      <FormLabel className="text-slate-600 font-bold">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Ex: Smith" 
                          className="rounded-xl h-12 bg-gray-50 border-gray-100 focus:bg-white transition-all" 
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
                      <FormLabel className="text-slate-600 font-bold">Date of Birth</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          className="rounded-xl h-12 bg-gray-50 border-gray-100 focus:bg-white transition-all" 
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
                      <FormLabel className="text-slate-600 font-bold">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="notary@example.com" 
                          className="rounded-xl h-12 bg-gray-50 border-gray-100 focus:bg-white transition-all" 
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
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-slate-600 font-bold">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="+1 (555) 000-0000" 
                          className="rounded-xl h-12 bg-gray-50 border-gray-100 focus:bg-white transition-all" 
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
                      <FormLabel className="text-slate-600 font-bold">Street Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="123 Harmony Street" 
                          className="rounded-xl h-12 bg-gray-50 border-gray-100 focus:bg-white transition-all" 
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
                      <FormLabel className="text-slate-600 font-bold">Zip Code</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="90001" 
                          className="rounded-xl h-12 bg-gray-50 border-gray-100 focus:bg-white transition-all" 
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
                      <FormLabel className="text-slate-600 font-bold">City</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Los Angeles" 
                          className="rounded-xl h-12 bg-gray-50 border-gray-100 focus:bg-white transition-all" 
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
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-xl h-12 bg-gray-50 border-gray-100 focus:bg-white transition-all">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-gray-100">
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
}

const InfoField = ({ label, value, isFullWidth }: InfoFieldProps) => (
  <div className={isFullWidth ? 'md:col-span-2' : ''}>
    <Label className="text-slate-400 font-bold text-[11px] uppercase tracking-widest mb-2 block">{label}</Label>
    <div className="h-12 w-full bg-slate-50/50 rounded-xl px-4 flex items-center border border-slate-100">
       <span className="text-slate-700 font-medium">{value || 'Not provided'}</span>
    </div>
  </div>
);
