export interface User {
  srNo: number;
  epicNo: string;
  partNo: string;
  name: string;
  relativeName: string;
  houseNo: string;      // changed from number → string
  address?: string;     // optional because your data has NO address field
  age: number;
  gender: string;
  status?: string;      // optional, since you will add it later (Active/Pending/etc.)
  lastUpdated?: string; // optional, because your JSON does not include this yet
}
