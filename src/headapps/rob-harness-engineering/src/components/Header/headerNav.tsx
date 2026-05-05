import { Link } from '@sitecore-content-sdk/nextjs';
import type { NavigationLinkItem } from './headerTypes';

interface HeaderNavProps {
  links: NavigationLinkItem[];
  isOpen: boolean;
}

export default function HeaderNav({ links, isOpen }: HeaderNavProps) {
  if (!links || links.length === 0) return null;

  return (
    <nav
      aria-label="Primary"
      className={`${isOpen ? 'flex' : 'hidden'} flex-col lg:flex lg:flex-row lg:items-center gap-6`}
    >
      {links.map((item, index) => (
        <Link
          key={index}
          field={item.fields.Link}
          className="text-sm font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
        />
      ))}
    </nav>
  );
}
