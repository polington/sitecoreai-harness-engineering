import type { SiteFooterProps } from './footerTypes';
import FooterLogo from './footerLogo';
import FooterNav from './footerNav';
import FooterSocialLinks from './footerSocialLinks';

export default function SiteFooter({ fields }: SiteFooterProps) {
  if (!fields) return null;

  return (
    <div className="w-full bg-neutral-900 text-neutral-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div
          data-testid="footer-columns"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div>
            <FooterLogo logo={fields.Logo} />
          </div>
          <div>
            <FooterNav links={fields.NavigationLinks} />
          </div>
          <div>
            <FooterSocialLinks
              facebook={fields.FacebookLink}
              twitter={fields.TwitterLink}
              linkedIn={fields.LinkedInLink}
            />
          </div>
        </div>
        {fields.CopyrightText?.value && (
          <div className="mt-8 text-sm text-neutral-400">
            {fields.CopyrightText.value}
          </div>
        )}
      </div>
    </div>
  );
}
