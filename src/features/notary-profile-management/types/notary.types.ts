export type NotaryStatus = 'Active' | 'Expired' | 'Deactive';

export interface Notary {
  id: string;
  image?: string;
  name: string;
  capability: string;
  state: string;
  expiryDate: string;
  branch: string;
  status: NotaryStatus;
}

export type NotaryFilters = {
  status?: string;
  state?: string;
  serviceType?: string;
  search?: string;
};
