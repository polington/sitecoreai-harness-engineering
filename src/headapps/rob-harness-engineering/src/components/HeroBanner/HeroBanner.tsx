import { Image, Link } from '@sitecore-content-sdk/nextjs';
import type { HeroBannerProps } from './heroBannerTypes';

const MIN_OPACITY = 30;
const DEFAULT_OPACITY = 40;

function parseOverlayOpacity(value: string | undefined): number {
  if (!value) return DEFAULT_OPACITY / 100;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return DEFAULT_OPACITY / 100;
  const clamped = Math.max(parsed, MIN_OPACITY);
  return clamped / 100;
}

export default function HeroBanner({ fields }: HeroBannerProps) {
  if (!fields) return null;

  const overlayOpacity = parseOverlayOpacity(fields.OverlayOpacity?.value);
  const hasCtaLink = !!(fields.CTALink?.value as { href?: string })?.href;

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[60vh] min-h-[400px]">
      <Image
        field={fields.BackgroundImage}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        data-testid="hero-overlay"
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 lg:px-8 text-center">
        <div className="max-w-4xl">
          <h1 className="text-3xl lg:text-5xl font-bold text-white">{fields.Heading?.value}</h1>
          <p className="mt-4 text-lg lg:text-xl text-white">{fields.Subheading?.value}</p>
          {hasCtaLink && (
            <Link
              field={fields.CTALink}
              className="mt-6 inline-block rounded bg-white px-6 py-3 text-neutral-900 font-medium hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            />
          )}
        </div>
      </div>
    </div>
  );
}
