import React from 'react';
import { Lock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';

const SkillHeatmap = ({ skillsData, onUpgradeClick }) => {
  const getSkillColor = (score) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getSkillIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    if (score >= 60) return <TrendingUp className="w-4 h-4 text-amber-600" />;
    return <AlertCircle className="w-4 h-4 text-red-600" />;
  };

  const getSkillLabel = (score) => {
    if (score >= 80) return 'Strength';
    if (score >= 60) return 'Developing';
    return 'Gap';
  };

  const allSkills = [
    ...skillsData.strengths,
    ...skillsData.developing,
    ...skillsData.gaps
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Skills Analysis</h3>
        <div className="text-xs text-muted-foreground">
          {allSkills.length} skills evaluated
        </div>
      </div>

      {/* Mobile View - Stacked */}
      <div className="block lg:hidden space-y-4">
        {/* Strengths */}
        <div>
          <h4 className="text-sm font-medium text-emerald-600 mb-2 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Strengths ({skillsData.strengths.length})
          </h4>
          <div className="space-y-2">
            {skillsData.strengths.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{skill.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">
                    {skill.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Developing */}
        <div>
          <h4 className="text-sm font-medium text-amber-600 mb-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Developing ({skillsData.developing.length})
          </h4>
          <div className="space-y-2">
            {skillsData.developing.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{skill.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">
                    {skill.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gaps */}
        <div>
          <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Skill Gaps ({skillsData.gaps.length})
          </h4>
          <div className="space-y-2">
            {skillsData.gaps.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{skill.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all duration-500"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">
                    {skill.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View - Grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-1 mb-4">
          {allSkills.map((skill, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div
                className={`h-8 rounded-sm ${getSkillColor(skill.score)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                title={`${skill.name}: ${skill.score}%`}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {skill.name}: {skill.score}%
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
            <span className="text-muted-foreground">Strengths (80%+)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
            <span className="text-muted-foreground">Developing (60-79%)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span className="text-muted-foreground">Gaps (Below 60%)</span>
          </div>
        </div>
      </div>

      {/* Premium CTA */}
      <div className="border-t border-border pt-4 mt-4">
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Get detailed skill analysis & development roadmap
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={onUpgradeClick}
            className="w-full"
          >
            <Lock className="w-4 h-4 mr-2" />
            Unlock Detailed Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillHeatmap;