import React, { useMemo, useState, useEffect } from 'react';
import { FacebookProfileData, generateFacebookProfile } from '../utils/facebookData';
import { getFakeImageUrl, getPersonaPhotos } from '../utils/fakeImages';

interface FacebookProfileProps {
  resultId: string;
  onClose: () => void;
}

export const FacebookProfileView: React.FC<FacebookProfileProps> = ({ resultId, onClose }) => {
  const [showStickyHeader, setShowStickyHeader] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('All');
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setShowStickyHeader(scrollContainerRef.current.scrollTop > 400);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const profile: FacebookProfileData = useMemo(() => {
    return generateFacebookProfile(resultId);
  }, [resultId]);

  const isAdeeb = resultId.includes('adeeb');

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f0f2f5',
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 1000,
        fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
        overscrollBehavior: 'contain'
      }}
    >
      {/* Top Navbar */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #ddd', position: 'sticky', top: 0, zIndex: 100, height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 8px' : '0 16px' }}>
        {/* Left side: Logo and Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: isMobile ? 'none' : 1 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="#1877f2" style={{ flexShrink: 0 }}><circle cx="20" cy="20" r="20"/><path d="M27.5 20.5h-4.5v14h-5v-14h-3v-4.5h3v-3c0-2.5 1-4.5 4.5-4.5h4.5v4.5h-3v3h3v4.5z" fill="white"/></svg>
          {!isMobile && (
            <div style={{ backgroundColor: '#f0f2f5', borderRadius: '20px', padding: '8px 12px', display: 'flex', alignItems: 'center', width: '240px', height: '40px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#65676b" style={{ marginRight: '8px' }}><path d="M11.435 10.063h-.723l-.256-.247a5.92 5.92 0 001.437-3.87 5.946 5.946 0 10-5.947 5.947 5.92 5.92 0 003.87-1.437l.247.256v.723L14.637 16 16 14.637l-4.565-4.574zm-5.489 0A4.111 4.111 0 011.83 5.946 4.111 4.111 0 016.946 1.83 4.111 4.111 0 0111.057 5.946 4.111 4.111 0 016.946 10.063z"/></svg>
              <input type="text" placeholder="Search Facebook" style={{ background: 'none', border: 'none', fontSize: '15px', outline: 'none', width: '100%' }} />
            </div>
          )}
        </div>

        {/* Center: Main Navigation Icons */}
        {!isMobile && (
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center', height: '100%' }}>
            {[
              { id: 'home', icon: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /> },
              { id: 'friends', icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /> },
              { id: 'watch', icon: <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm-9 12l-4.5-3.5 4.5-3.5v7z" /> },
              { id: 'marketplace', icon: <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2c0 .55.45 1 1 1h1v6h10v-6h4v6h2v-6h1c.55 0 1-.45 1-1zM6 18v-4h6v4H6z" /> },
              { id: 'groups', icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /> }
            ].map((item, index) => (
              <div key={item.id} style={{ 
                width: '100px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer',
                borderBottom: index === 0 ? '3px solid #1877f2' : 'none'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={index === 0 ? "#1877f2" : "#65676b"}>{item.icon}</svg>
              </div>
            ))}
          </div>
        )}

        {/* Right side: Tools and Profile */}
        <div style={{ display: 'flex', gap: '8px', flex: isMobile ? 'none' : 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          {!isMobile && [
            <path key="grid" d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />,
            <path key="msg" d="M12 2C6.48 2 2 6.48 2 12c0 2.02.6 3.9 1.61 5.48L2.03 22l4.52-1.58C8.1 21.4 9.98 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />,
            <path key="bell" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          ].map((iconPath, i) => (
            <div key={i} style={{ width: '40px', height: '40px', backgroundColor: '#e4e6eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#050505">{iconPath}</svg>
            </div>
          ))}
          {!isMobile && (
            <div style={{ position: 'relative' }}>
              <img src={getFakeImageUrl(resultId, 'avatar')} style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', filter: 'blur(4px)' }} alt="" />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', backgroundColor: '#31a24c', borderRadius: '50%', border: '2px solid white' }} />
            </div>
          )}
        </div>
      </div>

      {/* Sticky Profile Header (appears below navbar when scrolled) */}
      {showStickyHeader && (
        <div style={{ 
          backgroundColor: 'white', 
          borderBottom: '1px solid #ddd', 
          position: 'sticky', 
          top: '56px', 
          zIndex: 99, 
          height: '60px', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={getFakeImageUrl(resultId, 'avatar')} style={{ width: '40px', height: '40px', borderRadius: '50%', filter: 'blur(4px)' }} alt="" />
            <span style={{ fontWeight: 600, fontSize: '17px' }}>{profile.name}</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Cover Photo Area */}
          <div style={{ height: isMobile ? '200px' : '400px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '0 0 8px 8px', position: 'relative' }}>
            {isMobile && (
              <img
                src="/back-to-search.png"
                alt="Back to search"
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  height: '100px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              />
            )}
          </div>

          {/* Profile Identity Area */}
          <div style={{ padding: isMobile ? '0 12px 16px' : '0 32px 32px', marginTop: isMobile ? '-24px' : '-32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'flex-end', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <img src={getFakeImageUrl(resultId, 'avatar')} style={{ width: isMobile ? '100px' : '168px', height: isMobile ? '100px' : '168px', borderRadius: '50%', border: '4px solid white', backgroundColor: 'white', filter: 'blur(8px)' }} alt="" />
            </div>
            <div style={{ flex: 1, paddingBottom: isMobile ? '0' : '16px', textAlign: isMobile ? 'center' : 'left' }}>
              <h1 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, margin: 0 }}>{profile.name}</h1>
              <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#65676b', fontWeight: 600 }}>{profile.friends}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: isMobile ? '0' : '16px', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-end' }}>
              <button style={{ backgroundColor: '#1877f2', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: isMobile ? '13px' : '15px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                Add friend
              </button>
              <button style={{ backgroundColor: '#e4e6eb', color: '#050505', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: isMobile ? '13px' : '15px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="black"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.02.6 3.9 1.61 5.48L2.03 22l4.52-1.58C8.1 21.4 9.98 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" /></svg>
                Message
              </button>
              <button style={{ backgroundColor: '#e4e6eb', border: 'none', borderRadius: '6px', padding: '8px 12px' }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </button>
            </div>
            {!isMobile && (
              <img
                src="/back-to-search.png"
                alt="Back to search"
                onClick={onClose}
                style={{
                  height: '200px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                  flexShrink: 0,
                  alignSelf: 'flex-start'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              />
            )}
          </div>

          {/* Profile Tabs */}
          <div style={{ padding: isMobile ? '0 8px' : '0 32px', display: 'flex', borderTop: '1px solid #ddd', overflowX: 'auto' }}>
            {['All', 'About', 'Friends', 'Photos', 'Check-ins', 'More'].map((tab, i) => (
              <div 
                key={tab} 
                onClick={() => tab !== 'More' && setActiveTab(tab)}
                style={{ 
                  padding: '16px 12px', 
                  color: activeTab === tab ? '#1877f2' : '#65676b', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '3px solid #1877f2' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {tab}
                {tab === 'More' && <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1100px', margin: '16px auto', padding: isMobile ? '0 8px' : '0 16px' }}>
        {activeTab === 'All' ? (
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px' }}>
            {/* Left Sidebar: Photos */}
            <div style={{ width: isMobile ? '100%' : '400px', flexShrink: 0 }}>

              {/* Footer Links */}
              <div style={{ color: '#65676b', fontSize: '13px', padding: '0 16px' }}>
                Privacy · Consumer Health Privacy · Terms · Advertising · Ad choices · Cookies · More · Facebook © 2026
              </div>
            </div>

            {/* Right Main Column: Posts */}
            <div style={{ flex: 1 }}>
              <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Posts</h2>
                <button style={{ backgroundColor: '#e4e6eb', border: 'none', borderRadius: '6px', padding: '8px 12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="black"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" /></svg>
                  Filters
                </button>
              </div>

              {/* Specific Profile Picture Update Post */}
              <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', marginBottom: '16px' }}>
                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <img src={getFakeImageUrl(resultId, 'avatar')} style={{ width: '40px', height: '40px', borderRadius: '50%', filter: 'blur(4px)' }} alt="" />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontWeight: 600 }}>{profile.name}</span>
                        <span style={{ color: '#65676b' }}>updated his profile picture.</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#65676b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        6 November 2020 · <svg width="12" height="12" viewBox="0 0 16 16" fill="#65676b"><path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5c-3.59 0-6.5-2.91-6.5-6.5S4.41 1.5 8 1.5 14.5 4.41 14.5 8 11.59 14.5 8 14.5zM8.5 4H7v5h4V7.5H8.5V4z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="#65676b"><path d="M10 12a2 2 0 100-4 2 2 0 000 4zM10 18a2 2 0 100-4 2 2 0 000 4zM10 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
                  </div>
                </div>
                
                <div style={{ padding: '0 0 12px 0' }}>
                  <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', backgroundColor: '#f0f2f5', overflow: 'hidden' }}>
                    <img 
                      src={getFakeImageUrl(resultId, 'avatar')} 
                      style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'blur(8px)'
                      }} 
                      alt="" 
                    />
                  </div>
                </div>

                <div style={{ padding: '8px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
                  </div>
                  <div style={{ display: 'flex', paddingTop: '4px' }}>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'none', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 600, color: '#65676b', cursor: 'pointer' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                      Like
                    </button>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'none', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 600, color: '#65676b', cursor: 'pointer' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                      Comment
                    </button>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'none', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 600, color: '#65676b', cursor: 'pointer' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header for current tab */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>{activeTab}</h2>
                {activeTab === 'Friends' && (
                  <div style={{ backgroundColor: '#f0f2f5', borderRadius: '20px', padding: '8px 12px', display: 'flex', alignItems: 'center', width: '200px' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="#65676b" style={{ marginRight: '8px' }}><path d="M11.435 10.063h-.723l-.256-.247a5.92 5.92 0 001.437-3.87 5.946 5.946 0 10-5.947 5.947 5.92 5.92 0 003.87-1.437l.247.256v.723L14.637 16 16 14.637l-4.565-4.574zm-5.489 0A4.111 4.111 0 011.83 5.946 4.111 4.111 0 016.946 1.83 4.111 4.111 0 0111.057 5.946 4.111 4.111 0 016.946 10.063z"/></svg>
                    <input type="text" placeholder="Search" style={{ background: 'none', border: 'none', fontSize: '14px', outline: 'none', width: '100%' }} />
                  </div>
                )}
              </div>
              <div style={{ padding: '40px 16px', textAlign: 'center', color: '#65676b', borderTop: '1px solid #ddd' }}>
                {activeTab === 'About' && ""}
                {activeTab === 'Friends' && "No friends to show"}
                {activeTab === 'Check-ins' && "No places to show"}
                {activeTab === 'Photos' && (
                  <div style={{ textAlign: 'center', color: '#65676b', padding: '40px 16px' }}>
                    No photos to show
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
      
    </div>
  );
};
