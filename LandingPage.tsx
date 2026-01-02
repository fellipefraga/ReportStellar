import { useState } from 'react';
import { LeadForm } from './LeadForm';
import { LanguageSelector } from './LanguageSelector';
import { Language, translations } from './translations';
import stellarLogo from 'figma:asset/b0f7d5c1e12c1c6bd51aec9a30bc2320c268bf0b.png';

export function LandingPage() {
  const [language, setLanguage] = useState<Language>('pt');
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img 
            src={stellarLogo} 
            alt="Stellar Gaming" 
            className="h-12 md:h-16 w-auto"
          />
          <LanguageSelector language={language} onLanguageChange={setLanguage} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-8 py-12">
        <div className="max-w-2xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl mb-6 text-white">
              {t.hero.title} <span className="text-[#c4d600]">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-4">
              {t.hero.subtitle}
            </p>
            <p className="text-base text-gray-400">
              {t.hero.description}
            </p>
          </div>

          {/* Form Section */}
          <LeadForm language={language} />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
        </div>
      </footer>
    </div>
  );
}