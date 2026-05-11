import { Link } from '@sitecore-content-sdk/nextjs';
import type { FooterNavigationLinkItem } from './footerTypes';

interface FooterNavProps {
  links: FooterNavigationLinkItem[];
}

export default function FooterNav({ links }: FooterNavProps) {
  if (!links || links.length === 0) return null;

  return (
    <nav aria-label="Footer navigation">
      <ul className="flex flex-col gap-3">
        {links.map((item, index) => (
          <li key={index}>
            <Link
              field={item.fields.Link}
              className="text-sm hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
