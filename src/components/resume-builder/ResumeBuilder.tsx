
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save, Download, Eye } from 'lucide-react';
import Logo from '../Logo';
import PersonalInfoStep from './steps/PersonalInfoStep';
import WorkExperienceStep from './steps/WorkExperienceStep';
import EducationStep from './steps/EducationStep';
import SkillsStep from './steps/SkillsStep';
import ResumePreview from './ResumePreview';
import { Resume, PersonalInfo, WorkExperience, Education, Skill } from '@/types/resume';
import { toast } from 'sonner';

interface ResumeBuilderProps {
  resume: Resume | null;
  onSave: (resume: Resume) => void;
  onBack: () => void;
}

const steps = [
  { id: 'personal', title: 'Personal Info', component: PersonalInfoStep },
  { id: 'experience', title: 'Work Experience', component: WorkExperienceStep },
  { id: 'education', title: 'Education', component: EducationStep },
  { id: 'skills', title: 'Skills', component: SkillsStep },
];

export default function ResumeBuilder({ resume, onSave, onBack }: ResumeBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState<Resume>(
    resume || {
      id: Date.now().toString(),
      title: 'My Resume',
      template: 'modern',
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        website: '',
        summary: '',
      },
      workExperience: [],
      education: [],
      skills: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    const updatedResume = {
      ...resumeData,
      updatedAt: new Date().toISOString(),
    };
    setResumeData(updatedResume);
    onSave(updatedResume);
    toast.success('Resume saved successfully!');
  };

  const handleExport = () => {
    toast.info('Export functionality coming soon!');
  };

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo }));
  };

  const updateWorkExperience = (workExperience: WorkExperience[]) => {
    setResumeData(prev => ({ ...prev, workExperience }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: Skill[]) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Logo size="md" />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
              <Button variant="outline" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleExport} className="bg-brand-accent hover:bg-brand-accent/90">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8`}>
          {/* Form Section */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-display font-semibold">
                    Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
                  </h2>
                  <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* Step Content */}
            <Card>
              <CardContent className="p-6">
                <CurrentStepComponent
                  data={resumeData}
                  onUpdatePersonalInfo={updatePersonalInfo}
                  onUpdateWorkExperience={updateWorkExperience}
                  onUpdateEducation={updateEducation}
                  onUpdateSkills={updateSkills}
                />
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="bg-brand-primary hover:bg-brand-primary/90"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <ResumePreview resume={resumeData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
