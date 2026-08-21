'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CarouselProps, CarouselVariant, PauseSource } from './carouselTypes';
import CarouselPanel from './carouselPanel';
import CarouselControls from './carouselControls';
import CarouselIndicators from './carouselIndicators';

const DEFAULT_DELAY_MS = 5000;

interface VariantClasses {
  section: string;
  container: string;
  stage: string;
  controlRow: string;
  indicatorRow: string;
}

const VARIANT_CLASSES: Record<CarouselVariant, VariantClasses> = {
  default: {
    section: 'py-10',
    container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
    stage: 'relative overflow-hidden h-64 md:h-[500px]',
    controlRow: 'flex items-center justify-between mt-4',
    indicatorRow: 'flex justify-center gap-2 mt-2',
  },
  hero: {
    section: 'relative left-1/2 -translate-x-1/2 w-screen pb-16',
    container: '',
    stage: 'relative overflow-hidden h-72 md:h-[600px]',
    controlRow: 'flex items-center justify-between px-4 mt-4',
    indicatorRow: 'flex justify-center gap-2 mt-2 sm:justify-start sm:px-4',
  },
  mini: {
    section: 'relative left-1/2 -translate-x-1/2 w-screen',
    container: '',
    stage: 'relative overflow-hidden h-[400px]',
    controlRow: 'flex items-center justify-between px-4 mt-4',
    indicatorRow: 'flex justify-center gap-2 mt-2',
  },
};

export default function Carousel({ fields }: CarouselProps) {
  const panels = fields?.Panels ?? [];
  const autoplayEnabled = fields?.Autoplay?.value === true;
  const delayMs = fields?.TransitionDelay?.value ?? DEFAULT_DELAY_MS;
  const pauseOnHover = fields?.PauseOnHover?.value !== false;
  const accessibilityLabel = fields?.AccessibilityLabel?.value || 'Image carousel';
  const rawVariant = (fields?.Variant?.value ?? 'default') as CarouselVariant;
  const variant: CarouselVariant = rawVariant in VARIANT_CLASSES ? rawVariant : 'default';
  const classes = VARIANT_CLASSES[variant];

  const totalPanels = panels.length;
  const isSingleOrEmpty = totalPanels <= 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplayEnabled);
  const [pauseSource, setPauseSource] = useState<PauseSource>('none');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isAdvancing = isPlaying && pauseSource === 'none';

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalPanels);
  }, [totalPanels]);

  useEffect(() => {
    if (!autoplayEnabled || !isAdvancing || isSingleOrEmpty) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(advance, delayMs);
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoplayEnabled, isAdvancing, isSingleOrEmpty, delayMs, advance]);

  useEffect(() => {
    if (!autoplayEnabled) return;
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setPauseSource((prev) => (prev === 'none' ? 'hidden' : prev));
      } else {
        setPauseSource((prev) => (prev === 'hidden' ? 'none' : prev));
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [autoplayEnabled]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalPanels) % totalPanels);
  }, [totalPanels]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalPanels);
  }, [totalPanels]);

  const handleIndicatorSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      setPauseSource('user');
    } else {
      setIsPlaying(true);
      setPauseSource('none');
    }
  }, [isPlaying]);

  const handleMouseEnter = useCallback(() => {
    if (!autoplayEnabled || !pauseOnHover) return;
    setPauseSource((prev) => (prev === 'none' ? 'hover' : prev));
  }, [autoplayEnabled, pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    setPauseSource((prev) => (prev === 'hover' ? 'none' : prev));
  }, []);

  if (totalPanels === 0) {
    return (
      <section aria-label={accessibilityLabel} aria-roledescription="carousel" className={classes.section}>
        <div className="flex min-h-32 items-center justify-center border-2 border-dashed border-neutral-300 p-8 text-center text-neutral-500">
          <p>No panels added yet.</p>
        </div>
      </section>
    );
  }

  const activePanel = panels[activeIndex];
  const activePanelTitle = activePanel?.fields?.Title?.value ?? '';
  const activePanelLabel = activePanelTitle || `Slide ${activeIndex + 1} of ${totalPanels}`;

  const indicatorItems = panels.map((panel, index) => ({
    id: panel.id,
    title: panel.fields?.Title?.value ?? '',
    index,
  }));

  const stageContent = (
    <>
      <div
        className={classes.stage}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {panels.map((panel, index) => (
          <CarouselPanel
            key={panel.id}
            id={`panel-${panel.id}`}
            fields={panel.fields}
            isActive={index === activeIndex}
            index={index}
            total={totalPanels}
          />
        ))}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {activePanelLabel}
        </div>
      </div>

      {!isSingleOrEmpty && (
        <div className={classes.controlRow}>
          <CarouselControls
            onPrev={handlePrev}
            onNext={handleNext}
            onPlayPause={handlePlayPause}
            isPlaying={isPlaying && pauseSource !== 'user'}
            showPlayPause={autoplayEnabled}
          />
        </div>
      )}

      {!isSingleOrEmpty && (
        <div className={classes.indicatorRow}>
          <CarouselIndicators
            panels={indicatorItems}
            activeIndex={activeIndex}
            onSelect={handleIndicatorSelect}
          />
        </div>
      )}
    </>
  );

  return (
    <section
      aria-label={accessibilityLabel}
      aria-roledescription="carousel"
      className={classes.section}
    >
      {classes.container ? (
        <div className={classes.container}>{stageContent}</div>
      ) : (
        stageContent
      )}
    </section>
  );
}
