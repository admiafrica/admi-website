import styles from '@/assets/css/main.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from '@mantine/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '@/assets/logo.svg';
import successIcon from '@/assets/images/success-icon.svg';
import Image from 'next/image';

export default function CampaignLeadForm({ onVisibilityChange, status, footerText }) {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [courseName, setCourseName] = useState('');
  const [errors, setErrors] = useState({});
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('ke');
  const leadFormBtnRef = useRef(null);

  // Auto-detect the country based on IP when the component mounts
  useEffect(() => {
    const leadFormBtn = leadFormBtnRef.current;

    const handler = (entries) => {
      // Notify the parent component of visibility status
      if (!entries[0].isIntersecting) {
        onVisibilityChange(false);
      } else {
        onVisibilityChange(true);
      }
    };

    const observer = new window.IntersectionObserver(handler);
    if (leadFormBtn) {
      observer.observe(leadFormBtn);
    }

    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setCountryCode(data.country.toLowerCase()); // Set the detected country code
      } catch (error) {
        console.error('Error detecting country:', error);
      }
    };

    detectCountry();

    return () => {
      if (leadFormBtn) {
        observer.unobserve(leadFormBtn);
      }
    };
  }, [onVisibilityChange]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) newErrors.email = 'Enter a valid email';

    // Validate first name
    if (!fname) newErrors.fname = 'First name is required';

    // Validate last name
    if (!lname) newErrors.lname = 'Last name is required';

    // Validate phone number
    if (!phone || phone.length <= 4) newErrors.phone = 'Phone number is required';

    // Validate course selection
    if (status === 0 && !courseName) newErrors.courseName = 'Please select a course';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
    } else {
      setErrors({});

      //Submit form
      setTimeout(() => {
        setOpened(true);
        setEmail('');
        setFname('');
        setLname('');
        setPhone(countryCode);
        setCountryCode(countryCode);
        setCourseName('');
        setLoading(false);
      }, 1000);
    }
  };


  return (
    <div>
      <form id="lead_form" className={`${styles['lead-form']} ${status === 1 ? '' : styles['no-course']}`} onSubmit={handleSubmit}>
        <div className={`${styles['lead-form__content']}`}>
          <h2 className={`${styles['section-title']} ${styles['section-title--small']}`}>Enquiry Form</h2>
          {status === 0 ? (
            <p>Please tell us the course you are interested in.</p>
          ) : (
            <p>Fill in your details and our team will get in touch with you.</p>
          )}

          <div className={`${styles['form-group']}`}>
            <label className={`${styles['field-label']}`} htmlFor="email">
              Email <span className={`${styles['required-asterisk']}`}>*</span>
            </label>
            <input
              type="text"
              className={`${styles['form-field']} ${errors.email ? styles['error'] : ''}`}
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <span className={`${styles['field-error']}`}>{errors.email}</span>
          </div>

          <div className={`${styles['form-group']}`}>
            <label className={`${styles['field-label']}`} htmlFor="fname">
              First Name <span className={`${styles['required-asterisk']}`}>*</span>
            </label>
            <input
              type="text"
              className={`${styles['form-field']} ${errors.fname ? styles['error'] : ''}`}
              id="fname"
              name="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="Enter your first name"
            />
            <span className={`${styles['field-error']}`}>{errors.fname}</span>
          </div>

          <div className={`${styles['form-group']}`}>
            <label className={`${styles['field-label']}`} htmlFor="lname">
              Last Name <span className={`${styles['required-asterisk']}`}>*</span>
            </label>
            <input
              type="text"
              className={`${styles['form-field']} ${errors.lname ? styles['error'] : ''}`}
              id="lname"
              name="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              placeholder="Enter your last name"
            />
            <span className={`${styles['field-error']}`}>{errors.lname}</span>
          </div>

          <div className={`${styles['form-group']}`}>
            <label className={`${styles['field-label']}`} htmlFor="phone">
              Phone number <span className={`${styles['required-asterisk']}`}>*</span>
            </label>

            <PhoneInput
              country={countryCode}
              enableSearch={true}
              disableSearchIcon={true}
              countryCodeEditable={false}
              inputClass={`${styles['phone-field']} ${errors.phone ? styles['error'] : ''}`}
              buttonClass={`${styles['phone-field-dropdown']} ${errors.phone ? styles['error'] : ''}`}
              searchClass={`${styles['phone-field-search']}`}
              value={phone}
              onChange={setPhone}
            />

            <span className={`${styles['field-error']}`}>{errors.phone}</span>
          </div>

          {status === 0 && (
            <div className={`${styles['form-group']}`}>
              <label className={`${styles['field-label']}`} htmlFor="course_name">
                I am interested in this course <span className={`${styles['required-asterisk']}`}>*</span>
              </label>
              <div className={`${styles['styled-select']} ${errors.courseName ? styles['error'] : null}`}>
                <select
                  id="course_name"
                  name="course_name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                >
                  <option disabled="disabled" value="">
                    Select
                  </option>
                  <option value="1">Graphic Design Diploma</option>
                  <option value="2">Graphic Design Certificate</option>
                  <option value="3">Sound Engineering Diploma</option>
                  <option value="4">Music Production & Sound Engineering Certificate</option>
                  <option value="5">Film and Television Production Diploma</option>
                </select>
              </div>
              <span className={`${styles['field-error']}`}>{errors.courseName}</span>
            </div>
          )}

          <Button
            type="submit"
            id="lead_form_btn"
            loading={loading}
            ref={leadFormBtnRef}
            className={`${styles['btn']} ${styles['btn-primary']} ${styles['btn-xs-block']}`}
          >Get a call back
          </Button>

          {status === 1 && footerText && (
            <div className={`${styles['mt-4']}`}>
              <span className={`${styles['text-red']} ${styles['text-size-14']}`}>
                <strong>{footerText}</strong>
              </span>
            </div>
          )}
        </div>
      </form>

      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <div className={`${styles['thank-you-card']}`}>
          <div className={`${styles['thank-you-card--icon']}`}>
            <Image fetchPriority="high" src={successIcon.src} alt="Success" width={100} height={100} />
          </div>
          <h1 className={`${styles['section-title']} ${styles['section-title--small']}`}>Thank you!</h1>
          <p>Thank you for your enquiry. Our team will reach out with more information about our courses.</p>
          <a href="https://admi.africa/" className={`${styles['btn']} ${styles['btn-primary']}`}>Back to our website</a>

          <a href="https://admi.africa" className={`${styles['site-logo']}`}>
            <Image src={logo.src} alt={'ADMI'} width={90} height={90}></Image>
          </a>
        </div>
      </Modal>
    </div>
  );
}
