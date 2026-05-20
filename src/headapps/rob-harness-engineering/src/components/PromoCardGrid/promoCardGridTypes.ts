import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

export interface PromoCardFields {
  Image: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  Link: LinkField;
}

export interface PromoCardItem {
  id: string;
  fields: PromoCardFields;
}

export interface PromoCardGridFields {
  Cards: PromoCardItem[];
}

export interface PromoCardGridProps {
  fields?: PromoCardGridFields;
}
