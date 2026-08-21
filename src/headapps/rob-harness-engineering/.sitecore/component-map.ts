// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as teaserTypes from 'src/components/Teaser/teaserTypes';
import * as teaserImage from 'src/components/Teaser/teaserImage';
import * as teaserActions from 'src/components/Teaser/teaserActions';
import * as Teaser from 'src/components/Teaser/Teaser';
import * as SiteFooter from 'src/components/SiteFooter/SiteFooter';
import * as footerTypes from 'src/components/SiteFooter/footerTypes';
import * as footerSocialLinks from 'src/components/SiteFooter/footerSocialLinks';
import * as footerNav from 'src/components/SiteFooter/footerNav';
import * as footerLogo from 'src/components/SiteFooter/footerLogo';
import * as promoCardGridTypes from 'src/components/PromoCardGrid/promoCardGridTypes';
import * as PromoCardGrid from 'src/components/PromoCardGrid/PromoCardGrid';
import * as promoCard from 'src/components/PromoCardGrid/promoCard';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as heroBannerTypes from 'src/components/HeroBanner/heroBannerTypes';
import * as HeroBanner from 'src/components/HeroBanner/HeroBanner';
import * as headerTypes from 'src/components/Header/headerTypes';
import * as headerNav from 'src/components/Header/headerNav';
import * as headerLogo from 'src/components/Header/headerLogo';
import * as Header from 'src/components/Header/Header';
import * as carouselTypes from 'src/components/Carousel/carouselTypes';
import * as carouselPanel from 'src/components/Carousel/carouselPanel';
import * as carouselIndicators from 'src/components/Carousel/carouselIndicators';
import * as carouselControls from 'src/components/Carousel/carouselControls';
import * as Carousel from 'src/components/Carousel/Carousel';
import * as accordionTypes from 'src/components/Accordion/accordionTypes';
import * as accordionItem from 'src/components/Accordion/accordionItem';
import * as Accordion from 'src/components/Accordion/Accordion';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['teaserTypes', { ...teaserTypes }],
  ['teaserImage', { ...teaserImage }],
  ['teaserActions', { ...teaserActions }],
  ['Teaser', { ...Teaser }],
  ['SiteFooter', { ...SiteFooter }],
  ['footerTypes', { ...footerTypes }],
  ['footerSocialLinks', { ...footerSocialLinks }],
  ['footerNav', { ...footerNav }],
  ['footerLogo', { ...footerLogo }],
  ['promoCardGridTypes', { ...promoCardGridTypes }],
  ['PromoCardGrid', { ...PromoCardGrid }],
  ['promoCard', { ...promoCard }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['heroBannerTypes', { ...heroBannerTypes }],
  ['HeroBanner', { ...HeroBanner }],
  ['headerTypes', { ...headerTypes }],
  ['headerNav', { ...headerNav }],
  ['headerLogo', { ...headerLogo }],
  ['Header', { ...Header, componentType: 'client' }],
  ['carouselTypes', { ...carouselTypes }],
  ['carouselPanel', { ...carouselPanel }],
  ['carouselIndicators', { ...carouselIndicators }],
  ['carouselControls', { ...carouselControls }],
  ['Carousel', { ...Carousel, componentType: 'client' }],
  ['accordionTypes', { ...accordionTypes }],
  ['accordionItem', { ...accordionItem }],
  ['Accordion', { ...Accordion, componentType: 'client' }],
]);

export default componentMap;
