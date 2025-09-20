import { Injectable, signal } from '@angular/core';
import { Job } from '../models/job.model';
import { Candidate } from '../models/candidate.model';

function toId() { return crypto.randomUUID(); }

@Injectable({ providedIn: 'root' })
export class DataService {
  jobs = signal<Job[]>([
    {
      id: toId(),
      title: 'Senior Angular Developer',
      description: 'Build scalable frontends with Angular and Tailwind. Collaborate with cross-functional teams to deliver robust features.',
      skills: ['Angular', 'TypeScript', 'RxJS', 'TailwindCSS'],
      experienceMin: 4,
      experienceMax: 8,
      location: 'Remote',
      salary: 120000,
      postedBy: 'Acme Corp',
      createdAt: new Date().toISOString(),
    },
    {
      id: toId(),
      title: 'Full-Stack Engineer',
      description: 'Work across the stack with Node.js and Angular. Optimize performance and DX.',
      skills: ['Angular', 'Node.js', 'PostgreSQL'],
      experienceMin: 3,
      experienceMax: 6,
      location: 'New York, USA',
      salary: 130000,
      postedBy: 'TechLabs',
      createdAt: new Date().toISOString(),
    },
  ]);

  candidates = signal<Candidate[]>([
    {
      id: toId(),
      name: 'Ava Johnson',
      email: 'ava@example.com',
      skills: ['Angular', 'RxJS', 'TailwindCSS'],
      experienceYears: 5,
      location: 'Remote',
      bio: 'Frontend-focused engineer passionate about delightful UX and clean code.',
    },
    {
      id: toId(),
      name: 'Leo Martinez',
      email: 'leo@example.com',
      skills: ['Node.js', 'Angular', 'PostgreSQL'],
      experienceYears: 4,
      location: 'Austin, USA',
      bio: 'Full-stack developer with product mindset and systems thinking.',
    },
    {
      id: toId(),
      name: 'Mia Chen',
      email: 'mia@example.com',
      skills: ['React', 'TypeScript', 'GraphQL'],
      experienceYears: 3,
      location: 'San Francisco, USA',
      bio: 'Versatile engineer exploring new challenges and growth.',
    },
  ]);

  addJob(job: Omit<Job, 'id' | 'createdAt'>) {
    const j: Job = { ...job, id: toId(), createdAt: new Date().toISOString() };
    this.jobs.update((arr) => [j, ...arr]);
    return j;
  }

  getJobById(id: string) { return this.jobs().find((j) => j.id === id) || null; }
  getCandidateById(id: string) { return this.candidates().find((c) => c.id === id) || null; }

  matchCandidates(job: Job) {
    const reqSkills = new Set(job.skills.map((s) => s.toLowerCase().trim()));
    const minOverlap = Math.max(1, Math.floor(reqSkills.size / 2));
    return this.candidates().filter((c) => {
      const overlap = c.skills.filter((s) => reqSkills.has(s.toLowerCase().trim())).length;
      const expOk = c.experienceYears >= job.experienceMin && c.experienceYears <= job.experienceMax;
      return overlap >= minOverlap && expOk;
    });
  }
}
