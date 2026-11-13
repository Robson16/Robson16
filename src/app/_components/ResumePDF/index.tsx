import { Document, Link, Page, Text, View } from '@react-pdf/renderer'

import { getCurriculumData } from '@/app/_actions/get-curriculum-data.action'
import { formatMonthYear } from '@/app/_utils/format-date'

import { styles } from './styles'

type CurriculumDataType = Awaited<ReturnType<typeof getCurriculumData>>

interface ResumePDFProps {
  locale: string
  data: CurriculumDataType
  dictionary: {
    objectiveTitle: string
    summaryTitle: string
    experienceTitle: string
    educationTitle: string
  }
}

export default function ResumePDF({
  locale,
  data,
  dictionary,
}: ResumePDFProps) {
  const { profile, socialLinks, experiences, educations } = data
  const profileTranslation = profile.translations[0]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name}</Text>
          <View style={styles.contactRow}>
            <Text>{profileTranslation.locationName} |</Text>
            <Link
              src={`mailto:${profile.email}`}
              style={{ color: '#111827', textDecoration: 'none' }}
            >
              <Text>{profile.email} |</Text>
            </Link>
            <Text>{profile.phone} |</Text>
            {socialLinks.map((link, index) => (
              <Link
                key={link.id}
                src={link.url}
                style={{ color: '#111827', textDecoration: 'none' }}
              >
                <Text>
                  {link.url.replace('https://', '')}{' '}
                  {index < socialLinks.length - 1 ? '|' : ''}
                </Text>
              </Link>
            ))}
          </View>
        </View>

        {/* OBJETIVO */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{dictionary.objectiveTitle}</Text>
          <Text style={styles.text}>{profileTranslation.objective}</Text>
        </View>

        {/* RESUMO PROFISSIONAL */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{dictionary.summaryTitle}</Text>
          <Text style={styles.text}>{profileTranslation.bio}</Text>
        </View>

        {/* EXPERIÊNCIA PROFISSIONAL */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{dictionary.experienceTitle}</Text>
          {experiences.map((exp) => {
            const expTrans = exp.translations[0]
            return (
              <View key={exp.id} style={styles.itemBlock} wrap={false}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemTitleContainer}>
                    <Text style={styles.roleTitle}>{expTrans.role}</Text>
                    <Text style={styles.companyTitle}>{exp.company}</Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {formatMonthYear(exp.startDate, locale)} -{' '}
                    {exp.endDate
                      ? formatMonthYear(exp.endDate, locale)
                      : locale === 'pt'
                        ? 'Presente'
                        : 'Present'}
                  </Text>
                </View>
                {expTrans.description
                  .split('\n')
                  .filter((line: string) => line.trim())
                  .map((line: string, i: number) => (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>
                        {line.replace(/^[-•]\s*/, '')}
                      </Text>
                    </View>
                  ))}
              </View>
            )
          })}
        </View>

        {/* FORMAÇÃO E CURSOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{dictionary.educationTitle}</Text>
          {educations.map((edu) => {
            const eduTrans = edu.translations[0]
            return (
              <View key={edu.id} style={styles.itemBlock} wrap={false}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemTitleContainer}>
                    <Text style={styles.roleTitle}>{eduTrans.title}</Text>
                    <Text style={styles.companyTitle}>
                      {eduTrans.institution}
                    </Text>
                  </View>

                  <Text style={styles.itemDate}>
                    {formatMonthYear(edu.startDate, locale)} -{' '}
                    {edu.endDate
                      ? formatMonthYear(edu.endDate, locale)
                      : locale === 'pt'
                        ? 'Presente'
                        : 'Present'}
                  </Text>
                </View>
                {eduTrans.description && (
                  <Text style={styles.text}>{eduTrans.description}</Text>
                )}
              </View>
            )
          })}
        </View>
      </Page>
    </Document>
  )
}
