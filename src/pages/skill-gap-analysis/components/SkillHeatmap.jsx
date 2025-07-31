import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SkillHeatmap = ({ skills, onSkillSelect, selectedSkill }) => {
  const getSkillColor = (level) => {
    switch (level) {
      case 'expert':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'beginner':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getSkillIcon = (level) => {
    switch (level) {
      case 'expert':
        return 'CheckCircle';
      case 'intermediate':
        return 'Clock';
      case 'beginner':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Skill Heatmap</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-text-secondary">Expert</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-text-secondary">Developing</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-text-secondary">Gap</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => onSkillSelect(skill)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              getSkillColor(skill.level)
            } ${
              selectedSkill?.id === skill.id ? 'ring-2 ring-primary ring-offset-2' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-sm leading-tight">{skill.name}</h3>
              <Icon 
                name={getSkillIcon(skill.level)} 
                size={16} 
                className="flex-shrink-0 ml-2"
              />
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs opacity-75">Proficiency</span>
                <span className="text-xs font-medium">{skill.score}%</span>
              </div>
              <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${skill.score}%`,
                    backgroundColor: skill.level === 'expert' ? '#10B981' : 
                                   skill.level === 'intermediate' ? '#F59E0B' : '#EF4444'
                  }}
                ></div>
              </div>
            </div>

            <p className="text-xs opacity-75 line-clamp-2">{skill.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillHeatmap;