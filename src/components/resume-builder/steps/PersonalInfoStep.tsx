
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import { PersonalInfo, Resume } from '@/types/resume';
import { toast } from 'sonner';

interface PersonalInfoStepProps {
  data: Resume;
  onUpdatePersonalInfo: (personalInfo: PersonalInfo) => void;
}

const aiSuggestions = [
  "Experienced software engineer with 5+ years developing scalable web applications",
  "Detail-oriented marketing professional with expertise in digital campaigns",
  "Results-driven sales manager with proven track record of exceeding targets",
  "Creative graphic designer passionate about brand storytelling",
  "Customer-focused project manager with strong leadership skills",
];

export default function PersonalInfoStep({ data, onUpdatePersonalInfo }: PersonalInfoStepProps) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(data.personalInfo);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...personalInfo, [field]: value };
    setPersonalInfo(updated);
    onUpdatePersonalInfo(updated);
  };

  const handleAISuggestion = () => {
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    handleChange('summary', randomSuggestion);
    toast.success('AI suggestion applied!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-display font-semibold mb-4">Personal Information</h3>
        <p className="text-gray-600 mb-6">Let's start with your basic information to create your professional profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (optional)</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website/Portfolio (optional)</Label>
          <Input
            id="website"
            value={personalInfo.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="johndoe.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary">Professional Summary *</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAISuggestion}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:opacity-90"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Suggest
          </Button>
        </div>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a brief summary about yourself, your experience, and what you're looking for..."
          rows={4}
          required
        />
        <p className="text-sm text-gray-500">
          Write 2-3 sentences that highlight your key strengths and career goals.
        </p>
      </div>
    </div>
  );
}
