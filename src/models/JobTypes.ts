
export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  education: string;
  status: string;
  applications: number;
  postDate: string;
  closingDate: string;
  description: string;
  requirements: string[];
}

export interface Applicant {
  id: number;
  name: string;
  position: string;
  applied: string;
  experience: string;
  education: string;
  relevantSkills: number;
  status: string;
  interview: string;
  jobId: number;
}
