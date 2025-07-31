import React from 'react';
import { Shield, Lock, Users, Star } from 'lucide-react';

const TrustSignals = () => {
  return (
    <div className="mt-8 space-y-6">
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Shield className="w-4 h-4" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center space-x-1">
          <Lock className="w-4 h-4" />
          <span>Data Protected</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>50k+ Users</span>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm font-medium text-foreground ml-2">4.9/5</span>
          </div>
          <p className="text-xs text-muted-foreground">
            "RoleVista helped me find my dream job in tech. The AI assessment was incredibly accurate!"
          </p>
          <p className="text-xs font-medium text-foreground">
            - Sarah M., Software Engineer
          </p>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          By signing in, you agree to our{' '}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;