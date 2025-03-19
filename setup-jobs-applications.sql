
-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  experience TEXT NOT NULL,
  education TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  responsibilities TEXT[] NOT NULL,
  salary_range TEXT,
  closing_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  job_id INTEGER REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- Enable RLS on the jobs and applications tables
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Set up RLS policies for jobs
CREATE POLICY "Jobs are viewable by everyone" 
  ON public.jobs 
  FOR SELECT 
  USING (true);

-- Set up RLS policies for applications
CREATE POLICY "Users can view their own applications" 
  ON public.applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own applications" 
  ON public.applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Insert sample jobs data
INSERT INTO public.jobs (title, department, location, type, experience, education, description, requirements, responsibilities, salary_range, closing_date, status)
VALUES
  ('Senior Lecturer', 'Academic Affairs', 'Nairobi', 'Full-time', '5+ years', 'PhD', 'We are seeking a Senior Lecturer to join our academic department.', 
   ARRAY['PhD in relevant field', 'At least 5 years teaching experience', 'Research background'], 
   ARRAY['Teaching undergraduate and graduate courses', 'Conducting research', 'Supervising student projects'], 
   'KES 150,000 - 200,000', '2023-12-31', 'Open'),
  
  ('Administrative Officer', 'Administration', 'Mombasa', 'Full-time', '3+ years', 'Bachelors', 'Join our administration team as an Administrative Officer.', 
   ARRAY['Bachelors degree in Business Administration', 'Excellent organizational skills', 'Proficiency in MS Office'], 
   ARRAY['Managing office operations', 'Coordinating administrative activities', 'Handling correspondence'], 
   'KES 80,000 - 100,000', '2023-11-30', 'Open'),
  
  ('Research Assistant', 'Research', 'Kisumu', 'Contract', '1-2 years', 'Masters', 'Support ongoing research projects as a Research Assistant.', 
   ARRAY['Masters degree in relevant field', 'Research experience', 'Data analysis skills'], 
   ARRAY['Collecting and analyzing data', 'Assisting with research activities', 'Preparing reports'], 
   'KES 60,000 - 75,000', '2023-10-15', 'Open');
