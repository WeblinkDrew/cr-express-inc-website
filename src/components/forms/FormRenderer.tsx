"use client";

import { FormType } from "@prisma/client";
import dynamic from "next/dynamic";

/**
 * Dynamic Form Renderer
 *
 * Maps formType to the appropriate form component.
 * Uses Next.js dynamic imports for code splitting.
 */

// Import existing carrier onboarding form
const CarrierOnboardingForm = dynamic(
  () => import("@/app/form/[slug]/OnboardingFormClient"),
  { ssr: false }
);

// Placeholder component for forms not yet built
function PlaceholderForm({ formName }: { formName: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Form Coming Soon</h1>
        <p className="text-neutral-600 mb-2">
          The <strong>{formName}</strong> form is currently being built.
        </p>
        <p className="text-sm text-neutral-500">
          Please check back later or contact support for assistance.
        </p>
      </div>
    </div>
  );
}

interface FormRendererProps {
  formType: FormType;
  formId: string;
  slug: string;
  formName: string;
}

export default function FormRenderer({ formType, formId, slug, formName }: FormRendererProps) {
  // Only Carrier Onboarding is built - others show placeholder
  if (formType === "CARRIER_ONBOARDING") {
    return <CarrierOnboardingForm slug={slug} formId={formId} />;
  }

  // All other forms show placeholder (will be built in Phase 4)
  return <PlaceholderForm formName={formName} />;
}
