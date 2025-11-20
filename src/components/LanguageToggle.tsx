import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sl' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="h-9 px-3 border border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4 mr-2" />
      <span className="font-medium">{language === 'en' ? 'EN' : 'SL'}</span>
    </Button>
  );
};

export default LanguageToggle;

