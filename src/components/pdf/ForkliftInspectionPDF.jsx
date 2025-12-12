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
    borderBottom: '3 solid #059669',
    color: '#059669',
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#059669',
    marginBottom: 12,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fieldRow: {
    marginBottom: 8,
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
  inspectionRow: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
  },
  inspectionLabel: {
    width: '70%',
    fontSize: 9,
    color: '#4a5568',
  },
  inspectionValue: {
    width: '30%',
    fontSize: 9,
    fontWeight: 'bold',
  },
  pass: {
    color: '#16a34a',
  },
  fail: {
    color: '#dc2626',
  },
  na: {
    color: '#6b7280',
  },
});

const ForkliftInspectionPDF = ({ formData }) => {
  const displayValue = (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'N/A';
    }
    return value;
  };

  const getStatusStyle = (status) => {
    if (status === 'Pass') return styles.pass;
    if (status === 'Fail') return styles.fail;
    return styles.na;
  };

  const inspectionItems = formData.inspectionItems || {};

  const itemLabels = [
    { key: 'noLeaks', label: 'No Leaks' },
    { key: 'safetyStraps', label: 'Safety Straps' },
    { key: 'fuelLevels', label: 'Fuel Levels' },
    { key: 'frontRearTires', label: 'Front & Rear Tires' },
    { key: 'engineOilLevel', label: 'Engine Oil Level' },
    { key: 'hydraulicOilLevel', label: 'Hydraulic Oil Level' },
    { key: 'allBelts', label: 'All Belts' },
    { key: 'airFilterUnit', label: 'Air Filter Unit' },
    { key: 'forkLockingPins', label: 'Fork Locking Pins' },
    { key: 'liftCylinderChains', label: 'Lift Cylinder Chains' },
    { key: 'hornOperations', label: 'Horn Operations' },
    { key: 'driversOverheadGuard', label: "Driver's Overhead Guard" },
    { key: 'seatBeltOperation', label: 'Seat Belt Operation' },
    { key: 'listenUnusualNoise', label: 'Listen for Unusual Noise' },
    { key: 'allGaugesOperation', label: 'Operation of all Gauges' },
    { key: 'headTaillightOperations', label: 'Head & Taillight Operations' },
    { key: 'footBrakePedalOperation', label: 'Foot Brake Pedal Operation' },
    { key: 'inchingBrakePedalOperation', label: 'Inching Brake Pedal Operation' },
    { key: 'liftingControlLeverOperation', label: 'Lifting Control Lever Operation' },
    { key: 'tiltControlLeverOperation', label: 'Tilt Control Lever Operation' },
    { key: 'sideShifterLevelOperation', label: 'Side Shifter Level Operation' },
    { key: 'attachmentControlLevel', label: 'Attachment Control Level' },
    { key: 'backupAlarmOperation', label: 'Backup Alarm Operation' },
    { key: 'strobeLightOperation', label: 'Strobe Light Operation' },
    { key: 'directionalLeverOperation', label: 'Directional Lever Operation' },
    { key: 'powerSteeringOperation', label: 'Power Steering Operation' },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Forklift Inspection Checklist</Text>
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
          <Text style={styles.sectionTitle}>Operator Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Operator Name</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.operatorFirstName || ''} ${formData.operatorLastName || ''}`)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Date/Time</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.dateTime || ''} ${formData.time || ''}`)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Shift Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.shiftNumber)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forklift Details</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Truck Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.truckNumber)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Serial Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.serialNumber)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Hour Meter Reading</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.hourMeterReading)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspection Items</Text>
          {itemLabels.map((item) => (
            <View key={item.key} style={styles.inspectionRow}>
              <Text style={styles.inspectionLabel}>{item.label}</Text>
              <Text style={[styles.inspectionValue, getStatusStyle(inspectionItems[item.key])]}>
                {displayValue(inspectionItems[item.key])}
              </Text>
            </View>
          ))}
        </View>

        {formData.additionalComments && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Comments</Text>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldValue}>{displayValue(formData.additionalComments)}</Text>
            </View>
          </View>
        )}

        {(formData.doubleCheckFirstName || formData.doubleCheckLastName) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Double Check</Text>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Double Check By</Text>
              <Text style={styles.fieldValue}>{displayValue(`${formData.doubleCheckFirstName || ''} ${formData.doubleCheckLastName || ''}`)}</Text>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ForkliftInspectionPDF;
