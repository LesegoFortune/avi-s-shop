export type PriceTier = {
  /** Minimum quantity for this per-unit price. */
  min_qty: number;
  /** Per-unit price in ZAR. */
  price: number;
};

export type Product = {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  /** Single-unit price in ZAR. */
  price: number;
  /** Bulk pricing, cheapest tier last. */
  tiers: PriceTier[];
  /** Needs something from the customer — a name, photo, date or colour. */
  personalised: boolean;
  /** What to ask them for, e.g. "the name to engrave". */
  personalisation_note: string | null;
  /** Colour or style choices, shown as pills on the product page. */
  options: string[];
  /** At this quantity the order becomes a quote instead of a straight buy. */
  bulk_from: number;
  image_url: string | null;
  in_stock: boolean;
  featured: boolean;
};

export type ProductInput = Omit<Product, 'id' | 'created_at'>;

export type QuoteRequest = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  product_name: string | null;
  quantity: number | null;
  needed_by: string | null;
  message: string | null;
  status: 'new' | 'quoted' | 'won' | 'lost';
};

/** Cheapest per-unit price at a given quantity. */
export function priceAtQty(product: Product, qty: number): number {
  const applicable = product.tiers
    .filter((t) => qty >= t.min_qty)
    .sort((a, b) => b.min_qty - a.min_qty)[0];
  return applicable?.price ?? product.price;
}

export function formatZar(amount: number): string {
  return `R${amount.toLocaleString('en-ZA', {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
