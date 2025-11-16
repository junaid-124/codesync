export interface StatItem {
  label: string;
  value: string | number;
}

type PlatformStats = Record<string, StatItem[]>;

export const dummyStats: PlatformStats = {
  leetcode: [
    { label: 'Score', value: 811 },
    { label: 'Problems Solved', value: 82 },
    { label: 'Ranking', value: 1581393 },
    { label: 'Contest Rating', value: '1350.139' },
    { label: 'Reputation', value: 0 },
    { label: 'Easy Problems', value: 64 },
    { label: 'Medium Problems', value: 17 },
    { label: 'Hard Problems', value: 1 },
    { label: 'Contests Participated', value: 3 },
  ],
  codechef: [
    { label: 'Score', value: 294 },
    { label: 'Problems Solved', value: 88 },
    { label: 'Rating', value: 1109 },
    { label: 'Global Rank', value: 105466 },
    { label: 'Country Rank', value: 'N/A' },
    { label: 'Contests Participated', value: 5 },
    { label: 'Partially Solved', value: 0 },
  ],
  codeforces: [
    { label: 'Score', value: 5 },
    { label: 'Problems Solved', value: 1 },
    { label: 'Rating', value: 0 },
    { label: 'Max Rating', value: 0 },
    { label: 'Rank', value: 'unrated' },
    { label: 'Contribution', value: 0 },
    { label: 'Contests Participated', value: 0 },
  ],
  gfg: [
    { label: 'Score', value: 4 },
    { label: 'Problems Solved', value: 1 },
    { label: 'Coding Score', value: 0 },
    { label: 'Rank', value: 'Code Enthusiast' },
    { label: 'Institute Rank', value: 'N/A' },
    { label: 'Easy Problems', value: 0 },
    { label: 'Medium Problems', value: 1 },
    { label: 'Hard Problems', value: 0 },
    { label: 'Contests Participated', value: 0 },
  ],
  hackerrank: [
    { label: 'Score', value: 355 },
    { label: 'Problems Solved', value: 71 },
    { label: 'Badges', value: 0 },
    { label: 'Certificates', value: 0 },
    { label: 'Contests Participated', value: 0 },
  ],
  github: [
    { label: 'Score', value: 150 },
    { label: 'Problems Solved', value: 72 },
    { label: 'Public Repos', value: 15 },
    { label: 'Total Commits', value: 72 },
    { label: 'Followers', value: 0 },
    { label: 'Following', value: 0 },
    { label: 'Stars Received', value: 0 },
  ],
  atcoder: [
    { label: 'Rating', value: 0 },
    { label: 'Max Rating', value: 0 },
    { label: 'Problems Solved', value: 0 },
    { label: 'Contests Participated', value: 0 },
  ],
  code360: [
    { label: 'Score', value: 120 },
    { label: 'Problems Solved', value: 15 },
    { label: 'Contest Rating', value: 1150 },
    { label: 'Rank', value: 2048 },
  ],
};