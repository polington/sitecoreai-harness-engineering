import { Link, RichText } from '@sitecore-content-sdk/nextjs';
import type { ImageField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';
import type { TeaserProps, TeaserVariant, TeaserHeadingLevel, TeaserImagePosition } from './teaserTypes';
import TeaserImage from './teaserImage';
import TeaserActions from './teaserActions';

// ---------------------------------------------------------------------------
// Variant layout lookup
// ---------------------------------------------------------------------------

interface VariantClasses {
  container: string;
  imageContainer: string;
  contentContainer: string;
}

const VARIANT_CLASSES: Record<TeaserVariant, VariantClasses> = {
  default: {
    container: 'flex flex-col overflow-hidden',
    imageContainer: 'relative w-full aspect-video overflow-hidden',
    contentContainer: 'py-6',
  },
  featured: {
    container: 'flex flex-col overflow-hidden md:flex-row',
    imageContainer: 'relative w-full aspect-video overflow-hidden md:w-2/3 md:aspect-auto md:min-h-[400px]',
    contentContainer: 'py-8 px-6 bg-neutral-100 md:w-1/3 md:flex md:flex-col md:justify-center',
  },
  hero: {
    container: 'relative flex flex-col overflow-hidden',
    imageContainer: 'relative w-full h-64 overflow-hidden md:h-[500px]',
    contentContainer: 'py-8 px-6 bg-white md:absolute md:bottom-0 md:left-0 md:right-auto md:max-w-lg md:z-10',
  },
  card: {
    container: 'group relative flex flex-col overflow-hidden aspect-square',
    imageContainer: 'absolute inset-0 overflow-hidden',
    contentContainer: 'relative z-10 mt-auto p-4',
  },
  list: {
    container: 'flex flex-row items-start gap-4 overflow-hidden',
    imageContainer: 'relative w-24 h-24 flex-shrink-0 overflow-hidden',
    contentContainer: 'flex-1 py-1',
  },
  slide: {
    container: 'relative flex flex-col overflow-hidden',
    imageContainer: 'relative w-full h-64 overflow-hidden md:h-[600px]',
    contentContainer: 'py-8 px-6 md:absolute md:bottom-8 md:left-8 md:max-w-md md:z-10 md:bg-transparent',
  },
  secure: {
    container: 'relative flex flex-col overflow-hidden opacity-80',
    imageContainer: 'relative w-full aspect-video overflow-hidden',
    contentContainer: 'py-6',
  },
};

// ---------------------------------------------------------------------------
// Content sourcing helpers
// ---------------------------------------------------------------------------

function resolveTitle(fields: NonNullable<TeaserProps['fields']>): string {
  const sourcing = fields.TitleSourcing?.value === true;
  if (sourcing && fields.LinkedItem?.fields?.Title?.value) {
    return fields.LinkedItem.fields.Title.value;
  }
  return fields.Title?.value ?? '';
}

function resolveDescription(fields: NonNullable<TeaserProps['fields']>): RichTextField | undefined {
  const sourcing = fields.DescriptionSourcing?.value === true;
  if (sourcing && fields.LinkedItem?.fields?.Description) {
    return fields.LinkedItem.fields.Description;
  }
  if (fields.Description?.value) {
    return fields.Description;
  }
  return undefined;
}

function hasImageSrc(field: ImageField | undefined): boolean {
  return !!(field?.value as { src?: string })?.src;
}

function resolveImage(fields: NonNullable<TeaserProps['fields']>): ImageField | undefined {
  const sourcing = fields.ImageSourcing?.value === true;
  if (sourcing) {
    if (hasImageSrc(fields.LinkedItem?.fields?.Image)) {
      return fields.LinkedItem!.fields!.Image;
    }
    // fall back to current item image when sourcing enabled but no linked item
    if (hasImageSrc(fields.Image)) {
      return fields.Image;
    }
    return undefined;
  }
  return hasImageSrc(fields.Image) ? fields.Image : undefined;
}

// ---------------------------------------------------------------------------
// Heading level adapter
// ---------------------------------------------------------------------------

function TeaserTitle({ level, text, className }: { level: TeaserHeadingLevel; text: string; className: string }) {
  if (level === 'H3') return <h3 className={className}>{text}</h3>;
  if (level === 'H4') return <h4 className={className}>{text}</h4>;
  return <h2 className={className}>{text}</h2>;
}

// ---------------------------------------------------------------------------
// Restriction cue (secure variant)
// ---------------------------------------------------------------------------

function RestrictionCue() {
  return (
    <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-neutral-500">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4 flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
          clipRule="evenodd"
        />
      </svg>
      <span>Members only</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Teaser({ fields }: TeaserProps) {
  if (!fields) return null;

  const title = resolveTitle(fields);
  const description = resolveDescription(fields);
  const image = resolveImage(fields);
  const actions = fields.Actions ?? [];
  const hasActions = actions.length > 0;
  const primaryLinkHref = (fields.PrimaryLink?.value as { href?: string })?.href ?? '';
  const hasPrimaryLink = !!primaryLinkHref;

  // Empty guard: render null if no content to show
  if (!title && !description && !image && !hasActions && !hasPrimaryLink) {
    return null;
  }

  const rawVariant = fields.Variant?.value ?? 'default';
  const variant: TeaserVariant = (rawVariant as TeaserVariant) in VARIANT_CLASSES
    ? (rawVariant as TeaserVariant)
    : 'default';

  const headingLevel: TeaserHeadingLevel =
    (fields.TitleHeadingLevel?.value as TeaserHeadingLevel) ?? 'H2';

  const focalPosition = fields.ImagePosition?.value as TeaserImagePosition | undefined;
  const isDecorative = fields.ImageDecorative?.value === true;
  const isSecure = variant === 'secure';
  const isCard = variant === 'card';
  const isList = variant === 'list';

  const classes = VARIANT_CLASSES[variant];

  const titleClass = isList
    ? 'text-sm font-bold uppercase tracking-wider text-neutral-900'
    : isCard
      ? 'sr-only'
      : 'text-2xl font-serif font-bold text-neutral-900 md:text-3xl';

  const descriptionClass = isList
    ? 'mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500'
    : 'mt-3 text-base leading-relaxed text-neutral-700';

  const pretitleClass =
    isCard
      ? 'absolute top-2 right-2 z-20 rounded bg-neutral-900 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white'
      : 'mb-1 text-xs font-bold uppercase tracking-wider text-neutral-500';

  // Build content region (image + editorial content)
  const pretitleValue = fields.Pretitle?.value;
  const imageRegion = image ? (
    <TeaserImage
      field={image}
      isDecorative={isDecorative}
      focalPosition={focalPosition}
      imageContainerClassName={classes.imageContainer}
    />
  ) : null;

  const contentRegion = (
    <div className={classes.contentContainer}>
      {isSecure && <RestrictionCue />}
      {pretitleValue && !isCard && (
        <p className={pretitleClass}>{pretitleValue}</p>
      )}
      {title && (
        <TeaserTitle level={headingLevel} text={title} className={titleClass} />
      )}
      {description && !isCard && (
        <RichText field={description} className={descriptionClass} />
      )}
      {hasActions && (
        <TeaserActions actions={actions} isSecure={isSecure} />
      )}
    </div>
  );

  // Card pretitle badge renders over image
  const cardBadge = isCard && pretitleValue ? (
    <p className={pretitleClass}>{pretitleValue}</p>
  ) : null;

  const innerContent = (
    <>
      {imageRegion}
      {cardBadge}
      {contentRegion}
    </>
  );

  // Primary link wrapping: only when no CTAs present
  if (hasPrimaryLink && !hasActions) {
    return (
      <article className={classes.container}>
        <Link
          field={fields.PrimaryLink as LinkField}
          aria-label={title || undefined}
          className="block focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
        >
          {innerContent}
        </Link>
      </article>
    );
  }

  return (
    <article className={classes.container}>
      {innerContent}
    </article>
  );
}
