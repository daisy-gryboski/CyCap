import React from 'react';

interface TraderButtonProps {
  name: string;
  onClick: () => void;
}

export function TraderButton({ name, onClick }: TraderButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-teal-600 text-black text-lg rounded-lg py-3 px-4 uppercase tracking-wider font-bold 
                 hover:bg-teal-500 active:bg-teal-700 transition-colors duration-200"
    >
      {name}
    </button>
  );
}