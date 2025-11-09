export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl text-center">
        <div className="mb-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Thank You for Your Submission!
        </h1>

        <p className="text-lg text-neutral-600 mb-6">
          Your onboarding form has been successfully submitted to CR Express.
        </p>

        <div className="rounded-lg bg-blue-50 p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">What happens next?</h2>
          <ul className="text-left text-sm text-blue-800 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Your information has been securely processed and stored</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Our team will review your submission within 1-2 business days</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>You will receive a confirmation email at your provided email address</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>A CR Express representative will contact you to finalize your onboarding</span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-neutral-500">
          If you have any questions, please contact us at{" "}
          <a href="mailto:support@crexpress.com" className="text-blue-600 hover:underline">
            support@crexpress.com
          </a>
        </p>
      </div>
    </div>
  );
}
