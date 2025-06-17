
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { WorkExperience, Resume } from '@/types/resume';
import { toast } from 'sonner';

interface WorkExperienceStepProps {
  data: Resume;
  onUpdateWorkExperience: (workExperience: WorkExperience[]) => void;
}

const aiDescriptions = [
  "• Developed and maintained responsive web applications using React, Node.js, and PostgreSQL\n• Collaborated with cross-functional teams to deliver high-quality software solutions\n• Improved application performance by 40% through code optimization and caching strategies",
  "• Managed digital marketing campaigns across multiple channels, increasing brand awareness by 35%\n• Analyzed campaign performance data to optimize ROI and reduce customer acquisition costs\n• Led a team of 3 marketing specialists to execute integrated marketing strategies",
  "• Exceeded monthly sales targets by 25% through strategic client relationship management\n• Developed and maintained relationships with key accounts worth $2M+ in annual revenue\n• Mentored junior sales representatives and improved team performance by 30%",
];

export default function WorkExperienceStep({ data, onUpdateWorkExperience }: WorkExperienceStepProps) {
  const [experiences, setExperiences] = useState<WorkExperience[]>(
    data.workExperience.length > 0 ? data.workExperience : [
      {
        id: Date.now().toString(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: [],
      }
    ]
  );

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    const updated = experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperiences(updated);
    onUpdateWorkExperience(updated);
  };

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [],
    };
    const updated = [...experiences, newExperience];
    setExperiences(updated);
    onUpdateWorkExperience(updated);
  };

  const removeExperience = (id: string) => {
    const updated = experiences.filter(exp => exp.id !== id);
    setExperiences(updated);
    onUpdateWorkExperience(updated);
  };

  const handleAISuggestion = (id: string) => {
    const randomDescription = aiDescriptions[Math.floor(Math.random() * aiDescriptions.length)];
    updateExperience(id, 'description', randomDescription.split('\n'));
    toast.success('AI suggestions applied!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-display font-semibold mb-4">Work Experience</h3>
        <p className="text-gray-600 mb-6">Add your work history, starting with your most recent position.</p>
      </div>

      {experiences.map((experience) => (
        <Card key={experience.id}>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Position Details</CardTitle>
              {experiences.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
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
                <Label>Company Name *</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Google"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Job Title *</Label>
                <Input
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  placeholder="Software Engineer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  disabled={experience.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${experience.id}`}
                checked={experience.current}
                onCheckedChange={(checked) => updateExperience(experience.id, 'current', checked)}
              />
              <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Job Description & Achievements *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAISuggestion(experience.id)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:opacity-90"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Suggest
                </Button>
              </div>
              <Textarea
                value={experience.description.join('\n')}
                onChange={(e) => updateExperience(experience.id, 'description', e.target.value.split('\n'))}
                placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver projects on time&#10;• Improved system performance by 30% through optimization"
                rows={5}
                required
              />
              <p className="text-sm text-gray-500">
                Use bullet points to describe your responsibilities and achievements. Start each point with an action verb.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed border-2 border-gray-300 text-gray-600 hover:border-brand-accent hover:text-brand-accent"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Position
      </Button>
    </div>
  );
}
