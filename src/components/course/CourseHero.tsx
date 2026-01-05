import Image from 'next/image'
import { ensureProtocol } from '@/utils'

interface CourseHeroProps {
  name: string
  coverImage?: {
    fields: {
      file: {
        url: string
        details: {
          image: {
            width: number
            height: number
          }
        }
      }
    }
  }
  programType?: {
    fields: {
      name: string
    }
  }
  awardLevel?: string
  creditHours?: number
}

export function CourseHero({ name, coverImage, programType, awardLevel, creditHours }: CourseHeroProps) {
  return (
    <section aria-labelledby="course-title" className="course-hero">
      <div className="container">
        <div className="course-hero__content">
          <h1 id="course-title" className="course-hero__title">
            {name}
          </h1>

          <div className="course-hero__details">
            {programType && (
              <div className="course-hero__detail">
                <span className="course-hero__detail-label">Program Type:</span>
                <span className="course-hero__detail-value">{programType.fields.name}</span>
              </div>
            )}

            {awardLevel && (
              <div className="course-hero__detail">
                <span className="course-hero__detail-label">Award Level:</span>
                <span className="course-hero__detail-value">{awardLevel}</span>
              </div>
            )}

            {creditHours && (
              <div className="course-hero__detail">
                <span className="course-hero__detail-label">Credit Hours:</span>
                <span className="course-hero__detail-value">{creditHours}</span>
              </div>
            )}
          </div>
        </div>

        {coverImage && (
          <figure className="course-hero__image">
            <Image
              src={ensureProtocol(coverImage.fields.file.url)}
              alt={`${name} - Course Cover Image`}
              width={coverImage.fields.file.details.image.width}
              height={coverImage.fields.file.details.image.height}
              priority
            />
            <figcaption className="visually-hidden">{name} course at ADMI</figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}
