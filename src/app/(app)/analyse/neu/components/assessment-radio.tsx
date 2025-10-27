"use client";

import { cn } from '@/lib/utils';

type Rating = 'good' | 'average' | 'bad';

interface AssessmentRadioProps {
  value: Rating | null;
  onChange: (value: Rating) => void;
}

const ratingOptions: { value: Rating; label: string; className: string }[] = [
  { value: 'good', label: 'Gut', className: 'bg-green-500 hover:bg-green-600 border-green-700' },
  { value: 'average', label: 'Mittel', className: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-700' },
  { value: 'bad', label: 'Schlecht', className: 'bg-red-500 hover:bg-red-600 border-red-700' },
];

export function AssessmentRadio({ value, onChange }: AssessmentRadioProps) {
  return (
    <div className="flex space-x-2">
      {ratingOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            'flex-1 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 border-b-4',
            option.className,
            value === option.value ? 'ring-2 ring-offset-2 ring-primary' : 'opacity-70 hover:opacity-100'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
