import React, { useState, useEffect } from 'react';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDark?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ searchQuery, onSearchChange, isDark }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const textColor = isDark ? '#e8eaed' : '#202124';
  const bgColor = isDark ? '#202124' : '#fff';
  const borderColor = isDark ? '#5f6368' : '#dfe1e5';
  const iconColor = isDark ? '#9aa0a6' : '#5f6368';

  return (
    <div style={{ backgroundColor: bgColor }}>
      {/* Combined header and search form container - 70px total height like Google */}
      <div style={{ height: '70px', position: 'relative' }}>
        {/* Top header bar with buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '48px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            {/* Logo will be in search area, so this is empty or can be removed */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              style={{
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(232,234,237,.08)' : '#f1f3f4'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Share"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
                <path d="M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM13 8h3a2 2 0 012 2v7a2 2 0 01-2 2h-3m-5-8a2 2 0 012-2h3a2 2 0 012 2m0 0V5a2 2 0 00-2-2h-3a2 2 0 00-2-2v3" />
              </svg>
            </button>
            <button
              style={{
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(232,234,237,.08)' : '#f1f3f4'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Labs"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </button>
            <button
              style={{
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(232,234,237,.08)' : '#f1f3f4'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Google apps"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
                <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
              </svg>
            </button>
            <button
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#8ab4f8',
                color: '#202124',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 500
              }}
              aria-label="Account"
            >
              A
            </button>
          </div>
        </div>

        {/* Search form area */}
        <div style={{ maxWidth: '584px', margin: '0 auto', padding: isMobile ? '0 8px' : '0 16px', position: 'relative', height: '100%', display: 'flex', alignItems: 'center', gap: isMobile ? '4px' : '8px' }}>
          {/* Logo positioned to the left of search bar */}
          <div style={{ flexShrink: 0, display: isMobile ? 'none' : 'block' }}>
            <a href="#" style={{ textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>
              <div style={{ fontSize: '20px', fontWeight: 400, letterSpacing: 0 }}>
                {isDark ? (
                  <span style={{ color: '#e8eaed' }}>Google<span style={{ fontSize: '12px', marginLeft: '4px', color: '#9aa0a6' }}>Sim</span></span>
                ) : (
                  <>
                    <span style={{ color: '#4285f4' }}>G</span>
                    <span style={{ color: '#ea4335' }}>o</span>
                    <span style={{ color: '#fbbc05' }}>o</span>
                    <span style={{ color: '#4285f4' }}>g</span>
                    <span style={{ color: '#34a853' }}>l</span>
                    <span style={{ color: '#ea4335' }}>e</span>
                    <span style={{ color: '#9aa0a6', fontSize: '12px', marginLeft: '4px', fontWeight: 400 }}>Sim</span>
                  </>
                )}
              </div>
            </a>
          </div>
          
          {/* Search bar - takes remaining space */}
          <div style={{ flex: 1, position: 'relative' }}>
            <div
              style={{
                border: `1px solid ${borderColor}`,
                borderRadius: '24px',
                padding: '0 16px',
                height: '44px',
                backgroundColor: isDark ? '#303134' : '#fff',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                transition: 'box-shadow 0.2s',
                maxWidth: '584px',
                margin: '0 auto'
              }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = isDark ? '0 1px 6px rgba(0,0,0,0.5)' : '0 2px 5px 1px rgba(64,60,67,.16)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ paddingRight: '13px', display: 'flex', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              readOnly
              className="gLFyf"
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                flex: 1,
                padding: 0,
                height: '100%',
                backgroundColor: 'transparent',
                color: textColor,
                cursor: 'default'
              }}
              aria-label="Search"
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '8px' }}>
              <button
                style={{
                  padding: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(232,234,237,.08)' : '#f1f3f4'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Search by voice"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#4285f4">
                  <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                </svg>
              </button>
              <button
                style={{
                  padding: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(232,234,237,.08)' : '#f1f3f4'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Search by image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#4285f4">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
