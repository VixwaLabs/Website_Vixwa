import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please share your name")
    .max(120, "That name is a little long"),
  email: z
    .string()
    .trim()
    .min(3, "An email helps us reply")
    .email("Please enter a valid email"),
  organization: z
    .string()
    .trim()
    .max(160, "That organization name is too long")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(3, "Please add a short subject")
    .max(200, "That subject is too long"),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters)")
    .max(5000, "That message is too long"),
  // honeypot — must be empty
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const subscriberSchema = z.object({
  email: z
    .string()
    .trim()
    .min(3, "An email is required")
    .email("Please enter a valid email"),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type SubscriberInput = z.infer<typeof subscriberSchema>;
