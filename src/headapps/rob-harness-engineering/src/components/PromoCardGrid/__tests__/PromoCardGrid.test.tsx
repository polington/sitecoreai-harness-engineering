import React from 'react';
import { render, screen } from '@testing-library/react';
import PromoCardGrid from '../PromoCardGrid';
import type { PromoCardGridProps, PromoCardItem } from '../promoCardGridTypes';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  Image: ({
    field,
    className,
  }: {
    field?: { value?: { src?: string; alt?: string } };
    className?: string;
  }) =>
    field?.value?.src ? (
      <img src={field.value.src} alt={field.value.alt ?? ''} className={className} />
    ) : null,
  Link: ({
    field,
    className,
  }: {
    field?: { value?: { href?: string; text?: string } };
    className?: string;
  }) =>
    field?.value?.href ? (
      <a href={field.value.href} className={className}>
        {field.value.text ?? field.value.href}
      </a>
    ) : null,
}));

function makeCard(overrides: Partial<PromoCardItem> = {}): PromoCardItem {
  return {
    id: overrides.id ?? 'card-1',
    fields: {
      Image: { value: { src: '/card-image.jpg', alt: 'Card image' } },
      Title: { value: 'Card Title' },
      Description: { value: 'Card description text' },
      Link: { value: { href: '/learn-more', text: 'Learn More' } },
      ...overrides.fields,
    },
  };
}

function makeProps(cards: PromoCardItem[]): PromoCardGridProps {
  return { fields: { Cards: cards } };
}

describe('PromoCardGrid', () => {
  describe('grid rendering', () => {
    it('renders multiple cards in a list', () => {
      const cards = [
        makeCard({ id: 'card-1' }),
        makeCard({ id: 'card-2' }),
        makeCard({ id: 'card-3' }),
      ];
      render(<PromoCardGrid {...makeProps(cards)} />);
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
    });

    it('renders a single card in a list', () => {
      render(<PromoCardGrid {...makeProps([makeCard()])} />);
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(1);
    });

    it('renders nothing when Cards array is empty', () => {
      const { container } = render(<PromoCardGrid {...makeProps([])} />);
      expect(container.firstChild).toBeNull();
    });

    it('renders nothing when fields prop is undefined', () => {
      const { container } = render(<PromoCardGrid />);
      expect(container.firstChild).toBeNull();
    });

    it('uses a semantic ul element for the grid', () => {
      render(<PromoCardGrid {...makeProps([makeCard()])} />);
      const list = screen.getByRole('list');
      expect(list.tagName).toBe('UL');
    });

    it('applies responsive grid classes', () => {
      render(<PromoCardGrid {...makeProps([makeCard()])} />);
      const list = screen.getByRole('list');
      expect(list.className).toContain('grid-cols-1');
      expect(list.className).toContain('md:grid-cols-2');
      expect(list.className).toContain('lg:grid-cols-3');
    });
  });

  describe('card rendering', () => {
    it('renders the card image with authored alt text', () => {
      render(<PromoCardGrid {...makeProps([makeCard()])} />);
      const img = screen.getByAltText('Card image');
      expect(img).toHaveAttribute('src', '/card-image.jpg');
    });

    it('renders the card title as an h3 heading', () => {
      render(<PromoCardGrid {...makeProps([makeCard()])} />);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Card Title');
    });

    it('renders the card description as body text', () => {
      render(<PromoCardGrid {...makeProps([makeCard()])} />);
      expect(screen.getByText('Card description text')).toBeInTheDocument();
    });

    it('renders the CTA link when the link field has a value', () => {
      render(<PromoCardGrid {...makeProps([makeCard()])} />);
      const link = screen.getByRole('link', { name: 'Learn More' });
      expect(link).toHaveAttribute('href', '/learn-more');
    });

    it('does not render a CTA link when the link field is empty', () => {
      const card = makeCard({
        id: 'no-link',
        fields: {
          Image: { value: { src: '/img.jpg', alt: 'Alt' } },
          Title: { value: 'No Link Card' },
          Description: { value: 'Description' },
          Link: { value: { href: '', text: '' } },
        },
      });
      render(<PromoCardGrid {...makeProps([card])} />);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('renders each card with distinct content when multiple cards are present', () => {
      const cards = [
        makeCard({
          id: 'card-a',
          fields: {
            Image: { value: { src: '/a.jpg', alt: 'Image A' } },
            Title: { value: 'Title A' },
            Description: { value: 'Desc A' },
            Link: { value: { href: '/a', text: 'Link A' } },
          },
        }),
        makeCard({
          id: 'card-b',
          fields: {
            Image: { value: { src: '/b.jpg', alt: 'Image B' } },
            Title: { value: 'Title B' },
            Description: { value: 'Desc B' },
            Link: { value: { href: '/b', text: 'Link B' } },
          },
        }),
      ];
      render(<PromoCardGrid {...makeProps(cards)} />);
      expect(screen.getByText('Title A')).toBeInTheDocument();
      expect(screen.getByText('Title B')).toBeInTheDocument();
      expect(screen.getByAltText('Image A')).toBeInTheDocument();
      expect(screen.getByAltText('Image B')).toBeInTheDocument();
    });
  });
});
