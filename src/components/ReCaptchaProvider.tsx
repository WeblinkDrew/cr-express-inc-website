'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { ReactNode } from 'react'

export function ReCaptchaProvider({ children }: { children: ReactNode }) {
  // Hardcode the site key to ensure it's available in client component
  const siteKey = '6LexvPQrAAAAAMG07K_UMWDjznt6PP88MeEKlK9N'

  if (!siteKey) {
    console.warn('ReCAPTCHA site key is not defined')
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
      useEnterprise={false}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
