import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Carousel from '../Carousel';
import type { CarouselProps } from '../carouselTypes';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  Image: ({ field, className }: { field: { value: { src: string; alt?: string } }; className?: string }) => (
    <img src={field?.value?.src} alt={field?.value?.alt ?? ''} className={className} />
  ),
  Link: ({ field, className }: { field: { value: { href: string; text?: string } }; className?: string }) => (
    <a href={field?.value?.href} className={className}>
      {field?.value?.text ?? field?.value?.href}
    </a>
  ),
  RichText: ({ field, className }: { field: { value: string }; className?: string }) => (
    <div className={className} dangerouslySetInnerHTML={{ __html: field?.value ?? '' }} />
  ),
}));

const makePanel = (id: string, title: string) => ({
  id,
  fields: {
    Title: { value: title },
    Image: { value: { src: `/img/${id}.jpg`, alt: title } },
    Description: { value: `<p>Description for ${title}</p>` },
    Link: { value: { href: `https://example.com/${id}`, text: 'Learn more' } },
  },
});

const twoPanel: CarouselProps = {
  fields: {
    Panels: [makePanel('p1', 'Slide One'), makePanel('p2', 'Slide Two')],
    Autoplay: { value: false },
    PauseOnHover: { value: true },
    AccessibilityLabel: { value: 'Test carousel' },
    Variant: { value: 'default' },
  },
};

const autoplayProps: CarouselProps = {
  fields: {
    Panels: [makePanel('a1', 'Auto One'), makePanel('a2', 'Auto Two'), makePanel('a3', 'Auto Three')],
    Autoplay: { value: true },
    TransitionDelay: { value: 1000 },
    PauseOnHover: { value: true },
    AccessibilityLabel: { value: 'Autoplay carousel' },
    Variant: { value: 'default' },
  },
};

describe('Carousel — empty and missing-fields states', () => {
  it('renders empty placeholder when fields is undefined (AC-15)', () => {
    render(<Carousel />);
    expect(screen.getByText('No panels added yet.')).toBeInTheDocument();
  });

  it('renders empty placeholder when Panels array is empty (AC-15)', () => {
    render(<Carousel fields={{ Panels: [] }} />);
    expect(screen.getByText('No panels added yet.')).toBeInTheDocument();
  });

  it('renders single panel without controls or indicators (AC-16)', () => {
    render(
      <Carousel
        fields={{
          Panels: [makePanel('solo', 'Solo Slide')],
          Autoplay: { value: false },
          Variant: { value: 'default' },
        }}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Solo Slide' })).toBeInTheDocument();
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
  });
});

describe('Carousel — panel rendering (AC-01)', () => {
  it('renders all panel images and titles', () => {
    render(<Carousel {...twoPanel} />);
    expect(screen.getByAltText('Slide One')).toBeInTheDocument();
    expect(screen.getByAltText('Slide Two')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Slide One' })).toBeInTheDocument();
  });

  it('first panel is active (visible) on initial render', () => {
    render(<Carousel {...twoPanel} />);
    const slide1 = screen.getByRole('group', { name: 'Slide One' });
    expect(slide1).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('inactive panels have aria-hidden="true" (AC-10)', () => {
    const { container } = render(<Carousel {...twoPanel} />);
    const slide2 = container.querySelector('#panel-p2');
    expect(slide2).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Carousel — navigation controls (AC-02, AC-03)', () => {
  it('renders prev and next buttons', () => {
    render(<Carousel {...twoPanel} />);
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('next button advances to second panel (AC-02)', () => {
    render(<Carousel {...twoPanel} />);
    fireEvent.click(screen.getByLabelText('Next slide'));
    const slide2 = screen.getByRole('group', { name: 'Slide Two' });
    expect(slide2).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('prev button wraps from first to last panel (AC-03)', () => {
    render(<Carousel {...twoPanel} />);
    fireEvent.click(screen.getByLabelText('Previous slide'));
    const slide2 = screen.getByRole('group', { name: 'Slide Two' });
    expect(slide2).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('next button wraps from last to first panel (AC-02)', () => {
    render(<Carousel {...twoPanel} />);
    fireEvent.click(screen.getByLabelText('Next slide'));
    fireEvent.click(screen.getByLabelText('Next slide'));
    const slide1 = screen.getByRole('group', { name: 'Slide One' });
    expect(slide1).not.toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Carousel — indicators (AC-02)', () => {
  it('renders indicator buttons matching panel count', () => {
    render(<Carousel {...twoPanel} />);
    const group = screen.getByRole('group', { name: 'Slide indicators' });
    const buttons = group.querySelectorAll('button');
    expect(buttons).toHaveLength(2);
  });

  it('first indicator is aria-pressed="true" on load', () => {
    render(<Carousel {...twoPanel} />);
    const group = screen.getByRole('group', { name: 'Slide indicators' });
    const buttons = group.querySelectorAll('button');
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'false');
  });

  it('clicking second indicator selects second panel', () => {
    render(<Carousel {...twoPanel} />);
    const group = screen.getByRole('group', { name: 'Slide indicators' });
    const buttons = group.querySelectorAll('button');
    fireEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
    const slide2 = screen.getByRole('group', { name: 'Slide Two' });
    expect(slide2).not.toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Carousel — autoplay (AC-04 through AC-07)', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('does not show play/pause when autoplay is disabled', () => {
    render(<Carousel {...twoPanel} />);
    expect(screen.queryByLabelText('Pause')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Play')).not.toBeInTheDocument();
  });

  it('shows pause button when autoplay is enabled (AC-04)', () => {
    render(<Carousel {...autoplayProps} />);
    expect(screen.getByLabelText('Pause')).toBeInTheDocument();
  });

  it('advances slide automatically after TransitionDelay (AC-04)', () => {
    render(<Carousel {...autoplayProps} />);
    act(() => jest.advanceTimersByTime(1000));
    const slide2 = screen.getByRole('group', { name: 'Auto Two' });
    expect(slide2).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('pause button stops autoplay (AC-05)', () => {
    render(<Carousel {...autoplayProps} />);
    fireEvent.click(screen.getByLabelText('Pause'));
    act(() => jest.advanceTimersByTime(1000));
    const slide1 = screen.getByRole('group', { name: 'Auto One' });
    expect(slide1).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('play button resumes after user pause (AC-05)', () => {
    render(<Carousel {...autoplayProps} />);
    fireEvent.click(screen.getByLabelText('Pause'));
    fireEvent.click(screen.getByLabelText('Play'));
    act(() => jest.advanceTimersByTime(1000));
    const slide2 = screen.getByRole('group', { name: 'Auto Two' });
    expect(slide2).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('hover pause does not override user pause (AC-06)', () => {
    render(<Carousel {...autoplayProps} />);
    fireEvent.click(screen.getByLabelText('Pause'));
    const stage = document.querySelector('[class*="relative overflow-hidden"]');
    fireEvent.mouseLeave(stage!);
    act(() => jest.advanceTimersByTime(1000));
    const slide1 = screen.getByRole('group', { name: 'Auto One' });
    expect(slide1).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('hover pauses and unpauses autoplay (AC-06)', () => {
    render(<Carousel {...autoplayProps} />);
    const stage = document.querySelector('[class*="relative overflow-hidden"]');
    fireEvent.mouseEnter(stage!);
    act(() => jest.advanceTimersByTime(2000));
    const slide1 = screen.getByRole('group', { name: 'Auto One' });
    expect(slide1).not.toHaveAttribute('aria-hidden', 'true');
    fireEvent.mouseLeave(stage!);
    act(() => jest.advanceTimersByTime(1000));
    const slide2 = screen.getByRole('group', { name: 'Auto Two' });
    expect(slide2).not.toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Carousel — ARIA and screen reader (AC-09, AC-10)', () => {
  it('section has role="region" via aria-label (AC-10)', () => {
    render(<Carousel {...twoPanel} />);
    expect(screen.getByRole('region', { name: 'Test carousel' })).toBeInTheDocument();
  });

  it('section has aria-roledescription="carousel"', () => {
    render(<Carousel {...twoPanel} />);
    const section = screen.getByRole('region', { name: 'Test carousel' });
    expect(section).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('live region is present for screen readers (AC-10)', () => {
    render(<Carousel {...twoPanel} />);
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('title fallback uses "Slide N of M" when title is empty (AC-08)', () => {
    render(
      <Carousel
        fields={{
          Panels: [
            { id: 'notitle', fields: { Image: { value: { src: '/img/notitle.jpg' } } } },
            { id: 'second', fields: { Title: { value: 'Second' } } },
          ],
          Autoplay: { value: false },
          Variant: { value: 'default' },
        }}
      />,
    );
    expect(screen.getByRole('group', { name: 'Slide 1 of 2' })).toBeInTheDocument();
  });
});

describe('Carousel — variants (AC-11, AC-12, AC-13)', () => {
  it('default variant uses contained layout (AC-11)', () => {
    const { container } = render(<Carousel {...twoPanel} />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('py-10');
  });

  it('hero variant applies full-bleed classes (AC-12)', () => {
    const { container } = render(
      <Carousel
        fields={{
          ...twoPanel.fields,
          Variant: { value: 'hero' },
        }}
      />,
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('w-screen');
    expect(section?.className).toContain('-translate-x-1/2');
  });

  it('mini variant applies full-bleed classes (AC-13)', () => {
    const { container } = render(
      <Carousel
        fields={{
          ...twoPanel.fields,
          Variant: { value: 'mini' },
        }}
      />,
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('w-screen');
  });

  it('unknown variant falls back to default (AC-11)', () => {
    const { container } = render(
      <Carousel
        fields={{
          ...twoPanel.fields,
          Variant: { value: 'unknown-variant' as string },
        }}
      />,
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('py-10');
  });
});

describe('Carousel — accessibility label (AC-10)', () => {
  it('uses default label when AccessibilityLabel is not set', () => {
    render(
      <Carousel
        fields={{
          Panels: [makePanel('x1', 'Slide X')],
          Autoplay: { value: false },
          Variant: { value: 'default' },
        }}
      />,
    );
    expect(screen.getByRole('region', { name: 'Image carousel' })).toBeInTheDocument();
  });
});
