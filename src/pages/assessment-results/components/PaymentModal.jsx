import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentModal = ({ isOpen, onClose, selectedPlan }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    country: 'US'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock payment processing
    alert('Payment processed successfully! Welcome to RoleVista Pro!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Upgrade to Pro</h2>
            <Button variant="ghost" onClick={onClose} iconName="X" />
          </div>

          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-text-primary">Pro Plan</h3>
                <p className="text-sm text-text-secondary">Unlimited access to all features</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-text-primary">$99</p>
                <p className="text-sm text-text-secondary">per month</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
            />

            <div className="space-y-3">
              <label className="text-sm font-medium text-text-primary">Payment Method</label>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 p-3 border rounded-lg flex items-center justify-center space-x-2 ${
                    paymentMethod === 'card' ?'border-primary bg-primary/5 text-primary' :'border-border text-text-secondary'
                  }`}
                >
                  <Icon name="CreditCard" size={16} />
                  <span className="text-sm">Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex-1 p-3 border rounded-lg flex items-center justify-center space-x-2 ${
                    paymentMethod === 'paypal' ?'border-primary bg-primary/5 text-primary' :'border-border text-text-secondary'
                  }`}
                >
                  <Icon name="Wallet" size={16} />
                  <span className="text-sm">PayPal</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <>
                <Input
                  label="Card Number"
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Expiry Date"
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                  />
                  <Input
                    label="CVV"
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                  />
                </div>

                <Input
                  label="Cardholder Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </>
            )}

            <div className="pt-4 border-t border-border">
              <Button
                type="submit"
                variant="default"
                fullWidth
                iconName="Lock"
                iconPosition="left"
              >
                Complete Payment - $99/month
              </Button>
              
              <p className="text-xs text-text-secondary text-center mt-3">
                Secure payment powered by Stripe. Cancel anytime.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;