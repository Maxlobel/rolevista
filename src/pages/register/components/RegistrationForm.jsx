import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    // Privacy validation
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Input */}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        error={errors.email}
        required
      />

      {/* Password Input */}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          required
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-text-secondary hover:text-text-primary"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>

      {/* Password Strength Indicator */}
      <PasswordStrengthIndicator password={formData.password} />

      {/* Confirm Password Input */}
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-text-secondary hover:text-text-primary"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>

      {/* Terms and Privacy Checkboxes */}
      <div className="space-y-3">
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => window.open('/terms', '_blank')}
              >
                Terms of Service
              </button>
            </span>
          }
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          error={errors.agreeToTerms}
          required
        />

        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => window.open('/privacy', '_blank')}
              >
                Privacy Policy
              </button>
            </span>
          }
          checked={formData.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
          error={errors.agreeToPrivacy}
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        className="mt-6"
      >
        Start My Career Journey
      </Button>
    </form>
  );
};

export default RegistrationForm;