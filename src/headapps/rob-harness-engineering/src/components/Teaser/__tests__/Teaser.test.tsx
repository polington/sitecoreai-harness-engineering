import React from 'react';
import { render, screen } from '@testing-library/react';
import Teaser from '../Teaser';
import type { TeaserActionItem } from '../teaserTypes';

// ---------------------------------------------------------------------------
// Mock @sitecore-content-sdk/nextjs
// ---------------------------------------------------------------------------

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  Image: ({
    field,
    className,
    alt,
    role,
  }: {
    field?: { value?: { src?: string; alt?: string } };
    className?: string;
    alt?: string;
    role?: string;
  }) =>
    field?.value?.src ? (
      <img
        src={field.value.src}
        alt={alt !== undefined ? alt : (field.value.alt ?? '')}
        className={className}
        role={role}
      />
    ) : null,

  Link: ({
    field,
    children,
    className,
    'aria-label': ariaLabel,
  }: {
    field?: { value?: { href?: string; text?: string } };
    children?: React.ReactNode;
    className?: string;
    'aria-label'?: string;
  }) =>
    field?.value?.href ? (
      <a href={field.value.href} className={className} aria-label={ariaLabel}>
        {children ?? field.value.text ?? field.value.href}
      </a>
    ) : null,

  RichText: ({
    field,
    className,
  }: {
    field?: { value?: string };
    className?: string;
  }) =>
    field?.value ? (
      <div
        data-testid="rich-text"
        className={className}
        dangerouslySetInnerHTML={{ __html: field.value }}
      />
    ) : null,
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeAction(id: string, label: string, href: string): TeaserActionItem {
  return {
    id,
    fields: {
      Label: { value: label },
      Link: { value: { href, text: label } },
    },
  };
}

type FieldOverrides = Partial<NonNullable<React.ComponentProps<typeof Teaser>['fields']>>;

function renderTeaser(overrides: FieldOverrides = {}) {
  return render(
    <Teaser
      fields={{
        Title: { value: 'Teaser Title' },
        Description: { value: '<p>Teaser description</p>' },
        Image: { value: { src: '/teaser-image.jpg', alt: 'Teaser image' } },
        TitleHeadingLevel: { value: 'H2' },
        Variant: { value: 'default' },
        ...overrides,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Teaser', () => {
  // -------------------------------------------------------------------------
  // Empty / partial content guards
  // -------------------------------------------------------------------------

  describe('empty state', () => {
    it('renders null when fields prop is undefined', () => {
      const { container } = render(<Teaser />);
      expect(container.firstChild).toBeNull();
    });

    it('renders null when all content fields are absent or empty', () => {
      const { container } = render(
        <Teaser
          fields={{
            Title: { value: '' },
            Description: { value: '' },
            Image: { value: {} },
            Actions: [],
            PrimaryLink: { value: { href: '' } },
          }}
        />
      );
      expect(container.firstChild).toBeNull();
    });

    it('renders without errors when only title is provided', () => {
      render(<Teaser fields={{ Title: { value: 'Title only' } }} />);
      expect(screen.getByText('Title only')).toBeInTheDocument();
    });

    it('renders without errors when only image is provided', () => {
      render(
        <Teaser
          fields={{
            Image: { value: { src: '/img.jpg', alt: 'Image only' } },
          }}
        />
      );
      expect(screen.getByAltText('Image only')).toBeInTheDocument();
    });

    it('does not render heading elements when title is absent', () => {
      const { container } = render(
        <Teaser
          fields={{
            Title: { value: '' },
            Description: { value: '<p>Only description</p>' },
          }}
        />
      );
      expect(container.querySelector('h2')).toBeNull();
      expect(container.querySelector('h3')).toBeNull();
      expect(container.querySelector('h4')).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Image
  // -------------------------------------------------------------------------

  describe('image', () => {
    it('renders image with authored alt text for non-decorative images', () => {
      renderTeaser();
      const img = screen.getByAltText('Teaser image');
      expect(img).toBeInTheDocument();
      expect(img).not.toHaveAttribute('role', 'presentation');
    });

    it('renders decorative image with empty alt and role=presentation', () => {
      render(
        <Teaser
          fields={{
            Image: { value: { src: '/deco.jpg', alt: 'ignored' } },
            ImageDecorative: { value: true },
            Title: { value: 'Test' },
          }}
        />
      );
      const img = screen.getByRole('presentation');
      expect(img).toHaveAttribute('alt', '');
    });

    it('does not render image region when image field is absent', () => {
      render(<Teaser fields={{ Title: { value: 'No image' } }} />);
      expect(screen.queryByRole('img')).toBeNull();
    });

    it('applies object-top class for imagetop focal position', () => {
      render(
        <Teaser
          fields={{
            Image: { value: { src: '/img.jpg', alt: 'Alt' } },
            ImagePosition: { value: 'imagetop' },
            Title: { value: 'Test' },
          }}
        />
      );
      const img = screen.getByAltText('Alt');
      expect(img.className).toContain('object-top');
    });

    it('applies object-bottom class for imagebottom focal position', () => {
      render(
        <Teaser
          fields={{
            Image: { value: { src: '/img.jpg', alt: 'Alt' } },
            ImagePosition: { value: 'imagebottom' },
            Title: { value: 'Test' },
          }}
        />
      );
      const img = screen.getByAltText('Alt');
      expect(img.className).toContain('object-bottom');
    });
  });

  // -------------------------------------------------------------------------
  // Heading level adapter
  // -------------------------------------------------------------------------

  describe('heading level', () => {
    it('renders title as h2 when TitleHeadingLevel is H2', () => {
      renderTeaser({ TitleHeadingLevel: { value: 'H2' } });
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Teaser Title');
    });

    it('renders title as h3 when TitleHeadingLevel is H3', () => {
      renderTeaser({ TitleHeadingLevel: { value: 'H3' } });
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Teaser Title');
    });

    it('renders title as h4 when TitleHeadingLevel is H4', () => {
      renderTeaser({ TitleHeadingLevel: { value: 'H4' } });
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Teaser Title');
    });

    it('defaults to h2 when no heading level is configured', () => {
      renderTeaser({ TitleHeadingLevel: undefined });
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Teaser Title');
    });

    it('does not render any heading when title value is absent', () => {
      const { container } = render(
        <Teaser fields={{ Description: { value: '<p>desc</p>' } }} />
      );
      expect(container.querySelector('h2,h3,h4')).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Content sourcing
  // -------------------------------------------------------------------------

  describe('content sourcing', () => {
    const linkedItem = {
      id: 'linked-1',
      fields: {
        Title: { value: 'Linked Title' },
        Description: { value: '<p>Linked description</p>' },
        Image: { value: { src: '/linked-img.jpg', alt: 'Linked image' } },
      },
    };

    it('uses direct title when TitleSourcing is disabled', () => {
      renderTeaser({ TitleSourcing: { value: false }, LinkedItem: linkedItem });
      expect(screen.getByRole('heading')).toHaveTextContent('Teaser Title');
      expect(screen.queryByText('Linked Title')).toBeNull();
    });

    it('uses linked item title when TitleSourcing is enabled', () => {
      renderTeaser({
        Title: { value: 'Direct Title' },
        TitleSourcing: { value: true },
        LinkedItem: linkedItem,
      });
      expect(screen.getByRole('heading')).toHaveTextContent('Linked Title');
      expect(screen.queryByText('Direct Title')).toBeNull();
    });

    it('uses direct description when DescriptionSourcing is disabled', () => {
      renderTeaser({ DescriptionSourcing: { value: false }, LinkedItem: linkedItem });
      expect(screen.getByTestId('rich-text')).toHaveTextContent('Teaser description');
    });

    it('uses linked item description when DescriptionSourcing is enabled', () => {
      renderTeaser({
        Description: { value: '<p>Direct description</p>' },
        DescriptionSourcing: { value: true },
        LinkedItem: linkedItem,
      });
      expect(screen.getByTestId('rich-text')).toHaveTextContent('Linked description');
    });

    it('uses direct image when ImageSourcing is disabled', () => {
      renderTeaser({ ImageSourcing: { value: false }, LinkedItem: linkedItem });
      expect(screen.getByAltText('Teaser image')).toBeInTheDocument();
    });

    it('uses linked item image when ImageSourcing is enabled', () => {
      renderTeaser({
        Image: { value: { src: '/direct-img.jpg', alt: 'Direct image' } },
        ImageSourcing: { value: true },
        LinkedItem: linkedItem,
      });
      expect(screen.getByAltText('Linked image')).toBeInTheDocument();
      expect(screen.queryByAltText('Direct image')).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Actions and primary link
  // -------------------------------------------------------------------------

  describe('actions and primary link', () => {
    it('wraps content in a link when primary link is present and no CTAs', () => {
      renderTeaser({
        PrimaryLink: { value: { href: '/destination', text: 'Go' } },
        Actions: [],
      });
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/destination');
    });

    it('derives accessible name from title for wrapped primary link', () => {
      renderTeaser({
        PrimaryLink: { value: { href: '/destination', text: 'Go' } },
        Actions: [],
      });
      const link = screen.getByRole('link', { name: /Teaser Title/i });
      expect(link).toBeInTheDocument();
    });

    it('does not wrap content in primary link when CTAs are present', () => {
      renderTeaser({
        PrimaryLink: { value: { href: '/destination', text: 'Go' } },
        Actions: [makeAction('a1', 'Read More', '/read-more')],
      });
      // Only the CTA link should be in the DOM, not the primary wrapper
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute('href', '/read-more');
    });

    it('renders multiple CTAs each with its own label and href', () => {
      renderTeaser({
        Actions: [
          makeAction('a1', 'Read More', '/read-more'),
          makeAction('a2', 'Subscribe', '/subscribe'),
        ],
      });
      expect(screen.getByRole('link', { name: 'Read More' })).toHaveAttribute('href', '/read-more');
      expect(screen.getByRole('link', { name: 'Subscribe' })).toHaveAttribute('href', '/subscribe');
    });

    it('does not render CTAs with empty href', () => {
      renderTeaser({ Actions: [makeAction('a1', 'No Link', '')] });
      expect(screen.queryByRole('link')).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Variants
  // -------------------------------------------------------------------------

  describe('variants', () => {
    const variants = ['default', 'featured', 'hero', 'card', 'list', 'slide', 'secure'] as const;

    variants.forEach((variant) => {
      it(`renders the ${variant} variant without crashing`, () => {
        const { container } = renderTeaser({ Variant: { value: variant } });
        expect(container.firstChild).not.toBeNull();
      });
    });

    it('applies flex-col and md:flex-row classes for featured variant', () => {
      const { container } = renderTeaser({ Variant: { value: 'featured' } });
      const article = container.querySelector('article');
      expect(article?.className).toContain('flex-col');
      expect(article?.className).toContain('md:flex-row');
    });

    it('applies flex-col class for responsive stacking on hero variant', () => {
      const { container } = renderTeaser({ Variant: { value: 'hero' } });
      const article = container.querySelector('article');
      expect(article?.className).toContain('flex-col');
    });

    it('falls back to default classes for unknown variant value', () => {
      const { container } = renderTeaser({ Variant: { value: 'nonexistent' } });
      const article = container.querySelector('article');
      // default variant container class includes flex-col and overflow-hidden
      expect(article?.className).toContain('flex-col');
    });

    it('applies opacity class to container for secure variant', () => {
      const { container } = renderTeaser({ Variant: { value: 'secure' } });
      const article = container.querySelector('article');
      expect(article?.className).toContain('opacity');
    });
  });

  // -------------------------------------------------------------------------
  // Secure variant
  // -------------------------------------------------------------------------

  describe('secure variant', () => {
    it('renders the restriction cue with visible text in secure variant', () => {
      renderTeaser({ Variant: { value: 'secure' } });
      expect(screen.getByText('Members only')).toBeInTheDocument();
    });

    it('renders the restriction icon as aria-hidden in secure variant', () => {
      const { container } = renderTeaser({ Variant: { value: 'secure' } });
      const icon = container.querySelector('svg[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('does not render restriction cue for non-secure variants', () => {
      renderTeaser({ Variant: { value: 'default' } });
      expect(screen.queryByText('Members only')).toBeNull();
    });

    it('secure variant remains interactive — CTAs are not disabled', () => {
      renderTeaser({
        Variant: { value: 'secure' },
        Actions: [makeAction('a1', 'Learn More', '/learn-more')],
      });
      const link = screen.getByRole('link', { name: 'Learn More' });
      expect(link).not.toHaveAttribute('disabled');
      expect(link).toHaveAttribute('href', '/learn-more');
    });

    it('secure variant primary link still works (secure/available state)', () => {
      renderTeaser({
        Variant: { value: 'secure' },
        PrimaryLink: { value: { href: '/members-article', text: 'Go' } },
        Actions: [],
      });
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/members-article');
    });
  });

  // -------------------------------------------------------------------------
  // Pretitle
  // -------------------------------------------------------------------------

  describe('pretitle', () => {
    it('renders pretitle text when present', () => {
      renderTeaser({ Pretitle: { value: 'Adventure' } });
      expect(screen.getByText('Adventure')).toBeInTheDocument();
    });

    it('does not render pretitle element when pretitle is absent', () => {
      const { container } = renderTeaser({ Pretitle: undefined });
      // pretitle is a <p> — check no unexpected empty paragraphs
      const paragraphs = Array.from(container.querySelectorAll('p'));
      const emptyParagraph = paragraphs.find((p) => p.textContent?.trim() === '');
      expect(emptyParagraph).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // Description
  // -------------------------------------------------------------------------

  describe('description', () => {
    it('renders rich text description when present', () => {
      renderTeaser();
      expect(screen.getByTestId('rich-text')).toBeInTheDocument();
    });

    it('does not render description region when description is absent', () => {
      render(<Teaser fields={{ Title: { value: 'No desc' } }} />);
      expect(screen.queryByTestId('rich-text')).toBeNull();
    });

    it('does not render description in card variant', () => {
      renderTeaser({
        Variant: { value: 'card' },
        Description: { value: '<p>Should be hidden</p>' },
      });
      expect(screen.queryByTestId('rich-text')).toBeNull();
    });
  });
});
