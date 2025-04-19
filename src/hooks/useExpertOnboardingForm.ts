import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Schema definitions
const basicInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, underscores, and hyphens"),
  category: z.string().min(1, "Please select a category"),
});

const serviceTypesSchema = z.object({
  oneOnOneSession: z.boolean().optional(),
  chatAdvice: z.boolean().optional(),
  digitalProducts: z.boolean().optional(),
  notes: z.boolean().optional(),
});

const availabilitySchema = z.object({
  availability: z.array(
    z.object({
      day: z.string(),
      slots: z.array(
        z.object({
          start: z.string(),
          end: z.string(),
        })
      ).optional(),
    })
  ).optional(),
});

const pricingSchema = z.object({
  isPaid: z.boolean(),
  pricePerSession: z.number().optional().nullable(),
});

const profileSetupSchema = z.object({
  profilePicture: z.any().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
  socialLinks: z.object({
    linkedin: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
    instagram: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
    twitter: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
  }).optional(),
});

export const formSchema = z.object({
  ...basicInfoSchema.shape,
  ...serviceTypesSchema.shape,
  ...availabilitySchema.shape,
  ...pricingSchema.shape,
  ...profileSetupSchema.shape,
});

export type FormValues = z.infer<typeof formSchema>;

export function useExpertOnboardingForm() {
  return useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      username: "",
      category: "",
      oneOnOneSession: false,
      chatAdvice: false,
      digitalProducts: false,
      notes: false,
      availability: [],
      isPaid: true,
      pricePerSession: 0,
      bio: "",
      socialLinks: {
        linkedin: "",
        instagram: "",
        twitter: "",
      },
    },
    mode: "onChange",
  });
}
