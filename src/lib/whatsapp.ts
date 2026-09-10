import { site } from './config';
import { formatZar, priceAtQty, type Product } from './types';

function link(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** A straight order — one or a few, ready to buy. */
export function orderLink(product: Product, qty = 1, option?: string) {
  const unit = priceAtQty(product, qty);
  const lines = [
    `Hi ${site.name}, I'd like to order:`,
    '',
    `• ${product.name}`,
    ...(option ? [`• Choice: ${option}`] : []),
    `• Quantity: ${qty}`,
    `• Price: ${formatZar(unit)} each (${formatZar(unit * qty)} total)`,
    ...(product.personalised
      ? ['', `• ${product.personalisation_note ?? 'My details'}: `]
      : []),
    '',
    'Is it available?',
  ];
  return link(lines.join('\n'));
}

/** Bigger runs get priced per job, so this asks rather than orders. */
export function quoteLink(product: Product, qty: number, option?: string) {
  const lines = [
    `Hi ${site.name}, I'd like a quote:`,
    '',
    `• ${product.name}`,
    ...(option ? [`• Choice: ${option}`] : []),
    `• Quantity: ${qty}`,
    ...(product.personalised
      ? [`• ${product.personalisation_note ?? 'My details'}: `]
      : []),
    '• Needed by: ',
    '',
    'Please send me a price.',
  ];
  return link(lines.join('\n'));
}

export type QuoteFields = {
  name: string;
  phone: string;
  occasion: string;
  product: string;
  quantity: string;
  neededBy: string;
  message: string;
};

/** Free-form enquiry from the custom order page. */
export function quoteFormLink(f: QuoteFields) {
  const lines = [
    `Hi ${site.name}, I'd like a custom order.`,
    '',
    `• Name: ${f.name || '-'}`,
    `• Phone: ${f.phone || '-'}`,
    `• Occasion: ${f.occasion || '-'}`,
    `• Item: ${f.product || '-'}`,
    `• Quantity: ${f.quantity || '-'}`,
    `• Needed by: ${f.neededBy || '-'}`,
    ...(f.message ? ['', `Details: ${f.message}`] : []),
    '',
    "I'll send my photo or wording here.",
  ];
  return link(lines.join('\n'));
}

export function generalLink(message = `Hi ${site.name}, I have a question.`) {
  return link(message);
}
