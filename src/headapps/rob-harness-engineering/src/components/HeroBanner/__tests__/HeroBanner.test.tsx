import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroBanner from '../HeroBanner';
import type { HeroBannerProps } from '../heroBannerTypes';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  Image: ({ field, className }: { field?: { value?: { src?: string; alt?: string } }; className?: string }) =>
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

jest.mock('next/link', () => {
  const MockLink = ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

function makeProps(overrides: Partial<NonNullable<HeroBannerProps['fields']>> = {}): HeroBannerProps {
  return {
    fields: {
      Heading: { value: 'Welcome to Our Site' },
      Subheading: { value: 'Discover something amazing' },
      BackgroundImage: { value: { src: '/hero-bg.jpg', alt: 'Hero background' } },
      CTALink: { value: { href: '/get-started', text: 'Get Started' } },
      OverlayOpacity: { value: '40' },
      ...overrides,
    },
  };
}

describe('HeroBanner', () => {
  it('renders heading as an h1 element with the authored text', () => {
    render(<HeroBanner {...makeProps()} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome to Our Site');
  });

  it('renders subheading as a p element with the authored text', () => {
    render(<HeroBanner {...makeProps()} />);
    expect(screen.getByText('Discover something amazing').tagName).toBe('P');
  });

  it('renders the background image with the authored alt text', () => {
    render(<HeroBanner {...makeProps()} />);
    expect(screen.getByAltText('Hero background')).toHaveAttribute('src', '/hero-bg.jpg');
  });

  it('renders the background image with alt="" when alt text is empty', () => {
    render(
      <HeroBanner
        {...makeProps({ BackgroundImage: { value: { src: '/hero-bg.jpg', alt: '' } } })}
      />
    );
    const img = screen.getByRole('presentation');
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('src', '/hero-bg.jpg');
  });

  it('renders the CTA link when the CTALink field has a value', () => {
    render(<HeroBanner {...makeProps()} />);
    const link = screen.getByRole('link', { name: 'Get Started' });
    expect(link).toHaveAttribute('href', '/get-started');
  });

  it('does not render a CTA element when the CTALink field is empty', () => {
    render(<HeroBanner {...makeProps({ CTALink: { value: { href: '', text: '' } } })} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders the overlay scrim element', () => {
    render(<HeroBanner {...makeProps()} />);
    expect(screen.getByTestId('hero-overlay')).toBeInTheDocument();
  });

  it('applies default overlay opacity (0.4) when no OverlayOpacity value is provided', () => {
    render(<HeroBanner {...makeProps({ OverlayOpacity: { value: '' } })} />);
    expect(screen.getByTestId('hero-overlay')).toHaveStyle({ opacity: 0.4 });
  });

  it('clamps overlay opacity to 0.3 minimum when a value below 30 is authored', () => {
    render(<HeroBanner {...makeProps({ OverlayOpacity: { value: '10' } })} />);
    expect(screen.getByTestId('hero-overlay')).toHaveStyle({ opacity: 0.3 });
  });

  it('applies the authored overlay opacity when a valid value is provided', () => {
    render(<HeroBanner {...makeProps({ OverlayOpacity: { value: '60' } })} />);
    expect(screen.getByTestId('hero-overlay')).toHaveStyle({ opacity: 0.6 });
  });

  it('renders nothing when the fields prop is absent', () => {
    const { container } = render(<HeroBanner />);
    expect(container.firstChild).toBeNull();
  });
});
