import type { Field, RichTextField } from '@sitecore-content-sdk/nextjs';

export interface AccordionItemFields {
  Title?: Field<string>;
  Body?: RichTextField;
}

export interface AccordionItemData {
  id: string;
  fields: AccordionItemFields;
}

export interface AccordionFields {
  Items?: AccordionItemData[];
  InitiallyExpandedItem?: Field<string>;
  HeadingLevel?: Field<string>;
  Variant?: Field<string>;
}

export interface AccordionProps {
  fields?: AccordionFields;
}
