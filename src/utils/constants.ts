import ImageStudios from '@/assets/images/the-studios.svg';
import ImageSpaces from '@/assets/images/the-space.png';
import ImageLabs from '@/assets/images/the-labs.png';
import ImageEquipment from '@/assets/images/the-equipment.png';

import ImageStudentLife from '@/assets/images/student-life.svg';
import ImagePersonalCounseling from '@/assets/images/personal-counseling.svg';
import ImageCareerDevelopment from '@/assets/images/career-development.png';

// User Profiles
import ImageCaroline from '@/assets/images/carolyne-sila.svg';
import ImagePeter from '@/assets/images/peter-mwaniki.svg';
import ImageRaji from '@/assets/images/raji-ilangovan.svg';
import ImageCiku from '@/assets/images/ciku-munuku.svg';

import ImageLaila from '@/assets/images/laila-macharia.svg';
import ImageWilfred from '@/assets/images/wilfred-kiumi.svg';
import ImageMugo from '@/assets/images/mugo-kibati.svg';
import ImageRoss from '@/assets/images/ross-franks.svg';
import ImageChris from '@/assets/images/chris-foot.svg';
import ImageDave from '@/assets/images/dave-rono.svg';
import ImageIvy from '@/assets/images/ivy-nyambura.svg';
import ImageNicole from '@/assets/images/nicole-ochieng.svg';
import ImageAmani from '@/assets/images/amani-mugambi.svg';
import ImageSammy from '@/assets/images/sammy-kamande.svg';
import ImageAzyzah from '@/assets/images/azyzah-rehman.svg';
import ImageShalom from '@/assets/images/shalom-chihi.svg';
import ImageEvelyne from '@/assets/images/evelyne-makena.svg';
import ImageMary from '@/assets/images/mary-munene.svg';

import ImageTeddy from '@/assets/images/teddy-muinde.svg';
import ImageLinda from '@/assets/images/linda-wairegi.svg';
import ImageMichael from '@/assets/images/michael-kazinja.svg';
import ImageAlex from '@/assets/images/alex-mwangi.svg';
import ImageCedric from '@/assets/images/cedric-mwangi.svg';

// Icons
import IconBrowser from '@/assets/icons/Browser';
import IconDesktop from '@/assets/icons/Desktop';
import IconGraphUp from '@/assets/icons/GraphUp';
import IconMouse from '@/assets/icons/Mouse';
import IconSpinner from '@/assets/icons/Spinner';
import IconBook from '@/assets/icons/Book';
import IconSearch from '@/assets/icons/Search';
import IconShootingStar from '@/assets/icons/ShootingStar';
import IconHomeAlt from '@/assets/icons/HomeAlt';

import IconUnlock from '@/assets/icons/unlock.svg';
import IconStar from '@/assets/icons/star.svg';
import IconBicycle from '@/assets/icons/bicycle.svg';
import IconMapMarker from '@/assets/icons/map-marker-3.svg';
import IconBus from '@/assets/icons/bus.svg';
import IconCloudSun from '@/assets/icons/cloud-sun.svg';
import { IconPinned } from '@tabler/icons-react';
import IconUsersGroup from '@/assets/icons/UsersGroup';
import IconDashboardTabs from '@/assets/icons/DashboardTabs';
import IconEdit from '@/assets/icons/Edit';
import IconSettingGear from '@/assets/icons/SettingGear';
import IconDrawSquare from '@/assets/icons/DrawSquare';
import IconTopArrow from '@/assets/icons/TopArrow';
import IconCheckList from '@/assets/icons/CheckList';
import IconArrowCurved from '@/assets/icons/ArrowCurved';
import IconDiaryAlt from '@/assets/icons/DiaryAlt';
import IconGamepad from '@/assets/icons/Gamepad';
import IconTv from '@/assets/icons/Tv';
import IconTruckSpeed from '@/assets/icons/TruckSpeed';
import IconSoundwave from '@/assets/icons/Soundwave';
import IconMusic from '@/assets/icons/Music';
import IconHome from '@/assets/icons/Home';
import IconTripodCamera from '@/assets/icons/TripodCamera';
import IconCamera from '@/assets/icons/Camera';

export const ROUTES = {
  INDEX: '/',
  CAMPAIGNS: '/:country/:category/:campaign',
};

export const CALENDAR_DOWNLOAD_LINK =
  ' https://assets.ctfassets.net/qtu3mga6n6gc/2EeAdlCS9LfEiOPTfH74Z4/c8c4eb311dd97ed65e86fd76624e27ab/Calendar-2025.pdf';
export const CALENDAR_DOWNLOAD_NAME = 'ADMI-Calendar-2025.pdf';

export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://www.instagram.com/admiafrica/',
  LINKEDIN: 'https://www.linkedin.com/school/admiafrica/',
  FACEBOOK: 'https://www.facebook.com/ADMIAFRICA',
  TIKTOK: 'https://www.tiktok.com/@admiafrica',
  YOUTUBE: 'https://www.youtube.com/@ADMIafrica/',
  X: 'https://twitter.com/ADMIafrica',
};

export const ADMI_FACILITIES = [
  {
    name: 'The Studios',
    description:
      'Our campus has industry-standard audio and TV studios. The TV studio has a tracking floor with lighting grid, while the music studio has a vocal booth that doubles up as rehearsal space that can accommodate a full band. The control room is equipped with professional software, including ProTools and Logic, as well as...',
    image: ImageStudios,
  },
  {
    name: 'The Space',
    description:
      'The ADMI campus at Caxton House has ample space to enable you to learn under the most conducive environment. The facilities include classrooms, animation and graphics labs, TV and sound production studios, Mac and PC labs, a film equipment vault and a fully stocked digital library.',
    image: ImageSpaces,
  },
  {
    name: 'The Labs',
    description:
      'Our labs are fully equipped with both Mac and Pc computers and installed with industry-standard software, including Final Cut, Protools, Davinci Adobe Premier, Autodesk suite, Avid Composer and many more.',
    image: ImageLabs,
  },
  {
    name: 'The Equipment',
    description:
      'We pride ourselves on being one of the few regional film schools that teach in HD, digital film formats. During your first year, you will hone your skills using small HD camcorders, before progressing to high-end HD formats and digital cinema cameras from popular manufacturers like Sony, Canon, Panasonic & Black...',
    image: ImageEquipment,
  },
];

export const ADMI_HOMEPAGE_SECTORS = [
  {
    title: '2D and 3D animation',
    icon: IconHome,
    color: '#B9C601',
  },
  {
    title: 'Film & TV Production',
    icon: IconTripodCamera,
    color: '#F76335',
  },
  {
    title: 'Video Production',
    icon: IconCamera,
    color: '#01C6A5',
  },
  {
    title: 'Music Production',
    icon: IconMusic,
    color: '#F60834',
  },
  {
    title: 'Sound Engineering',
    icon: IconSoundwave,
    color: '#B9C601',
  },
  {
    title: 'Animation & Digital Media',
    icon: IconTruckSpeed,
    color: '#F76335',
  },
  {
    title: 'Graphic Design',
    icon: IconTv,
    color: '#01C6A5',
  },
  {
    title: 'Video Game Design',
    icon: IconGamepad,
    color: '#F60834',
  },
];

export const ADMI_ABOUT_SECTORS = [
  {
    title: '2D and 3D animation',
    icon: IconHome,
    color: '#B9C601',
  },
  {
    title: 'Video Production',
    icon: IconCamera,
    color: '#01C6A5',
  },
  {
    title: 'Graphic Design',
    icon: IconTv,
    color: '#F60934',
  },
  {
    title: 'Film & TV Production',
    icon: IconTripodCamera,
    color: '#F76335',
  },
  {
    title: 'Sound Engineering',
    icon: IconSoundwave,
    color: '#B9C601',
  },
];

export const ADMI_ACADEMIC_TEAM = [
  {
    name: 'Carolyne Sila',
    title: 'Head of School',
    linkedin: '',
    image: ImageCaroline,
  },
  {
    name: 'Peter Mwaniki',
    title: 'Academics',
    linkedin: '',
    image: ImagePeter,
  },
  {
    name: 'Raji Ilangovan',
    title: 'Student Programs',
    linkedin: '',
    image: ImageRaji,
  },
  {
    name: 'Ciku Munuku',
    title: 'Faculty Affairs',
    linkedin: '',
    image: ImageCiku,
  },
];

export const ADMI_DIRECTORS = [
  {
    name: 'Laila Macharia',
    title: 'Co-Founder & Chair',
    linkedin: '',
    image: ImageLaila,
  },
  {
    name: 'Wilfred Kiumi',
    title: 'Co-Founder',
    linkedin: '',
    image: ImageWilfred,
  },
  {
    name: 'Mugo Kibati',
    title: 'Director',
    linkedin: '',
    image: ImageMugo,
  },
  {
    name: 'Ross Franks',
    title: 'Director',
    linkedin: '',
    image: ImageRoss,
  },
  {
    name: 'Chris Foot',
    title: 'Director',
    linkedin: '',
    image: ImageChris,
  },
];

export const ADMI_HISTORY = [
  {
    year: 2011,
    achievements: [
      'Wiflred Kiumi establishes the Jamhuri Film and Television Academy(JFTA)',
      'JFTA opens in 2012 with 5 students',
    ],
  },
  {
    year: 2012,
    achievements: ['Film & TV classes begin', 'JFTA initiates first industry partnerships'],
  },
  {
    year: 2014,
    achievements: ['First ADMI campus established in Nairobi through a partnership with JFTA'],
  },
  {
    year: 2015,
    achievements: ['JFTA formally rebrands to ADMI.', 'Course offering deepens to 6 main courses.'],
  },
  {
    year: 2016,
    achievements: [
      'Student enrolment increases to over 150 students from 10 countries.',
      'ADMI expands to a new state-of-the-art campus in Nairobi CBD.',
    ],
  },
  {
    year: 2017,
    achievements: ['ADMI enrols its 250th student.', 'ADMI celebrates its 5th anniversary.'],
  },
  {
    year: 2018,
    achievements: ['ADMI enrols its 750th student.', 'ADMI enrols its 1,000th student.'],
  },
  {
    year: 2019,
    achievements: [
      'Revenues exceed $1M per year.',
      'AFD invests $1M in animation & gaming.',
      'ADMI partners with Rubika.',
    ],
  },
  {
    year: 2020,
    achievements: ['Blended learning begins.'],
  },
  {
    year: 2022,
    achievements: ['ADMI celebrates 10th anniversary.'],
  },
  {
    year: 2023,
    achievements: ['ADMI partners with GOYN.', 'ADMI partners with Google.org and DOT Kenya.'],
  },
];

export const ADMI_VALUES = [
  {
    id: 'global',
    name: 'Global',
    icon: IconBrowser,
    iconColor: '#F76335',
    description: [
      `By joining the ADMI community, you enjoy an exceptional international education benchmarking operations and pedagogy against global standards.`,
      `To ensure that your skills are globally marketable, we develop our curriculum in partnership with global industry partners and faculty recruited from leading international academic institutions. And best of all, you will learn alongside a diverse community that has hosted staff, faculty and students from over 27 different countries.`,
    ],
  },
  {
    id: 'practical',
    name: 'Practical',
    icon: IconMouse,
    iconColor: '#03C6A4',
    description: [
      `At the heart of our education is our innovative Learn-and-Work model. We ensure that our faculty are inductry practitioners, not academics, so that you as a student keep up to date on the latest practices and networks.`,
      `You also get access to high-end equipment, software and facilities just as you would in the workplace. And we work closely with employer partners to ensure that you get early industry exposure to start building your professional portfolio from day 1.`,
    ],
  },
  {
    id: 'digital',
    name: 'Digital',
    icon: IconDesktop,
    iconColor: '#F60934',
    description: [
      `ADMI aspires to be a paperless campus with the latest e-learning tools and state of the art computer labs at a 1:1 computer to student ratio.`,
      `As a student you can access financing from our patners to get industry -standard equipment through our Creative Toolbox Program.Our core faculty are all certified in online instruction, enabling them to deliver distance learning to the highest standards`,
    ],
  },
  {
    id: 'value-driven',
    name: 'Value Driven',
    icon: IconGraphUp,
    iconColor: '#871F00',
    description: [
      `ADMI is committed to a progressive and positive school atmosphere where our students and staff can thrive.`,
      `We strictly enforce ethical behavior on campus and apply global professional standards in all our interactions. To ensure that studens receive personalized attention, we offer string psycho-social support, including academic suport as well as progressive guidance counselling.`,
    ],
  },
  {
    id: 'transformational',
    name: 'Transformational',
    icon: IconSpinner,
    iconColor: '#B9C503',
    description: [
      `Want to see your child change before your eyes, from disengaged student to passionate professional?`,
      `ADMI is a selective and intimate school with a low teacher -to-student ratio allowing us to closely monitor individual student progress. This way, we strive to ensure that ADMI is a "defining experience" for each student, teacher and employee.`,
    ],
  },
];

export const ADMI_STUDENT_COUNCIL = [
  {
    name: 'Dave Rono',
    title: 'President',
    linkedin: '',
    image: ImageDave,
  },
  {
    name: 'Ivy Nyambura',
    title: 'Vice-President',
    linkedin: '',
    image: ImageIvy,
  },
  {
    name: 'Nicole Ochieng',
    title: 'Treasurer',
    linkedin: '',
    image: ImageNicole,
  },
  {
    name: 'Amani Mugambi',
    title: 'Secretary',
    linkedin: '',
    image: ImageAmani,
  },
  {
    name: 'Sammy Kamande',
    title: 'Organising Secretary',
    linkedin: '',
    image: ImageSammy,
  },
  {
    name: 'Azyzah Rehman',
    title: 'International Officer',
    linkedin: '',
    image: ImageAzyzah,
  },
  {
    name: 'Shalom Chihi',
    title: 'Council Member',
    linkedin: '',
    image: ImageShalom,
  },
];

export const ADMI_ACADEMIC_TEAM_MINIMAL = [
  {
    name: 'Raji Ilangovan',
    title: 'Student Programs',
    linkedin: '',
    image: ImageRaji,
  },
  {
    name: 'Evelyne Makena',
    title: 'Registrar',
    linkedin: '',
    image: ImageEvelyne,
  },
  {
    name: 'Mary Munene',
    title: 'Student Services',
    linkedin: '',
    image: ImageMary,
  },
];

export const ADMI_CAREER_ADVICE = [
  {
    title: 'Student Life',
    description: [
      {
        type: 'paragraph',
        content:
          'At ADMI, we believe that learning happens both inside and outside the classroom. That’s why we offer a vibrant student life program, including:',
      },
      {
        type: 'list',
        content: [
          'Student clubs and organizations',
          'Sports and recreational activities',
          'Cultural events and celebrations',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Our student life program helps you build friendships, develop leadership skills, and explore your interests beyond your studies.',
      },
    ],
    image: ImageStudentLife,
  },
  {
    title: 'Personal Counseling',
    description: [
      {
        type: 'paragraph',
        content:
          'We understand that school life can be challenging, both academically and personally. That’s why we offer confidential personal counselling services to help you navigate the ups and downs of student life. Our counsellors provide support for issues such as:',
      },
      {
        type: 'list',
        content: ['Stress management', 'Anxiety and depression', 'Relationship difficulties'],
      },
      {
        type: 'paragraph',
        content:
          'We also offer workshops and support groups on topics such as time management, stress reduction, and healthy relationships. You can always book a personal session with our counsellor at counsellor@admi.ac.ke',
      },
    ],
    image: ImagePersonalCounseling,
  },
  {
    title: 'Career Development',
    description: [
      {
        type: 'paragraph',
        content:
          'We believe that education is not just about acquiring knowledge, but also about preparing for the future. That’s why we offer a range of career development services, including:',
      },
      {
        type: 'list',
        content: [
          'Career counselling to help you explore your interests and options',
          'Resume and cover letter writing workshops',
          'Mock interviews and networking events',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Our strong partnerships with industry leaders ensure that you have access to internships and job opportunities upon graduation.',
      },
    ],
    image: ImageCareerDevelopment,
  },
];

export const ADMI_FINANCIAL_PLANNING = [
  {
    title: 'Fee Structure',
    description: 'content here',
  },
  {
    title: 'Paying your Fees',
    description: 'content here',
  },
  {
    title: 'Scholarships and Grants',
    description: 'content here',
  },
  {
    title: 'Contact Finance Office',
    description: 'content here',
  },
];

export const ADMI_INTERNATIONAL_STUDENTS = [
  {
    title: 'How to Apply',
    description: 'content here',
  },
  {
    title: 'Visa Requirements',
    description: 'content here',
  },
  {
    title: 'Accomodation',
    description: 'content here',
  },
  {
    title: 'International Student Community',
    description: 'content here',
  },
];

export const ADMI_STUDENT_SUPPORT = [
  {
    header:
      'Our commitment to your success is reflected in our innovative Learn-and-Work model, where you will learn from faculty who are industry practitioners, providing you with real-world insights and connections.',
    footer:
      'This approach not only enhances your learning experience but also prepares you for the competitive job market.',
  },
  {
    header:
      'Our vibrant campus community is designed to encourage collaboration and creativity. You will have access to state-of-the-art facilities and resources, ensuring that you have everything you need to succeed.',
    footer:
      'Whether you are facing academic challenges or seeking personal growth, our team is here to support you every step of the way.',
  },
  {
    header:
      'We believe that your education should be a defining experience—one that not only prepares you for a career but also shapes you into a well-rounded individual ready to make a positive impact in the world.',
    footer: 'Together, we will work towards unlocking your full potential and achieving your dreams.',
  },
];

export const ADMI_FELLOWSHIP_VALUES = [
  {
    id: 'global',
    name: 'Why Join Our Fellowship Program?',
    icon: IconPinned,
    iconColor: '#F76335',
    description: [
      `As a fellow at ADMI, you will have the unique opportunity to engage in meaningful work while gaining valuable experience in the field of digital media and education.`,
      `Our program is designed to foster professional growth and development, allowing you to collaborate with industry practitioners and educators who are dedicated to excellence in teaching and learning.`,
    ],
  },
  {
    id: 'practical',
    name: 'Who Can Apply',
    icon: IconPinned,
    iconColor: '#03C6A4',
    description: [
      `We welcome applications from individuals with a strong passion or education and  commitment to making a difference.`,
      `Whether you are a recent graduate, an experienced profesional, or someone loking to transition into academia, we encourage you to apply. Our fellowship program is open to candidates from diverse backgrounds, including international students, who can bring fresh perspectives and innovative ideas to our institution`,
    ],
  },
  {
    id: 'digital',
    name: 'How To Apply',
    icon: IconPinned,
    iconColor: '#F60934',
    description: [
      `If you are interested in joining our fellowship program, we invite you to express your interest by sending your CV and a cover letter detailing your background, the department you wish to cntribute to, and how your skills align with our mission to apply@admi.ac.ke .`,
      `Join us at ADMI and be part of  transformative educational experience that embraces diversity and fosters innovation. Your journey as a fellow could be he catalyst for change, both or you and the students you inspire! `,
    ],
  },
];

export const ADMI_FELLOWSHIP_DEPARTMENTS = [
  {
    id: 'global',
    name: 'Teaching & Curriculum Development',
    icon: IconBook,
    iconColor: '#01C6A5',
    description: [`Contribute to course design and delivery, bringing your expertise to the classroom.`],
  },
  {
    id: 'practical',
    name: 'Research and Innovation',
    icon: IconSearch,
    iconColor: '#F60834',
    description: [`Engage in research projects that advance knowledge in digital media and technology.`],
  },
  {
    id: 'digital',
    name: 'Student Support Services',
    icon: IconShootingStar,
    iconColor: '#E43B07',
    description: [`Assist in providing guidance and support to students, enhancing their educational experience.`],
  },
  {
    id: 'digital',
    name: 'Administrative Functions',
    icon: IconHomeAlt,
    iconColor: '#B9C601',
    description: [
      `Participate in the operational aspects of the institute, gaining insights into higher education management.`,
    ],
  },
];

export const ADMI_CAREER_VALUES = [
  {
    id: 'global',
    name: 'Impactful Teaching',
    icon: IconEdit,
    iconColor: '#F76335',
    description: [
      `At ADMI, you will have the chance to shape the minds of students and make a lasting impact on their careers. Your expertise and passion for teaching can help cultivate the skills and creativity of future leaders in the digital media landscape.`,
    ],
  },
  {
    id: 'practical',
    name: 'Collaborative Environment',
    icon: IconUsersGroup,
    iconColor: '#03C6A4',
    description: [
      `Join a community of like-minded professionals who share your commitment to education and innovation. Our collaborative environment encourages knowledge sharing, creativity, and professional growth.`,
    ],
  },
  {
    id: 'digital',
    name: 'Diverse Course Offerings',
    icon: IconDashboardTabs,
    iconColor: '#F60934',
    description: [
      `We offer a wide range of courses in digital media, including film, animation, graphic design, and more. If you have a particular area of expertise or a course you are passionate about teaching, we want to hear from you!`,
    ],
  },
];

export const ADMI_ACCREDITATION_VALUES = [
  {
    id: 'global',
    name: 'Quality Assurance',
    icon: IconSettingGear,
    description: [
      `Our accreditation ensures that you receive a high-quality education that meets international standards, giving you confidence in your qualifications.`,
    ],
  },
  {
    id: 'practical',
    name: 'Global Recognition',
    icon: IconDrawSquare,
    description: [
      `With Pearson Assured and Woolf University accreditation, your qualifications will be recognized by employers and educational institutions around the world, opening doors to further studies and career opportunities.`,
    ],
  },
  {
    id: 'digital',
    name: 'Continuous Improvement',
    icon: IconTopArrow,
    description: [
      `Our commitment to quality means that we continually assess and improve our programs to meet the evolving needs of the digital media industry.`,
    ],
  },
];

export const ADMI_FELLOWSHIPS = [
  {
    id: 'global',
    name: 'Pearson Assured Status',
    icon: IconBook,
    iconColor: '#F76335',
    description: [
      `Achieving Pearson Assured status means that ADMI has undergone a thorough evaluation of our quality management systems. This independent verification process ensures that our programs deliver consistent, high-quality education to all learners.`,
      `As a Pearson Assured institution, we are able to offer certificates that carry the Pearson logo, enhancing the credibility of your qualifications and providing assurance to employers and educational institutions worldwide`,
    ],
  },
  {
    id: 'practical',
    name: 'Partnership with Woolf University',
    icon: IconSearch,
    iconColor: '#03C6A4',
    description: [
      `In addition to our Pearson Assured status, we are excited to announce our new partnership with Woolf University, which serves as our accreditation partner. `,
      `This collaboration strengthens our commitment to providing a world-class education and ensures that our programs align with international standards. Woolf University’s accreditation will further enhance the recognition of our qualifications, allowing our graduates to pursue opportunities both locally and abroad.`,
    ],
  },
];

export const ADMI_ACADEMIC_PATHWAYS = [
  {
    id: 'global',
    name: 'Articulation Agreements',
    icon: IconDiaryAlt,
    iconColor: '#03C6A4',
    description: [
      `ADMI has established articulation agreements with reputable universities around the globe, ensuring that our qualifications are recognized and aligned with international standards. One such partnership is with Full Sail University in the United States, where our graduates can transfer credits and continue their education in digital cinematography programs.`,
    ],
  },
  {
    id: 'practical',
    name: 'Alignment with KNQF',
    icon: IconCheckList,
    iconColor: '#F76335',
    description: [
      `Our academic programs are designed to meet the standards set by the Kenya National Qualifications Framework (KNQF), which is recognized both locally and internationally. By aligning our qualifications with the KNQF, we ensure that our students can seamlessly progress through the education system, whether they choose to study in Kenya or abroad.`,
    ],
  },
  {
    id: 'practical',
    name: 'Accreditation by Woolf University',
    icon: IconSettingGear,
    iconColor: '#F1FE37',
    description: [
      `Our quality assurance and articulation (credit transfer) arrangement with Woolf University guarantees full recognition of your ADMI diploma towards a university degree in Europe under the European Credit Transfer System (ECTS).`,
    ],
  },
  {
    id: 'practical',
    name: 'Pathways to Further Education',
    icon: IconArrowCurved,
    description: [
      `Our academic pathways are designed to provide our students with a smooth transition to further their studies, both locally and internationally. Whether you aspire to pursue a bachelor’s degree, a master’s program, or a professional qualification, ADMI’s partnerships with institutions like Full Sail University and Woolf University ensure that you have access to a wide range of options.`,
    ],
  },
];

export const ADMI_ALUMNI = [
  {
    name: 'Teddy Muinde',
    title: 'Audio Visual Technician at MSC Cruises',
    linkedin: '',
    image: ImageTeddy,
  },
  {
    name: 'Linda Wairegi',
    title: 'Multimedia Project Manager at inABLE',
    linkedin: '',
    image: ImageLinda,
  },
  {
    name: 'Michael Kazinja',
    title: 'Television Producer & Scriptwriter',
    linkedin: '',
    image: ImageMichael,
  },
  {
    name: 'Alex Mwangi',
    title: 'Creative Director at Sensorflick',
    linkedin: '',
    image: ImageAlex,
  },
  {
    name: 'Cedric Mwangi',
    title: 'Sound Technician at MSC Cruises',
    linkedin: '',
    image: ImageCedric,
  },
];

export const ADMI_ACCOMODATION_FEATURES = [
  {
    title: 'Safe and Secure Living',
    description:
      'Your safety is our top priority. Both Qwetu and Qejani provide 24/7 security personnel and access control systems, ensuring that you can live and study in a secure environment. You can rest easy knowing that you are part of a community that values your safety and well-being.',
    icon: IconUnlock,
  },
  {
    title: 'Comfortable Amenities',
    description:
      'Each residence is equipped with modern facilities designed to enhance your living experience. Enjoy high-speed Wi-Fi throughout the premises, allowing you to stay connected for both academic and personal needs. Well-furnished lounges and study areas create an ideal atmosphere for learning, collaboration, and relaxation.',
    icon: IconStar,
  },
  {
    title: 'Fitness and Recreation',
    description:
      'Staying active is important for maintaining a balanced lifestyle. Both Qwetu and Qejani feature on-site gyms and recreational spaces, providing you with the opportunity to engage in physical activities, unwind, and socialize with fellow students. Whether you prefer working out or simply relaxing with friends, you’ll find plenty of options to keep you engaged.',
    icon: IconBicycle,
  },
  {
    title: 'Convenient Location',
    description:
      'One of the biggest advantages of living at Qwetu or Qejani is their proximity to campus. Both residences are strategically located just a short distance from ADMI, making it easy for you to attend classes, participate in campus activities, and enjoy the vibrant student life that our institute offers. ',
    icon: IconMapMarker,
  },
  {
    title: 'Transportation Services',
    description:
      'Qwetu offers a convenient transportation service to and from campus, making your daily commute hassle-free. With free bus shuttles available for residents, you can easily travel to and from ADMI, ensuring you arrive on time for classes and activities without the stress of navigating traffic or finding parking.',
    icon: IconBus,
  },
  {
    title: 'Sustainable Living',
    description:
      'We are committed to promoting sustainable practices, and both Qwetu and Qejani share this vision. Enjoy access to borehole water and other eco-friendly initiatives that support sustainable living. This commitment not only benefits the environment but also enhances your living experience.',
    icon: IconCloudSun,
  },
];
