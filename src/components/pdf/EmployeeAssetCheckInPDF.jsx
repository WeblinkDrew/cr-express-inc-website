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
  assetRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  assetLabel: {
    width: '50%',
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4a5568',
  },
  assetValue: {
    width: '25%',
    fontSize: 9,
    color: '#1a202c',
  },
  assetDetails: {
    width: '25%',
    fontSize: 9,
    color: '#1a202c',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    padding: 6,
    marginBottom: 4,
    marginLeft: 12,
    marginRight: 12,
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#4a5568',
  },
});

const EmployeeAssetCheckInPDF = ({ formData }) => {
  const displayValue = (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'N/A';
    }
    return value;
  };

  const assets = [
    { label: 'Headset', hasAsset: formData.hasHeadset, details: null },
    { label: 'Company Cell Phone', hasAsset: formData.hasCompanyCellPhone, details: formData.companyCellPhoneIMEI, detailLabel: 'IMEI' },
    { label: 'Work Desk Phone', hasAsset: formData.hasWorkDeskPhone, details: formData.workDeskPhoneDeviceID, detailLabel: 'Device ID' },
    { label: 'Laptop', hasAsset: formData.hasLaptop, details: formData.laptopMakeAndDeviceName, detailLabel: 'Make/Device' },
    { label: 'Monitor', hasAsset: formData.hasMonitor, details: formData.monitorMakeAndSerialNumber, detailLabel: 'Make/Serial' },
    { label: 'Second Monitor', hasAsset: formData.hasSecondMonitor, details: null },
    { label: 'Company Credit Card', hasAsset: formData.hasCompanyCreditCard, details: formData.companyCreditCardLast4 ? `****${formData.companyCreditCardLast4}` : null, detailLabel: 'Last 4' },
    { label: 'Second Company Credit Card', hasAsset: formData.hasSecondCompanyCreditCard, details: null },
    { label: 'Scanner', hasAsset: formData.hasScanner, details: formData.scannerSerialNumber, detailLabel: 'Serial' },
    { label: 'Desktop', hasAsset: formData.hasDesktop, details: formData.desktopMakeAndDeviceName, detailLabel: 'Make/Device' },
    { label: 'Tablet', hasAsset: formData.hasTablet, details: formData.tabletIMEI, detailLabel: 'IMEI' },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Employee Asset Check-In</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employee Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Employee Name</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.firstName || ''} ${formData.lastName || ''}`)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assets Assigned</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { width: '50%' }]}>Asset Type</Text>
            <Text style={[styles.tableHeaderText, { width: '25%' }]}>Has Asset</Text>
            <Text style={[styles.tableHeaderText, { width: '25%' }]}>Details</Text>
          </View>
          {assets.map((asset, index) => (
            <View key={index} style={styles.assetRow}>
              <Text style={styles.assetLabel}>{asset.label}</Text>
              <Text style={styles.assetValue}>{displayValue(asset.hasAsset)}</Text>
              <Text style={styles.assetDetails}>
                {asset.details ? asset.details : '-'}
              </Text>
            </View>
          ))}
        </View>

        {formData.additionalNotes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Notes</Text>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldValue}>{displayValue(formData.additionalNotes)}</Text>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default EmployeeAssetCheckInPDF;
