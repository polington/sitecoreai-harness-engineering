import { RichText } from '@sitecore-content-sdk/nextjs';
import type { AccordionItemFields } from './accordionTypes';

interface AccordionItemProps {
  id: string;
  panelId: string;
  fields: AccordionItemFields;
  isOpen: boolean;
  headingLevel: string;
  onToggle: (id: string) => void;
}

export default function AccordionItem({ id, panelId, fields, isOpen, headingLevel, onToggle }: AccordionItemProps) {
  const headerId = `accordion-header-${id}`;
  const HeadingTag = headingLevel as 'h2' | 'h3' | 'h4';

  return (
    <div className="border-b border-gray-200">
      <HeadingTag className="m-0">
        <button
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(id)}
          className="w-full flex justify-between items-start py-4 px-0 text-left font-bold uppercase text-lg hover:opacity-75 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          <span>{fields?.Title?.value}</span>
          <span aria-hidden="true" className="ml-4 flex-shrink-0 font-normal">{isOpen ? '\u2212' : '+'}</span>
        </button>
      </HeadingTag>
      {/* Grid row animation avoids `hidden` attribute so CSS transitions fire */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!isOpen}
        className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="pl-4 pt-2 pb-4 text-base leading-relaxed">
            <RichText field={fields?.Body} />
          </div>
        </div>
      </div>
    </div>
  );
}
