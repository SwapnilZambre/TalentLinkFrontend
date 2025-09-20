export interface Job {
  id: string;
  title: string;
  description: string;
  skills: string[];
  experienceMin: number;
  experienceMax: number;
  location: string;
  salary: number;
  postedBy: string;
  createdAt: string;
}
