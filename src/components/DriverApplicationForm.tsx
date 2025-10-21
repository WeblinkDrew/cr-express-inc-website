'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'

interface DriverApplicationFormProps {
  jobTitle: string
  department: string
}

export function DriverApplicationForm({ jobTitle, department }: DriverApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    middleInitial: '',
    lastName: '',
    preferredName: '',
    streetAddress: '',
    aptNumber: '',
    city: '',
    state: '',
    zipCode: '',
    homePhone: '',
    alternatePhone: '',
    email: '',
    aboutYou: '',

    // Step 2: Work Preferences (Driver-specific)
    licenseNumber: '',
    cdlClass: 'A',
    endorsements: 'Hazmat',
    yearsExperience: '',
    cleanDrivingRecord: '1',
    trafficViolations: '1',
    employmentStatus: '1',
    desiredSchedule: [] as string[],
    desiredHaulType: [] as string[],

    // Step 3: Professional References
    referenceName: '',
    referenceCompany: '',
    referenceEmail: '',
    referencePhone: '',

    // Step 4: Other
    howDidYouHear: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (field: 'desiredSchedule' | 'desiredHaulType', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Driver application submitted:', formData)
    // TODO: Handle form submission
    alert('Application submitted! (Form submission not yet implemented)')
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="text-sm font-medium text-neutral-600">
          STEP {currentStep}/{totalSteps}
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full bg-neutral-950 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-12">
            <h2 className="font-display text-3xl font-semibold text-neutral-950">
              Personal Information
            </h2>

            {/* Full Name */}
            <div>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-neutral-500">
                Full Name
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
                <div className="sm:col-span-5">
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-950">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="middleInitial" className="block text-sm font-medium text-neutral-950">
                    MI
                  </label>
                  <input
                    type="text"
                    id="middleInitial"
                    name="middleInitial"
                    maxLength={1}
                    value={formData.middleInitial}
                    onChange={handleInputChange}
                    placeholder="MI"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-center text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div className="sm:col-span-5">
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-950">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your Last Name"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="preferredName" className="block text-sm font-medium text-neutral-950">
                  Preferred Name
                </label>
                <input
                  type="text"
                  id="preferredName"
                  name="preferredName"
                  value={formData.preferredName}
                  onChange={handleInputChange}
                  placeholder="Enter your Preferred Name"
                  className="mt-2 w-full max-w-md rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-neutral-500">
                Address
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label htmlFor="streetAddress" className="block text-sm font-medium text-neutral-950">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      required
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="Enter your Street Address"
                      className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                  <div>
                    <label htmlFor="aptNumber" className="block text-sm font-medium text-neutral-950">
                      Apt #
                    </label>
                    <input
                      type="text"
                      id="aptNumber"
                      name="aptNumber"
                      value={formData.aptNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your Apt #"
                      className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-neutral-950">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your City"
                      className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-neutral-950">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter your State"
                      className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-950">
                      Zip code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter your Zip code"
                      className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-neutral-500">
                Contacts
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="homePhone" className="block text-sm font-medium text-neutral-950">
                    Home Phone *
                  </label>
                  <input
                    type="tel"
                    id="homePhone"
                    name="homePhone"
                    required
                    value={formData.homePhone}
                    onChange={handleInputChange}
                    placeholder="Enter your Home Phone"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="alternatePhone" className="block text-sm font-medium text-neutral-950">
                    Alternate/Work Phone
                  </label>
                  <input
                    type="tel"
                    id="alternatePhone"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    placeholder="Enter your Alternate/Work Phone"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-950">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your Email Address *"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
              </div>
            </div>

            {/* Other */}
            <div>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-neutral-500">
                Other
              </h3>
              <div>
                <label htmlFor="aboutYou" className="block text-sm font-medium text-neutral-950">
                  Tell Us More About You
                </label>
                <textarea
                  id="aboutYou"
                  name="aboutYou"
                  rows={6}
                  value={formData.aboutYou}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Work Preferences (Driver-specific) */}
        {currentStep === 2 && (
          <div className="space-y-12">
            <h2 className="font-display text-3xl font-semibold text-neutral-950">
              Work Preferences
            </h2>

            {/* Job Details */}
            <div>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-neutral-500">
                Job Details
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-neutral-950">
                    Driver's License Number
                  </label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Driver's License Number"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="cdlClass" className="block text-sm font-medium text-neutral-950">
                    Commercial Driver's License
                  </label>
                  <select
                    id="cdlClass"
                    name="cdlClass"
                    value={formData.cdlClass}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="endorsements" className="block text-sm font-medium text-neutral-950">
                    Endorsements
                  </label>
                  <select
                    id="endorsements"
                    name="endorsements"
                    value={formData.endorsements}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  >
                    <option value="Hazmat">Hazmat</option>
                    <option value="Tanker">Tanker</option>
                    <option value="Double/Triple">Double/Triple</option>
                    <option value="Passenger">Passenger</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="yearsExperience" className="block text-sm font-medium text-neutral-950">
                    Years of Driving Experience
                  </label>
                  <input
                    type="text"
                    id="yearsExperience"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    placeholder="2 year min. requirement"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="cleanDrivingRecord" className="block text-sm font-medium text-neutral-950">
                    Clean Driving Record
                  </label>
                  <select
                    id="cleanDrivingRecord"
                    name="cleanDrivingRecord"
                    value={formData.cleanDrivingRecord}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="trafficViolations" className="block text-sm font-medium text-neutral-950">
                    Any Traffic Violations or Accidents
                  </label>
                  <select
                    id="trafficViolations"
                    name="trafficViolations"
                    value={formData.trafficViolations}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  >
                    <option value="1">None</option>
                    <option value="2">1-2</option>
                    <option value="3">3+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="employmentStatus" className="block text-sm font-medium text-neutral-950">
                    Desired Employment Status
                  </label>
                  <select
                    id="employmentStatus"
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  >
                    <option value="1">Full-time</option>
                    <option value="2">Part-time</option>
                    <option value="3">Contract</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Desired Schedule */}
            <div>
              <label className="block text-sm font-medium text-neutral-950">
                Desired Schedule
              </label>
              <div className="mt-4 flex flex-wrap gap-6">
                {['Weekends', 'Nights', 'Weekdays', 'Evenings'].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.desiredSchedule.includes(option)}
                      onChange={() => handleCheckboxChange('desiredSchedule', option)}
                      className="h-4 w-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950"
                    />
                    <span className="text-sm text-neutral-950">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Desired Type of Hauls */}
            <div>
              <label className="block text-sm font-medium text-neutral-950">
                Desired Type of Hauls
              </label>
              <div className="mt-4 flex flex-wrap gap-6">
                {['Local', 'Regional', 'Long Haul'].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.desiredHaulType.includes(option)}
                      onChange={() => handleCheckboxChange('desiredHaulType', option)}
                      className="h-4 w-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950"
                    />
                    <span className="text-sm text-neutral-950">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Professional References */}
        {currentStep === 3 && (
          <div className="space-y-12">
            <h2 className="font-display text-3xl font-semibold text-neutral-950">
              Professional References
            </h2>

            <div>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-neutral-500">
                Contacts
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="referenceName" className="block text-sm font-medium text-neutral-950">
                    Reference Name
                  </label>
                  <input
                    type="text"
                    id="referenceName"
                    name="referenceName"
                    value={formData.referenceName}
                    onChange={handleInputChange}
                    placeholder="Enter Reference Name"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="referenceCompany" className="block text-sm font-medium text-neutral-950">
                    Company
                  </label>
                  <input
                    type="text"
                    id="referenceCompany"
                    name="referenceCompany"
                    value={formData.referenceCompany}
                    onChange={handleInputChange}
                    placeholder="Enter Company"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="referenceEmail" className="block text-sm font-medium text-neutral-950">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="referenceEmail"
                    name="referenceEmail"
                    value={formData.referenceEmail}
                    onChange={handleInputChange}
                    placeholder="Enter Email Address"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="referencePhone" className="block text-sm font-medium text-neutral-950">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="referencePhone"
                  name="referencePhone"
                  value={formData.referencePhone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone Number"
                  className="mt-2 w-full max-w-md rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Other */}
        {currentStep === 4 && (
          <div className="space-y-12">
            <h2 className="font-display text-3xl font-semibold text-neutral-950">Other</h2>

            <div>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-neutral-500">
                Answer question
              </h3>
              <div>
                <label htmlFor="howDidYouHear" className="block text-sm font-medium text-neutral-950">
                  How Did You Hear About Us? *
                </label>
                <select
                  id="howDidYouHear"
                  name="howDidYouHear"
                  required
                  value={formData.howDidYouHear}
                  onChange={handleInputChange}
                  className="mt-2 w-full max-w-md rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                >
                  <option value="">Select an option</option>
                  <option value="ad">Advertisement</option>
                  <option value="website">Company Website</option>
                  <option value="referral">Employee Referral</option>
                  <option value="job-board">Job Board</option>
                  <option value="social-media">Social Media</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-8">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="text-sm font-semibold text-neutral-950 transition hover:text-neutral-700"
              >
                ← Previous
              </button>
            )}
          </div>
          <div className="flex gap-4">
            {currentStep < totalSteps ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit">Send Application</Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
