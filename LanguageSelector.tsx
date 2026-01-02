import { Languages } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Language } from './translations';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Select value={language} onValueChange={(value) => onLanguageChange(value as Language)}>
        <SelectTrigger className="w-[130px] bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#252525] focus:border-[#c4d600] focus:ring-[#c4d600]">
          <div className="flex items-center gap-2">
            <Languages className="size-4" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-[#1a1a1a] border-gray-700">
          <SelectItem value="pt" className="text-white hover:bg-[#252525]">
            🇧🇷 Português
          </SelectItem>
          <SelectItem value="en" className="text-white hover:bg-[#252525]">
            🇺🇸 English
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
