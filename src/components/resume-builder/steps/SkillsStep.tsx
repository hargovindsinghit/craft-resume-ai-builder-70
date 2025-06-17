
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X, Sparkles } from 'lucide-react';
import { Skill, Resume } from '@/types/resume';
import { toast } from 'sonner';

interface SkillsStepProps {
  data: Resume;
  onUpdateSkills: (skills: Skill[]) => void;
}

const aiSkillSuggestions = {
  'Software Engineer': ['JavaScript', 'React', 'Node.js', 'Python', 'Git', 'AWS', 'Docker', 'TypeScript'],
  'Marketing': ['Google Analytics', 'SEO', 'Content Marketing', 'Social Media', 'Email Marketing', 'PPC', 'Adobe Creative Suite'],
  'Sales': ['CRM Software', 'Lead Generation', 'Negotiation', 'Customer Relationship Management', 'Salesforce', 'Cold Calling'],
  'Design': ['Adobe Photoshop', 'Figma', 'Sketch', 'InDesign', 'UI/UX Design', 'Prototyping', 'Brand Design'],
};

export default function SkillsStep({ data, onUpdateSkills }: SkillsStepProps) {
  const [skills, setSkills] = useState<Skill[]>(data.skills);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<Skill['level']>('Intermediate');
  const [newSkillCategory, setNewSkillCategory] = useState<Skill['category']>('Technical');

  const addSkill = () => {
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      level: newSkillLevel,
      category: newSkillCategory,
    };

    const updated = [...skills, newSkill];
    setSkills(updated);
    onUpdateSkills(updated);
    setNewSkillName('');
  };

  const removeSkill = (id: string) => {
    const updated = skills.filter(skill => skill.id !== id);
    setSkills(updated);
    onUpdateSkills(updated);
  };

  const handleAISuggestion = () => {
    const jobTitle = data.workExperience[0]?.position || 'Software Engineer';
    const category = Object.keys(aiSkillSuggestions).find(key => 
      jobTitle.toLowerCase().includes(key.toLowerCase())
    ) || 'Software Engineer';
    
    const suggestedSkills = aiSkillSuggestions[category as keyof typeof aiSkillSuggestions] || aiSkillSuggestions['Software Engineer'];
    const randomSkills = suggestedSkills.slice(0, 5);
    
    const newSkills = randomSkills.map(skillName => ({
      id: Date.now().toString() + Math.random(),
      name: skillName,
      level: 'Intermediate' as Skill['level'],
      category: 'Technical' as Skill['category'],
    }));

    const updated = [...skills, ...newSkills];
    setSkills(updated);
    onUpdateSkills(updated);
    toast.success('AI skill suggestions added!');
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-display font-semibold mb-4">Skills</h3>
        <p className="text-gray-600 mb-6">Add your technical and soft skills to showcase your capabilities.</p>
      </div>

      {/* Add New Skill */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Add New Skill</h4>
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label>Skill Name</Label>
              <Input
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="JavaScript"
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={newSkillCategory} onValueChange={(value: Skill['category']) => setNewSkillCategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Soft">Soft Skills</SelectItem>
                  <SelectItem value="Language">Language</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Level</Label>
              <Select value={newSkillLevel} onValueChange={(value: Skill['level']) => setNewSkillLevel(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={addSkill} disabled={!newSkillName.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills Display */}
      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <Card key={category}>
          <CardContent className="p-6">
            <h4 className="font-medium mb-4 capitalize">{category} Skills</h4>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
                >
                  {skill.name} ({skill.level})
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet. Add your first skill above!</p>
        </div>
      )}
    </div>
  );
}
