import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

const RankingQuestion = ({ question, selectedAnswer, onAnswerSelect, isLoading }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Initialize ranking if not set
  const ranking = selectedAnswer || question.options?.map((_, index) => index) || [];

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const newRanking = [...ranking];
    const draggedElement = newRanking[draggedItem];
    
    // Remove dragged element
    newRanking.splice(draggedItem, 1);
    // Insert at new position
    newRanking.splice(dropIndex, 0, draggedElement);
    
    onAnswerSelect(question.id, newRanking);
    setDraggedItem(null);
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsDragging(false);
  };

  const moveItem = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= ranking.length) return;
    
    const newRanking = [...ranking];
    const item = newRanking.splice(fromIndex, 1)[0];
    newRanking.splice(toIndex, 0, item);
    
    onAnswerSelect(question.id, newRanking);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Drag items to reorder them by your preference (most important at top)
      </div>

      <div className="space-y-2">
        {ranking.map((optionIndex, rankIndex) => {
          const option = question.options?.[optionIndex];
          if (!option) return null;

          return (
            <div
              key={optionIndex}
              draggable={!isLoading}
              onDragStart={(e) => handleDragStart(e, rankIndex)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, rankIndex)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center space-x-3 p-4 bg-card border border-border rounded-lg transition-all duration-200 cursor-move",
                isDragging && draggedItem === rankIndex && "opacity-50 scale-95",
                !isLoading && "hover:border-primary/50 hover:shadow-sm",
                isLoading && "cursor-not-allowed opacity-50"
              )}
            >
              {/* Rank Number */}
              <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                {rankIndex + 1}
              </div>

              {/* Drag Handle */}
              <div className="text-muted-foreground">
                <GripVertical className="w-4 h-4" />
              </div>

              {/* Option Content */}
              <div className="flex-1">
                <div className="font-medium text-foreground">
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </div>
                )}
              </div>

              {/* Mobile Controls */}
              <div className="lg:hidden flex flex-col space-y-1">
                <button
                  onClick={() => moveItem(rankIndex, rankIndex - 1)}
                  disabled={rankIndex === 0 || isLoading}
                  className={cn(
                    "p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30",
                    isLoading && "cursor-not-allowed"
                  )}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveItem(rankIndex, rankIndex + 1)}
                  disabled={rankIndex === ranking.length - 1 || isLoading}
                  className={cn(
                    "p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30",
                    isLoading && "cursor-not-allowed"
                  )}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-muted-foreground text-center">
        {ranking.length > 0 && `${ranking.length} items ranked`}
      </div>
    </div>
  );
};

export default RankingQuestion;