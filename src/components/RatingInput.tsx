import React from 'react';
import { Star } from 'lucide-react';

interface RatingInputProps {
  maxRating: number;
  value: number;
  onChange: (value: number) => void;
}

export function RatingInput({ maxRating, value, onChange }: RatingInputProps) {
  return (
    <div className="flex gap-2 justify-center my-6">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className={`p-2 rounded-full transition-all transform hover:scale-110
            ${value === rating ? 'text-yellow-500 scale-110' : 'text-gray-300'}`}
        >
          <Star
            className={`w-8 h-8 ${value >= rating ? 'fill-current' : ''}`}
          />
        </button>
      ))}
    </div>
  );
}