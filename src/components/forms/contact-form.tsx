"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
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
import { contactSchema, type ContactInput } from "@/lib/validations";
import { PHONE_DISPLAY } from "@/lib/site";

const subjects = [
  { value: "general", label: "General Enquiry" },
  { value: "booking", label: "Existing Booking" },
  { value: "partnership", label: "Partnership" },
  { value: "feedback", label: "Feedback" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setSubmitError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
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
        <h3 className="mt-4 font-display text-xl font-medium">Message Sent</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
        <Button variant="outline" className="mt-6 rounded-sm" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <div className="space-y-1.5">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject">Reason for Contact *</Label>
        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="subject" className="w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="destination">Destination</Label>
          <Input id="destination" placeholder="e.g. Kashmir, Bali..." {...register("destination")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="travelers">Number of Travellers</Label>
          <Input id="travelers" placeholder="e.g. 2 Adults, 1 Child" {...register("travelers")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="travelDate">Preferred Travel Date</Label>
        <Input id="travelDate" type="date" {...register("travelDate")} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" rows={4} placeholder="How can we help?" {...register("message")} />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>

      {submitError && (
        <p className="flex items-center gap-2 rounded-sm bg-destructive/10 px-3 py-2 text-xs text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong while sending your message. Please try again, or reach us directly via call or WhatsApp.
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-sm bg-gold text-primary hover:bg-gold/90"
        size="lg"
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Message
      </Button>
    </form>
  );
}
