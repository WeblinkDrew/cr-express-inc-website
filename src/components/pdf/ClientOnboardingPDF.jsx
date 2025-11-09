import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from '@react-pdf/renderer';

// Define styles for the PDF
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
    borderBottom: '3 solid #2c5282',
    color: '#2c5282',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#2c5282',
    marginBottom: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fieldRow: {
    marginBottom: 14,
    paddingLeft: 12,
    paddingRight: 12,
  },
  fieldLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  fieldValue: {
    fontSize: 10,
    color: '#1a202c',
    lineHeight: 1.4,
    paddingLeft: 8,
  },
});

const ClientOnboardingPDF = ({ formData }) => {
  // Helper function to display field value or N/A
  const displayValue = (value) => {
    if (!value || value.trim() === '') {
      return 'N/A';
    }
    return value;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text>CR Express Client Onboarding</Text>
        </View>

        {/* Submission Info */}
        <View style={styles.submissionInfo}>
          <View style={styles.submissionRow}>
            <Text style={styles.submissionLabel}>Form Name:</Text>
            <Text style={styles.submissionValue}>CR Express Client Onboarding</Text>
          </View>
          <View style={styles.submissionRow}>
            <Text style={styles.submissionLabel}>Submission Time:</Text>
            <Text style={styles.submissionValue}>{displayValue(formData.submittedAt)}</Text>
          </View>
          <View style={styles.submissionRow}>
            <Text style={styles.submissionLabel}>Browser:</Text>
            <Text style={styles.submissionValue}>{displayValue(formData.browser)}</Text>
          </View>
          <View style={styles.submissionRow}>
            <Text style={styles.submissionLabel}>IP Address:</Text>
            <Text style={styles.submissionValue}>{displayValue(formData.ipAddress)}</Text>
          </View>
          <View style={styles.submissionRow}>
            <Text style={styles.submissionLabel}>Unique ID:</Text>
            <Text style={styles.submissionValue}>{displayValue(formData.submissionId)}</Text>
          </View>
        </View>

        {/* Basic Client Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Client Information</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>What is your company's legal name?</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.companyLegalName)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>What division of your company do you operate in?</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.division)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Branch Location</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.branchAddressLine1}, ${formData.branchCity}, ${formData.branchState} ${formData.branchZipCode}`)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>MC</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.mc)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>DOT</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.dot)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>SCAC Code</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.scacCode)}</Text>
          </View>
        </View>

        {/* Contact Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Primary Contact</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.primaryContactFirstName} ${formData.primaryContactLastName}`)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Primary Contact Email</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.primaryContactEmail)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Primary Contact Phone Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.primaryContactPhone)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Secondary Contact</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.secondaryContactFirstName} ${formData.secondaryContactLastName}`)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Secondary Contact Email</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.secondaryContactEmail)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Secondary Contact Phone Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.secondaryContactPhone)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Escalation Contact</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.escalationContactFirstName} ${formData.escalationContactLastName}`)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Escalation Contact Email</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.escalationContactEmail)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Escalation Contact Phone Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.escalationContactPhone)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Primary Accounts Payable Contact</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.accountsPayableFirstName} ${formData.accountsPayableLastName}`)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Primary Accounts Payable Email</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.accountsPayableEmail)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Primary Accounts Payable Phone Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.accountsPayablePhone)}</Text>
          </View>
        </View>

        {/* Financial Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Information</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>What is your company's billing address?</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.billingAddressLine1}, ${formData.billingCity}, ${formData.billingState} ${formData.billingZipCode}`)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Do you have any special instructions for invoicing?</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.invoicingInstructions)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Please specify your preferred method of payment</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.paymentMethod)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>W9 Upload Status</Text>
            <Text style={styles.fieldValue}>{formData.w9Upload ? "W-9 Uploaded (see attachment)" : "N/A"}</Text>
          </View>
        </View>

        {/* Operations Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operations Information</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Please check all shipment types that your team may request:</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.shipmentTypes)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Please check all equipment types that may be required to transport your goods:</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.equipmentTypes)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>How will your shipments be built?</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.shipmentBuild)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Please check any additional requirements for transport of your goods:</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.additionalRequirements)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>How many shipments on a monthly basis do you expect to request?</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.monthlyShipments)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>How would you like us to handle communication for exceptions that may occur (damages, shortages, rejections, detention)</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.exceptionCommunication)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>How often would you like to have business reviews with CR Express to discuss performance and new opportunities?</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.reviewFrequency)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ClientOnboardingPDF;
