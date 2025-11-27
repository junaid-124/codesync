// frontend/src/data/mockProfiles.ts

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rollNumber: string;
  department: string;
  section: string;
  year: string;
  contact: string;
  email: string;
  about: string;
  skills: string[];
  interests: string[];
  codingProfiles: {
    codechef: string;
    hackerrank: string;
    codeforces: string;
    geeksforgeeks: string;
  };
  githubStats: {
    publicRepos: number;
    totalCommits: number;
    stars: number;
    followers: number;
    contributionStreak: number;
  };
}

export const mockProfiles: StudentProfile[] = [
  {
    // 🔑 FIX 1: Using the Roll Number from TABLE_DATA as the unique ID
    id: '22R21A66D5',
    name: 'AVUTHU KUSHWANT KUMAR REDDY',
    avatar: 'https://i.pravatar.cc/150?u=1',
    score: 191527,
    rollNumber: 'CSM • ID',
    department: 'CSM',
    section: 'C',
    year: 'Fourth',
    contact: '94XX-XX-48180',
    email: 'zzyy.kushwant@gmail.in',
    about: 'Find your own niche',
    skills: ['Javascript', 'TypeScript', 'React'],
    interests: ['Startups', 'Cloud Computing'],
    codingProfiles: {
      codechef: 'rushkwr32',
      hackerrank: 'rushkwr32',
      codeforces: 'kushwant',
      geeksforgeeks: 'user123',
    },
    githubStats: {
      publicRepos: 0,
      totalCommits: 0,
      stars: 0,
      followers: 0,
      contributionStreak: 315,
    },
  },

  {
    // 🔑 FIX 2: Using the Roll Number from TABLE_DATA as the unique ID
    id: '23R21A3316',
    name: 'Srinivas Chundi',
    avatar: 'https://placehold.co/100x100/303030/FFFFFF?text=SC',
    score: 132163,
    rollNumber: 'CSIT • ID',
    department: 'CSIT',
    section: 'A',
    year: 'Third',
    contact: '99XX-XX-XXXX',
    email: 'srinivas.c@example.com',
    about: 'Loves building scalable software.',
    skills: ['Python', 'SQL', 'AWS'],
    interests: ['AI/ML', 'DevOps'],
    codingProfiles: {
      codechef: 'jane_doe',
      hackerrank: 'jane_doe',
      codeforces: 'janedoe',
      geeksforgeeks: 'janedoe',
    },
    githubStats: {
      publicRepos: 5,
      totalCommits: 150,
      stars: 12,
      followers: 8,
      contributionStreak: 80,
    },
  },
];

// Mock API call – Simulates network delay
export const getStudentProfileById = (id: string): Promise<StudentProfile | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const profile = mockProfiles.find((p) => p.id === id);
      resolve(profile);
    }, 500);
  });
};
