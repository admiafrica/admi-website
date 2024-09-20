import { useEffect, useState } from 'react';
import { CampaignLayout } from '@/layouts/CampaignLayout';
import courseImage from '@/assets/images/default-banner.webp';
import {
  CampaignBanner,
  CampaignFaqs,
  CampaignHighlights,
  CampaignLeadForm,
  CampaignReasons,
  CampaignTestimonials,
} from '@/components/campaign';
import styles from '@/assets/css/main.module.css';
import { useRouter } from 'next/router';
import { Skeleton } from '@mantine/core';

export function CampaignsPage() {
  const [status, setStatus] = useState(1);
  const [courseBanner, setCourseBanner] = useState(null);
  const [courseName, setCourseName] = useState('Course Name');
  const [courseOverview, setCourseOverview] = useState('');
  const [courseUsps, setCourseUsps] = useState([]);
  const [courseFee, setCourseFee] = useState('');
  const [courseHours, setCourseHours] = useState('');
  const [courseProspectus, setCourseProspectus] = useState('');
  const [courseTestimonials, setCourseTestimonials] = useState([]);
  const [courseFaqs, setCourseFaqs] = useState([]);
  const [isLeadFormVisible, setIsLeadFormVisible] = useState(false);
  const [leadFormFooterText, setLeadFormFooterText] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const campaign = router.query.campaign;

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!campaign) return;

      try {
        setLoading(true);
        const api_url = process.env.NEXT_PUBLIC_ADMI_SERVICES_API;

        const response = await fetch(`${api_url}/${campaign}`);
        const data = await response.json();

        if (data.status === true) {
          setStatus(1);
          setCourseBanner(data.data.banner);
          setCourseName(data.data.title);
          setCourseOverview(data.data.description);
          setCourseUsps(data.data.usps);
          setCourseFee(data.data.tuitionFee);
          setCourseHours(data.data.creditHours);
          setCourseProspectus(data.data.prospectus);
          setCourseTestimonials(data.data.testimonials);
          setCourseFaqs(data.data.faqs);
          setLeadFormFooterText(data.data.lead_form_footer_text)
        } else {
          setStatus(0);
          setCourseBanner(courseImage.src);
          throw new Error('Failed to fetch data');
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setStatus(0);
        setCourseBanner(courseImage.src);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchCourseData();
    }
  }, [router.isReady, campaign, status]);

  return (
    <CampaignLayout>
      <Skeleton visible={loading} className={`${styles['course-banner']}`}>
        {!loading && (
          <CampaignBanner
            status={status}
            src={courseBanner}
            alt={courseName}
          />
        )}
      </Skeleton>

      {status === 1 && (
        <section id="course" className={`${styles['section-wrapper']} ${styles['pb-0']}`}>
          <div className={`${styles['wrapper']}`}>
            <div className={`${styles['layout-grid']} ${styles['layout-grid--two-col']}`}>
              {loading ? (
                <Skeleton height={39} radius="md" className={`${styles['mb-4']}`} />
              ) : (
                <h1 className={`${styles['section-title']}`}>{courseName}</h1>
              )}
            </div>
            <div></div>
          </div>
        </section>
      )}

      {status === 1 && (
        <section className={`${styles['course-quick-links-section']}`}>
          <div className={`${styles['wrapper']}`}>
            {loading ? (
              <div className={`${styles['course-quick-links']}`}>
                <Skeleton className={`${styles['quick-links-skeleton']}`} radius="xl" />
                <Skeleton className={`${styles['quick-links-skeleton']}`} radius="xl" />
                <Skeleton className={`${styles['quick-links-skeleton']}`} radius="xl" />
                <Skeleton className={`${styles['quick-links-skeleton']}`} radius="xl" />
              </div>
            ) : (
              <div className={`${styles['course-quick-links']}`}>
                <a href="#overview">Course Overview</a>
                <a href="#why_this_course">Why this Course</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#faqs">FAQs</a>
              </div>
            )}
          </div>
        </section>
      )}

      <section className={`${styles['course-summary']}`}>
        <div className={`${styles['wrapper']}`}>
          <div className={`${styles['layout-grid']} ${styles['layout-grid--two-col']}`}>
            <div></div>
            <CampaignLeadForm onVisibilityChange={setIsLeadFormVisible} status={status} footerText={leadFormFooterText}></CampaignLeadForm>
          </div>
        </div>
      </section>

      {status === 1 && courseOverview && (
        <section id="overview" className={`${styles['section-wrapper']} ${styles['pb-0']}`}>
          <div className={`${styles['wrapper']}`}>
            {loading ? (
              <div>
                <Skeleton height={31} width="50%" radius="md" className={`${styles['mb-4']}`} />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </div>
            ) : (
              <div>
                <h2 className={`${styles['section-title']} ${styles['section-title--small']}`}>About this Course</h2>
                <div className={`${styles['article']}`} dangerouslySetInnerHTML={{ __html: courseOverview }}></div>
              </div>
            )}

          </div>
        </section>
      )}

      {status === 1 && courseUsps && (
        <section id="why_this_course" className={`${styles['section-wrapper']}`}>
          <div className={`${styles['wrapper']}`}>
            {loading ? (
              <div>
                <Skeleton height={31} width="50%" radius="md" className={`${styles['mb-4']}`} />
                <div className={`${styles['reasons-to-study-grid']}`}>
                  <Skeleton height={426} radius="md" />
                  <Skeleton height={426} radius="md" />
                  <Skeleton height={426} radius="md" />
                </div>
                <div className={`${styles['highlights-grid']}`}>
                  <Skeleton height={169} radius="md" />
                  <Skeleton height={169} radius="md" />
                  <Skeleton height={169} radius="md" />
                </div>
              </div>
            ) : (
              <div>
                <h2 className={`${styles['section-title']} ${styles['section-title--small']}`}>Why you should take this
                  course</h2>
                <CampaignReasons reasons={courseUsps}></CampaignReasons>
                <CampaignHighlights fee={courseFee} hours={courseHours}
                                    prospectus={courseProspectus}></CampaignHighlights>
              </div>
            )}
          </div>
        </section>
      )}

      {status === 1 && courseTestimonials && (
        <section id="testimonials" className={`${styles['section-wrapper']} ${styles['bg-light-red']}`}>
          <div className={`${styles['wrapper']}`}>
            {loading ? (
              <div>
                <Skeleton height={31} width="50%" radius="md" className={`${styles['mb-4']}`} />
                <Skeleton height={10} width="60%" radius="md" className={`${styles['mb-8']}`} />
                <div className={`${styles['layout-grid']} ${styles['layout-grid--two-col']}`}>
                  <div className={`${styles['video-wrapper']}`}>
                    <Skeleton height={433} radius="md" className={`${styles['mb-4']}`} />
                  </div>
                  <div>
                    <Skeleton height={8} radius="xl" />
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={16} width="200" radius="xl" />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className={`${styles['section-title']} ${styles['section-title--small']}`}>Testimonials</h2>
                <p className={`${styles['summary-text']}`}>Watch to learn about this course - Hear why people choose
                  ADMI for Creative Education</p>
                <CampaignTestimonials testimonials={courseTestimonials}></CampaignTestimonials>
              </div>
            )}
          </div>
        </section>
      )}

      {status === 1 && courseFaqs && (
        <section id="faqs" className={`${styles['section-wrapper']}`}>
          <div className={`${styles['wrapper']}`}>
            {loading ? (
              <div>
                <Skeleton height={31} width="50%" radius="md" className={`${styles['mb-4']}`} />
                <div className={`${styles['accordion']}`}>
                  <Skeleton height={104} radius="md" />
                  <Skeleton height={64} radius="md" />
                  <Skeleton height={64} radius="md" />
                </div>
              </div>
            ) : (
              <div>
                <h2
                  className={`${styles['section-title']} ${styles['section-title--small']} ${styles['mb-5']}`}>Frequently
                  Asked Questions</h2>
                <CampaignFaqs faqs={courseFaqs}></CampaignFaqs>
              </div>
            )}
          </div>
        </section>
      )}

      {status === 1 && (
        <section
          className={`${styles['section-wrapper']} ${styles['lead-form-cta']} ${styles['sticky-btn']} ${styles['sticky-btn--no-footer']} ${styles['sticky-btn--desktop-hidden']} ${isLeadFormVisible ? '' : styles['is-visible']}`}>
          <div className={`${styles['wrapper']} ${styles['text-center']}`}>
            <a href="#lead_form" className={`${styles['btn']} ${styles['btn-primary']} ${styles['btn-min-width']}`}>
              Get a call back</a>
          </div>
        </section>
      )}
    </CampaignLayout>
  );
}
