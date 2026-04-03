import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCreateNotary } from '../hooks/useNotaries';
import { personalInfoSchema, type PersonalInfoFormValues } from '../schemas/notary-personal-info.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { ArrowLeft, Save, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

export const NotaryCreatePage = () => {
  const navigate = useNavigate();
  const createMutation = useCreateNotary();

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

  const onSubmit = async (data: PersonalInfoFormValues) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        name: `${data.firstName} ${data.lastName}`,
      });
      toast.success('Notary created successfully'); // FUNC_01
      navigate('/admin/notaries');
    } catch (error: any) {
      if (error.field === 'email') {
        form.setError('email', { message: error.message }); // FUNC_05
      } else {
        toast.error('Failed to create notary profile');
      }
    }
  };

  const handleCancel = () => {
    navigate('/admin/notaries'); // FUNC_02
  };

  return (
    <div className="max-w-[800px] mx-auto py-12 px-4 animate-in fade-in duration-500 pb-32">
      <div className="mb-10 flex flex-col gap-6">
        <Button 
          variant="ghost" 
          onClick={handleCancel}
          className="w-fit text-slate-400 hover:text-blue-600 hover:bg-blue-50 -ml-4 gap-2 font-bold uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={16} />
          Back to List
        </Button>
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Onboard New Notary</h1>
          <p className="text-slate-400 font-medium">Identify and register a new professional into the system database.</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-100/50">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-bold ml-1">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Ex: Duc"
                          className="rounded-2xl h-14 bg-slate-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" 
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
                      <FormLabel className="text-slate-700 font-bold ml-1">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Ex: Nguyen"
                          className="rounded-2xl h-14 bg-slate-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" 
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
                      <FormLabel className="text-slate-700 font-bold ml-1">Date of Birth</FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
                          {...field} 
                          className="rounded-2xl h-14 bg-slate-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all" 
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
                      <FormLabel className="text-slate-700 font-bold ml-1">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="duc.nguyen@gmail.com"
                          className="rounded-2xl h-14 bg-slate-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" 
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
                      <FormLabel className="text-slate-700 font-bold ml-1">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="+1 555-234-567"
                          className="rounded-2xl h-14 bg-slate-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" 
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
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-slate-700 font-bold ml-1">Street Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="1420 Harbor View Drive"
                          className="rounded-2xl h-14 bg-slate-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" 
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
                      <FormLabel className="text-slate-700 font-bold ml-1">Zip Code</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="09886"
                          className="rounded-2xl h-14 bg-slate-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" 
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
                      <FormLabel className="text-slate-700 font-bold ml-1">City</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="San Francisco"
                          className="rounded-2xl h-14 bg-slate-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" 
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
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-slate-700 font-bold ml-1">Residential State</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-2xl h-14 bg-slate-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-medium">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-2xl border-gray-100 shadow-2xl p-2">
                           <SelectItem value="California" className="rounded-xl">California</SelectItem>
                           <SelectItem value="Texas" className="rounded-xl">Texas</SelectItem>
                           <SelectItem value="New York" className="rounded-xl">New York</SelectItem>
                           <SelectItem value="Washington" className="rounded-xl">Washington</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </div>

             <div className="flex justify-end gap-5 pt-8 border-t border-slate-50">
               <Button 
                 type="button" 
                 variant="ghost" 
                 onClick={handleCancel}
                 disabled={createMutation.isPending}
                 className="h-14 px-8 rounded-2xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 gap-2 transition-all"
               >
                 <X size={18} />
                 Cancel Operation
               </Button>
               <Button 
                 type="submit" 
                 disabled={createMutation.isPending}
                 className="h-14 px-12 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-100/50 gap-2 active:scale-95 transition-all"
               >
                 {createMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                 {createMutation.isPending ? 'Saving...' : 'Save and Generate Profille ID'}
               </Button>
             </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
