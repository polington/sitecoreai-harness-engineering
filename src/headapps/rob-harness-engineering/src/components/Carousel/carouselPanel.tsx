import { Image, Link, RichText } from '@sitecore-content-sdk/nextjs';
import type { CarouselPanelFields } from './carouselTypes';

interface CarouselPanelProps {
  id: string;
  fields: CarouselPanelFields;
  isActive: boolean;
  index: number;
  total: number;
}

export default function CarouselPanel({ id, fields, isActive, index, total }: CarouselPanelProps) {
  const title = fields.Title?.value ?? '';
  const hasImage = !!(fields.Image?.value as { src?: string } | undefined)?.src;
  const hasDescription = !!fields.Description?.value;
  const hasLink = !!(fields.Link?.value as { href?: string } | undefined)?.href;
  const hasOverlay = title || hasDescription || hasLink;

  return (
    <div
      id={id}
      role="group"
      aria-roledescription="slide"
      aria-label={title || `Slide ${index + 1} of ${total}`}
      aria-hidden={!isActive}
      className={`absolute inset-0 transition-opacity duration-300 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
    >
      {hasImage && (
        <Image
          field={fields.Image!}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      {hasOverlay && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-8 pt-16 text-white">
          {title && (
            <h2 className="text-2xl font-serif font-bold text-white md:text-3xl">{title}</h2>
          )}
          {hasDescription && (
            <RichText
              field={fields.Description!}
              className="mt-2 text-base leading-relaxed text-white/90"
            />
          )}
          {hasLink && (
            <Link
              field={fields.Link!}
              className="mt-4 inline-block rounded border border-white px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/40"
            />
          )}
        </div>
      )}
    </div>
  );
}
