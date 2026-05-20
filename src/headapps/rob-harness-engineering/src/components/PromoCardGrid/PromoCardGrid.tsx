import type { PromoCardGridProps } from './promoCardGridTypes';
import PromoCard from './promoCard';

export default function PromoCardGrid({ fields }: PromoCardGridProps) {
  if (!fields?.Cards?.length) return null;

  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {fields.Cards.map((card) => (
            <PromoCard key={card.id} fields={card.fields} />
          ))}
        </ul>
      </div>
    </section>
  );
}
