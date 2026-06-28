"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inquirySchema, type InquiryInput } from "@/lib/validations";
import { PHONE_DISPLAY } from "@/lib/site";

interface InquiryFormProps {
  source: string;
  tourSlug?: string;
  tourName?: string;
  title?: string;
  description?: string;
}

export function InquiryForm({
  source,
  tourSlug,
  tourName,
  title = "Enquire Now",
  description = "Share a few details and our travel specialist will get back to you within a few hours.",
}: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { source, tourSlug, tourName },
  });

  const onSubmit = async (data: InquiryInput) => {
    setSubmitError(false);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset({ source, tourSlug, tourName });
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-sage" />
        <h3 className="mt-4 font-display text-xl font-medium">Thank you!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We&apos;ve received your enquiry{tourName ? ` for ${tourName}` : ""}. A
          travel specialist will reach out to you shortly.
        </p>
        <Button
          variant="outline"
          className="mt-6 rounded-sm"
          onClick={() => setSubmitted(false)}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      <h3 className="font-display text-xl font-medium md:text-2xl">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" placeholder="Your name" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" type="tel" placeholder={PHONE_DISPLAY} {...register("phone")} />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="travelDate">Preferred Travel Date</Label>
            <Input id="travelDate" type="date" {...register("travelDate")} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="travelers">Number of Travellers</Label>
          <Input id="travelers" placeholder="e.g. 2 Adults, 1 Child" {...register("travelers")} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={3}
            placeholder="Tell us anything else about your trip..."
            {...register("message")}
          />
        </div>

        {submitError && (
          <p className="flex items-center gap-2 rounded-sm bg-destructive/10 px-3 py-2 text-xs text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Something went wrong sending your enquiry. Please try again, or reach us directly via call or WhatsApp.
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-sm bg-gold text-primary hover:bg-gold/90"
          size="lg"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Enquiry
        </Button>
        <p className="text-center text-[11px] text-muted-foreground">
          By submitting, you agree to be contacted via call, SMS or WhatsApp
          regarding your enquiry.
        </p>
      </form>
    </div>
  );
}
