import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    padding: '40 50',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 18,
    color: '#111827',
  },
  title: {
    fontSize: 12,
    color: '#0284c7',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontSize: 9,
    color: '#4B5563',
    gap: 4,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    textTransform: 'uppercase',
    borderBottomWidth: 1.5,
    borderBottomColor: '#000000',
    paddingBottom: 4,
    marginBottom: 12,
  },
  text: {
    fontSize: 10,
    color: '#4b5563',
  },
  itemBlock: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  itemTitleContainer: {
    flexDirection: 'column',
  },
  roleTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: '#111827',
  },
  companyTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#0284c7',
  },
  itemDate: {
    fontSize: 9,
    color: '#6b7280',
    fontFamily: 'Helvetica-Bold',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 6,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: '#0284c7',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
  },
})
