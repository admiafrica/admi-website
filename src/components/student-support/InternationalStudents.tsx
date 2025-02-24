import { Box } from '@mantine/core';
import { Paragraph, Title } from '../ui';
import { CollapsibleContent } from '../shared/v3';

export default function InternationalStudents() {

  return (
    <Box className="w-full">
      <CollapsibleContent
        key={`finance-plan-1`}
        title="How to Apply"
        content={
          <Paragraph>
            In order to study at ADMI, students are required to ensure they have the correct legal documentation,
            inclusive of visa requirements. For international students, this includes obtaining the relevant student
            visa. For full guidelines, please visit the Visa Requirements section.
          </Paragraph>
        }
      />
      <CollapsibleContent
        key={`finance-plan-2`}
        title="Visa Requirements"
        content={
          <Box className="w-full">
            <Paragraph className="mb-6">
              In order to study at ADMI, students are required to ensure they have the correct legal documentation,
              inclusive of visa requirements. For international students, this includes obtaining the relevant student
              visa. Below are the guidelines for the international student visa application process.
            </Paragraph>

            <Paragraph className="mb-6">
              ADMI is proud to attract students from around the world. This guide is designed to help international
              students understand how to apply for an international student visa in Kenya. While we do not process or
              pay for international student visas, we hope the following information makes the student pass application
              process as smooth as possible.
            </Paragraph>

            <Paragraph className="mb-6 italic">
              Please note: ADMI is legally required to inform the Directorate of Immigration and Registration of Persons
              Office when a student discontinues his/her studies at ADMI, regardless of the reason. As a result, if a
              student is dropped from their programme due to poor academic performance, poor attendance or indiscipline,
              ADMI will immediately inform the Immigration Office.
            </Paragraph>

            <Title label="Step 1: International students apply to ADMI" color="black" size="20px" />
            <ul>
              <li>
                <Paragraph>
                  International students can apply to one of ADMI’s programmes online: ADMI application-form
                </Paragraph>
              </li>
              <li>
                <Paragraph>
                  Prior to applying to ADMI, please familiarise yourself with our international fee policies: Fees
                  structures
                </Paragraph>
              </li>
            </ul>

            <Title label="Step 2: ADMI sends supporting documents for visa application" color="black" size="20px" />
            <ul>
              <li>
                <Paragraph>Successful applicants receive a letter of admission.</Paragraph>
              </li>
              <li>
                <Paragraph>
                  They will also receive a letter of support or a cover letter, addressed to the Director of
                  Immigration, indicating the name and duration of the course to be studied – both new and renewal
                  applications.
                </Paragraph>
              </li>
              <li>
                <Paragraph>
                  Both of these letters will support international students in applying for their international student
                  visa.
                </Paragraph>
              </li>
            </ul>

            <Title label="Step 3: Apply online for an International Student Visa" color="black" size="20px" />
            <ul>
              <li>
                <Paragraph className="mb-6">
                  Register at https://immigration.ecitizen.go.ke/, then log in at https://fns.immigration.go.ke/ and
                  complete the application form (titled Form 30).
                </Paragraph>
              </li>
              <li>
                <Paragraph>Please note: incomplete applications will not be processed.</Paragraph>
              </li>
            </ul>

            <Title
              label="Step 4: ADMI Head of Academics or Principal signs/stamps completed form"
              color="black"
              size="20px"
            />
            <ul>
              <li>
                <Paragraph className="mb-6">
                  Print and fill out all details on Form 30 (student pass application form) from the following website:
                  students-pass
                </Paragraph>
              </li>
              <li>
                <Paragraph>
                  Your completed form should then be scanned and emailed to ADMI at info@admi.ac.ke, to be signed and
                  stamped by our Principal or Head of Academics.
                </Paragraph>
              </li>
            </ul>

            <Title label="Step 5: Prepare all documents and attachments" color="black" size="20px" />
            <Paragraph>Collate the form and all necessary supporting documents, including:</Paragraph>
            <ul>
              <li>
                <Paragraph className="mb-6">
                  Signed commitment letter from the sponsor – both new and renewal cases
                </Paragraph>
              </li>
              <li>
                <Paragraph>National passport copy of the sponsor – both new and renewal cases</Paragraph>
              </li>
              <li>
                <Paragraph>Proof of funds for self-sponsored students – both new and renewal cases</Paragraph>
              </li>
              <li>
                <Paragraph>For minors, consent letter from the parent – both new and renewal cases</Paragraph>
              </li>
              <li>
                <Paragraph>
                  Copy of parent’s national passport and copy of birth certificate of the minor should be attached as
                  proof of relationship (for minors) – both new and renewal cases
                </Paragraph>
              </li>
              <li>
                <Paragraph>
                  Copy of a valid national passport – both new and renewal cases (the bio-data page)
                </Paragraph>
              </li>
              <li>
                <Paragraph>
                  Current immigration status for the pupil/student – both new and renewal cases (If already in the
                  country)
                </Paragraph>
              </li>
              <li>
                <Paragraph>Two recent passport-size colour photos – both new and renewal cases</Paragraph>
              </li>
              <li>
                <Paragraph>
                  Duly certified copies of basic academic certificates for those joining Tertiary Institutions and
                  Universities – new cases only
                </Paragraph>
              </li>
              <li>
                <Paragraph>
                  Documents in foreign languages should be translated into English by either the Embassy, Public Notary,
                  or authorized /recognized institution – both new and renewal cases
                </Paragraph>
              </li>
              <li>
                <Paragraph>
                  Copy of the school’s/college registration certificate from the Ministry of Education – new cases only
                </Paragraph>
              </li>
            </ul>

            <Title
              label="Step 6: Submit application to immigration offices"
              color="black"
              size="20px"
            />
            <ul>
              <li>
                <Paragraph className="mb-6">
                  Submit the complete form to immigration offices at Nyayo House, Alien Section, Counter Number 9 (full
                  address below).
                </Paragraph>
              </li>
              <li>
                <Paragraph>
                  Please note: Immigration might take up to two months to process your student pass or international
                  student visa. If more than two months lapse, please follow up with the immigration office.
                </Paragraph>
              </li>
            </ul>

            <Title label="Step 7: Processing" color="black" size="20px" />
            <Paragraph>
              Once your application has been received, you will receive a notification via email. The email will state
              whether your application was rejected or received. If it has been received, processing should start
              immediately. You will be told to wait again. This might take around three weeks.
            </Paragraph>

            <Title label="Step 8: Payment" color="black" size="20px" />
            <Paragraph>
              Once your applications have been approved, you will receive another notification. You should now log in to
              your portal and make a payment via M-pesa (Pay-Bill number 206206) or bank cheque (payable to PS Ministry
              of Interior and Coordination of National Government).
            </Paragraph>
            <ul>
              <li>
                <Paragraph className="mb-6">
                  International students can apply to one of ADMI’s programmes online: ADMI application-form
                </Paragraph>
              </li>
              <li>
                <Paragraph>
                  Prior to applying to ADMI, please familiarise yourself with our international fee policies: Fees
                  structures
                </Paragraph>
              </li>
            </ul>

            <Title label="Step 9: Provide proof of payment" color="black" size="20px" />

            <Paragraph className="mb-6">
              Print out the approval letter and attach the receipt payment. Take it to: The Director of Immigration
              Services Department of Immigration Offices Nyayo House 9th Floor, Kenyatta Avenue/Uhuru Highway P.O Box
              30191,000100 Nairobi Tel: +254-20-2222022, +254-20-2217544, +254-20-2218833 Email; dis@immigration.go.ke
              You will then be told to wait for the visa to be processed. This will take three weeks or so.
            </Paragraph>

            <Title label="Step 10: Collection" color="black" size="20px" />
            <ul>
              <li>
                <Paragraph className="mb-6">
                  Once your Visa has been processed, you will receive a notification by email.
                </Paragraph>
              </li>
              <li>
                <Paragraph>
                  Go back to the immigration offices at Nyayo House, Department of Immigration offices Ground Floor Room
                  16 and collect your Visa. On the same day, you should register as an alien.
                </Paragraph>
              </li>
            </ul>
            <Paragraph>
              For more information, please visit https://immigration.go.ke/work-permits-passes/students-pass/
            </Paragraph>
          </Box>
        }
      />
      <CollapsibleContent
        key={`finance-plan-3`}
        title="Accommodation"
        content={
          <Box>
            <Paragraph>
              ADMI has partnered with Qwetu and Qejani, private providers of modern student accommodation. Please book
              your room through their websites: https://qwetu.co.ke/ or https://qejani.co.ke/ Qwetu and Qejani are a new
              kind of student living experience, designed with you in mind. Both are the number one choice for student
              accommodation. Living with Qwetu or Qejani residences offers safe, secure and comfortable student housing
              with a vibrant community, near campus. Some facilities offered include Wifi, a gym, lounges, security, and
              borehole water, among other amenities that ensure a pleasing study environment for young scholars.
            </Paragraph>
            <Paragraph fontWeight={900} className="mt-8">
              Use the Referral Code: STU-0016368
            </Paragraph>
          </Box>
        }
      />
      <CollapsibleContent
        key={`finance-plan-4`}
        title="International Student Community"
        content={
          <Paragraph>
            ADMI is a truly global institution, offering an exceptional education delivered to international standards.
            As an ADMI alumnus, you&apos;ll be part of a global community that spans over 2,000 students from more than 27
            countries, including Kenya, Uganda, Tanzania, Rwanda, Brazil, Burundi, DRC, Ethiopia, South Sudan, Benin,
            Ghana, Liberia, Nigeria, Cote d&apos;Ivoire, Malawi, Mexico, Sudan, India, Germany, Zambia, Hungary, Bangladesh,
            Cameroon, the Netherlands, the United Kingdom, and the United States. At ADMI, international students are
            fully integrated into the student community and supported throughout their journey. The Student Council
            plays a vital role in ensuring that every student&apos;s voice is heard, and it includes a dedicated
            International Officer who represents the needs of international students. Through the Student Council,
            students can engage in leadership, shape campus life, and advocate for their peers. Each class elects a
            representative to participate in the Student Executive Council, fostering a strong community across all
            programs. This council is committed to helping students transition smoothly into ADMI, creating a supportive
            and inclusive environment. By joining ADMI, you&apos;ll receive a world-class education and become part of a
            diverse, dynamic, and globally connected community.
          </Paragraph>
        }
      />
    </Box>
  );
}
