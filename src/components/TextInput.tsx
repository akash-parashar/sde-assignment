import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
        min-h-[150px] resize-none text-gray-700"
      placeholder="Please share your thoughts..."
    />
  );
}