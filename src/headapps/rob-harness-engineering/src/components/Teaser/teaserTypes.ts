import type { Field, ImageField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

export type TeaserVariant = 'default' | 'featured' | 'hero' | 'card' | 'list' | 'slide' | 'secure';
export type TeaserHeadingLevel = 'H2' | 'H3' | 'H4';
export type TeaserImagePosition = 'imagetop' | 'imagebottom';

export interface TeaserActionItemFields {
  Label: Field<string>;
  Link: LinkField;
}

export interface TeaserActionItem {
  id: string;
  fields: TeaserActionItemFields;
}

export interface LinkedItemFields {
  Title?: Field<string>;
  Description?: RichTextField;
  Image?: ImageField;
}

export interface LinkedItem {
  id?: string;
  fields?: LinkedItemFields;
}

export interface TeaserFields {
  Image?: ImageField;
  ImageAlt?: Field<string>;
  ImageDecorative?: Field<boolean>;
  Pretitle?: Field<string>;
  Title?: Field<string>;
  Description?: RichTextField;
  PrimaryLink?: LinkField;
  TitleHeadingLevel?: Field<string>;
  Variant?: Field<string>;
  ImagePosition?: Field<string>;
  TitleSourcing?: Field<boolean>;
  DescriptionSourcing?: Field<boolean>;
  ImageSourcing?: Field<boolean>;
  LinkedItem?: LinkedItem;
  Actions?: TeaserActionItem[];
}

export interface TeaserProps {
  fields?: TeaserFields;
}
