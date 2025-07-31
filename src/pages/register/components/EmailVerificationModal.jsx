import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmailVerificationModal = ({ isOpen, email, onClose, onResend }) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [isOpen, countdown]);

  const handleResend = () => {
    onResend();
    setCountdown(60);
    setCanResend(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mail" size={32} color="var(--color-primary)" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Check Your Email
          </h2>

          {/* Description */}
          <p className="text-text-secondary mb-6">
            We've sent a verification link to{' '}
            <span className="font-medium text-text-primary">{email}</span>
          </p>

          {/* Instructions */}
          <div className="bg-muted rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-text-primary mb-2">Next steps:</h3>
            <ol className="text-sm text-text-secondary space-y-1">
              <li>1. Check your email inbox</li>
              <li>2. Click the verification link</li>
              <li>3. Return here to continue</li>
            </ol>
          </div>

          {/* Resend Section */}
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">
              Didn't receive the email? Check your spam folder or
            </p>
            
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={!canResend}
              fullWidth
            >
              {canResend ? 'Resend Email' : `Resend in ${countdown}s`}
            </Button>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            onClick={onClose}
            className="mt-4"
            fullWidth
          >
            I'll verify later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;