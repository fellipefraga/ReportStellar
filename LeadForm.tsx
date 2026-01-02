import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Language, translations } from './translations';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface LeadFormProps {
  language: Language;
}

export function LeadForm({ language }: LeadFormProps) {
  const t = translations[language];
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t.form.firstNameRequired;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t.form.lastNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.form.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.form.emailInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to Formspree
      const response = await fetch('https://formspree.io/f/xlgeaqkz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          language: language,
        }),
      });

      if (response.ok) {
        // Store lead data in console for reference
        console.log('Lead captured:', formData);

        // Redirect to the report page based on language
        window.location.href = t.reportUrl;
      } else {
        // Handle error
        console.error('Form submission failed');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 border border-gray-800">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white">
            {t.form.firstName}
          </Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="bg-[#0a0a0a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#c4d600] focus:ring-[#c4d600]"
            placeholder={t.form.firstNamePlaceholder}
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white">
            {t.form.lastName}
          </Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="bg-[#0a0a0a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#c4d600] focus:ring-[#c4d600]"
            placeholder={t.form.lastNamePlaceholder}
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            {t.form.email}
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="bg-[#0a0a0a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#c4d600] focus:ring-[#c4d600]"
            placeholder={t.form.emailPlaceholder}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#c4d600] hover:bg-[#b0c100] text-black transition-colors duration-200"
        >
          {isSubmitting ? t.form.submitting : t.form.submitButton}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          {t.form.disclaimer}
        </p>
      </form>
    </div>
  );
}