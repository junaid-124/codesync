import {
  SiLeetcode,
  SiCodechef,
  SiCodeforces,
  SiGeeksforgeeks,
  SiHackerrank,
  SiCodingninjas,
  SiGithub, // <-- ADD THIS
} from 'react-icons/si';
import { RiCodeBoxFill } from 'react-icons/ri'; // Fallback for AtCoder

export interface Platform {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

export const platformData: Platform[] = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    icon: SiLeetcode,
    color: '#FFA116',
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    icon: SiCodechef,
    color: '#A58B73',
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    icon: SiCodeforces,
    color: '#3B82F6',
  },
  {
    id: 'gfg',
    name: 'GeeksforGeeks',
    icon: SiGeeksforgeeks,
    color: '#30A14E',
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    icon: SiHackerrank,
    color: '#2EC866',
  },
  {
    id: 'atcoder',
    name: 'AtCoder',
    icon: RiCodeBoxFill, // Fallback icon
    color: '#9CA3AF',
  },
  {
    id: 'code360',
    name: 'Code360',
    icon: SiCodingninjas,
    color: '#8B5CF6',
  },
  // --- ADD THIS NEW OBJECT ---
  {
    id: 'github',
    name: 'GitHub',
    icon: SiGithub,
    color: '#8b949e', // GitHub Gray from your image
  },
  // ---------------------------
];