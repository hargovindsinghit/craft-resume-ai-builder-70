
import { Resume, User } from '@/types/resume';

export const mockUser: User = {
  id: 'user-1',
  email: 'demo@resumecraft.com',
  name: 'Demo User',
  resumes: [],
};

export const mockResumes: Resume[] = [
  {
    id: '1',
    title: 'Software Engineer Resume',
    template: 'modern',
    personalInfo: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev',
      summary: 'Experienced software engineer with 5+ years developing scalable web applications using modern technologies.',
    },
    workExperience: [
      {
        id: '1',
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2022-01',
        endDate: '',
        current: true,
        description: [
          '• Developed and maintained responsive web applications using React, Node.js, and PostgreSQL',
          '• Collaborated with cross-functional teams to deliver high-quality software solutions',
          '• Improved application performance by 40% through code optimization and caching strategies',
        ],
      },
      {
        id: '2',
        company: 'StartupCo',
        position: 'Software Engineer',
        startDate: '2020-03',
        endDate: '2021-12',
        current: false,
        description: [
          '• Built RESTful APIs and microservices using Python and Django',
          '• Implemented automated testing and CI/CD pipelines',
          '• Mentored junior developers and conducted code reviews',
        ],
      },
    ],
    education: [
      {
        id: '1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8',
      },
    ],
    skills: [
      { id: '1', name: 'JavaScript', level: 'Expert', category: 'Technical' },
      { id: '2', name: 'React', level: 'Expert', category: 'Technical' },
      { id: '3', name: 'Node.js', level: 'Advanced', category: 'Technical' },
      { id: '4', name: 'Python', level: 'Advanced', category: 'Technical' },
      { id: '5', name: 'Leadership', level: 'Advanced', category: 'Soft' },
      { id: '6', name: 'Communication', level: 'Expert', category: 'Soft' },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
  },
  {
    id: '2',
    title: 'Marketing Manager Resume',
    template: 'classic',
    personalInfo: {
      fullName: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '(555) 987-6543',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/janesmith',
      website: '',
      summary: 'Results-driven marketing manager with 7+ years of experience in digital marketing and brand management.',
    },
    workExperience: [
      {
        id: '1',
        company: 'Marketing Agency',
        position: 'Senior Marketing Manager',
        startDate: '2021-06',
        endDate: '',
        current: true,
        description: [
          '• Managed digital marketing campaigns across multiple channels, increasing brand awareness by 35%',
          '• Analyzed campaign performance data to optimize ROI and reduce customer acquisition costs',
          '• Led a team of 5 marketing specialists to execute integrated marketing strategies',
        ],
      },
    ],
    education: [
      {
        id: '1',
        institution: 'New York University',
        degree: 'Master of Business Administration',
        field: 'Marketing',
        startDate: '2015-09',
        endDate: '2017-05',
        gpa: '3.9',
      },
    ],
    skills: [
      { id: '1', name: 'Google Analytics', level: 'Expert', category: 'Technical' },
      { id: '2', name: 'SEO', level: 'Advanced', category: 'Technical' },
      { id: '3', name: 'Content Marketing', level: 'Expert', category: 'Technical' },
      { id: '4', name: 'Team Leadership', level: 'Advanced', category: 'Soft' },
    ],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T14:20:00Z',
  },
];
