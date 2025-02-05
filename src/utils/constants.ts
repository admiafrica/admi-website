import StudiosImage from '@/assets/images/the-studios.svg';
import SpacesImage from '@/assets/images/the-space.png';

// User Profiles
import ImageCaroline from '@/assets/images/caroline.png';
import ImagePeter from '@/assets/images/peter.png';
import ImageRaji from '@/assets/images/raji.png';
import ImageCiku from '@/assets/images/ciku.png';

import ImageLaila from '@/assets/images/laila.png';
import ImageWilfred from '@/assets/images/wilfred.png';
import ImageMugo from '@/assets/images/mugo.png';
import ImageRoss from '@/assets/images/ross.png';
import ImageChris from '@/assets/images/chris.png';

// Icons
import IconBrowser from '@/assets/icons/Browser';
import IconDesktop from '@/assets/icons/Desktop';
import IconGraphUp from '@/assets/icons/GraphUp';
import IconMouse from '@/assets/icons/Mouse';
import IconSpinner from '@/assets/icons/Spinner';

export const ROUTES = {
  INDEX: '/',
  CAMPAIGNS: '/:country/:category/:campaign',
};

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
    image: StudiosImage,
  },
  {
    name: 'The Space',
    description:
      'The ADMI campus at Caxton House has ample space to enable you to learn under the most conducive environment. The facilities include classrooms, animation and graphics labs, TV and sound production studios, Mac and PC labs, a film equipment vault and a fully stocked digital library.',
    image: SpacesImage,
  },
  {
    name: 'The Labs',
    description:
      'Our labs are fully equipped with both Mac and Pc computers and installed with industry-standard software, including Final Cut, Protools, Davinci Adobe Premier, Autodesk suite, Avid Composer and many more.',
    image: '',
  },
  {
    name: 'The Equipment',
    description:
      'We pride ourselves on being one of the few regional film schools that teach in HD, digital film formats. During your first year, you will hone your skills using small HD camcorders, before progressing to high-end HD formats and digital cinema cameras from popular manufacturers like Sony, Canon, Panasonic & Black...',
    image: '',
  },
];

export const ADMI_ACADEMIC_TEAM = [
  {
    name: 'Carolyne Sila',
    title: 'Head of School',
    image: ImageCaroline,
  },
  {
    name: 'Peter Mwaniki',
    title: 'Academics',
    image: ImagePeter,
  },
  {
    name: 'Raji Ilangovan',
    title: 'Student Programs',
    image: ImageRaji,
  },
  {
    name: 'Ciku Munuku',
    title: 'Faculty Affairs',
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
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
  },
  {
    year: 2015,
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
  },
  {
    year: 2016,
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
  },
  {
    year: 2017,
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
  },
  {
    year: 2018,
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
  },
  {
    year: 2019,
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
  },
  {
    year: 2020,
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
  },
  {
    year: 2021,
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
  },
  {
    year: 2022,
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
  },
  {
    year: 2023,
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
  },
  {
    year: 2024,
    achievements: ['First ADMI campus established in nairoi through a partnership with JFTA'],
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
      `ADMI is committed to a progressive and positive schol atmosphere where our students and staff can thrive.`,
      `We striuctly enforce ethical behavior on campus and apply global professional standards in all our interactions. To ensure that studens receive personalized attention, we offer string psycho-social support, including academic suport as well as progressive guidance counselling.`,
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
