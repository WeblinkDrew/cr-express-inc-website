export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DoorDashDriverCheckInSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
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
          Check-In Complete!
        </h1>

        <p className="text-lg text-neutral-600 mb-6">
          Thank you for checking in. Your information has been received.
        </p>

        {/* Important Instructions */}
        <div className="rounded-lg bg-amber-50 border-2 border-amber-200 p-6 mb-6">
          <div className="flex items-center justify-center mb-3">
            <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-amber-800 mb-3">
            What To Do Next
          </h2>
          <p className="text-amber-900 text-lg leading-relaxed">
            Please wait in the <strong>cage</strong> or in your <strong>truck</strong> until you receive a call to confirm that you can back into a door.
          </p>
        </div>

        {/* Contact Info */}
        <div className="rounded-lg bg-neutral-100 p-4">
          <p className="text-sm text-neutral-600">
            If you have any questions or need assistance, please ask the warehouse staff.
          </p>
        </div>
      </div>
    </div>
  );
}
