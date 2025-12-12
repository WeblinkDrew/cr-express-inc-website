import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    paddingBottom: 12,
    borderBottom: '3 solid #2563eb',
    color: '#2563eb',
  },
  submissionInfo: {
    backgroundColor: '#f7fafc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 4,
    fontSize: 8,
    color: '#4a5568',
    lineHeight: 1.4,
  },
  submissionRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  submissionLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    width: '30%',
  },
  submissionValue: {
    width: '70%',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#2563eb',
    marginBottom: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fieldRow: {
    marginBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
  },
  fieldLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 3,
  },
  fieldValue: {
    fontSize: 10,
    color: '#1a202c',
    paddingLeft: 8,
  },
});

const AxiomCarrierOnboardingPDF = ({ formData }) => {
  const displayValue = (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'N/A';
    }
    return value;
  };

  const formatDiversityClassifications = (classifications) => {
    if (!classifications) return 'N/A';
    const items = [];
    if (classifications.womanOwned) items.push('Woman-Owned');
    if (classifications.veteranOwned) items.push('Veteran-Owned');
    if (classifications.minorityOwned) items.push('Minority-Owned');
    if (classifications.other && classifications.otherText) items.push(classifications.otherText);
    return items.length > 0 ? items.join(', ') : 'None';
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Axiom Carrier Onboarding</Text>
        </View>

        <View style={styles.submissionInfo}>
          <View style={styles.submissionRow}>
            <Text style={styles.submissionLabel}>Submission Time:</Text>
            <Text style={styles.submissionValue}>{displayValue(formData.submittedAt)}</Text>
          </View>
          <View style={styles.submissionRow}>
            <Text style={styles.submissionLabel}>Unique ID:</Text>
            <Text style={styles.submissionValue}>{displayValue(formData.submissionId)}</Text>
          </View>
        </View>

        {/* Company Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Company Legal Name</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.companyLegalName)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Company DBA Name</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.companyDbaName)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Company Type</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.companyType)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Year Founded</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.yearFounded)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>SCAC Codes</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.scacCodes)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Diversity Classifications</Text>
            <Text style={styles.fieldValue}>{formatDiversityClassifications(formData.diversityClassifications)}</Text>
          </View>
        </View>

        {/* Physical Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Physical Address</Text>
            <Text style={styles.fieldValue}>
              {displayValue(`${formData.physicalAddressLine1 || ''} ${formData.physicalAddressLine2 || ''}, ${formData.physicalCity || ''}, ${formData.physicalState || ''} ${formData.physicalZipCode || ''}`)}
            </Text>
          </View>
          {formData.mailingAddressSameAsPhysical === 'no' && (
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Mailing Address</Text>
              <Text style={styles.fieldValue}>
                {displayValue(`${formData.mailingAddressLine1 || ''} ${formData.mailingAddressLine2 || ''}, ${formData.mailingCity || ''}, ${formData.mailingState || ''} ${formData.mailingZipCode || ''}`)}
              </Text>
            </View>
          )}
        </View>

        {/* Factoring Company */}
        {formData.useFactoringCompany === 'yes' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Factoring Company</Text>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Factoring Company Name</Text>
              <Text style={styles.fieldValue}>{displayValue(formData.factoringCompanyName)}</Text>
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Factoring Company Address</Text>
              <Text style={styles.fieldValue}>
                {displayValue(`${formData.factoringCompanyAddressLine1 || ''}, ${formData.factoringCompanyCity || ''}, ${formData.factoringCompanyState || ''} ${formData.factoringCompanyZipCode || ''}`)}
              </Text>
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Factoring Company Phone</Text>
              <Text style={styles.fieldValue}>{displayValue(formData.factoringCompanyPhone)}</Text>
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Factoring Company Email</Text>
              <Text style={styles.fieldValue}>{displayValue(formData.factoringCompanyEmail)}</Text>
            </View>
          </View>
        )}

        {/* Quick Pay */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Interested in Quick-Pay</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.interestedInQuickPay)}</Text>
          </View>
          {formData.interestedInQuickPay === 'yes' && (
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Quick-Pay Option</Text>
              <Text style={styles.fieldValue}>{displayValue(formData.quickPayOption)}</Text>
            </View>
          )}
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Owner / Officer</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.ownerOfficerFirstName || ''} ${formData.ownerOfficerLastName || ''}`)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Owner / Officer Email</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.ownerOfficerEmail)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Owner / Officer Phone</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.ownerOfficerPhone)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Accounting Contact</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.accountingFirstName || ''} ${formData.accountingLastName || ''}`)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Accounting Email</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.accountingEmail)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Operations Contact</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.operationsFirstName || ''} ${formData.operationsLastName || ''}`)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Operations Email</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.operationsEmail)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Safety / Claims Contact</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.safetyClaimsFirstName || ''} ${formData.safetyClaimsLastName || ''}`)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Safety / Claims Email</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.safetyClaimsEmail)}</Text>
          </View>
        </View>

        {/* Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents Uploaded</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Hazmat</Text>
            <Text style={styles.fieldValue}>{formData.hasHazmat ? 'Uploaded' : 'Not Uploaded'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>COI</Text>
            <Text style={styles.fieldValue}>{formData.hasCoi ? 'Uploaded' : 'Not Uploaded'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>W9</Text>
            <Text style={styles.fieldValue}>{formData.hasW9 ? 'Uploaded' : 'Not Uploaded'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Operating Authority</Text>
            <Text style={styles.fieldValue}>{formData.hasOperatingAuthority ? 'Uploaded' : 'Not Uploaded'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Carrier-Broker Agreement</Text>
            <Text style={styles.fieldValue}>{formData.hasCarrierBrokerAgreement ? 'Uploaded' : 'Not Uploaded'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Banking Details</Text>
            <Text style={styles.fieldValue}>{formData.hasBankingDetails ? 'Uploaded' : 'Not Uploaded'}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AxiomCarrierOnboardingPDF;
