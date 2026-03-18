import React from 'react';

interface PeopleAlsoSearchForProps {
  searches: string[];
  searchQuery: string;
  onSearchClick?: (query: string) => void;
}

export const PeopleAlsoSearchFor: React.FC<PeopleAlsoSearchForProps> = ({ 
  searches, 
  searchQuery,
  onSearchClick 
}) => {
  if (searches.length === 0) return null;

  return (
    <div style={{ marginTop: '48px', marginBottom: '32px' }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: 400,
        color: '#202124',
        marginBottom: '16px',
        lineHeight: '1.3'
      }}>
        People also search for
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0',
        border: '1px solid #dadce0',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              border: 'none',
              borderRight: index % 2 === 0 && index < searches.length - 1 ? '1px solid #dadce0' : 'none',
              borderBottom: index < searches.length - 2 ? '1px solid #dadce0' : 'none',
              backgroundColor: '#fff',
              cursor: 'default',
              textAlign: 'left',
              fontSize: '14px',
              color: '#1a0dab',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
            }}
          >
            <span style={{ flex: 1 }}>{search}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5f6368"
              strokeWidth="2"
              style={{ flexShrink: 0, marginLeft: '12px' }}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

