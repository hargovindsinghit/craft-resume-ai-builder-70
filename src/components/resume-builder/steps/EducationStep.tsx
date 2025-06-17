
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Education, Resume } from '@/types/resume';

interface EducationStepProps {
  data: Resume;
  onUpdateEducation: (education: Education[]) => void;
}

export default function EducationStep({ data, onUpdateEducation }: EducationStepProps) {
  const [educations, setEducations] = useState<Education[]>(
    data.education.length > 0 ? data.education : [
      {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
      }
    ]
  );

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducations(updated);
    onUpdateEducation(updated);
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    const updated = [...educations, newEducation];
    setEducations(updated);
    onUpdateEducation(updated);
  };

  const removeEducation = (id: string) => {
    const updated = educations.filter(edu => edu.id !== id);
    setEducations(updated);
    onUpdateEducation(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-display font-semibold mb-4">Education</h3>
        <p className="text-gray-600 mb-6">Add your educational background, starting with your highest degree.</p>
      </div>

      {educations.map((education) => (
        <Card key={education.id}>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Education Details</CardTitle>
              {educations.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Institution Name *</Label>
                <Input
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  placeholder="University of California, Berkeley"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Degree *</Label>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Field of Study *</Label>
                <Input
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                  placeholder="Computer Science"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>GPA (optional)</Label>
                <Input
                  value={education.gpa || ''}
                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  placeholder="3.8"
                />
              </div>

              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addEducation}
        className="w-full border-dashed border-2 border-gray-300 text-gray-600 hover:border-brand-accent hover:text-brand-accent"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Education
      </Button>
    </div>
  );
}
