
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalSection from "@/components/forms/PersonalSection";
import EducationSection from "@/components/forms/EducationSection";
import ExperienceSection from "@/components/forms/ExperienceSection";
import ShortCoursesSection from "@/components/forms/ShortCoursesSection";
import ProfessionalBodiesSection from "@/components/forms/ProfessionalBodiesSection";
import PublicationsSection from "@/components/forms/PublicationsSection";
import RefereesSection from "@/components/forms/RefereesSection";

const ApplicationForm = () => {
  return (
    <div className="container py-8 mx-auto max-w-5xl">
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold mb-2">Job Application Form</h1>
        <p className="text-gray-500 mb-6">
          Please fill out all required fields to submit your application.
        </p>

        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="courses">Short Courses</TabsTrigger>
            <TabsTrigger value="bodies">Professional Bodies</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="referees">Referees</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalSection />
          </TabsContent>

          <TabsContent value="education">
            <EducationSection />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceSection />
          </TabsContent>

          <TabsContent value="courses">
            <ShortCoursesSection />
          </TabsContent>

          <TabsContent value="bodies">
            <ProfessionalBodiesSection />
          </TabsContent>

          <TabsContent value="publications">
            <PublicationsSection />
          </TabsContent>

          <TabsContent value="referees">
            <RefereesSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApplicationForm;
