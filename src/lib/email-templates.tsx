import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Hr,
} from '@react-email/components'

// Base email layout with CR EXPRESS branding
export function EmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          {/* Header */}
          <Section style={{ backgroundColor: '#0a0a0a', padding: '30px', textAlign: 'center', borderRadius: '8px 8px 0 0' }}>
            <Heading style={{ color: '#fff', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>CR EXPRESS</Heading>
            <Text style={{ color: '#a3a3a3', margin: '8px 0 0', fontSize: '14px' }}>Bonded Warehouse & Transportation Services</Text>
          </Section>

          {/* Content */}
          <Section style={{ backgroundColor: '#fff', padding: '40px 30px', border: '1px solid #e5e5e5', borderTop: 'none' }}>
            {children}
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: '#f5f5f5', padding: '20px 30px', textAlign: 'center', borderRadius: '0 0 8px 8px', fontSize: '12px', color: '#737373' }}>
            <Text style={{ margin: '0 0 10px' }}>CR EXPRESS, Inc.</Text>
            <Text style={{ margin: '0 0 10px' }}>2400 Arthur Ave, Elk Grove Village, IL 60007</Text>
            <Text style={{ margin: '0 0 10px' }}>
              Sales: <Link href="tel:+12244029537" style={{ color: '#0a0a0a' }}>+1 (224) 402-9537</Link> |{' '}
              Operations: <Link href="tel:+18473547979" style={{ color: '#0a0a0a' }}>+1 (847) 354-7979</Link>
            </Text>
            <Text style={{ margin: '10px 0 0' }}>
              <Link href="https://crexpressinc.com" style={{ color: '#0a0a0a', textDecoration: 'none' }}>www.crexpressinc.com</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Job Application Email Template
export function JobApplicationEmail({ data, jobTitle, department }: {
  data: any
  jobTitle: string
  department: string
}) {
  return (
    <EmailLayout>
      <Heading as="h2" style={{ color: '#0a0a0a', marginTop: 0, fontSize: '24px' }}>New Job Application</Heading>
      <Text style={{ color: '#737373', fontSize: '14px', marginBottom: '30px' }}>
        Position: <strong>{jobTitle}</strong> ({department})
      </Text>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Personal Information</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', width: '40%', color: '#737373' }}>Name:</td>
            <td style={{ padding: '8px 0', fontWeight: 'bold' }}>
              {data.firstName} {data.middleInitial} {data.lastName}
            </td>
          </tr>
          {data.preferredName && (
            <tr>
              <td style={{ padding: '8px 0', color: '#737373' }}>Preferred Name:</td>
              <td style={{ padding: '8px 0' }}>{data.preferredName}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Address:</td>
            <td style={{ padding: '8px 0' }}>
              {data.streetAddress} {data.aptNumber && `#${data.aptNumber}`}<br />
              {data.city}, {data.state} {data.zipCode}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Phone:</td>
            <td style={{ padding: '8px 0' }}>{data.homePhone}</td>
          </tr>
          {data.alternatePhone && (
            <tr>
              <td style={{ padding: '8px 0', color: '#737373' }}>Alternate Phone:</td>
              <td style={{ padding: '8px 0' }}>{data.alternatePhone}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Email:</td>
            <td style={{ padding: '8px 0' }}>{data.email}</td>
          </tr>
        </table>
      </div>

      {data.aboutYou && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>About</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.aboutYou}</p>
        </div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Work Preferences</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', width: '40%', color: '#737373' }}>Employment Status:</td>
            <td style={{ padding: '8px 0' }}>{data.employmentStatus}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Desired Pay:</td>
            <td style={{ padding: '8px 0' }}>{data.desiredPay}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Start Date:</td>
            <td style={{ padding: '8px 0' }}>{data.startDate}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Position Type:</td>
            <td style={{ padding: '8px 0' }}>{data.positionType}</td>
          </tr>
          {data.schedulePreference?.length > 0 && (
            <tr>
              <td style={{ padding: '8px 0', color: '#737373' }}>Schedule Preference:</td>
              <td style={{ padding: '8px 0' }}>{data.schedulePreference.join(', ')}</td>
            </tr>
          )}
        </table>
      </div>

      {data.howDidYouHear && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Source</h3>
          <p>How they heard about us: <strong>{data.howDidYouHear}</strong></p>
        </div>
      )}

      {data.attachments && data.attachments.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Attachments</h3>
          <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
            <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#737373' }}>
              <strong>{data.attachments.length}</strong> file(s) attached to this email:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {data.attachments.map((file: any, index: number) => (
                <li key={index} style={{ fontSize: '14px', color: '#0a0a0a', marginBottom: '5px' }}>
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </EmailLayout>
  )
}

// Driver Application Email Template
export function DriverApplicationEmail({ data, jobTitle, department }: {
  data: any
  jobTitle: string
  department: string
}) {
  return (
    <EmailLayout>
      <h2 style={{ color: '#0a0a0a', marginTop: 0, fontSize: '24px' }}>New Driver Application</h2>
      <p style={{ color: '#737373', fontSize: '14px', marginBottom: '30px' }}>
        Position: <strong>{jobTitle}</strong> ({department})
      </p>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Personal Information</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', width: '40%', color: '#737373' }}>Name:</td>
            <td style={{ padding: '8px 0', fontWeight: 'bold' }}>
              {data.firstName} {data.middleInitial} {data.lastName}
            </td>
          </tr>
          {data.preferredName && (
            <tr>
              <td style={{ padding: '8px 0', color: '#737373' }}>Preferred Name:</td>
              <td style={{ padding: '8px 0' }}>{data.preferredName}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Address:</td>
            <td style={{ padding: '8px 0' }}>
              {data.streetAddress} {data.aptNumber && `#${data.aptNumber}`}<br />
              {data.city}, {data.state} {data.zipCode}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Phone:</td>
            <td style={{ padding: '8px 0' }}>{data.homePhone}</td>
          </tr>
          {data.alternatePhone && (
            <tr>
              <td style={{ padding: '8px 0', color: '#737373' }}>Alternate Phone:</td>
              <td style={{ padding: '8px 0' }}>{data.alternatePhone}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Email:</td>
            <td style={{ padding: '8px 0' }}>{data.email}</td>
          </tr>
        </table>
      </div>

      {data.aboutYou && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>About</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.aboutYou}</p>
        </div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Driver Qualifications</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', width: '40%', color: '#737373' }}>License Number:</td>
            <td style={{ padding: '8px 0' }}>{data.licenseNumber}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>CDL Class:</td>
            <td style={{ padding: '8px 0' }}>{data.cdlClass}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Endorsements:</td>
            <td style={{ padding: '8px 0' }}>{data.endorsements}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Years of Experience:</td>
            <td style={{ padding: '8px 0' }}>{data.yearsExperience}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Clean Driving Record:</td>
            <td style={{ padding: '8px 0' }}>{data.cleanDrivingRecord === '1' ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Traffic Violations:</td>
            <td style={{ padding: '8px 0' }}>
              {data.trafficViolations === '1' ? 'None' : data.trafficViolations === '2' ? '1-2' : '3+'}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Employment Status:</td>
            <td style={{ padding: '8px 0' }}>
              {data.employmentStatus === '1' ? 'Full-time' : data.employmentStatus === '2' ? 'Part-time' : 'Contract'}
            </td>
          </tr>
        </table>
      </div>

      {(data.desiredSchedule?.length > 0 || data.desiredHaulType?.length > 0) && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Preferences</h3>
          {data.desiredSchedule?.length > 0 && (
            <p>Schedule: <strong>{data.desiredSchedule.join(', ')}</strong></p>
          )}
          {data.desiredHaulType?.length > 0 && (
            <p>Haul Type: <strong>{data.desiredHaulType.join(', ')}</strong></p>
          )}
        </div>
      )}

      {data.referenceName && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Professional Reference</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr>
              <td style={{ padding: '8px 0', width: '40%', color: '#737373' }}>Name:</td>
              <td style={{ padding: '8px 0' }}>{data.referenceName}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: '#737373' }}>Company:</td>
              <td style={{ padding: '8px 0' }}>{data.referenceCompany}</td>
            </tr>
            {data.referenceEmail && (
              <tr>
                <td style={{ padding: '8px 0', color: '#737373' }}>Email:</td>
                <td style={{ padding: '8px 0' }}>{data.referenceEmail}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: '8px 0', color: '#737373' }}>Phone:</td>
              <td style={{ padding: '8px 0' }}>{data.referencePhone}</td>
            </tr>
          </table>
        </div>
      )}

      {data.howDidYouHear && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Source</h3>
          <p>How they heard about us: <strong>{data.howDidYouHear}</strong></p>
        </div>
      )}
    </EmailLayout>
  )
}

// Service Quote Email Template
export function ServiceQuoteEmail({ data, serviceName, serviceType }: {
  data: any
  serviceName: string
  serviceType: string
}) {
  return (
    <EmailLayout>
      <h2 style={{ color: '#0a0a0a', marginTop: 0, fontSize: '24px' }}>New Service Quote Request</h2>
      <p style={{ color: '#737373', fontSize: '14px', marginBottom: '30px' }}>
        Service: <strong>{serviceName}</strong>
      </p>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ color: '#0a0a0a', fontSize: '18px', marginTop: 0 }}>Contact Information</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', width: '30%', color: '#737373' }}>Name:</td>
            <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{data.name}</td>
          </tr>
          {data.company && (
            <tr>
              <td style={{ padding: '8px 0', color: '#737373' }}>Company:</td>
              <td style={{ padding: '8px 0' }}>{data.company}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Email:</td>
            <td style={{ padding: '8px 0' }}><a href={`mailto:${data.email}`} style={{ color: '#0a0a0a' }}>{data.email}</a></td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Phone:</td>
            <td style={{ padding: '8px 0' }}><a href={`tel:${data.phone}`} style={{ color: '#0a0a0a' }}>{data.phone}</a></td>
          </tr>
        </table>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Service Requested</h3>
        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#0a0a0a' }}>{data.service || serviceName}</p>
      </div>

      <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderLeft: '4px solid #ffc107', marginTop: '30px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>
          <strong>Action Required:</strong> Please respond to this quote request within 24 hours.
        </p>
      </div>
    </EmailLayout>
  )
}

// Location Quote Email Template
export function LocationQuoteEmail({ data, cityName }: {
  data: any
  cityName: string
}) {
  return (
    <EmailLayout>
      <h2 style={{ color: '#0a0a0a', marginTop: 0, fontSize: '24px' }}>New Location Quote Request</h2>
      <p style={{ color: '#737373', fontSize: '14px', marginBottom: '30px' }}>
        Location: <strong>{cityName}</strong>
      </p>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ color: '#0a0a0a', fontSize: '18px', marginTop: 0 }}>Contact Information</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', width: '30%', color: '#737373' }}>Name:</td>
            <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{data.name}</td>
          </tr>
          {data.company && (
            <tr>
              <td style={{ padding: '8px 0', color: '#737373' }}>Company:</td>
              <td style={{ padding: '8px 0' }}>{data.company}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Email:</td>
            <td style={{ padding: '8px 0' }}><a href={`mailto:${data.email}`} style={{ color: '#0a0a0a' }}>{data.email}</a></td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', color: '#737373' }}>Phone:</td>
            <td style={{ padding: '8px 0' }}><a href={`tel:${data.phone}`} style={{ color: '#0a0a0a' }}>{data.phone}</a></td>
          </tr>
        </table>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Service Requested</h3>
        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#0a0a0a' }}>
          {data.service === 'bonded-warehouse' ? 'Bonded Warehouse Storage' :
           data.service === 'container-transloading' ? 'Container Transloading' :
           data.service === 'customs-brokerage' ? 'Customs Brokerage' :
           data.service === 'drayage' ? 'Intermodal Drayage' :
           data.service === 'air-cargo' ? 'Air Cargo Services' :
           'General Inquiry'}
        </p>
      </div>

      {data.message && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#0a0a0a', fontSize: '18px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>Message / Special Requirements</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.message}</p>
        </div>
      )}

      <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderLeft: '4px solid #ffc107', marginTop: '30px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>
          <strong>Action Required:</strong> Please respond to this quote request within 24 hours.
        </p>
      </div>
    </EmailLayout>
  )
}
