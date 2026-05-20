// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as footerTypes from 'src/components/SiteFooter/footerTypes';
import * as footerSocialLinks from 'src/components/SiteFooter/footerSocialLinks';
import * as footerNav from 'src/components/SiteFooter/footerNav';
import * as footerLogo from 'src/components/SiteFooter/footerLogo';
import * as SiteFooter from 'src/components/SiteFooter/SiteFooter';
import * as heroBannerTypes from 'src/components/HeroBanner/heroBannerTypes';
import * as HeroBanner from 'src/components/HeroBanner/HeroBanner';
import * as headerTypes from 'src/components/Header/headerTypes';
import * as headerNav from 'src/components/Header/headerNav';
import * as headerLogo from 'src/components/Header/headerLogo';
import * as Header from 'src/components/Header/Header';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['footerTypes', { ...footerTypes }],
  ['footerSocialLinks', { ...footerSocialLinks }],
  ['footerNav', { ...footerNav }],
  ['footerLogo', { ...footerLogo }],
  ['SiteFooter', { ...SiteFooter }],
  ['heroBannerTypes', { ...heroBannerTypes }],
  ['HeroBanner', { ...HeroBanner }],
  ['headerTypes', { ...headerTypes }],
  ['headerNav', { ...headerNav }],
  ['headerLogo', { ...headerLogo }],
  ['Header', { ...Header, componentType: 'client' }],
]);

export default componentMap;
