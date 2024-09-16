import { useEffect, useState } from 'react';
import { CampaignLayout } from '@/layouts/CampaignLayout';
import { CampaignBanner } from '@/components/campaign';
import { CampaignLeadForm } from '@/components/campaign';
import courseImage from '@/assets/images/course-banner.webp';
import styles from '@/assets/css/main.module.css';

export function CampaignsPage() {
  const [bannerSrc, setBannerSrc] = useState(courseImage);
  const [bannerAlt, setBannerAlt] = useState('Course image');

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
            <CampaignLeadForm></CampaignLeadForm>
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
          <h2 className={`${styles['section-title']} ${styles['section-title--small']}`}>Why you should take this course</h2>


        </div>
      </section>

    </CampaignLayout>
  );
}