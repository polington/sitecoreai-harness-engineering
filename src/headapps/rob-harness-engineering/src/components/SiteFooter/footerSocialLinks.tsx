import type { LinkField } from '@sitecore-content-sdk/nextjs';

interface FooterSocialLinksProps {
  facebook?: LinkField;
  twitter?: LinkField;
  linkedIn?: LinkField;
}

export default function FooterSocialLinks({ facebook, twitter, linkedIn }: FooterSocialLinksProps) {
  return (
    <div className="flex flex-col gap-3">
      {facebook?.value?.href && (
        <a
          href={facebook.value.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on Facebook"
          className="text-sm hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
        >
          Facebook
        </a>
      )}
      {twitter?.value?.href && (
        <a
          href={twitter.value.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on X (Twitter)"
          className="text-sm hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
        >
          X (Twitter)
        </a>
      )}
      {linkedIn?.value?.href && (
        <a
          href={linkedIn.value.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on LinkedIn"
          className="text-sm hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
        >
          LinkedIn
        </a>
      )}
    </div>
  );
}
