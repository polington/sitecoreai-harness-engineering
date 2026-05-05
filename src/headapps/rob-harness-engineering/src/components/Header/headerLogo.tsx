import { Image } from '@sitecore-content-sdk/nextjs';
import type { ImageField } from '@sitecore-content-sdk/nextjs';
import NextLink from 'next/link';

interface HeaderLogoProps {
  logo: ImageField;
  homeHref?: string;
}

export default function HeaderLogo({ logo, homeHref = '/' }: HeaderLogoProps) {
  return (
    <NextLink href={homeHref} aria-label="Go to homepage">
      <Image field={logo} className="h-10 w-auto object-contain" />
    </NextLink>
  );
}
