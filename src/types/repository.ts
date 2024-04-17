interface Repository {
  author: string;
  name: string;
  avatar: string;
  description?: string;
  url: string;
  language: string;
  languageColor?: string;
  stars?: number;
  forks?: number;
  currentPeriodStars?: number;
  builtBy: {
    username: string;
    href: string;
    avatar: string;
  }[];
}

export default Repository;
