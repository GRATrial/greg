import React from 'react';

type ActionBarProps = {
  onPass: () => void;
  onSuperLike: () => void;
  onLike: () => void;
  disabled?: boolean;
};

const ActionBar: React.FC<ActionBarProps> = ({ onPass, onSuperLike, onLike, disabled = false }) => {
  return (
    <div className="flex items-center justify-center gap-4 px-6 py-4">
      {/* Rewind button (disabled) */}
      <button
        disabled
        className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center opacity-50 cursor-not-allowed"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
        </svg>
      </button>
      
      {/* Pass (X) button */}
      <button
        onClick={onPass}
        disabled={disabled}
        className="w-14 h-14 rounded-full bg-white border-2 border-gray-300 text-red-500 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Super Like (Star) button */}
      <button
        onClick={onSuperLike}
        disabled={disabled}
        className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 text-blue-500 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>
      
      {/* Like (Heart) button */}
      <button
        onClick={onLike}
        disabled={disabled}
        className="w-14 h-14 rounded-full bg-white border-2 border-gray-300 text-green-500 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
      
      {/* Boost/Spark button (disabled) */}
      <button
        disabled
        className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center opacity-50 cursor-not-allowed"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </button>
    </div>
  );
};

export default ActionBar;

