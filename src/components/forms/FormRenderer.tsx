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

// Import new form components as they're built
const AxiomInvoicingForm = dynamic(
  () => import("./AxiomInvoicingForm"),
  { ssr: false }
);

const AxiomCarrierOnboardingForm = dynamic(
  () => import("./AxiomCarrierOnboardingForm"),
  { ssr: false }
);

const BathroomRequestForm = dynamic(
  () => import("./BathroomRequestForm"),
  { ssr: false }
);

const WarehouseCheckInForm = dynamic(
  () => import("./WarehouseCheckInForm"),
  { ssr: false }
);

const DriverFeedbackForm = dynamic(
  () => import("./DriverFeedbackForm"),
  { ssr: false }
);

const EmployeeAssetCheckInForm = dynamic(
  () => import("./EmployeeAssetCheckInForm"),
  { ssr: false }
);

const WarehouseServicesForm = dynamic(
  () => import("./WarehouseServicesForm"),
  { ssr: false }
);

const LoadCreationRequestForm = dynamic(
  () => import("./LoadCreationRequestForm"),
  { ssr: false }
);

const ForkliftInspectionForm = dynamic(
  () => import("./ForkliftInspectionForm"),
  { ssr: false }
);

const ULDInspectionForm = dynamic(
  () => import("./ULDInspectionForm"),
  { ssr: false }
);

const CargoDamageReportForm = dynamic(
  () => import("./CargoDamageReportForm"),
  { ssr: false }
);

const CargoShortageOverageForm = dynamic(
  () => import("./CargoShortageOverageForm"),
  { ssr: false }
);

const DoorDashDriverCheckInForm = dynamic(
  () => import("./DoorDashDriverCheckInForm"),
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
  // Carrier Onboarding uses old props format and has reCAPTCHA protection (provided by root layout)
  if (formType === "CARRIER_ONBOARDING") {
    return <CarrierOnboardingForm slug={slug} formId={formId} />;
  }

  // Axiom Invoicing
  if (formType === "AXIOM_INVOICING") {
    return <AxiomInvoicingForm formId={formId} formType={formType} formName={formName} />;
  }

  // Axiom Carrier Onboarding
  if (formType === "AXIOM_CARRIER_ONBOARDING") {
    return <AxiomCarrierOnboardingForm formId={formId} formType={formType} formName={formName} />;
  }

  // Bathroom Request
  if (formType === "BATHROOM_REQUEST") {
    return <BathroomRequestForm formId={formId} formType={formType} formName={formName} />;
  }

  // Warehouse Check-In
  if (formType === "WAREHOUSE_CHECKIN") {
    return <WarehouseCheckInForm formId={formId} formType={formType} formName={formName} />;
  }

  // Driver Feedback
  if (formType === "DRIVER_FEEDBACK") {
    return <DriverFeedbackForm formId={formId} formType={formType} formName={formName} />;
  }

  // Employee Asset Check-In
  if (formType === "EMPLOYEE_ASSET_CHECKIN") {
    return <EmployeeAssetCheckInForm formId={formId} formType={formType} formName={formName} />;
  }

  // Warehouse Services
  if (formType === "WAREHOUSE_SERVICES") {
    return <WarehouseServicesForm formId={formId} formType={formType} formName={formName} />;
  }

  // Load Creation Request
  if (formType === "LOAD_CREATION_REQUEST") {
    return <LoadCreationRequestForm formId={formId} formType={formType} formName={formName} />;
  }

  // Forklift Inspection
  if (formType === "FORKLIFT_INSPECTION") {
    return <ForkliftInspectionForm formId={formId} formType={formType} formName={formName} />;
  }

  // ULD Inspection
  if (formType === "ULD_INSPECTION") {
    return <ULDInspectionForm formId={formId} formType={formType} formName={formName} />;
  }

  // Cargo Damage Report
  if (formType === "CARGO_DAMAGE_REPORT") {
    return <CargoDamageReportForm formId={formId} formType={formType} formName={formName} />;
  }

  // Cargo Shortage/Overage Report
  if (formType === "CARGO_SHORTAGE_OVERAGE_REPORT") {
    return <CargoShortageOverageForm formId={formId} formType={formType} formName={formName} />;
  }

  // DoorDash Driver Check-In
  if (formType === "DOORDASH_DRIVER_CHECKIN") {
    return <DoorDashDriverCheckInForm formId={formId} formType={formType} formName={formName} />;
  }

  // Other forms show placeholder (being built in Phase 4)
  return <PlaceholderForm formName={formName} />;
}
