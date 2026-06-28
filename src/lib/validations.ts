import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  travelDate: z.string().optional().or(z.literal("")),
  travelers: z.string().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
  source: z.string(),
  tourSlug: z.string().optional(),
  tourName: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please select a reason"),
  destination: z.string().optional().or(z.literal("")),
  travelers: z.string().optional().or(z.literal("")),
  travelDate: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Please tell us a little more (min. 10 characters)"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const customTourSchema = z.object({
  destinations: z.string().min(2, "Please tell us where you'd like to go"),
  startDate: z.string().optional().or(z.literal("")),
  flexible: z.boolean().optional(),
  duration: z.string().optional().or(z.literal("")),
  adults: z.string().min(1, "Required"),
  children: z.string().optional().or(z.literal("")),
  tripType: z.string().min(1, "Please select a trip type"),
  budget: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
});

export type CustomTourInput = z.infer<typeof customTourSchema>;
