import type { TeaserActionItem } from './teaserTypes';

interface ResolvedAction {
  label: string;
  href: string;
}

interface TeaserActionsProps {
  actions: TeaserActionItem[];
  isSecure?: boolean;
}

function resolveActions(actions: TeaserActionItem[]): ResolvedAction[] {
  return actions
    .map((action) => ({
      label: action.fields?.Label?.value ?? '',
      href: (action.fields?.Link?.value as { href?: string })?.href ?? '',
    }))
    .filter((a) => a.label && a.href);
}

export default function TeaserActions({ actions, isSecure = false }: TeaserActionsProps) {
  const resolved = resolveActions(actions);
  if (!resolved.length) return null;

  const ctaClass = isSecure
    ? 'inline-block rounded border border-neutral-400 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-neutral-500 opacity-70 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2'
    : 'inline-block rounded bg-neutral-900 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2';

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {resolved.map((action) => (
        <a key={action.href} href={action.href} className={ctaClass}>
          {action.label}
        </a>
      ))}
    </div>
  );
}
