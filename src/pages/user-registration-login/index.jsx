import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Linkedin, Star } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import AuthTabs from './components/AuthTabs';
import SocialAuth from './components/SocialAuth';
import TrustSignals from './components/TrustSignals';

const UserRegistrationLogin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (form, isSignup = false) => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (isSignup) {
      if (!form.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(loginForm);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(signupForm, true);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to career assessment for new users
      navigate('/ai-career-assessment');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInImport = async () => {
    setIsLoading(true);
    try {
      // Simulate LinkedIn import
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Pre-fill form with LinkedIn data (simulated)
      setSignupForm(prev => ({
        ...prev,
        email: 'user@linkedin.example.com'
      }));
    } catch (error) {
      setErrors({ general: 'LinkedIn import failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg">RoleVista</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto lg:max-w-6xl">
          {/* Desktop Split Layout */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Left Side - Hero Content (Desktop Only) */}
            <div className="hidden lg:block">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-foreground">
                  Unlock Your Career Potential with AI
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join thousands of professionals who have discovered their ideal career path through our intelligent assessment platform.
                </p>
                
                {/* Success Stories Carousel */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        "RoleVista helped me transition from marketing to UX design. The assessment revealed skills I didn't know I had!"
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Sarah Chen</p>
                          <p className="text-xs text-muted-foreground">UX Designer at Tech Corp</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Authentication Form */}
            <div className="w-full">
              <div className="bg-card border border-border rounded-lg shadow-sm">
                <div className="p-6 space-y-6">
                  {/* Tab Navigation */}
                  <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                  {/* Error Message */}
                  {errors.general && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                      <p className="text-sm text-destructive">{errors.general}</p>
                    </div>
                  )}

                  {/* Login Form */}
                  {activeTab === 'login' && (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <Input
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        error={errors.email}
                        required
                      />

                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          placeholder="Enter your password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                          error={errors.password}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          label="Remember me"
                        />
                        <button
                          type="button"
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>
                  )}

                  {/* Signup Form */}
                  {activeTab === 'signup' && (
                    <form onSubmit={handleSignup} className="space-y-4">
                      <Input
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                        error={errors.email}
                        required
                      />

                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          placeholder="Create a password"
                          value={signupForm.password}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                          error={errors.password}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>

                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          label="Confirm Password"
                          placeholder="Confirm your password"
                          value={signupForm.confirmPassword}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          error={errors.confirmPassword}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>

                      {/* LinkedIn Import Button */}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleLinkedInImport}
                        iconName="Linkedin"
                        disabled={isLoading}
                      >
                        Import from LinkedIn
                      </Button>

                      <Button
                        type="submit"
                        className="w-full"
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  )}

                  {/* Social Authentication */}
                  <SocialAuth isLoading={isLoading} />
                </div>
              </div>

              {/* Trust Signals */}
              <TrustSignals />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistrationLogin;