import React, { useState, useEffect } from 'react';
import { getFakeImageUrl } from '../utils/fakeImages';
import { trackEvent } from '../utils/tracking';
import type { ProlificParams } from '../utils/tracking';

interface InstagramProfileProps {
  resultId: string;
  onClose: () => void;
  persona?: string;
  condition?: string;
  prolificParams?: ProlificParams;
}

// Derive a stable handle and display stats from resultId
const deriveHandle = (resultId: string): string => {
  const cleaned = resultId.replace(/[^a-z0-9]/gi, '').toLowerCase();
  return `@${cleaned.slice(0, 12) || 'user'}`;
};

const deriveStats = (resultId: string) => {
  const hash = resultId.split('').reduce((acc, c) => c.charCodeAt(0) + ((acc << 5) - acc), 0);
  const abs = Math.abs(hash);
  const posts = 100 + (abs % 400);
  const followers = 350 + (abs % 51);
  const following = 300 + (abs % 700);
  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
  return {
    posts,
    followersDisplay: formatNum(followers),
    followingDisplay: formatNum(following),
  };
};

const INSTAGRAM_TABS = ['Posts', 'Reels', 'Tagged'] as const;
type InstagramTab = typeof INSTAGRAM_TABS[number];

export const InstagramProfile: React.FC<InstagramProfileProps> = ({
  resultId,
  onClose,
  persona = 'greg',
  condition,
  prolificParams,
}) => {
  const [activeTab, setActiveTab] = useState<InstagramTab>('Posts');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handle = deriveHandle(resultId);
  const stats = deriveStats(resultId);

  const handleTabClick = (tab: InstagramTab) => {
    trackEvent({
      eventType: 'tab_change',
      elementType: 'overlay_internal_tab',
      platform: 'Instagram',
      elementText: tab,
      persona,
      condition,
      ...prolificParams,
    });
    setActiveTab(tab);
  };

  // 9 post-grid images
  const postCount = 9;

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 1000,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        overscrollBehavior: 'contain',
      }}
    >
      {/* Back to Search Results banner */}
      <div
        onClick={onClose}
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          position: 'sticky',
          top: 0,
          zIndex: 101,
          cursor: 'pointer',
        }}
      >
        <span style={{ color: '#1a73e8', fontSize: '18px', display: 'flex', alignItems: 'center' }}>←</span>
        <span
          style={{ color: '#1a73e8', fontSize: '14px' }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
        >
          Back to Google Search Results
        </span>
      </div>

      {/* Instagram Top Nav */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #dbdbdb',
        height: '54px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        position: 'sticky',
        top: 41,
        zIndex: 100,
      }}>
        {/* Instagram wordmark */}
        <svg width="103" height="29" viewBox="0 0 103 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="22" fontFamily="'Billabong', cursive, serif" fontSize="26" fill="#262626">Instagram</text>
        </svg>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Messenger icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        </div>
      </div>

      {/* Profile Header */}
      <div style={{
        maxWidth: '935px',
        margin: '0 auto',
        padding: isMobile ? '20px 16px' : '30px 20px',
      }}>
        {/* Avatar + Stats row */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'flex-start',
          gap: isMobile ? '16px' : '60px',
          marginBottom: '20px',
        }}>
          {/* Avatar */}
          <div style={{
            width: isMobile ? '100px' : '150px',
            height: isMobile ? '100px' : '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #dbdbdb',
            flexShrink: 0,
          }}>
            <img
              src={getFakeImageUrl(resultId, 'avatar')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(30px) saturate(1.5)',
              }}
              alt=""
            />
          </div>

          {/* Profile info */}
          <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
            {/* Handle + buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '16px',
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}>
              <span style={{ fontSize: '20px', fontWeight: 300, color: '#262626' }}>{handle}</span>
              <button style={{
                backgroundColor: '#efefef',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 16px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                color: '#262626',
              }}>
                Message
              </button>
              <button style={{
                backgroundColor: '#efefef',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 16px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                color: '#262626',
              }}>
                Follow
              </button>
            </div>

            {/* Stats row */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '20px' : '40px',
              marginBottom: '16px',
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}>
              {[
                { label: 'posts', value: stats.posts },
                { label: 'followers', value: stats.followersDisplay },
                { label: 'following', value: stats.followingDisplay },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '16px', color: '#262626', display: 'block' }}>
                    {value}
                  </span>
                  <span style={{ fontSize: '14px', color: '#262626' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Bio (blurred) */}
            <div style={{ maxWidth: '300px', margin: isMobile ? '0 auto' : '0' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', color: '#262626', marginBottom: '4px', filter: 'blur(4px)', userSelect: 'none' }}>
                Creative professional &amp; outdoor enthusiast
              </div>
              <div style={{ fontSize: '14px', color: '#262626', lineHeight: '18px', filter: 'blur(4px)', userSelect: 'none' }}>
                Chicago, IL · Analyst by day
              </div>
              <div style={{ fontSize: '14px', marginTop: '4px', filter: 'blur(4px)', userSelect: 'none' }}>
                <span style={{
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600,
                }}>
                  linktr.ee/user_profile
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Story highlights row (visual-only) */}
        <div style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '8px',
        }}>
          {['Travel', 'Food', 'Work', 'Friends'].map((label, i) => (
            <div key={label} style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '2px solid #dbdbdb',
                overflow: 'hidden',
                marginBottom: '4px',
              }}>
                <img
                  src={getFakeImageUrl(resultId + '_story' + i, 'avatar')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'blur(30px) saturate(1.5)',
                  }}
                  alt=""
                />
              </div>
              <span style={{ fontSize: '12px', color: '#262626' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Internal Tabs */}
        <div style={{
          borderTop: '1px solid #dbdbdb',
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          marginBottom: '4px',
        }}>
          {INSTAGRAM_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <div
                key={tab}
                onClick={() => handleTabClick(tab)}
                style={{
                  padding: '14px 20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: isActive ? '#262626' : '#8e8e8e',
                  borderTop: isActive ? '1px solid #262626' : '1px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  userSelect: 'none',
                }}
              >
                {tab === 'Posts' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={isActive ? '#262626' : '#8e8e8e'}>
                    <rect x="2" y="2" width="7" height="7" rx="1"/><rect x="9.5" y="2" width="7" height="7" rx="1"/><rect x="17" y="2" width="5" height="7" rx="1"/>
                    <rect x="2" y="9.5" width="7" height="7" rx="1"/><rect x="9.5" y="9.5" width="7" height="7" rx="1"/><rect x="17" y="9.5" width="5" height="7" rx="1"/>
                    <rect x="2" y="17" width="7" height="5" rx="1"/><rect x="9.5" y="17" width="7" height="5" rx="1"/><rect x="17" y="17" width="5" height="5" rx="1"/>
                  </svg>
                )}
                {tab}
              </div>
            );
          })}
        </div>

        {/* Photo Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3px',
        }}>
          {Array.from({ length: postCount }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                paddingBottom: '100%',
                backgroundColor: '#efefef',
                overflow: 'hidden',
              }}
            >
              <img
                src={getFakeImageUrl(resultId + '_post' + i, 'avatar')}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(30px) saturate(1.5)',
                }}
                alt=""
              />
            </div>
          ))}
        </div>

        {/* Load more visual placeholder */}
        <div style={{
          textAlign: 'center',
          padding: '32px 0',
          color: '#8e8e8e',
          fontSize: '14px',
        }}>
          — End of profile —
        </div>
      </div>
    </div>
  );
};
