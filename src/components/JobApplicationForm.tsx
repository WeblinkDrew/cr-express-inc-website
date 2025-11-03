'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

interface JobApplicationFormProps {
  jobTitle: string
  department: string
}

export function JobApplicationForm({ jobTitle, department }: JobApplicationFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    // Step 2: Work Preferences
    employmentStatus: '',
    desiredPay: '',
    startDate: '',
    positionType: '',
    schedulePreference: [] as string[],
    attachments: null as FileList | null,

    // Step 3: Other
    howDidYouHear: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      schedulePreference: prev.schedulePreference.includes(value)
        ? prev.schedulePreference.filter((v) => v !== value)
        : [...prev.schedulePreference, value],
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, attachments: e.target.files }))
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        // Step 1: Personal Information - validate required fields
        if (!formData.firstName.trim()) {
          alert('Please enter your first name')
          return false
        }
        if (!formData.lastName.trim()) {
          alert('Please enter your last name')
          return false
        }
        if (!formData.streetAddress.trim()) {
          alert('Please enter your street address')
          return false
        }
        if (!formData.city.trim()) {
          alert('Please enter your city')
          return false
        }
        if (!formData.state.trim()) {
          alert('Please select your state')
          return false
        }
        if (!formData.zipCode.trim()) {
          alert('Please enter your zip code')
          return false
        }
        if (!formData.homePhone.trim()) {
          alert('Please enter your phone number')
          return false
        }
        if (!formData.email.trim()) {
          alert('Please enter your email address')
          return false
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
          alert('Please enter a valid email address')
          return false
        }
        return true

      case 2:
        // Step 2: Work Preferences - validate required fields
        if (!formData.employmentStatus) {
          alert('Please select your current employment status')
          return false
        }
        if (!formData.desiredPay.trim()) {
          alert('Please enter your desired pay')
          return false
        }
        if (!formData.startDate) {
          alert('Please select your available start date')
          return false
        }
        if (!formData.positionType) {
          alert('Please select the position type you are applying for')
          return false
        }
        if (!formData.attachments || formData.attachments.length === 0) {
          alert('Please upload at least one file (CV, Resume, or Cover Letter)')
          return false
        }
        return true

      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!executeRecaptcha) {
      alert('reCAPTCHA not ready. Please try again.')
      return
    }

    setIsSubmitting(true)

    try {
      // Generate reCAPTCHA token
      const recaptchaToken = await executeRecaptcha('job_application_submit')

      // Create FormData to handle file uploads
      const submitData = new FormData()

      // Add all text fields as JSON
      const textData = {
        firstName: formData.firstName,
        middleInitial: formData.middleInitial,
        lastName: formData.lastName,
        preferredName: formData.preferredName,
        streetAddress: formData.streetAddress,
        aptNumber: formData.aptNumber,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        homePhone: formData.homePhone,
        alternatePhone: formData.alternatePhone,
        email: formData.email,
        aboutYou: formData.aboutYou,
        employmentStatus: formData.employmentStatus,
        desiredPay: formData.desiredPay,
        startDate: formData.startDate,
        positionType: formData.positionType,
        schedulePreference: formData.schedulePreference,
        howDidYouHear: formData.howDidYouHear,
      }

      submitData.append('formData', JSON.stringify(textData))
      submitData.append('jobTitle', jobTitle)
      submitData.append('department', department)
      submitData.append('recaptchaToken', recaptchaToken)

      // Add file attachments if any
      if (formData.attachments) {
        Array.from(formData.attachments).forEach((file) => {
          submitData.append('attachments', file)
        })
      }

      const response = await fetch('/api/submit-job-application', {
        method: 'POST',
        body: submitData, // Send FormData instead of JSON
      })

      const result = await response.json()

      if (response.ok) {
        alert('Application submitted successfully! We will review your application and get back to you soon.')
        // Reset form
        window.location.reload()
      } else {
        alert(`Error: ${result.error || 'Failed to submit application. Please try again.'}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit application. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
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

        {/* Step 2: Work Preferences */}
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
                  <label htmlFor="employmentStatus" className="block text-sm font-medium text-neutral-950">
                    Desired Employment Status *
                  </label>
                  <input
                    type="text"
                    id="employmentStatus"
                    name="employmentStatus"
                    required
                    value={formData.employmentStatus}
                    onChange={handleInputChange}
                    placeholder="Enter your Desired Employment Status"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="desiredPay" className="block text-sm font-medium text-neutral-950">
                    Desired Pay
                  </label>
                  <input
                    type="text"
                    id="desiredPay"
                    name="desiredPay"
                    value={formData.desiredPay}
                    onChange={handleInputChange}
                    placeholder="Enter your Desired Pay"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-neutral-950">
                    Desired Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="positionType" className="block text-sm font-medium text-neutral-950">
                    Type of Position Desired *
                  </label>
                  <input
                    type="text"
                    id="positionType"
                    name="positionType"
                    required
                    value={formData.positionType}
                    onChange={handleInputChange}
                    placeholder="Enter your Type of Position"
                    className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-950 placeholder-neutral-400 transition focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-950">
                    Which schedule do you prefer? *
                  </label>
                  <div className="mt-4 flex gap-6">
                    {['Days', 'Nights', 'No Preference'].map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.schedulePreference.includes(option)}
                          onChange={() => handleCheckboxChange(option)}
                          className="h-4 w-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950"
                        />
                        <span className="text-sm text-neutral-950">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-950">
                Add Attachments (CV, Cover Letter, Certifications, Etc.) *
              </label>
              <div className="mt-4">
                <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 transition hover:border-neutral-400">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="mt-4 flex justify-center text-sm text-neutral-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-neutral-950 focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-950 hover:text-neutral-700"
                      >
                        <span>Browse Files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          multiple
                          required
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag & drop here</p>
                    </div>
                    <p className="mt-2 text-xs text-neutral-500">
                      {formData.attachments
                        ? `${formData.attachments.length} file(s) selected`
                        : '0 of 10'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Other */}
        {currentStep === 3 && (
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Send Application'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
