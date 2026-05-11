import React from 'react';
import { render, screen } from '@testing-library/react';
import SiteFooter from '../SiteFooter';
import type { SiteFooterProps } from '../footerTypes';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  Image: ({ field }: { field?: { value?: { src?: string; alt?: string } } }) =>
    field?.value?.src ? (
      <img src={field.value.src} alt={field.value.alt ?? ''} />
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

function makeProps(overrides: Partial<NonNullable<SiteFooterProps['fields']>> = {}): SiteFooterProps {
  return {
    fields: {
      Logo: { value: { src: '/footer-logo.png', alt: 'Site logo' } },
      NavigationLinks: [
        { fields: { Link: { value: { href: '/about', text: 'About' } } } },
        { fields: { Link: { value: { href: '/contact', text: 'Contact' } } } },
      ],
      FacebookLink: { value: { href: 'https://facebook.com/example' } },
      TwitterLink: { value: { href: 'https://x.com/example' } },
      LinkedInLink: { value: { href: 'https://linkedin.com/example' } },
      CopyrightText: { value: '© 2024 Harness Engineering. All rights reserved.' },
      ...overrides,
    },
  };
}

describe('SiteFooter', () => {
  it('renders the logo image from the authored Image field', () => {
    render(<SiteFooter {...makeProps()} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/footer-logo.png');
  });

  it('does not render logo when logo field has no src', () => {
    render(<SiteFooter {...makeProps({ Logo: { value: {} } })} />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('logo anchor links to the home page "/"', () => {
    render(<SiteFooter {...makeProps()} />);
    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders navigation links from the authored NavigationLinks array', () => {
    render(<SiteFooter {...makeProps()} />);
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('does not render the nav section when NavigationLinks is empty', () => {
    render(<SiteFooter {...makeProps({ NavigationLinks: [] })} />);
    expect(screen.queryByRole('navigation', { name: 'Footer navigation' })).toBeNull();
  });

  it('renders Facebook social link with target="_blank" and aria-label', () => {
    render(<SiteFooter {...makeProps()} />);
    const fbLink = screen.getByRole('link', { name: /visit us on facebook/i });
    expect(fbLink).toHaveAttribute('target', '_blank');
    expect(fbLink).toHaveAttribute('aria-label');
    expect(fbLink.getAttribute('aria-label')).not.toBe('');
  });

  it('renders X (Twitter) social link with target="_blank" and aria-label', () => {
    render(<SiteFooter {...makeProps()} />);
    const xLink = screen.getByRole('link', { name: /visit us on x \(twitter\)/i });
    expect(xLink).toHaveAttribute('target', '_blank');
    expect(xLink).toHaveAttribute('aria-label');
    expect(xLink.getAttribute('aria-label')).not.toBe('');
  });

  it('renders LinkedIn social link with target="_blank" and aria-label', () => {
    render(<SiteFooter {...makeProps()} />);
    const liLink = screen.getByRole('link', { name: /visit us on linkedin/i });
    expect(liLink).toHaveAttribute('target', '_blank');
    expect(liLink).toHaveAttribute('aria-label');
    expect(liLink.getAttribute('aria-label')).not.toBe('');
  });

  it('does not render an anchor when a social link field value is empty', () => {
    render(
      <SiteFooter
        {...makeProps({
          FacebookLink: { value: { href: '' } },
        })}
      />
    );
    expect(screen.queryByRole('link', { name: /visit us on facebook/i })).toBeNull();
  });

  it('renders the copyright text from the authored CopyrightText field', () => {
    render(<SiteFooter {...makeProps()} />);
    expect(
      screen.getByText('© 2024 Harness Engineering. All rights reserved.')
    ).toBeInTheDocument();
  });

  it('renders a nav element with aria-label "Footer navigation"', () => {
    render(<SiteFooter {...makeProps()} />);
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument();
  });

  it('applies mobile-first single-column layout to the column container', () => {
    render(<SiteFooter {...makeProps()} />);
    const columns = screen.getByTestId('footer-columns');
    expect(columns.className).toMatch(/grid-cols-1/);
    expect(columns.className).toMatch(/lg:grid-cols-3/);
  });

  it('renders nothing when the fields prop is absent', () => {
    const { container } = render(<SiteFooter />);
    expect(container.firstChild).toBeNull();
  });
});
