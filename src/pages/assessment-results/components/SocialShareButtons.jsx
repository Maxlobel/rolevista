import React from 'react';
import { Share2, Twitter, Linkedin, Link2 } from 'lucide-react';
import Button from '../../../components/ui/Button';

const SocialShareButtons = ({ onShare }) => {
  const shareUrl = window.location.href;
  const shareText = "I just discovered my ideal career path with RoleVista's AI assessment! 🚀 Check out this amazing career intelligence platform.";

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=400');
    onShare?.();
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=400');
    onShare?.();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      // You could show a toast notification here
      // Link copied successfully
      onShare?.();
    });
  };

  const handleShare = () => {
    if (navigator.share && navigator.canShare?.({ url: shareUrl })) {
      navigator.share({
        title: 'My Career Assessment Results - RoleVista',
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback to copy link
      handleCopyLink();
    }
    onShare?.();
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Desktop - Individual Share Buttons */}
      <div className="hidden sm:flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleTwitterShare}
          className="text-muted-foreground hover:text-blue-500"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLinkedInShare}
          className="text-muted-foreground hover:text-blue-600"
        >
          <Linkedin className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="text-muted-foreground hover:text-foreground"
        >
          <Link2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile - Single Share Button */}
      <div className="sm:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="text-muted-foreground hover:text-foreground"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SocialShareButtons;