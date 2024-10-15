import styles from '@/assets/css/main.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button } from '@mantine/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import apiClient from '@/utils/axiosClient';


type CampaignLeadFormProps = {
  onVisibilityChange: (visible: boolean) => void;
  status: number;
  footerText: string;
  course: string;
  intake: string;
};
interface FormData {
  student_email: string;
  student_first_name: string;
  student_last_name: string;
  student_phone_number: string;
  course_interested_in: string;
  intake?: string; // Optional
}
interface FormErrors {
  email?: string;
  fname?: string;
  lname?: string;
  phone?: string;
  courseName?: string;
}

export default function CampaignLeadForm({ onVisibilityChange, status, footerText, course, intake }: CampaignLeadFormProps) {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [courseName, setCourseName] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('ke');
  const [showAlert, setAlertVisibility] = useState(false);
  const [alertText, setAlertText] = useState('');
  const leadFormRef = useRef<HTMLFormElement | null>(null);
  const leadFormBtnRef = useRef(null);

  // Auto-detect the country based on IP when the component mounts
  useEffect(() => {
    const leadFormBtn = leadFormBtnRef.current;

    const handler: IntersectionObserverCallback = (entries) => {
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

  const addLead = async (formData: FormData) => {
    try {
      const response = await apiClient.post('/api/leads/add', formData);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error adding lead:', error);
      throw error; // Rethrow the error for further handling if necessary
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const formErrors = validateForm();


    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
    } else {
      setErrors({});

      const formData: FormData = {
        student_email: email,
        student_first_name: fname,
        student_last_name: lname,
        student_phone_number: phone,
        course_interested_in: course || courseName,
        ...(intake ? { intake } : {}),
      };
      try {
        await addLead(formData);
        setAlertVisibility(false);
        setAlertText('');
        setEmail('');
        setFname('');
        setLname('');
        setPhone(countryCode);
        setCountryCode(countryCode);
        setCourseName('');
        setLoading(false);
        window.location.href = '/craydel/thank-you';
      } catch (error) {
        if (leadFormRef.current) {
          leadFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setAlertVisibility(true);
        setAlertText('An error occurred while submitting. Please try again later.');
        setLoading(false);
      }
    }
  };


  return (
    <div>
      <form
        ref={leadFormRef}
        id="lead_form"
        className={`${styles['lead-form']} ${status === 1 ? '' : styles['no-course']}`}
        onSubmit={handleSubmit}
      >
        <div className={`${styles['lead-form__content']}`}>
          <h2 className={`${styles['section-title']} ${styles['section-title--small']}`}>Enquiry Form</h2>
          {status === 0 ? (
            <p>Please tell us the course you are interested in.</p>
          ) : (
            <p>Fill in your details and our team will get in touch with you.</p>
          )}

          {showAlert && (
            <Alert variant="light" color="red" title="Error" className="mb-4">
              {alertText}
            </Alert>
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

                  <option disabled value="">
                    Select
                  </option>
                  <optgroup label="Foundation Courses">
                    <option value="Photography Foundation Course">Photography</option>
                    <option value="Multimedia Foundation Course">Multimedia</option>
                    <option value="Music & Sound Production Foundation Course">Music & Sound Production</option>
                  </optgroup>
                  <optgroup label="Professional Courses">
                    <option value="Graphic Design (I, II, III) Professional Course">Graphic Design (I, II, III)</option>
                    <option value="Digital Marketing (I, II, III) Professional Course">Digital Marketing (I, II, III)
                    </option>
                    <option value="Videography Professional Course">Videography</option>
                  </optgroup>
                  <optgroup label="Diploma Courses">
                    <option value="Film & Television Production Diploma">Film & Television Production</option>
                    <option value="Graphic Design Diploma">Graphic Design</option>
                    <option value="Animation & Motion Graphics Diploma">Animation & Motion Graphics</option>
                    <option value="Music Production Diploma">Music Production</option>
                    <option value="Sound Engineering Diploma">Sound Engineering</option>
                    <option value="2D Animation Diploma">2D Animation</option>
                    <option value="Video Game Design & Development Diploma">Video Game Design & Development</option>
                  </optgroup>
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
    </div>
  );
}
