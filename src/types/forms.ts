// Form Types for all 13 CR Express forms (originally 12, but Carrier Onboarding and Axiom Carrier Onboarding are separate)

// ============================================================================
// 1. CARRIER ONBOARDING (existing)
// ============================================================================
export interface CarrierOnboardingData {
  // Company Information
  companyLegalName: string;
  division: string;
  branchAddressLine1: string;
  branchCity: string;
  branchState: string;
  branchZipCode: string;
  mc: string | null;
  dot: string | null;
  scacCode: string | null;

  // Primary Contact
  primaryContactFirstName: string;
  primaryContactLastName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;

  // Secondary Contact
  secondaryContactFirstName: string;
  secondaryContactLastName: string;
  secondaryContactEmail: string;
  secondaryContactPhone: string;

  // Escalation Contact
  escalationContactFirstName: string;
  escalationContactLastName: string;
  escalationContactEmail: string;
  escalationContactPhone: string;

  // Accounts Payable Contact
  accountsPayableFirstName: string;
  accountsPayableLastName: string;
  accountsPayableEmail: string;
  accountsPayablePhone: string;

  // Billing Information
  billingAddressLine1: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  invoicingInstructions: string | null;
  paymentMethod: string;
  w9Upload: string | null;

  // Operations
  shipmentTypes: string;
  equipmentTypes: string;
  shipmentBuild: string;
  additionalRequirements: string;
  monthlyShipments: string;
  exceptionCommunication: string;
  reviewFrequency: string;
}

// ============================================================================
// 2. AXIOM CARRIER ONBOARDING (simple company info form)
// ============================================================================
export interface AxiomCarrierOnboardingData {
  // Company Information
  companyLegalName: string;
  companyDbaName: string | null;

  // Company Type
  companyType: 'Corporation' | 'Limited Liability Company (LLC)' | 'Sole Proprietorship' | 'Partnership' | 'Other';
  companyTypeOther: string | null;

  // Year Founded
  yearFounded: string;

  // SCAC(s) - Separate using commas
  scacCodes: string;

  // Diversity Classifications
  diversityClassifications: {
    womanOwned: boolean;
    veteranOwned: boolean;
    minorityOwned: boolean;
    other: boolean;
    otherText: string | null;
  };

  // Company Physical Address
  physicalAddressLine1: string;
  physicalAddressLine2: string | null;
  physicalCity: string;
  physicalState: string;
  physicalZipCode: string;

  // Is the company's mailing address the same as its physical address?
  mailingAddressSameAsPhysical: boolean;

  // Do you use a factoring company?
  useFactoringCompany: boolean;
}

// ============================================================================
// 3. AXIOM INVOICING
// ============================================================================
export interface AxiomInvoicingData {
  loadNumber: string;
  loadAmount: string;
}

// ============================================================================
// 4. BATHROOM REQUEST FORM
// ============================================================================
export interface BathroomRequestData {
  bathroomLocation:
    | '2400 Warehouse Office'
    | '2400 Main Breakroom'
    | '2400 Warehouse Dock'
    | '301 W Oakton';
  bathroomType: 'Men' | 'Women';
  itemsNeeded: string[]; // ['Toilet Paper', 'Paper Towels', 'Hand Soap', 'Trash Bin Full', 'Other']
  otherItem: string | null;
  additionalNotes: string | null;
  firstName: string;
  lastName: string;
}

// ============================================================================
// 5. CARGO IRREGULARITY REPORT (DAMAGE)
// ============================================================================
export interface CargoDamageReportData {
  // Warehouse Details
  damageWasFound: string[]; // ['Upon Acceptance', 'At Airport', 'When Breaking ULD']

  // Shipment Details
  masterAirWaybillNumber: string;
  houseAirWaybillNumber: string;
  totalPieceCount: string;

  // Damage Classification
  classificationRating: 'A - Minor (Cosmetic)' | 'B - Moderate (No Apparent Inner Damage)' | 'C - Critical (Possible Inner Damage)';
  damageDetails: string | null;
  numberOfPiecesDamaged: string;

  // Additional Information
  supportingDocuments: string[]; // File upload URLs
  inspectorFirstName: string;
  inspectorLastName: string;
  inspectorTitle: 'Agent' | 'Lead' | 'Supervisor';
  inspectorSignature: string;
  inspectionDate: string;
  inspectionTime: string;
}

// ============================================================================
// 6. CARGO IRREGULARITY REPORT (SHORTAGE/OVERAGE)
// ============================================================================
export interface CargoShortageOverageReportData {
  // Warehouse Details
  shortageOverageWasFound: string[]; // ['Upon Acceptance', 'At Airport', 'When Breaking ULD']

  // Shipment Details
  masterAirWaybillNumber: string;

  // Shortage/Overage items (repeatable sections)
  items: Array<{
    houseAirWaybillNumber: string;
    totalPieceCount: string;
    shortage: {
      houseAirWaybillNumber: string;
      numberOfPiecesReceived: string;
      numberOfPiecesOverShort: string;
    };
    overage: {
      houseAirWaybillNumber: string;
      numberOfPiecesReceived: string;
      numberOfPiecesOverShort: string;
    };
    additionalComments: string | null;
  }>;

  // Inspector Information
  inspectorFirstName: string;
  inspectorLastName: string;
  inspectorTitle: string;
  inspectorSignature: string;
  inspectionDate: string;
  inspectionTime: string;
}

// ============================================================================
// 7. DRIVER FEEDBACK & REPORTING
// ============================================================================
export interface DriverFeedbackData {
  driverName: string;
  urgency: 'Low' | 'Medium' | 'High';
  preferredContact: 'In-Person Meeting' | 'Phone Call' | 'Email' | 'No Follow-Up';
  feedbackTopics: string[]; // ['Provide Feedback / Suggestions', 'Request Assistance / Help', 'Ask A Question', 'Performance Feedback Request', 'Reporting Personnel Concerns', 'Reporting Other Concerns', 'Other']
  otherTopic: string | null;
}

// ============================================================================
// 8. EMPLOYEE ASSET CHECK-IN
// ============================================================================
export interface EmployeeAssetCheckInData {
  firstName: string;
  lastName: string;
  hasHeadset: 'Yes' | 'No' | null;
  hasCompanyCellPhone: 'Yes' | 'No' | null;
  hasWorkDeskPhone: 'Yes' | 'No' | null;
  hasLaptop: 'Yes' | 'No' | null;
  hasMonitor: 'Yes' | 'No' | null;
  hasCompanyCreditCard: 'Yes' | 'No' | null;
  hasScanner: 'Yes' | 'No' | null;
  hasDesktop: 'Yes' | 'No' | null;
  hasTablet: 'Yes' | 'No' | null;
  additionalNotes: string | null;
}

// ============================================================================
// 9. FORKLIFT INSPECTION
// ============================================================================
export interface ForkliftInspectionData {
  // General
  inspectionDate: string;
  inspectionTime: string;
  operatorFirstName: string;
  operatorLastName: string;
  operatorSignature: string;
  shiftNumber: '1st Shift' | '2nd Shift';
  truckNumber: string;
  serialNumber: string;
  hourMeterReading: string;

  // Inspection Items (Pass/Fail for each)
  noLeaks: 'Pass' | 'Fail';
  safetyStraps: 'Pass' | 'Fail';
  fuelLevels: 'Pass' | 'Fail';
  frontRearTires: 'Pass' | 'Fail';
  engineOilLevel: 'Pass' | 'Fail';
  hydraulicOilLevel: 'Pass' | 'Fail';
  allBolts: 'Pass' | 'Fail';
  airFilterUnit: 'Pass' | 'Fail';
  forkLockingPins: 'Pass' | 'Fail';
  liftCylinderChains: 'Pass' | 'Fail';
  hornOperations: 'Pass' | 'Fail';
  driversOverheadGuard: 'Pass' | 'Fail';
  seatBeltOperation: 'Pass' | 'Fail';
  listenForUnusualNoise: 'Pass' | 'Fail';
  operationOfAllGauges: 'Pass' | 'Fail';
  headTaillightOperations: 'Pass' | 'Fail';
  footBrakePedalOperation: 'Pass' | 'Fail';
  inchingBrakePedalOperation: 'Pass' | 'Fail';
  liftingControlLeverOperation: 'Pass' | 'Fail';
  tiltControlLeverOperation: 'Pass' | 'Fail';
  sideShifterLevelOperation: 'Pass' | 'Fail';
  attachmentControlLever: 'Pass' | 'Fail';
  backupAlarmOperation: 'Pass' | 'Fail';
  strobeLightOperation: 'Pass' | 'Fail';
  directionalLeverOperation: 'Pass' | 'Fail';
  powerSteeringOperation: 'Pass' | 'Fail';

  additionalComments: string | null;

  // Double Check
  doubleCheckFirstName: string;
  doubleCheckLastName: string;
  doubleCheckSignature: string;
}

// ============================================================================
// 10. LOAD CREATION REQUEST
// ============================================================================
export interface LoadCreationRequestData {
  customer: string;
  customerReference: string;
  driverFirstName: string;
  driverLastName: string;
  truckNumber: string;
  trailer: string;
  ratecon: string[]; // File upload URLs
}

// ============================================================================
// 11. ULD INSPECTION
// ============================================================================
export interface ULDInspectionData {
  // General Details
  inspectionDate: string;
  inspectionTime: string;
  customer: string;
  mawb: string; // Master Air Waybill Number

  // ULD Details
  uldNumber: string;
  uldPicturesBefore: string[]; // File upload URLs (before plastic/net removal)
  uldPicturesAfter: string[]; // File upload URLs (after plastic/net removal)

  // Damage Classification
  hasVisibleDamage: 'Yes' | 'No';

  // Additional Information
  comments: string | null;
  inspectorSignature: string;
}

// ============================================================================
// 12. WAREHOUSE CHECK-IN
// ============================================================================
export interface WarehouseCheckInData {
  driverFirstName: string;
  driverLastName: string;
  licenseNumber: string;
  companyName: string;
  phoneNumber: string;
}

// ============================================================================
// 13. WAREHOUSE SERVICES FORM
// ============================================================================
export interface WarehouseServicesData {
  firstName: string;
  lastName: string;
  customerName: string;
  loadNumbers: string; // Comma-separated list
  servicesPerformed: string[]; // Multiple checkboxes
  specialNotes: string | null;
}

// ============================================================================
// UNION TYPE FOR ALL FORMS
// ============================================================================
export type FormData =
  | CarrierOnboardingData
  | AxiomCarrierOnboardingData
  | AxiomInvoicingData
  | BathroomRequestData
  | CargoDamageReportData
  | CargoShortageOverageReportData
  | DriverFeedbackData
  | EmployeeAssetCheckInData
  | ForkliftInspectionData
  | LoadCreationRequestData
  | ULDInspectionData
  | WarehouseCheckInData
  | WarehouseServicesData;

// ============================================================================
// FORM METADATA
// ============================================================================
export interface FormMetadata {
  name: string;
  description: string;
  icon: string; // Emoji or icon identifier
  category: 'internal' | 'external' | 'operations' | 'safety';
}

export const FORM_METADATA: Record<string, FormMetadata> = {
  CARRIER_ONBOARDING: {
    name: 'Carrier Onboarding',
    description: 'Complete carrier onboarding form for new partnerships (50+ fields)',
    icon: '🚛',
    category: 'external',
  },
  AXIOM_CARRIER_ONBOARDING: {
    name: 'Axiom Carrier Onboarding',
    description: 'Simple company information form for Axiom carriers',
    icon: '📋',
    category: 'external',
  },
  AXIOM_INVOICING: {
    name: 'Axiom Invoicing',
    description: 'Submit load invoicing information',
    icon: '📄',
    category: 'external',
  },
  BATHROOM_REQUEST: {
    name: 'Bathroom Request Form',
    description: 'Request bathroom supplies restocking',
    icon: '🚽',
    category: 'internal',
  },
  CARGO_DAMAGE_REPORT: {
    name: 'Cargo Irregularity Report (Damage)',
    description: 'Report damaged cargo during handling',
    icon: '⚠️',
    category: 'operations',
  },
  CARGO_SHORTAGE_OVERAGE_REPORT: {
    name: 'Cargo Irregularity Report (Shortage/Overage)',
    description: 'Report cargo shortage or overage discrepancies',
    icon: '📊',
    category: 'operations',
  },
  DRIVER_FEEDBACK: {
    name: 'Driver Feedback & Reporting',
    description: 'Submit driver feedback, questions, or concerns',
    icon: '💬',
    category: 'internal',
  },
  EMPLOYEE_ASSET_CHECKIN: {
    name: 'Employee Asset Check-In',
    description: 'Track company equipment check-in from employees',
    icon: '💼',
    category: 'internal',
  },
  FORKLIFT_INSPECTION: {
    name: 'Forklift Inspection',
    description: 'Daily forklift safety inspection checklist',
    icon: '🏗️',
    category: 'safety',
  },
  LOAD_CREATION_REQUEST: {
    name: 'Load Creation Request',
    description: 'Request creation of new load in system',
    icon: '📦',
    category: 'operations',
  },
  ULD_INSPECTION: {
    name: 'ULD Inspection',
    description: 'Inspect Unit Load Devices before/after handling',
    icon: '✈️',
    category: 'safety',
  },
  WAREHOUSE_CHECKIN: {
    name: 'Warehouse Check-In',
    description: 'Driver check-in at warehouse facility',
    icon: '🏭',
    category: 'operations',
  },
  WAREHOUSE_SERVICES: {
    name: 'Warehouse Services Form',
    description: 'Request warehouse services for shipments',
    icon: '📋',
    category: 'operations',
  },
};
