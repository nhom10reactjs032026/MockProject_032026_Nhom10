import * as z from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First Name is required').max(255).trim(),
  lastName: z.string().min(1, 'Last Name is required').max(255).trim(),
  dob: z.string().min(1, 'Date of Birth is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone is required').regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone format'),
  addressLine1: z.string().min(1, 'Street Address is required').max(255),
  city: z.string().min(1, 'City is required').regex(/^[a-zA-Z\s]+$/, 'Only alphabetic characters allowed'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip Code is required').regex(/^\d{5}(-\d{4})?$/, 'Invalid Zip Code'),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
