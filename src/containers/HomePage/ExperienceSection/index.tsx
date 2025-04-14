import { education } from '@/data/education.json'
import { experiences } from '@/data/experiences.json'
import { useLocale, useTranslations } from 'next-intl'
import { FaCircle } from 'react-icons/fa'

export default function ExperienceSection() {
  const t = useTranslations('Experience')
  const locale = useLocale()

  return (
    <section
      id="experience"
      className="bg-[url('/images/study.jpg')] bg-cover bg-center"
    >
      <div className="bg-black bg-opacity-90">
        <div className="container mx-auto max-w-screen-sm px-4 py-28 xl:max-w-screen-xl">
          <div className="flex flex-col gap-20 xl:flex-row xl:gap-6">
            {/* Academic Education Section */}
            <div className="flex flex-1 flex-col gap-7">
              <h3 className="mb-12 text-center text-3xl font-medium">
                {t('academicTitle')}
              </h3>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex min-h-64 max-w-[500px] flex-1 flex-col content-start gap-2 self-center rounded-lg bg-zinc-800 p-8 shadow-2xl md:min-w-[500px]"
                >
                  <h4 className="text-xl font-semibold">
                    {edu.title[locale as keyof typeof edu.title] ||
                      edu.title.pt}
                    {` ${t('preposition')} `}
                    <span className="italic text-emerald-400">
                      {edu.institution[
                        locale as keyof typeof edu.institution
                      ] || edu.institution.pt}
                    </span>
                  </h4>
                  <span className="text-emerald-400">
                    {`${edu.period.start[locale as keyof typeof edu.period.start] || edu.period.start.pt} - ${edu.period.end[locale as keyof typeof edu.period.end] || edu.period.end.pt}`}
                  </span>
                  <p className="text-sm">
                    {edu.description[locale as keyof typeof edu.description] ||
                      edu.description.pt}
                  </p>
                </div>
              ))}
            </div>

            {/* Professional Experience Section */}
            <div className="flex flex-1 flex-col gap-7">
              <h3 className="mb-12 text-center text-3xl font-medium">
                {t('professionalTitle')}
              </h3>
              {experiences.slice(0, 3).map((exp) => (
                <div
                  key={exp.id}
                  className="flex min-h-64 max-w-[500px] flex-1 flex-col content-start gap-2 self-center rounded-lg bg-zinc-800 p-8 shadow-2xl md:min-w-[500px]"
                >
                  <h4 className="text-xl font-semibold">
                    {exp.title[locale as keyof typeof exp.title] ||
                      exp.title.pt}{' '}
                    {` ${t('preposition')} `}
                    <span className="italic text-emerald-400">
                      {exp.company}
                    </span>
                  </h4>
                  <span className="text-emerald-400">{`${exp.period.start[locale as keyof typeof exp.period.start] || exp.period.start.pt} - ${exp.period.end[locale as keyof typeof exp.period.end] || exp.period.end.pt}`}</span>
                  {exp.location && (
                    <span className="text-sm text-stone-200">
                      {exp.location[locale as keyof typeof exp.location] ||
                        exp.location.pt}
                    </span>
                  )}
                  <ul className="list-inside text-sm">
                    {
                      // eslint-disable-next-line prettier/prettier
                      (exp.responsibilities[locale as keyof typeof exp.responsibilities] || exp.responsibilities.pt).map((resp, index) => (
                        <li key={index} className="mb-1">
                          <FaCircle className="mr-2 inline-block" size={10} />
                          {resp}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
