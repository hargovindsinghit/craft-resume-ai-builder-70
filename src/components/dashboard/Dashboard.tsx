
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, FileText, Download, Edit, Trash2, MoreVertical, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Logo from '../Logo';
import { Resume } from '@/types/resume';

interface DashboardProps {
  user: { name: string; email: string };
  resumes: Resume[];
  onCreateResume: () => void;
  onEditResume: (resumeId: string) => void;
  onLogout: () => void;
}

export default function Dashboard({ user, resumes, onCreateResume, onEditResume, onLogout }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResumes = resumes.filter(resume =>
    resume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTemplateColor = (template: string) => {
    switch (template) {
      case 'modern': return 'bg-blue-500';
      case 'classic': return 'bg-green-500';
      case 'creative': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" />
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search resumes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback className="bg-brand-primary text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-text mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">Ready to craft your next amazing resume?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumes.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumes.length * 3}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Templates Used</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(resumes.map(r => r.template)).size || 1}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Resume Button */}
        <div className="mb-6">
          <Button 
            onClick={onCreateResume}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Resume
          </Button>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-display truncate">
                      {resume.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {resume.personalInfo.fullName}
                    </CardDescription>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditResume(resume.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={`${getTemplateColor(resume.template)} text-white`}
                  >
                    {resume.template.charAt(0).toUpperCase() + resume.template.slice(1)}
                  </Badge>
                  
                  <div className="text-sm text-gray-500">
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                
                <Button 
                  onClick={() => onEditResume(resume.id)}
                  variant="outline" 
                  className="w-full mt-4 group-hover:bg-brand-primary group-hover:text-white transition-colors"
                >
                  Open Resume
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {filteredResumes.length === 0 && (
            <div className="col-span-full text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first resume'}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={onCreateResume}
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Resume
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
