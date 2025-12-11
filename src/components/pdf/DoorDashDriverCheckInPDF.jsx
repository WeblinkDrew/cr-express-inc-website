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
    borderBottom: '3 solid #dc2626',
    color: '#dc2626',
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
    backgroundColor: '#dc2626',
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
  noticeBox: {
    backgroundColor: '#fef3c7',
    padding: 12,
    marginBottom: 20,
    borderRadius: 4,
    borderLeft: '4 solid #f59e0b',
  },
  noticeText: {
    fontSize: 9,
    color: '#92400e',
    lineHeight: 1.5,
  },
});

const DoorDashDriverCheckInPDF = ({ formData }) => {
  // Helper function to display field value or N/A
  const displayValue = (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'N/A';
    }
    return value;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text>DoorDash Driver Check-In</Text>
        </View>

        {/* Submission Info */}
        <View style={styles.submissionInfo}>
          <View style={styles.submissionRow}>
            <Text style={styles.submissionLabel}>Form Name:</Text>
            <Text style={styles.submissionValue}>DoorDash Driver Check-In</Text>
          </View>
          <View style={styles.submissionRow}>
            <Text style={styles.submissionLabel}>Submission Time:</Text>
            <Text style={styles.submissionValue}>{displayValue(formData.submittedAt)}</Text>
          </View>
          <View style={styles.submissionRow}>
            <Text style={styles.submissionLabel}>Unique ID:</Text>
            <Text style={styles.submissionValue}>{displayValue(formData.submissionId)}</Text>
          </View>
        </View>

        {/* Driver Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver Information</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>First Name</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.firstName)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Last Name</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.lastName)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Carrier Name</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.carrierName)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.phoneNumber)}</Text>
          </View>
        </View>

        {/* Vehicle Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Information</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Truck Type</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.truckType)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Truck Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.truckNumber)}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Trailer Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.trailerNumber)}</Text>
          </View>
        </View>

        {/* BOL Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documentation</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>BOL Upload Status</Text>
            <Text style={styles.fieldValue}>
              {formData.hasBOL ? "BOL Uploaded (see attachment)" : "No BOL uploaded"}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DoorDashDriverCheckInPDF;
