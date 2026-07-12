import type { Metadata } from 'next';
import EditProductForm from '@/components/admin/EditProductForm';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Edit Produk | Admin Panel',
  };
}

export default function EditProductPage() {
  return <EditProductForm />;
}
