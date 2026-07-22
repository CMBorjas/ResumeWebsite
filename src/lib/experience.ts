/**
 * experience.ts — Centralized data source for all work experience and education entries.
 * Used by the Experience timeline section on the homepage and the dedicated pages.
 */

export interface ExperienceEntry {
  id: string;
  type: 'work' | 'education' | 'activity';
  title: string;
  organization: string;
  location: string;
  dateRange: string;
  tag: string;
  tagColor: 'cyan' | 'pink' | 'green' | 'yellow';
  bullets: string[];
}

export const experienceEntries: ExperienceEntry[] = [
  // ── Work Experience ──────────────────────────────────────────────
  {
    id: 'monarch-it',
    type: 'work',
    title: 'I.T. Technician',
    organization: 'The Monarch Casino',
    location: 'Black Hawk, Colorado, USA',
    dateRange: 'April 2021 – January 2024',
    tag: 'HARDWARE',
    tagColor: 'cyan',
    bullets: [
      'Installed PC hardware for end-users and assisted in the installation of advanced networking hardware and software.',
      'Performed preventative maintenance on PCs, printers, and other hardware.',
      'Installed service releases and performed routine maintenance on desktop applications.',
      'Maintained licensing information for all desktop applications and operating systems.',
      'Devised documentation for end-user hardware and software regarding installation, maintenance, troubleshooting, and network connectivity.',
    ],
  },
  {
    id: 'ccd-lab',
    type: 'work',
    title: 'Head CIS Lab Assistant (Work-Study)',
    organization: 'Community College of Denver',
    location: 'Denver, Colorado, USA',
    dateRange: 'Sept 2019 – Feb 2020',
    tag: 'SUPPORT',
    tagColor: 'pink',
    bullets: [
      'Assisted faculty in organizing labs and classrooms in support of the CIS/IT program.',
      'Maintained network and hardware labs, ensuring professional appearance and configuration.',
      'Set up software for extra-curricular activities.',
    ],
  },

  // ── Education ────────────────────────────────────────────────────
  {
    id: 'ucd-cs',
    type: 'education',
    title: 'B.Sc. Computer Science',
    organization: 'University of Colorado Denver',
    location: 'Denver, Colorado, USA',
    dateRange: '2020 – 2025',
    tag: 'DEGREE',
    tagColor: 'green',
    bullets: [
      'Core coursework in Algorithms, Data Structures, Operating Systems, Computer Networks, and Software Engineering.',
      'Senior capstone project focusing on full-stack web development.',
    ],
  },
  {
    id: 'ccd-cis',
    type: 'education',
    title: 'A.A.S. Computer Information Systems',
    organization: 'Community College of Denver',
    location: 'Denver, Colorado, USA',
    dateRange: '2018 – 2020',
    tag: 'ASSOCIATE',
    tagColor: 'yellow',
    bullets: [
      'Completed foundational coursework in programming, networking, and database management.',
      'Hands-on lab work in hardware maintenance and IT support systems.',
    ],
  },

  // ── Clubs and School Activities ──────────────────────────────────
  {
    id: 'ai-student-association',
    type: 'activity',
    title: 'Technology Officer',
    organization: 'Artificial Intelligence Student Association',
    location: 'University of Colorado Denver',
    dateRange: '2024 – 2026',
    tag: 'CLUB',
    tagColor: 'pink',
    bullets: [
      'Led a team of 6 members to develop a RAG agent system presentation for the student organization, which resulted in 50+ members engaging in the presentation.',
      'Helped organize a competition and competed with 50+ students in the field of Artificial Intelligence for the betterment of society.',
      'Participated in weekly meetings discussing recent changes in the field of Artificial Intelligence.',
      'Engaged in hands-on projects and competitions to understand and implement AI concepts.',
      'Maintain the AI Student Association website and social media presence.',
    ],
  },
  {
    id: 'lynx-robotics-club',
    type: 'activity',
    title: 'Secretary',
    organization: 'Lynx Robotics Club',
    location: 'University of Colorado Denver',
    dateRange: 'TBD',
    tag: 'CLUB',
    tagColor: 'yellow',
    bullets: [
      'Placeholder description point 1.',
      'Placeholder description point 2.',
    ],
  },
];

/** Helper: get only work entries */
export const workEntries = experienceEntries.filter((e) => e.type === 'work');

/** Helper: get only education entries */
export const educationEntries = experienceEntries.filter((e) => e.type === 'education');

/** Helper: get only activity entries */
export const activityEntries = experienceEntries.filter((e) => e.type === 'activity');
