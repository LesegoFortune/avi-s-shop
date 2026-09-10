import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '@/lib/products';
import { supabaseConfigured } from '@/lib/supabase/env';
import { ProductForm } from '@/components/admin/ProductForm';
import { SetupNotice } from '@/components/admin/SetupNotice';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!supabaseConfigured) return <SetupNotice />;

  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Edit {product.name}</h2>
        <Link
          href={`/product/${product.slug}`}
          className="text-sm text-brand hover:underline"
        >
          View on the shop →
        </Link>
      </div>
      <div className="mt-6">
        <ProductForm product={product} />
      </div>
    </>
  );
}
