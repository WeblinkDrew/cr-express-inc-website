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
    fontSize: 16,
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
    marginBottom: 14,
    paddingLeft: 12,
    paddingRight: 12,
  },
  fieldLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 10,
    color: '#1a202c',
    paddingLeft: 8,
  },
  servicesList: {
    paddingLeft: 20,
    marginTop: 4,
  },
  serviceItem: {
    fontSize: 9,
    color: '#1a202c',
    marginBottom: 3,
  },
});

const WarehouseServicesPDF = ({ formData }) => {
  const displayValue = (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'N/A';
    }
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'N/A';
    }
    return value;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Warehouse Services Form</Text>
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
          <Text style={styles.sectionTitle}>Staff Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Staff Member Name</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.firstName || ''} ${formData.lastName || ''}`)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer & Load Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Customer Name</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.customerName)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Load Numbers</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.loadNumbers)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Performed</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Selected Services</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.servicesPerformed)}</Text>
          </View>
          {formData.otherService && (
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Other Service</Text>
              <Text style={styles.fieldValue}>{displayValue(formData.otherService)}</Text>
            </View>
          )}
        </View>

        {formData.specialNotes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Notes or Exceptions</Text>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldValue}>{displayValue(formData.specialNotes)}</Text>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default WarehouseServicesPDF;
