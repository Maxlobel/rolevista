import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillCategories = ({ categories, selectedCategory, onCategorySelect }) => {
  const categoryIcons = {
    'Technical Skills': 'Code',
    'Soft Skills': 'Users',
    'Leadership': 'Crown',
    'Communication': 'MessageSquare',
    'Analytics': 'BarChart3',
    'Design': 'Palette',
    'Marketing': 'Megaphone',
    'Sales': 'TrendingUp'
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Skill Categories</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category)}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedCategory?.name === category.name
                ? 'border-primary bg-primary bg-opacity-5' :'border-border hover:border-primary hover:bg-muted'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedCategory?.name === category.name
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary'
              }`}>
                <Icon 
                  name={categoryIcons[category.name] || 'Circle'} 
                  size={18}
                />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">{category.name}</h3>
                <p className="text-sm text-text-secondary">{category.skillCount} skills</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold text-primary">
                {category.averageScore}%
              </div>
              <div className="text-xs text-text-secondary">avg score</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Pro Tip</h4>
            <p className="text-sm text-blue-800">
              Focus on improving skills in categories where you score below 70%. These gaps often represent the biggest career advancement opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCategories;