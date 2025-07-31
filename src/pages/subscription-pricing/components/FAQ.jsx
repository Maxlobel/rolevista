import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQ = ({ className = '' }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does the 7-day free trial work?",
      answer: `Start your free trial today and get full access to all features. You won't be charged until the trial ends. Cancel anytime during the trial period with no fees or commitments.`
    },
    {
      question: "Can I change my plan anytime?",
      answer: `Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately, and we'll prorate any billing adjustments.`
    },
    {
      question: "What\'s included in the AI career assessment?",
      answer: `Our comprehensive assessment includes 15-20 adaptive questions about your skills, preferences, and goals. You'll receive personalized career recommendations, skill gap analysis, and job match scores.`
    },
    {
      question: "How accurate are the job matches?",
      answer: `Our AI analyzes thousands of job postings daily and matches them to your profile with 95% accuracy. Pro users get priority access to 90%+ fit matches and real-time alerts.`
    },
    {
      question: "Is my data secure?",
      answer: `Absolutely. We use 256-bit SSL encryption, are GDPR compliant, and never share your personal information with third parties. Your career data is completely private and secure.`
    },
    {
      question: "What payment methods do you accept?",
      answer: `We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay through our secure Stripe payment processing.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-4">Frequently Asked Questions</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Everything you need to know about RoleVista and our career intelligence platform.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold text-text-primary pr-4">{faq.question}</span>
              <Icon
                name={openIndex === index ? "ChevronUp" : "ChevronDown"}
                size={20}
                color="var(--color-text-secondary)"
                className="flex-shrink-0"
              />
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;