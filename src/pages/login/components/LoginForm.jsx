import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'john.doe@example.com',
    password: 'password123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/dashboard');
      } else {
        // Invalid credentials
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-4">
            <Icon name="Eye" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Welcome back</h1>
          <p className="text-text-secondary">Sign in to continue your career journey</p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="#DC2626" />
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
            <p className="text-xs text-red-500 mt-2">
              Try: {mockCredentials.email} / {mockCredentials.password}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text-secondary">Remember me</span>
            </label>
            
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            className="h-12"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-4 text-sm text-text-secondary">Or continue with</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            iconName="Chrome"
            iconPosition="left"
            className="h-12"
          >
            Continue with Google
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            onClick={() => handleSocialLogin('linkedin')}
            disabled={isLoading}
            iconName="Linkedin"
            iconPosition="left"
            className="h-12"
          >
            Continue with LinkedIn
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-text-secondary">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Start your free assessment
            </Link>
          </p>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} />
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} />
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;