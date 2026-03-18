import React from 'react';

export const Disclaimer: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#fef3c7',
      borderBottom: '1px solid #fde68a',
      padding: '8px 16px',
      fontSize: '12px',
      color: '#92400e'
    }}>
      <div style={{ maxWidth: '1128px', margin: '0 auto' }}>
        <p style={{ margin: 0 }}>
          <strong>Research Simulation:</strong> This is a simulation for research purposes. All names, profiles, and search results are fictional. No real data is accessed, collected, or stored.
        </p>
      </div>
    </div>
  );
};

