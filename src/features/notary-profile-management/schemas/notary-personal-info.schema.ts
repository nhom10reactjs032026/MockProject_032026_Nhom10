import * as z from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'This field is required.').max(255).trim(),
  lastName: z.string().min(1, 'This field is required.').max(255).trim(),
  dob: z.string().min(1, 'This field is required.'),
  email: z.string().min(1, 'This field is required.').email('Please enter a valid email address.'),
  phone: z.string().min(1, 'This field is required.').regex(/^\+?[\d\s-]{7,20}$/, 'Please enter a valid phone number.'),
  addressLine1: z.string().min(1, 'This field is required.').max(255),
  city: z.string().min(1, 'This field is required.').regex(/^[a-zA-Z\s]+$/, 'City must contain only alphabetic characters.'),
  state: z.string().min(1, 'This field is required.'),
  zipCode: z.string().min(1, 'This field is required.').regex(/^\d{5}(-\d{4})?$/, 'Invalid Zip Code format.'),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
