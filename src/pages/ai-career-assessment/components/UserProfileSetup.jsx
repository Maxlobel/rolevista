import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserProfileSetup = ({ onComplete }) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!profileData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Connect to backend API to save user profile
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store profile data in localStorage for now
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      
      // Call the completion callback
      onComplete(profileData);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ general: 'Failed to save profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          What should we call you?
        </h1>
        <p className="text-muted-foreground text-lg">
          Just your name to get started - takes 30 seconds!
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive text-sm">{errors.general}</p>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="Your first name"
              value={profileData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              error={errors.firstName}
              required
            />
            <Input
              label="Last Name"
              placeholder="Your last name"
              value={profileData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              error={errors.lastName}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Getting Started...' : 'Start My Assessment →'}
            </Button>
          </div>

          {/* Privacy Note */}
          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              ✨ We'll use your name to personalize your experience
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileSetup; 