export interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experienceYears: number;
  location: string;
  bio: string;
  resumeUrl?: string;
}
