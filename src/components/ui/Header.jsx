import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Assessment', path: '/ai-career-assessment', icon: 'Brain' },
    { name: 'Job Matches', path: '/job-matches', icon: 'Target' },
    { name: 'Skill Analysis', path: '/skill-gap-analysis', icon: 'TrendingUp' },
    { name: 'AI Coach', path: '/ai-career-coach-chat', icon: 'MessageCircle' },
  ];

  const moreMenuItems = [
    { name: 'Resume Optimizer', path: '/resume-optimizer-tool', icon: 'FileText' },
    { name: 'Pricing', path: '/subscription-pricing', icon: 'CreditCard' },
    { name: 'Settings', path: '/settings', icon: 'Settings' },
    { name: 'Help', path: '/help', icon: 'HelpCircle' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Eye" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-text-primary">RoleVista</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.name}</span>
            </Link>
          ))}
          
          {/* More Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200">
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
            </button>
            
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                {moreMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="hidden lg:flex">
            <Icon name="Bell" size={18} />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <span className="hidden lg:block text-sm font-medium text-text-primary">John Doe</span>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="border-t border-border pt-2 mt-2">
              {moreMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200"
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;