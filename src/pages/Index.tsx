
import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import Dashboard from '@/components/dashboard/Dashboard';
import ResumeBuilder from '@/components/resume-builder/ResumeBuilder';
import { mockUser, mockResumes } from '@/utils/mockData';
import { Resume, User } from '@/types/resume';

type AppState = 'login' | 'signup' | 'dashboard' | 'builder';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);
  const [resumes, setResumes] = useState<Resume[]>(mockResumes);
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, this would authenticate with a server
    const loggedInUser = { ...mockUser, email };
    setUser(loggedInUser);
    setAppState('dashboard');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock signup - in real app, this would create user on server
    const newUser = { ...mockUser, name, email };
    setUser(newUser);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('login');
  };

  const handleCreateResume = () => {
    setCurrentResume(null);
    setAppState('builder');
  };

  const handleEditResume = (resumeId: string) => {
    const resume = resumes.find(r => r.id === resumeId) || null;
    setCurrentResume(resume);
    setAppState('builder');
  };

  const handleSaveResume = (resume: Resume) => {
    setResumes(prev => {
      const existingIndex = prev.findIndex(r => r.id === resume.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = resume;
        return updated;
      } else {
        return [...prev, resume];
      }
    });
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
    setCurrentResume(null);
  };

  if (appState === 'login') {
    return (
      <LoginForm
        onLogin={handleLogin}
        onSwitchToSignup={() => setAppState('signup')}
      />
    );
  }

  if (appState === 'signup') {
    return (
      <SignupForm
        onSignup={handleSignup}
        onSwitchToLogin={() => setAppState('login')}
      />
    );
  }

  if (appState === 'dashboard' && user) {
    return (
      <Dashboard
        user={user}
        resumes={resumes}
        onCreateResume={handleCreateResume}
        onEditResume={handleEditResume}
        onLogout={handleLogout}
      />
    );
  }

  if (appState === 'builder') {
    return (
      <ResumeBuilder
        resume={currentResume}
        onSave={handleSaveResume}
        onBack={handleBackToDashboard}
      />
    );
  }

  return null;
};

export default Index;
