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
  },
  fieldValue: {
    fontSize: 10,
    color: '#1a202c',
    paddingLeft: 8,
  },
});

const CargoDamageReportPDF = ({ formData }) => {
  const displayValue = (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'N/A';
    }
    return value;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Cargo Irregularity Report - Damage</Text>
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
          <Text style={styles.sectionTitle}>Warehouse Details</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Damage Was Found</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.damageFound)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipment Details</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Master Air Waybill Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.masterAirWaybillNumber)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>House Air Waybill Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.houseAirWaybillNumber)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Total Piece Count</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.totalPieceCount)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Damage Classification</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Classification Rating</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.classificationRating)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Damage Details</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.notesDetails)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Number of Pieces Damaged</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.piecesWithDamage)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspector Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Inspector Name</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.inspectorFirstName || ''} ${formData.inspectorLastName || ''}`)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Title</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.inspectorTitle)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Date/Time</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.dateTime || ''} ${formData.time || ''}`)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Supporting Documents</Text>
            <Text style={styles.fieldValue}>{formData.hasDocuments ? 'Uploaded (see attachment)' : 'None'}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CargoDamageReportPDF;
