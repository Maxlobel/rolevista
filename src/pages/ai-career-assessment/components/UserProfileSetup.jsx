import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserProfileSetup = ({ onComplete }) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    currentRole: ''
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

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!profileData.experience) {
      newErrors.experience = 'Please select your experience level';
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
          Complete Your Profile
        </h1>
        <p className="text-muted-foreground text-lg">
          Help us personalize your career assessment experience
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
              placeholder="Enter your first name"
              value={profileData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              error={errors.firstName}
              required
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              value={profileData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              error={errors.lastName}
              required
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
            />
          </div>

          {/* Location */}
          <Input
            label="Location"
            placeholder="City, State/Province, Country"
            value={profileData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            description="This helps us provide relevant job market insights"
          />

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Years of Professional Experience *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: '0-2', label: '0-2 years' },
                { value: '3-5', label: '3-5 years' },
                { value: '6-10', label: '6-10 years' },
                { value: '10+', label: '10+ years' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('experience', option.value)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    profileData.experience === option.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {errors.experience && (
              <p className="text-sm text-destructive">{errors.experience}</p>
            )}
          </div>

          {/* Current Role */}
          <Input
            label="Current Role/Title"
            placeholder="e.g. Software Engineer, Marketing Manager, Student"
            value={profileData.currentRole}
            onChange={(e) => handleInputChange('currentRole', e.target.value)}
            description="Optional - helps us better understand your background"
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving Profile...' : 'Start Career Assessment'}
            </Button>
          </div>

          {/* Privacy Note */}
          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              🔒 Your information is secure and will only be used to personalize your career recommendations
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileSetup; 