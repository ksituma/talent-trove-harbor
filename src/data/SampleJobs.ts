
import { Job } from "@/models/JobTypes";

export const initialJobListings: Job[] = [
  {
    id: 1,
    title: "Senior Researcher",
    department: "Research and Policy",
    location: "Nairobi",
    type: "Full-time",
    experience: "5+ years",
    education: "PhD",
    status: "Open",
    applications: 24,
    postDate: "2023-06-15",
    closingDate: "2023-07-15",
    description: "We are looking for a Senior Researcher to join our dynamic team at the Kenya School of Government. The ideal candidate will have extensive experience in public policy research with a focus on governance and public administration. You will be responsible for leading research projects, mentoring junior researchers, and producing high-quality publications that inform policy decisions.",
    requirements: [
      "PhD in Public Policy, Governance, or related field",
      "5+ years of research experience in public administration",
      "Strong publication record in peer-reviewed journals",
      "Experience in policy analysis and program evaluation",
      "Excellent analytical and writing skills",
      "Ability to secure research funding and manage projects"
    ]
  },
  {
    id: 2,
    title: "Administrative Officer",
    department: "Administration",
    location: "Mombasa",
    type: "Full-time",
    experience: "3+ years",
    education: "Bachelor's",
    status: "Open",
    applications: 42,
    postDate: "2023-06-20",
    closingDate: "2023-07-20",
    description: "We are seeking an Administrative Officer to support our operations at the Kenya School of Government Mombasa Campus. The successful candidate will be responsible for coordinating administrative functions, maintaining office systems, and providing logistical support for training programs and events.",
    requirements: [
      "Bachelor's degree in Business Administration or related field",
      "3+ years of administrative experience, preferably in a public institution",
      "Proficiency in MS Office and record management systems",
      "Strong organizational and time management skills",
      "Excellent verbal and written communication abilities",
      "Knowledge of government procedures and protocols"
    ]
  },
  {
    id: 3,
    title: "Training Coordinator",
    department: "Training",
    location: "Nakuru",
    type: "Full-time",
    experience: "2+ years",
    education: "Bachelor's",
    status: "Closed",
    applications: 38,
    postDate: "2023-05-10",
    closingDate: "2023-06-10",
    description: "We are looking for a Training Coordinator to organize and facilitate training programs at our Nakuru Campus. The role involves coordinating and scheduling training activities, managing participant registrations, facilitating communication between trainers and participants, and ensuring the smooth running of all training events.",
    requirements: [
      "Bachelor's degree in Education, HR, or related field",
      "2+ years of experience in training coordination",
      "Strong event planning and management skills",
      "Excellent communication and interpersonal abilities",
      "Experience in curriculum development and adult learning methods",
      "Proficiency in learning management systems"
    ]
  },
  {
    id: 4,
    title: "Finance Manager",
    department: "Finance",
    location: "Nairobi",
    type: "Full-time",
    experience: "7+ years",
    education: "Master's",
    status: "Open",
    applications: 18,
    postDate: "2023-06-25",
    closingDate: "2023-07-25",
    description: "We are seeking a Finance Manager to oversee our financial operations at the Kenya School of Government headquarters. The successful candidate will be responsible for budget planning and management, financial reporting, audit coordination, and ensuring compliance with financial regulations and policies.",
    requirements: [
      "Master's degree in Finance, Accounting, or related field",
      "7+ years of progressive experience in financial management",
      "CPA certification and active membership",
      "Experience in public sector finance and government accounting procedures",
      "Strong analytical skills and attention to detail",
      "Knowledge of financial management systems and ERP software"
    ]
  },
  {
    id: 5,
    title: "ICT Officer",
    department: "ICT",
    location: "Nairobi",
    type: "Full-time",
    experience: "3+ years",
    education: "Bachelor's",
    status: "Open",
    applications: 31,
    postDate: "2023-06-18",
    closingDate: "2023-07-18",
    description: "We are looking for an ICT Officer to manage our information systems and provide technical support across all campuses. The role involves network administration, hardware and software maintenance, user support, and contributing to the organization's digital transformation initiatives.",
    requirements: [
      "Bachelor's degree in Computer Science, IT, or related field",
      "3+ years of experience in IT support and systems administration",
      "Knowledge of network architecture and security protocols",
      "Experience with database management and information systems",
      "Certification in relevant IT areas (CCNA, CompTIA, etc.)",
      "Excellent problem-solving skills and customer service orientation"
    ]
  }
];
