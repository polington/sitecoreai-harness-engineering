import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';
import type { HeaderProps } from '../headerTypes';

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

function makeProps(overrides: Partial<NonNullable<HeaderProps['fields']>> = {}): HeaderProps {
  return {
    fields: {
      Logo: { value: { src: '/logo.png', alt: 'Site logo' } },
      NavigationLinks: [
        { fields: { Link: { value: { href: '/about', text: 'About' } } } },
        { fields: { Link: { value: { href: '/contact', text: 'Contact' } } } },
      ],
      ...overrides,
    },
  };
}

describe('Header', () => {
  it('renders the logo image from layout data', () => {
    render(<Header {...makeProps()} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/logo.png');
  });

  it('wraps the logo in a home-page link', () => {
    render(<Header {...makeProps()} />);
    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders navigation links from layout data', () => {
    render(<Header {...makeProps()} />);
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders the hamburger button on initial load', () => {
    render(<Header {...makeProps()} />);
    expect(screen.getByRole('button', { name: /open navigation/i })).toBeInTheDocument();
  });

  it('opens the navigation when hamburger is clicked', async () => {
    render(<Header {...makeProps()} />);
    await userEvent.click(screen.getByRole('button', { name: /open navigation/i }));
    expect(screen.getByRole('button', { name: /close navigation/i })).toBeInTheDocument();
  });

  it('closes the navigation on a second hamburger click', async () => {
    render(<Header {...makeProps()} />);
    await userEvent.click(screen.getByRole('button', { name: /open navigation/i }));
    await userEvent.click(screen.getByRole('button', { name: /close navigation/i }));
    expect(screen.getByRole('button', { name: /open navigation/i })).toBeInTheDocument();
  });

  it('opens navigation on Enter key on hamburger button', async () => {
    render(<Header {...makeProps()} />);
    screen.getByRole('button', { name: /open navigation/i }).focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: /close navigation/i })).toBeInTheDocument();
  });

  it('opens navigation on Space key on hamburger button', async () => {
    render(<Header {...makeProps()} />);
    screen.getByRole('button', { name: /open navigation/i }).focus();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('button', { name: /close navigation/i })).toBeInTheDocument();
  });

  it('renders a nav element with aria-label "Primary"', () => {
    render(<Header {...makeProps()} />);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('renders nothing when fields prop is absent', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toBeNull();
  });
});
