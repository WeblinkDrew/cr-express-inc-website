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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    paddingBottom: 12,
    borderBottom: '3 solid #ea580c',
    color: '#ea580c',
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
    backgroundColor: '#ea580c',
    marginBottom: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fieldRow: {
    marginBottom: 12,
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
  shipmentEntry: {
    backgroundColor: '#f7fafc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    marginLeft: 12,
    marginRight: 12,
  },
  shipmentEntryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ea580c',
    marginBottom: 8,
  },
});

const CargoShortageOveragePDF = ({ formData }) => {
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
          <Text>Cargo Irregularity Report - Shortage/Overage</Text>
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
            <Text style={styles.fieldLabel}>Shortage/Overage Was Found</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.shortageOverageFound)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipment Details</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Master Air Waybill/Reference Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.masterAirWaybillNumber)}</Text>
          </View>

          {formData.shipmentEntries && formData.shipmentEntries.map((entry, index) => (
            entry.houseAirWaybillNumber || entry.totalPieceCount ? (
              <View key={index} style={styles.shipmentEntry}>
                <Text style={styles.shipmentEntryTitle}>Shipment Entry #{index + 1}</Text>
                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>House Air Waybill Number</Text>
                  <Text style={styles.fieldValue}>{displayValue(entry.houseAirWaybillNumber)}</Text>
                </View>
                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>Total Piece Count</Text>
                  <Text style={styles.fieldValue}>{displayValue(entry.totalPieceCount)}</Text>
                </View>
                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>Pieces Received</Text>
                  <Text style={styles.fieldValue}>{displayValue(entry.piecesReceived)}</Text>
                </View>
                <View style={styles.fieldRow}>
                  <Text style={styles.fieldLabel}>Pieces Over/Short</Text>
                  <Text style={styles.fieldValue}>{displayValue(entry.piecesOverShort)}</Text>
                </View>
              </View>
            ) : null
          ))}

          {formData.additionalComments && formData.additionalComments.map((comment, index) => (
            comment ? (
              <View key={index} style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Additional Comments #{index + 1}</Text>
                <Text style={styles.fieldValue}>{displayValue(comment)}</Text>
              </View>
            ) : null
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspector Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Inspector Name</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.inspectorFirstName || ''} ${formData.inspectorLastName || ''}`)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Title</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.title)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Date/Time</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.dateTime || ''} ${formData.time || ''}`)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CargoShortageOveragePDF;
