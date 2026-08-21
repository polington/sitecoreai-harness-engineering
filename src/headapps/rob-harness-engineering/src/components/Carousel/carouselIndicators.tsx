interface IndicatorItem {
  id: string;
  title: string;
  index: number;
}

interface CarouselIndicatorsProps {
  panels: IndicatorItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function CarouselIndicators({
  panels,
  activeIndex,
  onSelect,
}: CarouselIndicatorsProps) {
  return (
    <div role="group" aria-label="Slide indicators">
      {panels.map(({ id, title, index }) => {
        const isActive = index === activeIndex;
        const label = title || `Slide ${index + 1} of ${panels.length}`;
        return (
          <button
            key={id}
            type="button"
            aria-label={`Go to ${label}`}
            aria-pressed={isActive}
            onClick={() => onSelect(index)}
            className={`mx-1 h-3 w-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 ${
              isActive ? 'bg-neutral-900' : 'bg-neutral-300 hover:bg-neutral-500'
            }`}
          />
        );
      })}
    </div>
  );
}
