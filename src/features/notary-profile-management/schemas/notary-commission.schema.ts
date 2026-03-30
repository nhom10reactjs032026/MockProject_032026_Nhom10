import * as z from 'zod';

export const commissionSchema = z.object({
  commissionNumber: z.string().min(1, 'Commission number is required'),
  state: z.string().min(1, 'State is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().min(1, 'Expiration date is required'),
  document: z.any().optional(), // For file upload
});

export type CommissionFormValues = z.infer<typeof commissionSchema>;
