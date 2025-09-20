export type Role = 'jobseeker' | 'employer';
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
