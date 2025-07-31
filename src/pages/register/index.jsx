import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';
import TrustElements from './components/TrustElements';
import EmailVerificationModal from './components/EmailVerificationModal';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleSocialRegister = async (provider) => {
    setLoading(true);
    try {
      // TODO: Implement actual social registration API
      // Mock social registration for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/ai-career-assessment');
    } catch (error) {
      alert('Social registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation - check for existing email
      if (formData.email === 'existing@example.com') {
        throw new Error('An account with this email already exists');
      }
      
      setRegisteredEmail(formData.email);
      setShowVerificationModal(true);
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      // TODO: Implement actual resend verification API
      // Mock resend verification email for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Verification email resent to: ${registeredEmail}`);
    } catch (error) {
      alert('Failed to resend verification email. Please try again.');
    }
  };

  const handleVerificationClose = () => {
    setShowVerificationModal(false);
    navigate('/ai-career-assessment');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/landing-page" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Eye" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">RoleVista</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary">Already have an account?</span>
              <Link
                to="/login"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-md mx-auto px-4 py-8 sm:py-12">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Create Your Account
            </h1>
            <p className="text-text-secondary">
              Start your journey to finding the perfect career match
            </p>
          </div>

          {/* Registration Card */}
          <div className="bg-surface rounded-lg shadow-sm border border-border p-6 sm:p-8">
            {/* Social Registration */}
            <SocialRegistration onSocialRegister={handleSocialRegister} />

            {/* Registration Form */}
            <RegistrationForm onSubmit={handleFormSubmit} loading={loading} />

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Elements */}
          <div className="mt-8">
            <TrustElements />
          </div>

          {/* Value Proposition */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6">
              <h3 className="font-semibold text-text-primary mb-2">
                Why Choose RoleVista?
              </h3>
              <div className="grid grid-cols-1 gap-3 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} color="var(--color-primary)" />
                  <span>AI-powered career matching in minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} color="var(--color-primary)" />
                  <span>Personalized job recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
                  <span>Skill gap analysis & growth plans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} RoleVista. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <Link to="/terms" className="text-text-secondary hover:text-text-primary transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-text-secondary hover:text-text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/help" className="text-text-secondary hover:text-text-primary transition-colors">
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        email={registeredEmail}
        onClose={handleVerificationClose}
        onResend={handleResendVerification}
      />
    </div>
  );
};

export default Register;