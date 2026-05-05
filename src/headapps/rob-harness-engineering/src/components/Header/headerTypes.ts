import type { ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

export interface NavigationLinkItem {
  fields: {
    Link: LinkField;
  };
}

export interface HeaderFields {
  Logo: ImageField;
  NavigationLinks: NavigationLinkItem[];
}

export interface HeaderProps {
  fields?: HeaderFields;
}
