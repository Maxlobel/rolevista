import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock authentication check
      if (formData.email === 'demo@rolevista.com' && formData.password === 'demo123') {
        // Success - redirect to assessment results
        navigate('/assessment-results');
      } else {
        // Invalid credentials
        setErrors({
          general: 'Invalid email or password. Try demo@rolevista.com / demo123'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Sign in failed. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    // TODO: Implement actual social login integration
    // Simulate social login for now
    setTimeout(() => {
      setIsLoading(false);
      navigate('/assessment-results');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full border-b border-border bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg">RoleVista</span>
          </Link>
          
          <div className="text-sm text-muted-foreground">
            Need an account?{' '}
            <Link 
              to="/user-registration-login" 
              className="text-primary hover:underline font-medium"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-lg mx-auto">
          {/* Welcome Section */}
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Sign in to continue your career journey and access your personalized insights.
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="bg-muted/30 border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Try Demo Account</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Email: <code className="bg-muted px-1 rounded">demo@rolevista.com</code></div>
                <div>Password: <code className="bg-muted px-1 rounded">demo123</code></div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6 space-y-6">
            {/* Error Message */}
            {errors.general && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-sm text-destructive">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
                className="h-12"
              />

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    required
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  label="Keep me signed in"
                />
                
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            {/* Social Login */}
            <SocialLogin 
              onSocialLogin={handleSocialLogin}
              isLoading={isLoading}
            />
          </div>

          {/* Additional Options */}
          <div className="text-center mt-6 space-y-4">
            <div className="text-sm text-muted-foreground">
              New to RoleVista?{' '}
              <Link 
                to="/user-registration-login" 
                className="text-primary hover:underline font-medium"
              >
                Create your free account
              </Link>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Take your free career assessment and discover your ideal career path in minutes.
            </div>
          </div>

          {/* Trust Signals */}
          <TrustSignals />
        </div>
      </main>
    </div>
  );
};

export default Login;