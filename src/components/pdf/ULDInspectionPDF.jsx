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
    borderBottom: '3 solid #7c3aed',
    color: '#7c3aed',
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
    backgroundColor: '#7c3aed',
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
  damageYes: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  damageNo: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
});

const ULDInspectionPDF = ({ formData }) => {
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
          <Text>ULD Inspection Form</Text>
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
          <Text style={styles.sectionTitle}>General Details</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Date/Time</Text>
            <Text style={styles.fieldValue}>{displayValue(`${formData.dateTime || ''} ${formData.time || ''}`)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Customer</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.customer)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>MAWB</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.mawb)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ULD Details</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>ULD Number</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.uldNumber)}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>ULD Pictures (Before Plastic/Net Removal)</Text>
            <Text style={styles.fieldValue}>{formData.hasBeforePlasticPic ? 'Uploaded (see attachment)' : 'Not uploaded'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>ULD Pictures (After Plastic/Net Removal)</Text>
            <Text style={styles.fieldValue}>{formData.hasAfterPlasticPic ? 'Uploaded (see attachment)' : 'Not uploaded'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Damage Classification</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Visible Damage</Text>
            <Text style={[styles.fieldValue, formData.visibleDamage === 'Yes' ? styles.damageYes : styles.damageNo]}>
              {displayValue(formData.visibleDamage)}
            </Text>
          </View>
          {formData.visibleDamage === 'Yes' && (
            <>
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Damage Type</Text>
                <Text style={styles.fieldValue}>{displayValue(formData.damageType)}</Text>
              </View>
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Damage Description</Text>
                <Text style={styles.fieldValue}>{displayValue(formData.damageContinued)}</Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Comments</Text>
            <Text style={styles.fieldValue}>{displayValue(formData.comments)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ULDInspectionPDF;
