import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Menu, X, Send, Mic, Paperclip, Bot, Crown, MessageCircle, BookOpen, DollarSign, Calendar, History } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ChatMessage from './components/ChatMessage';
import QuickActions from './components/QuickActions';
import ConversationHistory from './components/ConversationHistory';
import UpgradePrompt from './components/UpgradePrompt';
import FileUploadModal from './components/FileUploadModal';

const AICareerCoachChat = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [messageCount, setMessageCount] = useState(3);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Simulated user data
  const [userProfile] = useState({
    name: 'Sarah Chen',
    avatar: null,
    isPremium: false,
    messageLimit: 5,
    conversationHistory: []
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello Sarah! I'm your AI Career Coach. I'm here to help you with career guidance, interview preparation, salary negotiation, and skill development. What would you like to discuss today?",
      timestamp: new Date(),
      hasRichContent: false
    }
  ]);

  const quickActionChips = [
    { id: 1, label: 'Salary Negotiation', icon: 'DollarSign' },
    { id: 2, label: 'Interview Prep', icon: 'MessageCircle' },
    { id: 3, label: 'Resume Review', icon: 'BookOpen' },
    { id: 4, label: 'Career Path', icon: 'Calendar' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Check free user message limit
    if (!userProfile.isPremium && messageCount >= userProfile.messageLimit) {
      setShowUpgrade(true);
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      hasRichContent: false
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      'salary': {
        content: "Great question about salary negotiation! Here's a strategic approach:\n\n**Research Phase:**\n- Use Glassdoor, PayScale, and industry reports\n- Factor in location, experience, and company size\n\n**Negotiation Strategy:**\n- Wait for the offer before discussing salary\n- Present a range, not a single number\n- Highlight your unique value propositions\n\n**Key Tips:**\n- Practice your pitch beforehand\n- Consider the full compensation package\n- Be prepared to walk away if needed\n\nWould you like me to help you prepare specific talking points for your situation?",
        hasRichContent: true,
        actions: ['Schedule Mock Interview', 'Find Salary Benchmarks']
      },
      'interview': {
        content: "Interview preparation is crucial for success! Let me create a personalized prep plan:\n\n**STAR Method Framework:**\n- Situation: Set the context\n- Task: Describe your responsibility\n- Action: Explain what you did\n- Result: Share the outcome\n\n**Common Questions to Practice:**\n- Tell me about yourself\n- Why do you want this role?\n- Describe a challenging situation\n- Where do you see yourself in 5 years?\n\n**Company Research:**\n- Recent news and developments\n- Company culture and values\n- Key competitors and market position\n\nShall we practice some specific interview questions together?",
        hasRichContent: true,
        actions: ['Start Mock Interview', 'Company Research']
      },
      'default': {
        content: "I understand you're looking for career guidance. Based on your profile, I can see you're a Strategic Innovator with strong leadership skills.\n\nHere are some areas where I can help you:\n\n• **Career Path Planning** - Explore role progressions and industry transitions\n• **Skill Development** - Identify gaps and recommend learning resources\n• **Interview Preparation** - Practice common questions and scenarios\n• **Salary Negotiation** - Research market rates and negotiation strategies\n• **Resume Optimization** - Enhance your professional narrative\n\nWhat specific aspect would you like to focus on first?",
        hasRichContent: true,
        actions: ['Upload Resume', 'Explore Career Paths']
      }
    };

    const responseKey = userMessage.toLowerCase().includes('salary') ? 'salary' :
                      userMessage.toLowerCase().includes('interview') ? 'interview' : 'default';

    return {
      id: Date.now() + 1,
      type: 'ai',
      content: responses[responseKey].content,
      timestamp: new Date(),
      hasRichContent: responses[responseKey].hasRichContent,
      actions: responses[responseKey].actions
    };
  };

  const handleQuickAction = (action) => {
    setMessage(action);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic
  };

  const handleFileUpload = () => {
    setShowFileUpload(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left Side - Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-semibold text-lg">RoleVista</span>
            </div>
          </div>

          {/* Center - Coach Status */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-medium text-foreground">AI Career Coach</div>
              <div className="text-xs text-success flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
                Online
              </div>
            </div>
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowHistory(true)}
              className="hidden md:block p-2 text-muted-foreground hover:text-foreground"
            >
              <History className="w-5 h-5" />
            </button>
            
            <button className="relative p-2 text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="hidden sm:block text-sm font-medium">{userProfile.name}</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b border-border">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <a href="#" onClick={() => navigate('/career-profile-dashboard')} className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                Dashboard
              </a>
              <a href="#" onClick={() => navigate('/skill-gap-analysis')} className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                Skills Analysis
              </a>
              <a href="#" onClick={() => navigate('/job-matches-search')} className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                Job Matches
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-foreground bg-primary/10">
                AI Coach
              </a>
            </nav>

            {/* Mobile Coach Status */}
            <div className="px-4 pb-4 border-t border-border pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-foreground">AI Career Coach</div>
                  <div className="text-xs text-success flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
                    Online & Ready to Help
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 border-r border-border bg-card">
          <ConversationHistory
            conversations={userProfile.conversationHistory}
            isPremium={userProfile.isPremium}
          />
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col">
          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Free User Message Counter */}
            {!userProfile.isPremium && (
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium text-foreground">
                      {userProfile.messageLimit - messageCount} messages remaining
                    </span>
                  </div>
                  <Button
                    size="xs"
                    variant="outline"
                    className="text-primary border-primary"
                    onClick={() => setShowUpgrade(true)}
                  >
                    Upgrade
                  </Button>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                userAvatar={userProfile.avatar}
                isPremium={userProfile.isPremium}
              />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-3 max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 pb-2">
            <QuickActions
              actions={quickActionChips}
              onActionClick={handleQuickAction}
              disabled={!userProfile.isPremium && messageCount >= userProfile.messageLimit}
            />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex items-end space-x-2">
              <button
                onClick={handleFileUpload}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                disabled={!userProfile.isPremium}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    !userProfile.isPremium && messageCount >= userProfile.messageLimit
                      ? "Upgrade to continue chatting..." :"Ask me anything about your career..."
                  }
                  disabled={!userProfile.isPremium && messageCount >= userProfile.messageLimit}
                  className="resize-none"
                  multiline
                />
              </div>
              
              <button
                onClick={handleVoiceInput}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-error text-error-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                disabled={!userProfile.isPremium}
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || (!userProfile.isPremium && messageCount >= userProfile.messageLimit)}
                iconName="Send"
                iconPosition="left"
              >
                Send
              </Button>
            </div>
            
            <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
              <div>
                {!userProfile.isPremium && (
                  <span>Voice input and file uploads require Premium</span>
                )}
              </div>
              <div>Press Enter to send, Shift+Enter for new line</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showHistory && (
        <ConversationHistory
          conversations={userProfile.conversationHistory}
          isPremium={userProfile.isPremium}
          onClose={() => setShowHistory(false)}
          isMobile={true}
        />
      )}

      {showUpgrade && (
        <UpgradePrompt
          onClose={() => setShowUpgrade(false)}
          messageCount={messageCount}
          messageLimit={userProfile.messageLimit}
        />
      )}

      {showFileUpload && (
        <FileUploadModal
          onClose={() => setShowFileUpload(false)}
          onUpload={(file) => {
            // TODO: Implement file upload processing
            setShowFileUpload(false);
          }}
        />
      )}
    </div>
  );
};

export default AICareerCoachChat;