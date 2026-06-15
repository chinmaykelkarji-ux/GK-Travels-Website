import { AnimatedCounter } from "@/components/motion/counter";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

const stats = [
  { value: 30, suffix: "+", label: "Years of Experience" },
  { value: 50000, suffix: "+", label: "Happy Travellers" },
  { value: 200, suffix: "+", label: "Tour Packages" },
  { value: 98, suffix: "%", label: "Repeat & Referral Rate" },
];

export function StatsSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <StaggerGroup className="container-gk grid grid-cols-2 gap-8 py-14 md:grid-cols-4 md:py-20">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="text-center">
            <p className="font-display text-3xl font-semibold text-gold md:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider text-primary-foreground/70 md:text-sm">
              {stat.label}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
