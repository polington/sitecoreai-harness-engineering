// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as Header from 'src/components/Header/Header';
import * as Carousel from 'src/components/Carousel/Carousel';
import * as Accordion from 'src/components/Accordion/Accordion';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['Header', { ...Header }],
  ['Carousel', { ...Carousel }],
  ['Accordion', { ...Accordion }],
]);

export default componentMap;
