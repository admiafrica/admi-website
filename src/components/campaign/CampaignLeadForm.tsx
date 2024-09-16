import React, { useRef, useState } from 'react';
import { Button, Modal } from '@mantine/core';
import IntlTelInput from 'intl-tel-input/reactWithUtils';
import 'intl-tel-input/build/css/intlTelInput.css';
import logo from '@/assets/logo.svg';
import successIcon from '../../assets/images/success-icon.svg';
import Image from 'next/image';

export default function CampaignLeadForm() {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState<string | null>(null);
  const [courseName, setCourseName] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState({});
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const phoneInputRef = useRef(null);

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

    if (!isValid) {
      newErrors.phone = 'Enter a valid phone number';
    }

    // Validate course selection
    if (!courseName) newErrors.courseName = 'Please select a course';

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
        setPhone('');
        setCourseName('');

        if (phoneInputRef.current) {
          const phoneInputElem = phoneInputRef.current?.querySelector('.iti__tel-input');
          if (phoneInputElem) {
            phoneInputElem.value = '';
          }
        }

        setLoading(false);
      }, 1000);
    }
  };


  return (
    <div>
      <form id="lead_form" className="lead-form" onSubmit={handleSubmit}>
        <div className="lead-form__content">
          <h2 className="section-title section-title--small">Enquiry Form</h2>
          <p>Please tell us the course you are interested in.</p>

          <div className="form-group">
            <label className="field-label" htmlFor="email">
              Email <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              className={`form-field ${errors.email ? 'error' : ''}`}
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <span className="field-error">{errors.email}</span>
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="fname">
              First Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              className={`form-field ${errors.fname ? 'error' : ''}`}
              id="fname"
              name="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="Enter your first name"
            />
            <span className="field-error">{errors.fname}</span>
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="lname">
              Last Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              className={`form-field ${errors.lname ? 'error' : ''}`}
              id="lname"
              name="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              placeholder="Enter your last name"
            />
            <span className="field-error">{errors.lname}</span>
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="phone">
              Phone number <span className="required-asterisk">*</span>
            </label>

            <div ref={phoneInputRef} className={`intl-tel-input-wrapper ${errors.phone ? 'error' : ''}`}>
              <IntlTelInput
                onChangeNumber={setPhone}
                onChangeValidity={setIsValid}
                initOptions={{
                  initialCountry: 'auto',
                  geoIpLookup: callback => {
                    fetch('https://ipapi.co/json')
                      .then(res => res.json())
                      .then(data => callback(data.country_code))
                      .catch(() => callback('ke'));
                  },
                  strictMode: true,
                  separateDialCode: true,
                }}
              />
            </div>
            <span className="field-error">{errors.phone}</span>
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="course_name">
              I am interested in this course <span className="required-asterisk">*</span>
            </label>
            <div className={`styled-select ${errors.courseName ? 'error' : ''}`}>
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
            <span className="field-error">{errors.courseName}</span>
          </div>

          <Button type="submit" id="lead_form_btn" loading={loading} className="btn btn-primary btn-xs-block">Get a call
            back</Button>

          <div className="mt-4">
          <span className="text-red text-size-14">
            <strong>Hurry, September 2024 Intake Ongoing!</strong>
          </span>
          </div>
        </div>
      </form>

      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <div className="thank-you-card">
          <div className="thank-you-card--icon">
            <img fetchPriority="high" src={successIcon} width="100" height="100"
                 alt="Success" />
          </div>
          <h1 className="section-title section-title--small">Thank you!</h1>
          <p>Thank you for your enquiry. Our team will reach out with more information about our courses.</p>
          <a href="https://admi.africa/" className="btn btn-primary">Back to our website</a>

          <a href="https://admi.africa" className="site-logo">
            <Image src={logo} alt={'ADMI'} width={90} height={90} fetchPriority={high}></Image>
          </a>
        </div>
      </Modal>
    </div>
  );
}
