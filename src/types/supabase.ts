
export interface JobType {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  education: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary_range?: string;
  closing_date: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApplicationType {
  id: string;
  job_id: number;
  status: string;
  applicant_data: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}
