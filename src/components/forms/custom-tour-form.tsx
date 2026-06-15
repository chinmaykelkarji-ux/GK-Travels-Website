"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customTourSchema, type CustomTourInput } from "@/lib/validations";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Destination" },
  { id: 2, label: "Dates" },
  { id: 3, label: "Travellers" },
  { id: 4, label: "Budget" },
  { id: 5, label: "Your Details" },
];

const stepFields: Record<number, (keyof CustomTourInput)[]> = {
  1: ["destinations"],
  2: ["startDate", "duration"],
  3: ["adults", "children", "tripType"],
  4: ["budget"],
  5: ["notes", "name", "phone", "email"],
};

const tripTypes = [
  { value: "family", label: "Family" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "group", label: "Group of Friends" },
  { value: "solo", label: "Solo" },
  { value: "senior", label: "Senior Citizens" },
];

const budgets = [
  { value: "under-30k", label: "Under ₹30,000 per person" },
  { value: "30k-60k", label: "₹30,000 – ₹60,000 per person" },
  { value: "60k-1l", label: "₹60,000 – ₹1,00,000 per person" },
  { value: "1l-plus", label: "₹1,00,000+ per person" },
  { value: "not-sure", label: "Not sure yet" },
];

export function CustomTourForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CustomTourInput>({
    resolver: zodResolver(customTourSchema),
    defaultValues: { adults: "2", children: "0" },
  });

  const onSubmit = async (data: CustomTourInput) => {
    const res = await fetch("/api/plan-my-trip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSubmitted(true);
  };

  const next = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-sage" />
        <h3 className="mt-4 font-display text-2xl font-medium">
          We&apos;re Designing Your Journey
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Thank you for sharing your travel preferences. Here&apos;s what
          happens next:
        </p>
        <ul className="mt-6 space-y-3 text-left text-sm text-foreground/85">
          <li className="flex gap-3">
            <span className="font-display font-semibold text-gold">1.</span>
            Our travel specialist reviews your preferences in detail.
          </li>
          <li className="flex gap-3">
            <span className="font-display font-semibold text-gold">2.</span>
            We&apos;ll call or WhatsApp you within 4 hours to understand your
            trip better.
          </li>
          <li className="flex gap-3">
            <span className="font-display font-semibold text-gold">3.</span>
            You&apos;ll receive a custom itinerary tailored to your needs.
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-10">
      {/* Progress */}
      <div className="mb-8 flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                step >= s.id
                  ? "border-gold bg-gold text-primary"
                  : "border-border text-muted-foreground"
              )}
            >
              {s.id}
            </div>
            <span className="ml-2 hidden text-xs font-medium text-muted-foreground sm:block">
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-px flex-1",
                  step > s.id ? "bg-gold" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-xl font-medium">Where do you want to go?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us the destination(s) on your mind — or let us know if you&apos;re open to suggestions.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="destinations">Destination(s) *</Label>
              <Input
                id="destinations"
                placeholder="e.g. Bali, Kashmir, Char Dham — or 'Surprise me'"
                {...register("destinations")}
              />
              {errors.destinations && (
                <p className="text-xs text-destructive">{errors.destinations.message}</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-xl font-medium">When & how long?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Approximate dates are fine — we can refine these together.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="startDate">Preferred Start Date</Label>
                <Input id="startDate" type="date" {...register("startDate")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="e.g. 6 nights / 7 days" {...register("duration")} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded-sm border-border" {...register("flexible")} />
              My dates are flexible
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-xl font-medium">Who&apos;s travelling?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This helps us recommend the right hotels and experiences.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="adults">Adults *</Label>
                <Input id="adults" type="number" min={1} {...register("adults")} />
                {errors.adults && <p className="text-xs text-destructive">{errors.adults.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="children">Children</Label>
                <Input id="children" type="number" min={0} {...register("children")} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tripType">Trip Type *</Label>
              <Controller
                control={control}
                name="tripType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="tripType" className="w-full">
                      <SelectValue placeholder="Select trip type" />
                    </SelectTrigger>
                    <SelectContent>
                      {tripTypes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.tripType && <p className="text-xs text-destructive">{errors.tripType.message}</p>}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-xl font-medium">What&apos;s your budget?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Optional, but it helps us recommend the right experiences and hotels.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="budget">Budget Range (per person)</Label>
              <Controller
                control={control}
                name="budget"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="budget" className="w-full">
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgets.map((b) => (
                        <SelectItem key={b.value} value={b.value}>
                          {b.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-xl font-medium">Anything else?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add any preferences, then share your contact details so we can reach you.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" rows={3} placeholder="Anniversary trip, dietary preferences, accessibility needs..." {...register("notes")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="Your name" {...register("name")} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210" {...register("phone")} />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={back}
            disabled={step === 1}
            className={cn("rounded-sm", step === 1 && "invisible")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {step < steps.length ? (
            <Button type="button" onClick={next} className="rounded-sm bg-primary hover:bg-primary/90">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-sm bg-gold text-primary hover:bg-gold/90"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Request
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
