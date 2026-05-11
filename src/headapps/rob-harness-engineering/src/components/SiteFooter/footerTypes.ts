import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

export interface FooterNavigationLinkItem {
  fields: {
    Link: LinkField;
  };
}

export interface SiteFooterFields {
  Logo: ImageField;
  NavigationLinks: FooterNavigationLinkItem[];
  FacebookLink: LinkField;
  TwitterLink: LinkField;
  LinkedInLink: LinkField;
  CopyrightText: Field<string>;
}

export interface SiteFooterProps {
  fields?: SiteFooterFields;
}
