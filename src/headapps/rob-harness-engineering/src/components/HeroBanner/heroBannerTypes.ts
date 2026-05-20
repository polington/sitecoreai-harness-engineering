import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

export interface HeroBannerFields {
  Heading: Field<string>;
  Subheading: Field<string>;
  BackgroundImage: ImageField;
  CTALink: LinkField;
  OverlayOpacity: Field<string>;
}

export interface HeroBannerProps {
  fields?: HeroBannerFields;
}
