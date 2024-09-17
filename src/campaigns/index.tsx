import { useEffect, useState } from 'react';
import { CampaignLayout } from '@/layouts/CampaignLayout';
import {
  CampaignBanner,
  CampaignFaqs,
  CampaignHighlights,
  CampaignLeadForm,
  CampaignReasons,
  CampaignTestimonials,
} from '@/components/campaign';
import courseImage from '@/assets/images/course-banner.webp';
import styles from '@/assets/css/main.module.css';

export function CampaignsPage() {
  const [bannerSrc, setBannerSrc] = useState(courseImage);
  const [bannerAlt, setBannerAlt] = useState('Course image');
  const [isLeadFormVisible, setIsLeadFormVisible] = useState(false);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchImageData = async () => {
      try {
        // Fetch image data from API (replace with actual API)
        const response = await fetch('https://example.com/api/image');
        const data = await response.json();

        // Set image src and alt from the API response
        setBannerSrc(data.course_image);
        setBannerAlt(data.course_name);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, []);

  // Dummy data for FAQs
  const faqsData = [
    {
      title: 'What does the Certificate in Entertainment Business cover?',
      description: 'This course covers a wide range of topics including event planning, entertainment marketing, and business management strategies.',
    },
    {
      title: 'How long is the course?',
      description: 'The course duration is 6 months, with flexible learning options including online and part-time classes.',
    },
    {
      title: 'What are the admission requirements?',
      description: 'The admission requirements include a high school diploma and a passion for the entertainment industry.',
    },
  ];

  // Dummy data for Reasons
  const reasonsData = [
    {
      image: 'https://ddasf3j8zb8ok.cloudfront.net/admi/images/entertainment.svg',
      title: 'Master the Business of Entertainment',
      description: 'Gain a comprehensive understanding of the entertainment industry\'s structure, key sectors, and major\n' +
        '            players. This course provides you with the essential business and management skills needed to thrive in the\n' +
        '            fast-paced world of entertainment, particularly in emerging markets.',
    },
    {
      image: 'https://ddasf3j8zb8ok.cloudfront.net/admi/images/knowledge.svg',
      title: 'Stay Ahead with Cutting-Edge Knowledge',
      description: 'Learn the latest trends in digital media and emerging technologies, such as online streaming, social media,\n' +
        '            virtual reality, and augmented reality. Equip yourself with the tools to navigate and leverage these\n' +
        '            advancements, ensuring you remain at the forefront of the entertainment industry.',
    },
    {
      image: 'https://ddasf3j8zb8ok.cloudfront.net/admi/images/impact.svg',
      title: 'Real world Application for Immediate Impact',
      description: 'Apply your theoretical knowledge to real-world scenarios through case studies and practical assignments.\n' +
        '            This hands-on approach prepares you to tackle the unique challenges of the entertainment business, from\n' +
        '            talent management to audience engagement, ensuring you\'re industry-ready upon graduation.',
    },
  ];

  return (
    <CampaignLayout>
      <CampaignBanner src={bannerSrc as string} alt={bannerAlt}></CampaignBanner>

      <section id="course" className={`${styles['section-wrapper']} ${styles['pb-0']}`}>
        <div className={`${styles['wrapper']}`}>
          <div className={`${styles['layout-grid']} ${styles['layout-grid--two-col']}`}>
            <h1 className={`${styles['section-title']}`}>Entertainment Business Certificate</h1>
          </div>
          <div></div>
        </div>
      </section>

      <section className={`${styles['course-quick-links-section']}`}>
        <div className={`${styles['wrapper']}`}>
          <div className={`${styles['course-quick-links']}`}>
            <a href="#overview">Course Overview</a>
            <a href="#why_this_course">Why this Course</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#faqs">FAQs</a>
          </div>
        </div>
      </section>

      <section className={`${styles['course-summary']}`}>
        <div className={`${styles['wrapper']}`}>
          <div className={`${styles['layout-grid']} ${styles['layout-grid--two-col']}`}>
            <div></div>
            <CampaignLeadForm onVisibilityChange={setIsLeadFormVisible}></CampaignLeadForm>
          </div>
        </div>
      </section>

      <section id="overview" className={`${styles['section-wrapper']} ${styles['pb-0']}`}>
        <div className={`${styles['wrapper']}`}>
          <h2 className={`${styles['section-title']} ${styles['section-title--small']}`}>About this Course</h2>
          <div className={`${styles['article']}`}>
            <p>The Entertainment Business Certificate course at Africa Digital Media Institute aims to equip students
              with essential business and management skills directly applicable to the entertainment industry in
              emerging markets. Through comprehensive modules, students will gain a deep understanding of entertainment
              business principles, preparing them for careers as managers, entrepreneurs and industry leaders. You'll
              learn about various aspects of the industry, from business fundamentals to specific entertainment sector
              knowledge, preparing you for a successful career in the entertainment world. The curriculum is structured
              to cover both theoretical concepts and practical applications.<br />
              COURSE DURATION: The course will run for 12 Weeks.</p>
          </div>
        </div>
      </section>

      <section id="why_this_course" className={`${styles['section-wrapper']}`}>
        <div className={`${styles['wrapper']}`}>
          <h2 className={`${styles['section-title']} ${styles['section-title--small']}`}>Why you should take this
            course</h2>

          <CampaignReasons reasons={reasonsData}></CampaignReasons>
          <CampaignHighlights fee={'50000'} hours={'1200'} prospectus={'#'}></CampaignHighlights>
        </div>
      </section>

      <section id="testimonials" className={`${styles['section-wrapper']} ${styles['bg-light-red']}`}>
        <div className={`${styles['wrapper']}`}>
          <h2 className={`${styles['section-title']} ${styles['section-title--small']}`}>Testimonials</h2>
          <p className={`${styles['summary-text']}`}>Watch to learn about this course - Hear why people choose ADMI for
            Creative Education</p>
          <CampaignTestimonials
            video={'https://www.youtube.com/embed/HyxBygOmAgA'}
            description={'<p>"Welcome to ADMI\'s Certificate in Entertainment Business program. As a course leader with years of\n' +
              '            experience in the entertainment industry, I\'m excited to guide you on this journey. Our goal is to help you\n' +
              '            develop the business acumen and strategic thinking needed to succeed in the entertainment world. In this\n' +
              '            program, you\'ll learn not just the theoretical aspects of the entertainment business, but also practical\n' +
              '            skills that you can apply immediately. You\'ll develop your analytical and creative abilities while mastering\n' +
              '            the technical aspects needed to thrive in this dynamic field. I look forward to seeing you transform into a\n' +
              '            skilled entertainment business professional ready to make an impact in the industry."</p>'}
            author={'Barrack Bukusi'}
          ></CampaignTestimonials>
        </div>
      </section>

      <section id="faqs" className={`${styles['section-wrapper']}`}>
        <div className={`${styles['wrapper']}`}>
          <h2 className={`${styles['section-title']} ${styles['section-title--small']} ${styles['mb-5']}`}>Frequently Asked Questions</h2>
          <CampaignFaqs faqs={faqsData}></CampaignFaqs>
        </div>
      </section>

      <section
        className={`${styles['section-wrapper']} ${styles['lead-form-cta']} ${styles['sticky-btn']} ${styles['sticky-btn--no-footer']} ${styles['sticky-btn--desktop-hidden']} ${isLeadFormVisible ? '' : styles['is-visible']}`}>
        <div className={`${styles['wrapper']} ${styles['text-center']}`}>
          <a href="#lead_form" className={`${styles['btn']} ${styles['btn-primary']} ${styles['btn-min-width']}`}>Get a
            call back</a>
        </div>
      </section>

    </CampaignLayout>
  );
}