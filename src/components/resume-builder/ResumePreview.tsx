
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Resume } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  resume: Resume;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const { personalInfo, workExperience, education, skills } = resume;

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto" style={{ minHeight: '800px' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-brand-primary mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {personalInfo.email}
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  Portfolio
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-lg font-display font-semibold text-brand-primary mb-3 border-b border-gray-200 pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-display font-semibold text-brand-primary mb-3 border-b border-gray-200 pb-1">
                Work Experience
              </h2>
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-brand-accent font-medium">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="text-sm text-gray-700 space-y-1">
                        {exp.description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-display font-semibold text-brand-primary mb-3 border-b border-gray-200 pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-brand-accent">{edu.institution}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-display font-semibold text-brand-primary mb-3 border-b border-gray-200 pb-1">
                Skills
              </h2>
              <div className="space-y-3">
                {['Technical', 'Soft', 'Language', 'Other'].map(category => {
                  const categorySkills = skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h4 className="font-medium text-gray-800 mb-2">{category}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <Badge
                            key={skill.id}
                            variant="secondary"
                            className="bg-brand-primary/10 text-brand-primary"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
