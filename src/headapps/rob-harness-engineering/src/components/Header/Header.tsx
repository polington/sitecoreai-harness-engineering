'use client';

import { useState } from 'react';
import type { HeaderProps } from './headerTypes';
import HeaderLogo from './headerLogo';
import HeaderNav from './headerNav';

export default function Header({ fields }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!fields) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <HeaderLogo logo={fields.Logo} />
      <button
        type="button"
        className="lg:hidden"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="block w-6 h-0.5 bg-current mb-1" />
        <span className="block w-6 h-0.5 bg-current mb-1" />
        <span className="block w-6 h-0.5 bg-current" />
      </button>
      <HeaderNav links={fields.NavigationLinks} isOpen={isOpen} />
    </div>
  );
}
