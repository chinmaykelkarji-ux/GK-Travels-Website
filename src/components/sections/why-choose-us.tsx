import {
  ShieldCheck,
  UserCheck,
  Hotel,
  FileCheck,
  HeadphonesIcon,
  Sparkles,
} from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "30+ Years of Trust",
    description:
      "Three decades of crafting journeys for families, couples and groups across India and abroad.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Travel Manager",
    description:
      "A single point of contact for your entire journey — from planning to your return home.",
  },
  {
    icon: Hotel,
    title: "Handpicked Hotels & Partners",
    description:
      "Every hotel, houseboat and resort is personally vetted for comfort, location and service.",
  },
  {
    icon: FileCheck,
    title: "Transparent Itineraries",
    description:
      "Clear inclusions, exclusions and day-wise plans — no hidden costs, ever.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 On-Trip Support",
    description:
      "Round-the-clock assistance throughout your journey, wherever you are.",
  },
  {
    icon: Sparkles,
    title: "Customisable Journeys",
    description:
      "Every itinerary can be tailored — pace, hotels, destinations — to suit you perfectly.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-y bg-secondary">
      <div className="container-gk">
        <div className="max-w-2xl">
          <span className="eyebrow">Why GK Travel</span>
          <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
            Why Travel With Us
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary/5 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
