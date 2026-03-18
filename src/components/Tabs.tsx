import React, { useState, useRef, useEffect } from 'react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDark?: boolean;
}

const mainTabs = ['All', 'Videos', 'Images', 'News', 'Short videos', 'Shopping'];
const moreTabs = ['Forums', 'Maps', 'Books', 'Web'];

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, isDark }) => {
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const bgColor = isDark ? '#202124' : '#fff';
  const borderColor = isDark ? '#3c4043' : '#ebebeb';
  const textColor = isDark ? '#9aa0a6' : '#5f6368';
  const activeTextColor = isDark ? '#8ab4f8' : '#1a73e8';
  const hoverTextColor = isDark ? '#e8eaed' : '#1a0dab';

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    setTimeout(checkScroll, 100);
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: bgColor, borderBottom: `1px solid ${borderColor}` }}>
      <div style={{ maxWidth: '1128px', margin: '0 auto', padding: '0 8px' }}>
        <div style={{ position: 'relative', marginBottom: '-1px' }}>
          {showLeftButton && (
            <button
              onClick={scrollLeft}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: isDark ? '#303134' : '#fff',
                color: textColor,
                border: isDark ? '1px solid #5f6368' : '1px solid #dfe1e5',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
          )}

          {showRightButton && (
            <button
              onClick={scrollRight}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: isDark ? '#303134' : '#fff',
                color: textColor,
                border: isDark ? '1px solid #5f6368' : '1px solid #dfe1e5',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          )}

          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: '0',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '0 4px',
              position: 'relative'
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <div style={{ flexShrink: 0 }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange('AI Mode');
                }}
                style={{
                  display: 'inline-block',
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: activeTab === 'AI Mode' ? activeTextColor : textColor,
                  textDecoration: 'none',
                  borderBottom: activeTab === 'AI Mode' ? `3px solid ${activeTextColor}` : '3px solid transparent',
                  marginBottom: '-1px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'AI Mode') e.currentTarget.style.color = hoverTextColor;
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'AI Mode') e.currentTarget.style.color = textColor;
                }}
              >
                AI Mode
              </a>
            </div>

            {mainTabs.map((tab) => (
              <div key={tab} style={{ flexShrink: 0 }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onTabChange(tab);
                  }}
                  style={{
                    display: 'inline-block',
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: activeTab === tab ? activeTextColor : textColor,
                    textDecoration: 'none',
                    borderBottom: activeTab === tab ? `3px solid ${activeTextColor}` : '3px solid transparent',
                    marginBottom: '-1px',
                    fontWeight: activeTab === tab ? 500 : 400,
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab) e.currentTarget.style.color = hoverTextColor;
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) e.currentTarget.style.color = textColor;
                  }}
                >
                  {tab}
                </a>
              </div>
            ))}

            <div style={{ flexShrink: 0, position: 'relative' }}>
              <button
                onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: textColor,
                  background: 'none',
                  border: 'none',
                  borderBottom: '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginBottom: '-1px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = hoverTextColor}
                onMouseLeave={(e) => e.currentTarget.style.color = textColor}
              >
                <span>More</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>

              {showMoreDropdown && (
                <>
                  <div
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998 }}
                    onClick={() => setShowMoreDropdown(false)}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: isDark ? '#303134' : '#fff',
                      border: `1px solid ${isDark ? '#5f6368' : '#dadce0'}`,
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                      zIndex: 999,
                      minWidth: '160px',
                      marginTop: '4px'
                    }}
                  >
                    {moreTabs.map((tab) => (
                      <a
                        key={tab}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onTabChange(tab);
                          setShowMoreDropdown(false);
                        }}
                        style={{
                          display: 'block',
                          padding: '12px 16px',
                          fontSize: '14px',
                          color: textColor,
                          textDecoration: 'none',
                          borderBottom: `1px solid ${isDark ? '#3c4043' : '#f1f3f4'}`
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? '#3c4043' : '#f8f9fa'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {tab}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div style={{ flexShrink: 0, marginLeft: 'auto' }}>
              <button
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: textColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = hoverTextColor}
                onMouseLeave={(e) => e.currentTarget.style.color = textColor}
              >
                <span>Tools</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
