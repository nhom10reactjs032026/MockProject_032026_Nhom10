import * as z from 'zod';

export const commissionSchema = z.object({
  commissionNumber: z.string().min(1, 'This field is required.'),
  state: z.string().min(1, 'This field is required.'),
  issueDate: z.string().min(1, 'This field is required.'),
  expiryDate: z.string().min(1, 'This field is required.'),
  document: z.any().refine((val) => val !== undefined && val !== null, 'This field is required.'), // For file upload
}).refine((data) => {
  const issue = new Date(data.issueDate);
  const expiry = new Date(data.expiryDate);
  return expiry > issue;
}, {
  message: "Expiration date must be after issue date.",
  path: ["expiryDate"],
});

export type CommissionFormValues = z.infer<typeof commissionSchema>;
