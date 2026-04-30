import React, { useState, useEffect } from 'react';
import { getFakeImageUrl } from '../utils/fakeImages';
import { trackEvent } from '../utils/tracking';
import type { ProlificParams } from '../utils/tracking';

interface XProfileProps {
  resultId: string;
  onClose: () => void;
  persona?: string;
  condition?: string;
  prolificParams?: ProlificParams;
}

const deriveHandle = (resultId: string): string => {
  const cleaned = resultId.replace(/[^a-z0-9]/gi, '').toLowerCase();
  return `@${cleaned.slice(0, 15) || 'user'}`;
};

const deriveXStats = (resultId: string) => {
  const hash = resultId.split('').reduce((acc, c) => c.charCodeAt(0) + ((acc << 5) - acc), 0);
  const abs = Math.abs(hash);
  const following = 200 + (abs % 800);
  const followers = 350 + (abs % 51);
  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;
  return {
    followingDisplay: formatNum(following),
    followersDisplay: formatNum(followers),
  };
};

const X_TABS = ['Posts', 'Replies', 'Highlights', 'Articles', 'Media', 'Likes'] as const;
type XTab = typeof X_TABS[number];

// Simple SVG icons for post engagement row
const ReplyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);
const RepostIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
  </svg>
);
const LikeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);
const ViewsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

// Fake tweet times for variety
const TWEET_AGES = ['2h', '5h', '1d', '2d', '3d', '5d', '1w', '2w', '3w', '1mo'];

export const XProfile: React.FC<XProfileProps> = ({
  resultId,
  onClose,
  persona = 'greg',
  condition,
  prolificParams,
}) => {
  const [activeTab, setActiveTab] = useState<XTab>('Posts');
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
  const stats = deriveXStats(resultId);

  const handleTabClick = (tab: XTab) => {
    trackEvent({
      eventType: 'tab_change',
      elementType: 'overlay_internal_tab',
      platform: 'X',
      elementText: tab,
      persona,
      condition,
      ...prolificParams,
    });
    setActiveTab(tab);
  };

  // Generate 7 fake tweet cards
  const tweetCount = 7;

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

      {/* X Top Nav */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #eff3f4',
        height: '53px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'sticky',
        top: 41,
        zIndex: 100,
      }}>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f1419" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '17px', color: '#0f1419' }}>Profile</div>
        </div>
        {/* X logo */}
        <svg width="30" height="30" viewBox="0 0 300 300" fill="#0f1419">
          <path d="M178.57 127.15L290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"/>
        </svg>
      </div>

      {/* Cover banner */}
      <div style={{
        height: isMobile ? '130px' : '200px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#cfd9de',
      }}>
        <img
          src={getFakeImageUrl(resultId, 'header')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(15px) saturate(1.3)',
          }}
          alt=""
        />
      </div>

      {/* Profile section */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 16px',
        position: 'relative',
      }}>
        {/* Avatar overlapping banner */}
        <div style={{
          marginTop: isMobile ? '-40px' : '-67px',
          marginBottom: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
          <div style={{
            width: isMobile ? '80px' : '134px',
            height: isMobile ? '80px' : '134px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #fff',
            backgroundColor: '#cfd9de',
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
          <button style={{
            border: '1px solid #cfd9de',
            borderRadius: '20px',
            backgroundColor: '#fff',
            padding: '7px 16px',
            fontWeight: 700,
            fontSize: '15px',
            cursor: 'pointer',
            color: '#0f1419',
            marginBottom: '4px',
          }}>
            Follow
          </button>
        </div>

        {/* Display name and handle */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontWeight: 800, fontSize: isMobile ? '18px' : '20px', color: '#0f1419', lineHeight: '24px' }}>
            {handle.replace('@', '').replace(/^./, (c) => c.toUpperCase())}
          </div>
          <div style={{ fontSize: '15px', color: '#536471', marginTop: '2px' }}>{handle}</div>
        </div>

        {/* Bio (blurred) */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{
            fontSize: '15px',
            color: '#0f1419',
            lineHeight: '20px',
            filter: 'blur(4px)',
            userSelect: 'none',
          }}>
            Analyst | Chicago, IL | Views are my own. Sharing thoughts on markets, sports, and city life.
          </div>
        </div>

        {/* Location + date */}
        <div style={{
          display: 'flex',
          gap: '16px',
          fontSize: '15px',
          color: '#536471',
          marginBottom: '12px',
          flexWrap: 'wrap',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Chicago, IL
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Joined March 2018
          </span>
        </div>

        {/* Following / Followers */}
        <div style={{
          display: 'flex',
          gap: '20px',
          fontSize: '15px',
          color: '#0f1419',
          marginBottom: '16px',
        }}>
          <span>
            <strong style={{ fontWeight: 700 }}>{stats.followingDisplay}</strong>{' '}
            <span style={{ color: '#536471' }}>Following</span>
          </span>
          <span>
            <strong style={{ fontWeight: 700 }}>{stats.followersDisplay}</strong>{' '}
            <span style={{ color: '#536471' }}>Followers</span>
          </span>
        </div>

        {/* Internal Tabs */}
        <div style={{
          borderBottom: '1px solid #eff3f4',
          display: 'flex',
          overflowX: 'auto',
          marginBottom: '0',
        }}>
          {X_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <div
                key={tab}
                onClick={() => handleTabClick(tab)}
                style={{
                  padding: '16px 16px',
                  fontSize: '15px',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? '#0f1419' : '#536471',
                  borderBottom: isActive ? '2px solid #1d9bf0' : '2px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  flexShrink: 0,
                }}
              >
                {tab}
              </div>
            );
          })}
        </div>

        {/* Tweet cards */}
        <div>
          {Array.from({ length: tweetCount }).map((_, i) => {
            const hasImage = i % 3 === 1;
            const age = TWEET_AGES[i % TWEET_AGES.length];
            return (
              <div
                key={i}
                style={{
                  borderBottom: '1px solid #eff3f4',
                  padding: '12px 0',
                  display: 'flex',
                  gap: '12px',
                }}
              >
                {/* Small avatar */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#cfd9de',
                }}>
                  <img
                    src={getFakeImageUrl(resultId, 'avatar')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'blur(10px) saturate(1.5)',
                    }}
                    alt=""
                  />
                </div>

                {/* Tweet body */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Name + handle + time */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '4px',
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      fontWeight: 700,
                      fontSize: '15px',
                      color: '#0f1419',
                      filter: 'blur(5px)',
                      userSelect: 'none',
                    }}>
                      {handle.replace('@', '').replace(/^./, (c) => c.toUpperCase())}
                    </span>
                    <span style={{ fontSize: '15px', color: '#536471', filter: 'blur(5px)', userSelect: 'none' }}>
                      {handle}
                    </span>
                    <span style={{ fontSize: '15px', color: '#536471' }}>· {age}</span>
                  </div>

                  {/* Tweet text (blurred) */}
                  <div style={{
                    fontSize: '15px',
                    color: '#0f1419',
                    lineHeight: '20px',
                    marginBottom: hasImage ? '12px' : '12px',
                    filter: 'blur(5px)',
                    userSelect: 'none',
                  }}>
                    {i % 2 === 0
                      ? 'Excited to share some thoughts on this — great opportunity to learn and connect with others in the field.'
                      : 'Checked out the game last night, what a finish. Always love seeing the city come alive for moments like this.'}
                  </div>

                  {/* Optional image attachment */}
                  {hasImage && (
                    <div style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      border: '1px solid #eff3f4',
                      height: '200px',
                    }}>
                      <img
                        src={getFakeImageUrl(resultId + '_tweet' + i, 'thumbnail')}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'blur(8px) saturate(1.3)',
                        }}
                        alt=""
                      />
                    </div>
                  )}

                  {/* Engagement row */}
                  <div style={{
                    display: 'flex',
                    gap: '24px',
                    color: '#536471',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}>
                      <ReplyIcon />
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}>
                      <RepostIcon />
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}>
                      <LikeIcon />
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}>
                      <ViewsIcon />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer spacer */}
        <div style={{
          textAlign: 'center',
          padding: '32px 0',
          color: '#536471',
          fontSize: '14px',
        }}>
          — End of profile —
        </div>
      </div>
    </div>
  );
};
