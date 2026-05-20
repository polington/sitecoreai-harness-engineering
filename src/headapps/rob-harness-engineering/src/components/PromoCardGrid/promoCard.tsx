import { Image, Link } from '@sitecore-content-sdk/nextjs';
import type { PromoCardFields } from './promoCardGridTypes';

interface PromoCardProps {
  fields: PromoCardFields;
}

export default function promoCard({ fields }: PromoCardProps) {
  const hasCtaLink = !!(fields.Link?.value as { href?: string })?.href;

  return (
    <li className="flex flex-col overflow-hidden rounded border border-neutral-200 bg-white shadow-sm">
      <div className="relative aspect-video w-full">
        <Image
          field={fields.Image}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <h3 className="text-lg font-semibold text-neutral-900 md:text-xl">
          {fields.Title?.value}
        </h3>
        <p className="mt-2 flex-1 text-base text-neutral-600">
          {fields.Description?.value}
        </p>
        {hasCtaLink && (
          <Link
            field={fields.Link}
            className="mt-4 inline-block text-sm font-medium text-blue-700 underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        )}
      </div>
    </li>
  );
}
