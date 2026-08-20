import { Image } from '@sitecore-content-sdk/nextjs';
import type { ImageField } from '@sitecore-content-sdk/nextjs';
import type { TeaserImagePosition } from './teaserTypes';

interface TeaserImageProps {
  field: ImageField;
  isDecorative: boolean;
  focalPosition?: TeaserImagePosition;
  imageContainerClassName?: string;
}

export default function TeaserImage({
  field,
  isDecorative,
  focalPosition,
  imageContainerClassName = 'relative w-full aspect-video overflow-hidden',
}: TeaserImageProps) {
  const focalClass =
    focalPosition === 'imagetop'
      ? 'object-top'
      : focalPosition === 'imagebottom'
        ? 'object-bottom'
        : 'object-center';

  if (isDecorative) {
    return (
      <div className={imageContainerClassName}>
        <Image
          field={field}
          role="presentation"
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${focalClass}`}
        />
      </div>
    );
  }

  return (
    <div className={imageContainerClassName}>
      <Image
        field={field}
        className={`absolute inset-0 h-full w-full object-cover ${focalClass}`}
      />
    </div>
  );
}
