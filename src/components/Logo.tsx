
import { FileText } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-brand-primary to-brand-accent rounded-lg flex items-center justify-center`}>
          <FileText className="w-1/2 h-1/2 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-white"></div>
      </div>
      
      {showText && (
        <div className={`font-display font-bold ${textSizeClasses[size]}`}>
          <span className="text-brand-primary">Resume</span>
          <span className="text-brand-accent">Craft</span>
        </div>
      )}
    </div>
  );
}
