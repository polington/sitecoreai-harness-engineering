'use client';

import { useState } from 'react';
import AccordionItem from './accordionItem';
import type { AccordionProps } from './accordionTypes';

const VALID_HEADING_LEVELS = ['h2', 'h3', 'h4'] as const;
type ValidHeadingLevel = (typeof VALID_HEADING_LEVELS)[number];

const MAX_ITEMS = 10;

export default function Accordion({ fields }: AccordionProps) {
  const items = (fields?.Items ?? []).slice(0, MAX_ITEMS);

  const rawInitialId = fields?.InitiallyExpandedItem?.value ?? null;
  const validInitialId =
    rawInitialId && items.some((item) => item.id === rawInitialId) ? rawInitialId : null;

  const [openId, setOpenId] = useState<string | null>(validInitialId);

  const rawLevel = fields?.HeadingLevel?.value?.toLowerCase() ?? '';
  const headingLevel: string = VALID_HEADING_LEVELS.includes(rawLevel as ValidHeadingLevel)
    ? rawLevel
    : 'h3';

  function handleToggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  if (items.length === 0) {
    return <div className="py-4 text-sm text-gray-400 italic">No accordion items added.</div>;
  }

  return (
    <div className="w-full border-t border-gray-200">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          panelId={`accordion-panel-${item.id}`}
          fields={item.fields}
          isOpen={openId === item.id}
          headingLevel={headingLevel}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
