import { supabaseConfigured } from '@/lib/supabase/env';
import { ProductForm } from '@/components/admin/ProductForm';
import { SetupNotice } from '@/components/admin/SetupNotice';

export default function NewProductPage() {
  if (!supabaseConfigured) return <SetupNotice />;

  return (
    <>
      <h2 className="text-lg font-semibold">Add a product</h2>
      <div className="mt-6">
        <ProductForm />
      </div>
    </>
  );
}
