import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExitConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl p-6 max-w-md w-full shadow-modal">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Exit Assessment?
          </h3>
        </div>
        
        <p className="text-text-secondary mb-6">
          Your progress will be saved, but you'll need to restart from where you left off. 
          Are you sure you want to exit?
        </p>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            fullWidth
          >
            Continue Assessment
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            fullWidth
          >
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;