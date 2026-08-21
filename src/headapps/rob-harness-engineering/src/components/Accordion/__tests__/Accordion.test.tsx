import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from '../Accordion';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  RichText: ({ field }: { field?: { value?: string } }) => (
    <div dangerouslySetInnerHTML={{ __html: field?.value ?? '' }} />
  ),
}));

const makeItem = (id: string, title: string, body = `<p>Body for ${title}</p>`) => ({
  id,
  fields: {
    Title: { value: title },
    Body: { value: body },
  },
});

const ITEMS = [
  makeItem('item-1', 'First Item'),
  makeItem('item-2', 'Second Item'),
  makeItem('item-3', 'Third Item'),
];

describe('Accordion', () => {
  it('renders empty state when no items', () => {
    render(<Accordion fields={{ Items: [] }} />);
    expect(screen.getByText('No accordion items added.')).toBeInTheDocument();
  });

  it('renders empty state when fields is undefined', () => {
    render(<Accordion />);
    expect(screen.getByText('No accordion items added.')).toBeInTheDocument();
  });

  it('renders single item without error', () => {
    render(<Accordion fields={{ Items: [makeItem('item-1', 'Only Item')] }} />);
    expect(screen.getByText('Only Item')).toBeInTheDocument();
  });

  it('renders all item headers', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
    expect(screen.getByText('Third Item')).toBeInTheDocument();
  });

  it('renders items in authored order', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('First Item');
    expect(buttons[1]).toHaveTextContent('Second Item');
    expect(buttons[2]).toHaveTextContent('Third Item');
  });

  it('limits rendering to first 10 items', () => {
    const manyItems = Array.from({ length: 12 }, (_, i) => makeItem(`item-${i}`, `Item ${i}`));
    render(<Accordion fields={{ Items: manyItems }} />);
    expect(screen.getAllByRole('button')).toHaveLength(10);
  });

  it('all items start collapsed', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    screen.getAllByRole('button').forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('opens an item when its header is clicked', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes an open item when its header is clicked again', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    const button = screen.getAllByRole('button')[0];
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('single-expansion: opening second item closes first', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders initially expanded item as open', () => {
    render(
      <Accordion fields={{ Items: ITEMS, InitiallyExpandedItem: { value: 'item-2' } }} />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');
  });

  it('ignores invalid initially expanded item reference', () => {
    render(
      <Accordion fields={{ Items: ITEMS, InitiallyExpandedItem: { value: 'non-existent' } }} />
    );
    screen.getAllByRole('button').forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('panel content is present in the DOM', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    expect(screen.getByText('Body for First Item')).toBeInTheDocument();
  });

  it('panel content is preserved after toggling', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    const button = screen.getAllByRole('button')[0];
    fireEvent.click(button);
    fireEvent.click(button);
    expect(screen.getByText('Body for First Item')).toBeInTheDocument();
  });

  it('collapsed panel is aria-hidden', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    const regions = screen.getAllByRole('region', { hidden: true });
    regions.forEach((region) => {
      expect(region).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('expanded panel is not aria-hidden', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    const firstRegion = screen.getAllByRole('region', { hidden: true })[0];
    expect(firstRegion).toHaveAttribute('aria-hidden', 'false');
  });

  it('aria-controls references the correct panel id', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    const buttons = screen.getAllByRole('button');
    const regions = screen.getAllByRole('region', { hidden: true });
    expect(buttons[0]).toHaveAttribute('aria-controls', regions[0].id);
    expect(buttons[1]).toHaveAttribute('aria-controls', regions[1].id);
  });

  it('renders heading element at specified level h2', () => {
    const { container } = render(
      <Accordion fields={{ Items: [makeItem('item-1', 'Title')], HeadingLevel: { value: 'h2' } }} />
    );
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('renders heading element at specified level h4', () => {
    const { container } = render(
      <Accordion fields={{ Items: [makeItem('item-1', 'Title')], HeadingLevel: { value: 'h4' } }} />
    );
    expect(container.querySelector('h4')).toBeInTheDocument();
  });

  it('defaults to h3 when heading level field is absent', () => {
    const { container } = render(
      <Accordion fields={{ Items: [makeItem('item-1', 'Title')] }} />
    );
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('defaults to h3 when heading level is invalid', () => {
    const { container } = render(
      <Accordion
        fields={{ Items: [makeItem('item-1', 'Title')], HeadingLevel: { value: 'h1' } }}
      />
    );
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('each header is a focusable button element', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn.tagName).toBe('BUTTON');
    });
  });

  it('header button has focus-visible styling class', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    const button = screen.getAllByRole('button')[0];
    expect(button.className).toContain('focus-visible');
  });

  it('keyboard: Space key activates header button via click', () => {
    render(<Accordion fields={{ Items: ITEMS }} />);
    const button = screen.getAllByRole('button')[0];
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('rich text content renders inside panel', () => {
    const item = makeItem('item-1', 'Rich Item', '<p>Text</p><a href="#">Link</a><ul><li>List</li></ul>');
    render(<Accordion fields={{ Items: [item] }} />);
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
    expect(screen.getByText('List')).toBeInTheDocument();
  });
});
