"use client";

import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface OnboardingFormClientProps {
  slug: string;
  formId: string;
}

export default function OnboardingFormClient({ slug, formId }: OnboardingFormClientProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const initialFormState = {
    // Basic Client Information
    companyLegalName: "",
    division: "",
    branchAddressLine1: "",
    branchCity: "",
    branchState: "",
    branchZipCode: "",
    mc: "",
    dot: "",
    scacCode: "",

    // Contact Information - Primary Contact
    primaryContactFirstName: "",
    primaryContactLastName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",

    // Secondary Contact
    secondaryContactFirstName: "",
    secondaryContactLastName: "",
    secondaryContactEmail: "",
    secondaryContactPhone: "",

    // Escalation Contact
    escalationContactFirstName: "",
    escalationContactLastName: "",
    escalationContactEmail: "",
    escalationContactPhone: "",

    // Primary Accounts Payable Contact
    accountsPayableFirstName: "",
    accountsPayableLastName: "",
    accountsPayableEmail: "",
    accountsPayablePhone: "",

    // Financial Information
    billingAddressLine1: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    invoicingInstructions: "",
    paymentMethod: "",
    w9Upload: null as File | null,

    // Operations Information - Shipment Types
    shipmentTypes: [] as string[],
    shipmentTypesOther: "",

    // Equipment Types
    equipmentTypes: [] as string[],
    equipmentTypesOther: "",

    // Shipment Build
    shipmentBuild: [] as string[],

    // Additional Requirements
    additionalRequirements: [] as string[],
    additionalRequirementsOther: "",

    // Operations Questions
    monthlyShipments: "",
    exceptionCommunication: "",
    reviewFrequency: "",
    reviewFrequencyOther: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '');

    // Format as +1 (XXX) XXX-XXXX
    if (phoneNumber.length === 0) return '';
    if (phoneNumber.length <= 1) return `+${phoneNumber}`;
    if (phoneNumber.length <= 4) return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1)}`;
    if (phoneNumber.length <= 7) return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
    return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handlePhoneChange = (field: string, value: string) => {
    const formatted = formatPhoneNumber(value);
    setFormData({ ...formData, [field]: formatted });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setFormData({ ...formData, w9Upload: file });
      } else {
        alert("Please upload a PDF file");
        e.target.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check reCAPTCHA is ready
    if (!executeRecaptcha) {
      setError("reCAPTCHA not ready. Please try again.");
      setLoading(false);
      return;
    }

    // Validate W9 upload
    if (!formData.w9Upload) {
      setError("Please upload your W9 form");
      setLoading(false);

      // Scroll to W9 upload field
      const w9Element = document.getElementById("w9-upload");
      if (w9Element) {
        w9Element.scrollIntoView({ behavior: "smooth", block: "center" });
        w9Element.focus();
      }
      return;
    }

    // Check for other validation errors and scroll to first invalid field
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector(":invalid") as HTMLElement;
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalid.focus();
      }
      setLoading(false);
      return;
    }

    try {
      // Generate reCAPTCHA token
      const recaptchaToken = await executeRecaptcha("client_onboarding_submit");
      let w9Base64 = null;
      if (formData.w9Upload) {
        const reader = new FileReader();
        w9Base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const base64 = reader.result as string;
            resolve(base64.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(formData.w9Upload!);
        });
      }

      const submissionData = {
        ...formData,
        w9Upload: w9Base64,
        shipmentTypes: formData.shipmentTypes.join(", ") + (formData.shipmentTypesOther ? `, ${formData.shipmentTypesOther}` : ""),
        equipmentTypes: formData.equipmentTypes.join(", ") + (formData.equipmentTypesOther ? `, ${formData.equipmentTypesOther}` : ""),
        shipmentBuild: formData.shipmentBuild.join(", "),
        additionalRequirements: formData.additionalRequirements.join(", ") + (formData.additionalRequirementsOther ? `, ${formData.additionalRequirementsOther}` : ""),
        reviewFrequency: formData.reviewFrequency === "Other" ? formData.reviewFrequencyOther : formData.reviewFrequency,
        slug,
        formId,
        recaptchaToken, // Add reCAPTCHA token
      };

      const response = await fetch("/api/form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Submission failed");
      }

      // Show success message
      setShowSuccess(true);

      // Reset form data
      setFormData(initialFormState);

      // Reset file input
      const fileInput = document.getElementById("w9-upload") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }

      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Hide success message and reset loading after 4 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setLoading(false);
      }, 4000);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Form Submitted Successfully!</h2>
            <p className="text-neutral-600 mb-4">
              Thank you for submitting your information. We've received your onboarding form and will be in touch soon.
            </p>
            <p className="text-sm text-neutral-500">
              This form is ready for the next submission...
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-neutral-900">CR Express Client Onboarding</h1>
          <p className="mt-2 text-neutral-600">Please complete all required fields</p>
        </div>

        {/* Basic Client Information Welcome Section */}
        <div className="rounded-lg bg-neutral-100 p-6 mb-8 space-y-4 text-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-900 text-center">Basic Client Information</h2>
          <p>
            Welcome to our onboarding process! We're thrilled to start this journey with you. In this
            initial section, we kindly ask for some basic information about your company. This will
            help us to tailor our partnership to your unique needs and circumstances.
          </p>
          <p>
            Your journey towards a successful partnership begins here. Thank you for taking the time
            to share these important details with us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 rounded-lg bg-white p-8 shadow">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Company Legal Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              What is your company's legal name?*
            </label>
            <input
              type="text"
              required
              value={formData.companyLegalName}
              onChange={(e) => setFormData({ ...formData, companyLegalName: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Division */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              What division of your company do you operate in?*
            </label>
            <input
              type="text"
              required
              value={formData.division}
              onChange={(e) => setFormData({ ...formData, division: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Branch Location */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Branch Location*
            </label>
            <input
              type="text"
              required
              value={formData.branchAddressLine1}
              onChange={(e) => setFormData({ ...formData, branchAddressLine1: e.target.value })}
              placeholder="Address Line 1"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                required
                value={formData.branchCity}
                onChange={(e) => setFormData({ ...formData, branchCity: e.target.value })}
                placeholder="City"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <select
                required
                value={formData.branchState}
                onChange={(e) => setFormData({ ...formData, branchState: e.target.value })}
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">State</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </select>
              <input
                type="text"
                required
                value={formData.branchZipCode}
                onChange={(e) => setFormData({ ...formData, branchZipCode: e.target.value })}
                placeholder="ZIP Code"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* MC */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              MC
            </label>
            <input
              type="text"
              value={formData.mc}
              onChange={(e) => setFormData({ ...formData, mc: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* DOT */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              DOT
            </label>
            <input
              type="text"
              value={formData.dot}
              onChange={(e) => setFormData({ ...formData, dot: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* SCAC Code */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              SCAC Code
            </label>
            <input
              type="text"
              value={formData.scacCode}
              onChange={(e) => setFormData({ ...formData, scacCode: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Contact Information Section */}
          <div className="rounded-lg bg-neutral-100 p-6 space-y-4 text-neutral-700">
            <h2 className="text-xl font-semibold text-neutral-900 text-center">Contact Information</h2>
            <p>
              Next, we kindly request your contact information. Your details will enable us to maintain
              open lines of communication, ensuring that our partnership thrives on clear and timely
              correspondence.
            </p>
            <p>
              Your prompt response will allow us to commence our collaboration smoothly. We value
              your time and look forward to creating a successful partnership together.
            </p>
          </div>

          {/* Primary Contact */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Primary Contact*
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={formData.primaryContactFirstName}
                onChange={(e) => setFormData({ ...formData, primaryContactFirstName: e.target.value })}
                placeholder="First Name"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                required
                value={formData.primaryContactLastName}
                onChange={(e) => setFormData({ ...formData, primaryContactLastName: e.target.value })}
                placeholder="Last Name"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Primary Contact Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Primary Contact Email*
            </label>
            <input
              type="email"
              required
              value={formData.primaryContactEmail}
              onChange={(e) => setFormData({ ...formData, primaryContactEmail: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Primary Contact Phone Number */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Primary Contact Phone Number*
            </label>
            <input
              type="tel"
              required
              value={formData.primaryContactPhone}
              onChange={(e) => handlePhoneChange('primaryContactPhone', e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Secondary Contact */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Secondary Contact*
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={formData.secondaryContactFirstName}
                onChange={(e) => setFormData({ ...formData, secondaryContactFirstName: e.target.value })}
                placeholder="First Name"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                required
                value={formData.secondaryContactLastName}
                onChange={(e) => setFormData({ ...formData, secondaryContactLastName: e.target.value })}
                placeholder="Last Name"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Secondary Contact Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Secondary Contact Email*
            </label>
            <input
              type="email"
              required
              value={formData.secondaryContactEmail}
              onChange={(e) => setFormData({ ...formData, secondaryContactEmail: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Secondary Contact Phone Number */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Secondary Contact Phone Number*
            </label>
            <input
              type="tel"
              required
              value={formData.secondaryContactPhone}
              onChange={(e) => handlePhoneChange('secondaryContactPhone', e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Escalation Contact Introduction */}
          <div className="rounded-lg bg-neutral-50 p-6 space-y-4 text-neutral-700 text-sm">
            <p>
              In our commitment to provide exceptional service and maintain effective communication, we
              find it beneficial to have an escalation contact within your organization. An escalation contact is
              someone we can reach out to in case of any urgent matters or if we encounter difficulties
              getting responses through usual channels.
            </p>
            <p>
              Having this additional contact greatly helps in ensuring that any important issues are promptly
              addressed and that our partnership operates smoothly and effectively. It is a safety net that
              guarantees the continuity and efficiency of our collaboration.
            </p>
            <p>
              We understand that everyone's time is valuable, so we assure you that this contact will be
              reached only when necessary. Please provide us with the name, email, and phone number of a
              suitable escalation contact within your company.
            </p>
            <p>
              Your understanding and cooperation are greatly appreciated, and we look forward to a
              seamless and productive partnership.
            </p>
          </div>

          {/* Escalation Contact */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Escalation Contact*
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={formData.escalationContactFirstName}
                onChange={(e) => setFormData({ ...formData, escalationContactFirstName: e.target.value })}
                placeholder="First Name"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                required
                value={formData.escalationContactLastName}
                onChange={(e) => setFormData({ ...formData, escalationContactLastName: e.target.value })}
                placeholder="Last Name"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Escalation Contact Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Escalation Contact Email*
            </label>
            <input
              type="email"
              required
              value={formData.escalationContactEmail}
              onChange={(e) => setFormData({ ...formData, escalationContactEmail: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Escalation Contact Phone Number */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Escalation Contact Phone Number*
            </label>
            <input
              type="tel"
              required
              value={formData.escalationContactPhone}
              onChange={(e) => handlePhoneChange('escalationContactPhone', e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Primary Accounts Payable Contact */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Primary Accounts Payable Contact*
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={formData.accountsPayableFirstName}
                onChange={(e) => setFormData({ ...formData, accountsPayableFirstName: e.target.value })}
                placeholder="First Name"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                required
                value={formData.accountsPayableLastName}
                onChange={(e) => setFormData({ ...formData, accountsPayableLastName: e.target.value })}
                placeholder="Last Name"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Primary Accounts Payable Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Primary Accounts Payable Email*
            </label>
            <input
              type="email"
              required
              value={formData.accountsPayableEmail}
              onChange={(e) => setFormData({ ...formData, accountsPayableEmail: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Primary Accounts Payable Phone Number */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Primary Accounts Payable Phone Number*
            </label>
            <input
              type="tel"
              required
              value={formData.accountsPayablePhone}
              onChange={(e) => handlePhoneChange('accountsPayablePhone', e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Financial Information Section */}
          <div className="rounded-lg bg-neutral-100 p-6 space-y-4 text-neutral-700">
            <h2 className="text-xl font-semibold text-neutral-900 text-center">Financial Information</h2>
            <p>
              Let's proceed to the 'Financial Information' section. Your responses here will greatly
              facilitate our financial interactions and ensure smooth and accurate transactions.
            </p>
            <p>
              We would also greatly appreciate it if you could upload your W9 form and any remittance
              advice. These documents are essential for tax purposes and to ensure all payments are
              appropriately recorded.
            </p>
            <p>
              Your contributions in this section will help establish a solid foundation for our financial
              relationship, leading to more efficient and seamless transactions. Thank you for your
              cooperation.
            </p>
            <p className="font-medium">
              Kindly note that all payment terms are Net 15 from the date of invoice submission.
            </p>
          </div>

          {/* Billing Address */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              What is your company's billing address?*
            </label>
            <input
              type="text"
              required
              value={formData.billingAddressLine1}
              onChange={(e) => setFormData({ ...formData, billingAddressLine1: e.target.value })}
              placeholder="Address Line 1"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                required
                value={formData.billingCity}
                onChange={(e) => setFormData({ ...formData, billingCity: e.target.value })}
                placeholder="City"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <select
                required
                value={formData.billingState}
                onChange={(e) => setFormData({ ...formData, billingState: e.target.value })}
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">State</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </select>
              <input
                type="text"
                required
                value={formData.billingZipCode}
                onChange={(e) => setFormData({ ...formData, billingZipCode: e.target.value })}
                placeholder="ZIP Code"
                className="rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Special Invoicing Instructions */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Do you have any special instructions for invoicing?
            </label>
            <textarea
              value={formData.invoicingInstructions}
              onChange={(e) => setFormData({ ...formData, invoicingInstructions: e.target.value })}
              rows={4}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Please specify your preferred method of payment*
            </label>
            <input
              type="text"
              required
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="mt-2 text-xs text-neutral-600">
              **Please Note: If you would prefer to pay by ACH, please send an email to ar@crexpressinc.com so we can get your ACH / Wire Bank routing and account number**
            </p>
          </div>

          {/* Payment Remittance Note */}
          <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-700">
            <p>
              Please note that if paying by ACH or Wire, a payment remittance is required with the details of
              invoice # and amounts paid per invoice. Please send all remittance advices to:{" "}
              <a href="mailto:ar@crexpressinc.com" className="text-blue-600 hover:underline">
                ar@crexpressinc.com
              </a>
            </p>
          </div>

          {/* W9 Upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Please upload your W9 here*
            </label>
            <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
              error && !formData.w9Upload ? "border-red-500 bg-red-50" : "border-neutral-300"
            }`}>
              <input
                type="file"
                required
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="w9-upload"
              />
              <label htmlFor="w9-upload" className="cursor-pointer">
                <div className="text-neutral-600">
                  <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-2">Drag and drop here or Browse files</p>
                  <p className="text-xs text-neutral-500 mt-1">Max file size: 10 MB</p>
                </div>
              </label>
              {formData.w9Upload && (
                <p className="mt-2 text-sm text-green-600">File selected: {formData.w9Upload.name}</p>
              )}
              {error && !formData.w9Upload && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>

          {/* Operations Information Section */}
          <div className="rounded-lg bg-neutral-100 p-6 space-y-4 text-neutral-700">
            <h2 className="text-xl font-semibold text-neutral-900 text-center">Operations Information</h2>
            <p>
              We've now reached the 'Operations Information' section, the final stage of our form. Your
              insights here will allow us to understand your operational needs and how we can best
              tailor our services to meet those requirements.
            </p>
            <p>
              We kindly request information about your operational procedures, any specific
              requirements you may have, and how our collaboration can best support your daily
              operations.
            </p>
            <p>
              Your detailed responses in this section will enable us to provide more targeted and
              efficient support, aligning our services with your operational strategies. This
              understanding is crucial to a mutually beneficial partnership.
            </p>
            <p>
              Thank you for taking the time to provide these essential details. We're eager to align our
              efforts with your operational needs and to start our productive journey together.
            </p>
          </div>

          {/* Shipment Types */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Please check all shipment types that your team may request:*
            </label>
            <div className="space-y-2">
              {['Air Import', 'Air Export', 'Air Charters', 'Drayage', 'Warehousing / CFS', 'Local P & D', 'Domestic Transportation (Over The Road)', 'Check All', 'Other'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.shipmentTypes.includes(type)}
                    onChange={(e) => {
                      if (type === 'Check All') {
                        setFormData({
                          ...formData,
                          shipmentTypes: e.target.checked
                            ? ['Air Import', 'Air Export', 'Air Charters', 'Drayage', 'Warehousing / CFS', 'Local P & D', 'Domestic Transportation (Over The Road)', 'Check All']
                            : []
                        });
                      } else {
                        setFormData({
                          ...formData,
                          shipmentTypes: e.target.checked
                            ? [...formData.shipmentTypes, type]
                            : formData.shipmentTypes.filter(t => t !== type && t !== 'Check All')
                        });
                      }
                    }}
                    className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">{type}</span>
                </label>
              ))}
              {formData.shipmentTypes.includes('Other') && (
                <input
                  type="text"
                  value={formData.shipmentTypesOther}
                  onChange={(e) => setFormData({ ...formData, shipmentTypesOther: e.target.value })}
                  placeholder="Please specify"
                  className="ml-6 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              )}
            </div>
          </div>

          {/* Equipment Types */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Please check all equipment types that may be required to transport your goods:*
            </label>
            <div className="space-y-2">
              {['Dry Van', 'Rollerbed', 'Flatbed', 'Reefer', 'Conestoga', 'Container', 'Sprinter Van', 'Straight Truck', 'Check All', 'Other'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.equipmentTypes.includes(type)}
                    onChange={(e) => {
                      if (type === 'Check All') {
                        setFormData({
                          ...formData,
                          equipmentTypes: e.target.checked
                            ? ['Dry Van', 'Rollerbed', 'Flatbed', 'Reefer', 'Conestoga', 'Container', 'Sprinter Van', 'Straight Truck', 'Check All']
                            : []
                        });
                      } else {
                        setFormData({
                          ...formData,
                          equipmentTypes: e.target.checked
                            ? [...formData.equipmentTypes, type]
                            : formData.equipmentTypes.filter(t => t !== type && t !== 'Check All')
                        });
                      }
                    }}
                    className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">{type}</span>
                </label>
              ))}
              {formData.equipmentTypes.includes('Other') && (
                <input
                  type="text"
                  value={formData.equipmentTypesOther}
                  onChange={(e) => setFormData({ ...formData, equipmentTypesOther: e.target.value })}
                  placeholder="Please specify"
                  className="ml-6 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              )}
            </div>
          </div>

          {/* Shipment Build */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              How will your shipments be built?*
            </label>
            <div className="space-y-2">
              {["Intact (ULD's)", 'Loose Cargo', 'Palletized'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.shipmentBuild.includes(type)}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        shipmentBuild: e.target.checked
                          ? [...formData.shipmentBuild, type]
                          : formData.shipmentBuild.filter(t => t !== type)
                      });
                    }}
                    className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Requirements */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Please check any additional requirements for transport of your goods:*
            </label>
            <div className="space-y-2">
              {['Hazmat Endorsement', 'TSA Approved Drivers', 'Customs Bonded Trucks', 'Tanker Endorsement', 'Tarps / Straps', 'Oversized / Overweight Permits', 'Check All', 'Other'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.additionalRequirements.includes(type)}
                    onChange={(e) => {
                      if (type === 'Check All') {
                        setFormData({
                          ...formData,
                          additionalRequirements: e.target.checked
                            ? ['Hazmat Endorsement', 'TSA Approved Drivers', 'Customs Bonded Trucks', 'Tanker Endorsement', 'Tarps / Straps', 'Oversized / Overweight Permits', 'Check All']
                            : []
                        });
                      } else {
                        setFormData({
                          ...formData,
                          additionalRequirements: e.target.checked
                            ? [...formData.additionalRequirements, type]
                            : formData.additionalRequirements.filter(t => t !== type && t !== 'Check All')
                        });
                      }
                    }}
                    className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">{type}</span>
                </label>
              ))}
              {formData.additionalRequirements.includes('Other') && (
                <input
                  type="text"
                  value={formData.additionalRequirementsOther}
                  onChange={(e) => setFormData({ ...formData, additionalRequirementsOther: e.target.value })}
                  placeholder="Please specify"
                  className="ml-6 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              )}
            </div>
          </div>

          {/* Monthly Shipments */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              How many shipments on a monthly basis do you expect to request?*
            </label>
            <input
              type="text"
              required
              value={formData.monthlyShipments}
              onChange={(e) => setFormData({ ...formData, monthlyShipments: e.target.value })}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Exception Communication */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              How would you like us to handle communication for exceptions that may occur (damages, shortages, rejections, detention)*
            </label>
            <input
              type="text"
              required
              value={formData.exceptionCommunication}
              onChange={(e) => setFormData({ ...formData, exceptionCommunication: e.target.value })}
              placeholder="Ex: An Immediate Phone Call, A Prompt Email, Etc."
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Business Review Frequency */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              How often would you like to have business reviews with CR Express to discuss performance and new opportunities?*
            </label>
            <div className="space-y-2">
              {['Monthly', 'Quaterly', 'Bi-Annually', 'Annually', 'Other'].map((frequency) => (
                <label key={frequency} className="flex items-center">
                  <input
                    type="radio"
                    name="reviewFrequency"
                    value={frequency}
                    checked={formData.reviewFrequency === frequency}
                    onChange={(e) => setFormData({ ...formData, reviewFrequency: e.target.value })}
                    className="h-4 w-4 border-neutral-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2 text-sm text-neutral-700">{frequency}</span>
                </label>
              ))}
              {formData.reviewFrequency === 'Other' && (
                <input
                  type="text"
                  value={formData.reviewFrequencyOther}
                  onChange={(e) => setFormData({ ...formData, reviewFrequencyOther: e.target.value })}
                  placeholder="Please specify"
                  className="ml-6 w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              )}
            </div>
          </div>

          {/* Final Thank You Section */}
          <div className="rounded-lg bg-neutral-50 p-6 space-y-4 text-neutral-700">
            <p>
              Thank you for providing us with these valuable details. Your time and effort in filling out this
              form are greatly appreciated. As we conclude this initial stage of our partnership, we're excited
              to take the next steps together.
            </p>
            <p>
              Your responses will guide us in understanding your unique needs and in tailoring our services to
              best support your business. We firmly believe in the power of collaboration and are eager to
              embark on this journey with you.
            </p>
            <p>
              By clicking the 'Submit' button, you'll officially start our partnership. We look forward to a
              successful and rewarding collaboration. Welcome aboard!
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Start Our Partnership Now!"}
          </button>
        </form>
      </div>
    </div>
  );
}
