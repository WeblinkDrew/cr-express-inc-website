import { z } from 'zod';

/**
 * Form Validation Schemas using Zod
 *
 * These schemas provide type-safe validation for all form submissions.
 * They're designed to be reasonable and not overly strict.
 */

// Common field validators (reusable)
const nameField = z.string().min(1, "Name is required").max(100, "Name is too long");
const emailField = z.string().email("Invalid email address").max(255, "Email is too long");
const phoneField = z.string().min(10, "Phone number is too short").max(30, "Phone number is too long").optional().or(z.literal(""));
const messageField = z.string().min(1, "Message is required").max(10000, "Message is too long");

// Newsletter subscription schema
export const newsletterSchema = z.object({
  name: nameField,
  email: emailField,
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

// Contact form schema
export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  message: messageField,
  service: z.string().max(100, "Service name is too long").optional().or(z.literal("")),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

// Service quote schema
export const serviceQuoteSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  company: z.string().max(200, "Company name is too long").optional().or(z.literal("")),
  service: z.string().max(100, "Service selection is too long").optional().or(z.literal("")),
  serviceName: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().max(10000, "Message is too long").optional().or(z.literal("")),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

// Location quote schema
export const locationQuoteSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  company: z.string().max(200, "Company name is too long").optional().or(z.literal("")),
  cityName: z.string().max(100, "City name is too long").optional(),
  message: messageField,
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

// Job application schema
export const jobApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  email: emailField,
  phone: phoneField,
  jobTitle: z.string().max(100, "Job title is too long").optional(),
  department: z.string().max(100, "Department is too long").optional(),
  experience: z.string().max(50, "Experience is too long").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").max(500).optional().or(z.literal("")),
  portfolioUrl: z.string().url("Invalid portfolio URL").max(500).optional().or(z.literal("")),
  coverLetter: z.string().max(10000, "Cover letter is too long").optional().or(z.literal("")),
  resume: z.any().optional(), // File validation happens separately
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

// Driver application schema
export const driverApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  email: emailField,
  phone: phoneField,
  cdlNumber: z.string().max(50, "CDL number is too long").optional().or(z.literal("")),
  cdlClass: z.string().max(20, "CDL class is too long").optional().or(z.literal("")),
  yearsExperience: z.string().max(50, "Years of experience is too long").optional().or(z.literal("")),
  address: z.string().max(200, "Address is too long").optional().or(z.literal("")),
  city: z.string().max(100, "City is too long").optional().or(z.literal("")),
  state: z.string().max(50, "State is too long").optional().or(z.literal("")),
  zipCode: z.string().max(20, "Zip code is too long").optional().or(z.literal("")),
  endorsements: z.string().max(200, "Endorsements is too long").optional().or(z.literal("")),
  violations: z.string().max(1000, "Violations field is too long").optional().or(z.literal("")),
  accidents: z.string().max(1000, "Accidents field is too long").optional().or(z.literal("")),
  availability: z.string().max(100, "Availability is too long").optional().or(z.literal("")),
  additionalInfo: z.string().max(5000, "Additional info is too long").optional().or(z.literal("")),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

// Drayage quote schema
export const drayageQuoteSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  company: z.string().min(1, "Company is required").max(200, "Company name is too long"),
  city: z.string().min(1, "City is required").max(100, "City name is too long"),
  state: z.string().min(1, "State is required").max(50, "State is too long"),
  serviceNeeded: z.string().min(1, "Service selection is required"),
  message: z.string().max(10000, "Message is too long").optional().or(z.literal("")),
  cityName: z.string().max(100, "City name is too long").optional(),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

// Type exports for TypeScript
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type ServiceQuoteFormData = z.infer<typeof serviceQuoteSchema>;
export type LocationQuoteFormData = z.infer<typeof locationQuoteSchema>;
export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;
export type DriverApplicationFormData = z.infer<typeof driverApplicationSchema>;
export type DrayageQuoteFormData = z.infer<typeof drayageQuoteSchema>;
