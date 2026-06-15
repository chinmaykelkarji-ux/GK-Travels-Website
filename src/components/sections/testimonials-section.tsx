import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/cards/testimonial-card";

export function TestimonialsSection({ limit }: { limit?: number }) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className="section-y">
      <div className="container-gk">
        <div className="max-w-2xl">
          <span className="eyebrow">Traveller Stories</span>
          <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
            Stories From Our Travellers
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
