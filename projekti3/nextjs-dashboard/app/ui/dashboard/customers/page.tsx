import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/dashboard/customers/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

export default function Page() {
  return <CustomersTable customers={[]} />;
}
