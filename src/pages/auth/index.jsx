import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, User, Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { registerUser, loginUser, clearError } from '../../store/slices/authSlice';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const { 
    isAuthenticated, 
    isRegisterLoading, 
    isLoginLoading, 
    registerError, 
    loginError,
    user 
  } = useSelector((state) => state.auth);
  
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data for sign up
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    experience: '',
    currentRole: '',
    industry: '',
    education: '',
    marketingConsent: false,
    termsAccepted: false
  });

  // Form data for sign in
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/ai-career-assessment');
    }
  }, [isAuthenticated, user, navigate]);

  // Clear Redux errors when component mounts or tab changes
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, isSignUp]);

  // Handle input changes
  const handleSignUpChange = (field, value) => {
    setSignUpData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      return newData;
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSignInChange = (field, value) => {
    setSignInData(prev => ({
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

  // Validate sign up form
  const validateSignUp = () => {
    const newErrors = {};

    // Match backend validation exactly
    if (!signUpData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (signUpData.firstName.length > 50) {
      newErrors.firstName = 'First name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s\-\'\.]*$/.test(signUpData.firstName)) {
      newErrors.firstName = 'First name contains invalid characters';
    }

    if (!signUpData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (signUpData.lastName.length > 50) {
      newErrors.lastName = 'Last name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s\-\'\.]*$/.test(signUpData.lastName)) {
      newErrors.lastName = 'Last name contains invalid characters';
    }

    if (!signUpData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!signUpData.password) {
      newErrors.password = 'Password is required';
    } else if (signUpData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(signUpData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, lowercase letter, and number';
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!signUpData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate sign in form
  const validateSignIn = () => {
    const newErrors = {};

    if (!signInData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!signInData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Get fresh form data from the form elements directly
    const formData = new FormData(e.target);
    const termsChecked = document.getElementById('terms').checked;
    
    // Update state with fresh data if needed
    if (termsChecked !== signUpData.termsAccepted) {
      setSignUpData(prev => ({ ...prev, termsAccepted: termsChecked }));
    }
    
    // Create validation data with fresh values
    const validationData = {
      ...signUpData,
      termsAccepted: termsChecked
    };
    
    // Validate with fresh data
    const newErrors = {};
    
    if (!validationData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (validationData.firstName.length > 50) {
      newErrors.firstName = 'First name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s\-\'\.]*$/.test(validationData.firstName)) {
      newErrors.firstName = 'First name contains invalid characters';
    }

    if (!validationData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (validationData.lastName.length > 50) {
      newErrors.lastName = 'Last name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s\-\'\.]*$/.test(validationData.lastName)) {
      newErrors.lastName = 'Last name contains invalid characters';
    }

    if (!validationData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(validationData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validationData.password) {
      newErrors.password = 'Password is required';
    } else if (validationData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(validationData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, lowercase letter, and number';
    }

    if (validationData.password !== validationData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!validationData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Dispatch the registerUser action
    const result = await dispatch(registerUser({
      firstName: validationData.firstName,
      lastName: validationData.lastName,
      email: validationData.email,
      password: validationData.password,
      acceptTerms: validationData.termsAccepted,
      phone: validationData.phone,
      location: validationData.location,
      experience: validationData.experience,
      currentRole: validationData.currentRole,
      industry: validationData.industry,
      education: validationData.education,
      marketingConsent: validationData.marketingConsent
    }));

    if (registerUser.fulfilled.match(result)) {
      // Success - navigate to assessment
      navigate('/ai-career-assessment');
    }
    // Errors are handled by Redux and displayed via registerError
  };

  // Handle sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!validateSignIn()) {
      return;
    }

    // Dispatch the loginUser action
    const result = await dispatch(loginUser({
      email: signInData.email,
      password: signInData.password
    }));

    if (loginUser.fulfilled.match(result)) {
      // Success - navigate to assessment
      navigate('/ai-career-assessment');
    }
    // Errors are handled by Redux and displayed via loginError
  };

  // Get current error to display
  const currentError = isSignUp ? registerError : loginError;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg">RoleVista</span>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isSignUp ? 'Join RoleVista' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isSignUp 
              ? 'Create your account and discover your ideal career path' 
              : 'Sign in to continue your career journey'
            }
          </p>
        </div>

        {/* Auth Toggle */}
        <div className="flex bg-muted rounded-lg p-1 mb-8">
          <button
            onClick={() => {
              setIsSignUp(true);
              setErrors({});
              dispatch(clearError());
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isSignUp
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setIsSignUp(false);
              setErrors({});
              dispatch(clearError());
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isSignUp
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
          
          {/* General Error */}
          {(currentError || errors.general) && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
              <p className="text-destructive text-sm">{currentError || errors.general}</p>
            </div>
          )}

          {/* Sign Up Form */}
          {isSignUp ? (
            <form onSubmit={handleSignUp} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Your first name"
                    value={signUpData.firstName}
                    onChange={(e) => handleSignUpChange('firstName', e.target.value)}
                    error={errors.firstName}
                    required
                  />
                  <Input
                    label="Last Name"
                    placeholder="Your last name"
                    value={signUpData.lastName}
                    onChange={(e) => handleSignUpChange('lastName', e.target.value)}
                    error={errors.lastName}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your.email@example.com"
                    value={signUpData.email}
                    onChange={(e) => handleSignUpChange('email', e.target.value)}
                    error={errors.email}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={signUpData.phone}
                    onChange={(e) => handleSignUpChange('phone', e.target.value)}
                    error={errors.phone}
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Security</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Choose a strong password"
                      value={signUpData.password}
                      onChange={(e) => handleSignUpChange('password', e.target.value)}
                      error={errors.password}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <PasswordStrengthIndicator password={signUpData.password} />
                  </div>
                  
                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => handleSignUpChange('confirmPassword', e.target.value)}
                      error={errors.confirmPassword}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Professional Background</h3>
                
                <Input
                  label="Location"
                  placeholder="City, State/Province, Country"
                  value={signUpData.location}
                  onChange={(e) => handleSignUpChange('location', e.target.value)}
                  description="Helps us provide relevant job market insights"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Years of Experience
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: '0-2', label: '0-2 years' },
                        { value: '3-5', label: '3-5 years' },
                        { value: '6-10', label: '6-10 years' },
                        { value: '10+', label: '10+ years' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleSignUpChange('experience', option.value)}
                          className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                            signUpData.experience === option.value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Education Level
                    </label>
                    <select
                      value={signUpData.education}
                      onChange={(e) => handleSignUpChange('education', e.target.value)}
                      className="w-full h-10 px-3 py-2 bg-background border border-border rounded-md text-sm"
                    >
                      <option value="">Select education level</option>
                      <option value="high_school">High School</option>
                      <option value="some_college">Some College</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="doctorate">Doctorate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Current Role/Title"
                    placeholder="e.g. Software Engineer, Student"
                    value={signUpData.currentRole}
                    onChange={(e) => handleSignUpChange('currentRole', e.target.value)}
                  />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Industry Interest
                    </label>
                    <select
                      value={signUpData.industry}
                      onChange={(e) => handleSignUpChange('industry', e.target.value)}
                      className="w-full h-10 px-3 py-2 bg-background border border-border rounded-md text-sm"
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="business">Business & Finance</option>
                      <option value="creative">Creative & Design</option>
                      <option value="sales">Sales & Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Consent & Terms */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={signUpData.marketingConsent}
                    onChange={(e) => handleSignUpChange('marketingConsent', e.target.checked)}
                    className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="marketing" className="text-sm text-muted-foreground cursor-pointer">
                    I'd like to receive career insights and job recommendations via email
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={signUpData.termsAccepted}
                    onChange={(e) => {
                      handleSignUpChange('termsAccepted', e.target.checked);
                    }}
                    className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy *
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-destructive text-sm">{errors.termsAccepted}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                loading={isRegisterLoading}
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? 'Creating Account...' : 'Create Account & Start Assessment'}
              </Button>
            </form>
          ) : (
            /* Sign In Form */
            <form onSubmit={handleSignIn} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={signInData.email}
                onChange={(e) => handleSignInChange('email', e.target.value)}
                error={errors.email}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={signInData.password}
                  onChange={(e) => handleSignInChange('password', e.target.value)}
                  error={errors.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded" />
                  <label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => {
                    // TODO: Implement forgot password
                    alert('Forgot password feature coming soon!');
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={isLoginLoading}
                disabled={isLoginLoading}
              >
                {isLoginLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            🔒 Your data is secure and encrypted. We never share your personal information.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AuthPage; 