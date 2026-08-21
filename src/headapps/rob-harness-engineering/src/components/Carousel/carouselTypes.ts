import type { Field, ImageField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

export type CarouselVariant = 'default' | 'hero' | 'mini';

export type PauseSource = 'user' | 'hover' | 'hidden' | 'none';

export interface CarouselPanelFields {
  Title?: Field<string>;
  Image?: ImageField;
  Description?: RichTextField;
  Link?: LinkField;
}

export interface CarouselPanelItem {
  id: string;
  fields: CarouselPanelFields;
}

export interface CarouselFields {
  Panels?: CarouselPanelItem[];
  ActivePanel?: Field<string>;
  Autoplay?: Field<boolean>;
  TransitionDelay?: Field<number>;
  PauseOnHover?: Field<boolean>;
  AccessibilityLabel?: Field<string>;
  Variant?: Field<string>;
}

export interface CarouselProps {
  fields?: CarouselFields;
}
