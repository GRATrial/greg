import React, { useMemo, useState, useEffect } from 'react';
import { LinkedInProfileData, generateLinkedInProfile, getCompanyLogoUrl } from '../utils/linkedInData';
import { getFakeImageUrl } from '../utils/fakeImages';

interface LinkedInProfileProps {
  resultId: string;
  onClose: () => void;
}

const GMU_LOGO_BASE64 = "data:image/webp;base64,UklGRsYAAABXRUJQVlA4ILoAAAAwAwCdASoQABAAAsBMJbACdEf/2QkSmjxZxdUZDl/uEZMwAP74QFVX4aan10wAL8LMAoUfXwYg9C3UgbsHOjZhASY3kkc5sSH9Uv4T7M6GP1LFCIlOzHrwW3/co2Y/kpExLUXxx+IfPEDq7l5edW4zIAWRA+w973mo8vajKyPIgGQu12Aq3xPKtDmJQfomDZMKEVcWcKMP1tySPY6dwVsQYT/0Xod6ynOc3DqDXs+5a3P9blrys+QAAAA=";
const IISC_LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAvUlEQVR4AWJwL/ChKx4kFo5aOGrhqIXc9jMB7ZSxEYAgDEVdgA0YwknYgVnoWYEZHMPSEZzBATDFL/5xCUXurKR4TUjyTBSr0Acqzi7lrAlZiXfUPFa/zWoKgnAr8UN7SBANYWPhYRU7hEGNsxDSCAJNvAtJKAzileWgoFfmfJzt5keDd+SdMM4n9AuzW4ikDBJJzJWiptE6TxLOV0rJzFcr9V8Lv1AvLnRlbgb5Sal5aGNjTVk/7yVcwp8KX6F5uqmlE5zGAAAAAElFTkSuQmCC";
const GWU_LOGO_BASE64 = "data:image/webp;base64,UklGRpgBAABXRUJQVlA4IIwBAACQCACdASogABsAPtEutFooIagoGAEAGglsAJ0ygzM1g7HgRwKfyxVH909R7PR9FewIMs7uah206j27PfVohMCz5NL2jSa/x3sni5nJAAD+1RbuaL1WJbfz8NJtqQS2cSY/6tFh8hlWm33EySdm6c9FgAF7G4Pb3zcEmmsUgOoms07Z0YjYDGfHmkc6pCpq2XPSNv2K0izqsLAhoXj1lHtXUt/lsKef0qhhGWvdNev/yVV+zniPnTbKomu0Ocrfx//Q8nJj5tDqvMLTq++dkEf4v/6065ncNqnECOz8m6x9PcGeGL/style={ width: '100%', height: '100%', objectFit: 'contain' } 3wazagNgv/wrOx1cpCxKivL3KPoS28ubQJe0m7EY+6+B2bxyVI3CMJyU7C4GC4ae4Zesus5aJup+VM2BeCXbtcG8nr65vTetBedF/FTdogyvgmlNli3hJisVGTOTAl3CRW48DPbcoO2UYtM+Rcu8L+8zl9nkkzAK5u+pLKFqH++of3788IpgYYGedTj2fXaI/LgtO49nnPuUR8OtoQBDMjcIrTekAAA=";
const DC_GOV_LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAM0lEQVR4AWP4TyKgh4bW1v8MYBIG8IswAFlQBAP4RRggWpGl8YiQ5wcGEhCNNYxoP5AIAMbUHWN1n/uoAAAAAElFTkSuQmCC";
const RAMAIAH_LOGO_URL = "https://upload.wikimedia.org/wikipedia/en/5/5a/Ramaiah_Institutions_Logo.png";
const CHICAGO_INVESTMENT_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc1LTc3NzctNzc3Nzc3NzcuKzc3Ny01NzU3NzcrLSs1NzUrNzc3Nzc3KzUuNTU3N//AABEIACAAIAMBIgACEQEDEQH/xAAZAAEBAAMBAAAAAAAAAAAAAAAGBQMEBwH/xAAsEAACAQMDAgUCBwAAAAAAAAABAgMABBESITFBUQUTYXGxkeEUIjIzNHJz/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAMEAv/EABkRAAIDAQAAAAAAAAAAAAAAAAABAgMhEf/aAAwDAQACEQMRAD8A6v4zbRJM10YtghLkrqDHjGM7VMOifUEtYdCrqYBSpIG5PseMd6v+MRq9k5kk0xLu44BHvR8CAyDzLvW3neWGLE/kzkN9cj771ltXJFoPD1THEELWkIjlGpFIJIB65HQbbetUfB7eKWaO6EW2nKkLpCnjvvnf2qa4gSRjFd6XEoj1AkDGrc88cdTV7wWNUs1MchaJv0DOcDJ6+vNK12Qk8N2aMSxPG3DAg0ZjjuXjDG8bLKucRr1x6dwDSmjtv+yn9I/kVS1ajiBguI7qOGR/xhJCqTmNd989u+9JYIxDCkYOQqgZPWoN7/Gn/wA1+aRUrXGxN4f/2Q==";
const MIDWEST_CAPITAL_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAA+0lEQVR4AWJwL/ChKx5BFgbNDOZgADBP3kYIA0EUpRM8BRBRgwjVBHbrUKQOKEEl4GN1cC3gycXuzMcbueVGwQP5t7baJ2bNGCDHPuPIfVUhPhzFYPAcMe1Spd+Sf5wbZWE8eYRrxkHkgQ1hgOvXe9uXYIxNoXO9jh7aE2JgCiTEug3mXbIiZFGHiZiJptAwJJm8yDzIlIQxiCSv0Jep/FI2jzmrCV+H4K1HQEcIyUNPXG3h9rV0Ui68qC5cfxmAvb4Q05dSWM8sBPFCgDKHfxKih/GEEJEc5xFGOUktnDEuU8eK1DEwhHsKwpQgCEJJZ0CO3ctGXruUrhgAPCIEzKkNgO0AAAAASUVORK5CYII=";
const UMICH_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAApVBMVEUALWIALGIAHmQAG2QAJGUAJmQAK2PvzAb/1AD/2ABvbUsAIWVWWlL30wAsPVzsyBL/0QD/zwb2zwUAJ2MTMGHPtCO8pS3dwxSViT58d0fkyQqQg0FJUVafkTqLgEPjwRbXuR//0gAmPlo2SVfgvB94c0gAAGkADWiEe0XHryaajTz4ywzAqiokOV6umTQAFGdmZk7/2gD/4wC0njFdXk9fYE4zRFkLAycKAAAA5UlEQVR4AdSQxYHEMAwADWGUnGVmZuq/tIus5a3g5uXJxCj+HVJpwmFzrSjv3oQflIRRTOYkIVmacZUyB0QEkxVCeBUraD4jBtVYCl0L8COKukEibGjVDLm1KPLUdsC1k/Eg6HIiVI++AUJ/MEQAivoZY4o5B+j3fyP0RwZoxfEEfmOupyFi2J71P6KcL2yc1YJgOZ/TzNXs+UK10nFd7encuFF1jQj9zda7R39oL7LbJ4d9+0hjSL9faKeKIm6HXy+UHonTWQkRN05Hy/OFLpbruHTvdmWrSMEUjP3Xu4v822BMeQAvIhpCP1fdtwAAAABJRU5ErkJggg==";

// Company color map for fallback icons
const companyColors: Record<string, string> = {
  'M': '#1a5276', 'C': '#1e8449', 'G': '#d35400', 'N': '#6c3483',
  'L': '#2e86c1', 'U': '#f1c40f', 'J': '#e74c3c', 'K': '#27ae60',
  'F': '#3498db', 'S': '#e67e22', 'A': '#8e44ad', 'B': '#16a085',
  'D': '#c0392b', 'E': '#2980b9', 'H': '#d68910', 'I': '#1abc9c',
  'O': '#7d3c98', 'P': '#2471a3', 'Q': '#a93226', 'R': '#229954',
  'T': '#0e6655', 'V': '#ca6f1e', 'W': '#5b2c6f', 'X': '#1a5276',
  'Y': '#117a65', 'Z': '#922b21'
};

const getCompanyColor = (name: string) => {
  const initial = name.charAt(0).toUpperCase();
  return companyColors[initial] || '#0a66c2';
};

const CompanyLogo: React.FC<{ company: string; size?: number }> = ({ company, size = 48 }) => {
  const [imgError, setImgError] = React.useState(false);
  const initial = company.charAt(0).toUpperCase();
  const bgColor = getCompanyColor(company);

  // Check for companies with provided base64 logos first
  const base64Logos: Record<string, string> = {
    'Chicago Investment': CHICAGO_INVESTMENT_LOGO,
    'Midwest Capital': MIDWEST_CAPITAL_LOGO,
    'University of Michigan': UMICH_LOGO,
  };
  const matchedBase64 = Object.entries(base64Logos).find(([key]) => company.includes(key));
  if (matchedBase64) {
    return (
      <div style={{ width: `${size}px`, height: `${size}px`, backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
        <img src={matchedBase64[1]} style={{ width: '80%', height: '80%', objectFit: 'contain' }} alt="" />
      </div>
    );
  }

  // Known real companies that have Clearbit logos  
  const realCompanyDomains: Record<string, string> = {
    'Microsoft': 'microsoft.com',
    'Amazon': 'amazon.com',
    'Google': 'google.com',
    'Apple': 'apple.com',
    'Meta': 'meta.com',
    'Salesforce': 'salesforce.com',
    'Oracle': 'oracle.com',
    'IBM': 'ibm.com',
    'Deloitte': 'deloitte.com',
    'University of Michigan': 'umich.edu',
    'Kforce': 'kforce.com',
    'Michael Page': 'michaelpage.com',
    'George Washington University': 'gwu.edu',
    'Georgetown University': 'georgetown.edu',
  };

  const matchedDomain = Object.entries(realCompanyDomains).find(([key]) => company.includes(key));
  
  if (!matchedDomain || imgError) {
    return (
      <div style={{ 
        width: `${size}px`, height: `${size}px`, backgroundColor: bgColor, 
        borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        flexShrink: 0, color: 'white', fontWeight: 'bold', fontSize: `${Math.round(size * 0.4)}px`
      }}>
        {initial}
      </div>
    );
  }

  const logoUrl = `https://logo.clearbit.com/${matchedDomain[1]}?size=${size}`;

  return (
    <div style={{ 
      width: `${size}px`, height: `${size}px`, backgroundColor: '#fff', 
      borderRadius: '4px', border: '1px solid #e0e0e0', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 
    }}>
      <img src={logoUrl} style={{ width: '80%', height: '80%', objectFit: 'contain' }} alt="" onError={() => setImgError(true)} />
    </div>
  );
};

export const LinkedInProfileView: React.FC<LinkedInProfileProps> = ({ resultId, onClose }) => {
  const [showStickyHeader, setShowStickyHeader] = React.useState(false);
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

  const profile: LinkedInProfileData = useMemo(() => {
    return generateLinkedInProfile(resultId);
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
        backgroundColor: '#f3f2ef',
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 1000,
        fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif',
        overscrollBehavior: 'contain'
      }}
    >
      {/* Navigation Bar */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1128px', margin: '0 auto', height: '52px', display: 'flex', alignItems: 'center', padding: isMobile ? '0 8px' : '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ borderRadius: '4px', flexShrink: 0 }}>
              <rect width="34" height="34" rx="4" fill="#0a66c2" />
              <path d="M26.5 24.5h-3.555v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H15.351V14h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM9.337 11.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H7.555V14h3.564v10.452z" fill="white" />
            </svg>
            {!isMobile && (
              <div style={{ position: 'relative', width: '280px' }}>
                <input type="text" placeholder="Search" style={{ width: '100%', padding: '8px 12px 8px 36px', backgroundColor: '#edf3f8', border: 'none', borderRadius: '4px', fontSize: '14px' }} />
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.435 10.063h-.723l-.256-.247a5.92 5.92 0 001.437-3.87 5.946 5.946 0 10-5.947 5.947 5.92 5.92 0 003.87-1.437l.247.256v.723L14.637 16 16 14.637l-4.565-4.574zm-5.489 0A4.111 4.111 0 011.83 5.946 4.111 4.111 0 016.946 1.83 4.111 4.111 0 0111.057 5.946 4.111 4.111 0 016.946 10.063z"/></svg>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '24px' }}>
            {!isMobile && [
              { label: 'Home', icon: <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7z" /> },
              { label: 'My Network', icon: <path d="M12 16a4 4 0 114-4 4 4 0 01-4 4zm7-9a3 3 0 113-3 3 3 0 01-3 3zm3 15h-1v-2a3 3 0 00-3-3H7a3 3 0 00-3 3v2H3v-2a5 5 0 015-5h8a5 5 0 015 5z" /> },
              { label: 'Jobs', icon: <path d="M17 6V4a2 2 0 00-2-2H9a2 2 0 00-2 2v2H2v13a2 2 0 002 2h16a2 2 0 002-2V6h-5zM9 4h6v2H9V4zm11 15H4V8h16v11z" /> },
              { label: 'Messaging', icon: <path d="M20 2H4a2 2 0 00-2 2v12a2 2 0 002 2h14l4 4V4a2 2 0 00-2-2z" /> },
              { label: 'Notifications', icon: <path d="M18 16v-5a6 6 0 00-12 0v5l-2 2v1h16v-1zM14 20a2 2 0 01-4 0z" /> },
              { label: 'Me', icon: <circle cx="12" cy="12" r="10" /> }
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#666', cursor: 'pointer', opacity: i === 0 ? 1 : 0.6 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">{item.icon}</svg>
                <span style={{ fontSize: '12px', marginTop: '4px' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Profile Header */}
      {showStickyHeader && (
        <div style={{ 
          backgroundColor: '#ffffff', 
          borderBottom: '1px solid #e0e0e0', 
          position: 'sticky', 
          top: '52px', 
          zIndex: 99, 
          height: '52px', 
          display: 'flex', 
          alignItems: 'center', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
        }}>
          <div style={{ maxWidth: '1128px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 8px' : '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
              <img src={getFakeImageUrl(resultId, 'avatar')} style={{ width: '32px', height: '32px', borderRadius: '50%', filter: 'blur(4px)', flexShrink: 0 }} alt="" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile.name}</div>
                <div style={{ fontSize: '12px', color: '#666', maxWidth: isMobile ? '150px' : '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile.headline}</div>
              </div>
            </div>
            {!isMobile && (
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button style={{ backgroundColor: 'white', color: '#666', border: '1px solid #666', borderRadius: '16px', padding: '4px 12px', fontWeight: 600, fontSize: '14px' }}>More</button>
                <button style={{ backgroundColor: 'white', color: '#0a66c2', border: '1px solid #0a66c2', borderRadius: '16px', padding: '4px 12px', fontWeight: 600, fontSize: '14px' }}>Message</button>
                <button style={{ backgroundColor: '#0a66c2', color: 'white', border: 'none', borderRadius: '16px', padding: '4px 12px', fontWeight: 600, fontSize: '14px' }}>+ Follow</button>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1128px', margin: '24px auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '24px', padding: isMobile ? '0 8px' : '0 24px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header Card */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{ height: isMobile ? '120px' : '200px', backgroundColor: '#d0d7de', position: 'relative' }}>
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
            <div style={{ padding: isMobile ? '0 12px 16px' : '0 24px 24px', position: 'relative' }}>
              <div style={{ marginTop: isMobile ? '-60px' : '-112px', marginBottom: '16px' }}>
                <div style={{ position: 'relative', width: isMobile ? '100px' : '160px', height: isMobile ? '100px' : '160px' }}>
                  <img src={getFakeImageUrl(resultId, 'avatar')} style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid white', objectFit: 'cover', filter: 'blur(8px)' }} alt="" />
                  {isAdeeb && (
                    <div style={{ 
                      position: 'absolute', 
                      inset: -4, 
                      borderRadius: '50%', 
                      border: '6px solid #b7d6c5', 
                      borderTopColor: 'transparent', 
                      borderLeftColor: 'transparent', 
                      transform: 'rotate(-45deg)' 
                    }} />
                  )}
                  {isAdeeb && (
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '-10px',
                      backgroundColor: 'white',
                      borderRadius: '20px',
                      padding: '4px 12px',
                      border: '1px solid #e0e0e0',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#01754f',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      #OPENTOWORK
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <h1 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 600, margin: 0 }}>{profile.name}</h1>
                    {isAdeeb && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a66c2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    )}
                    
                  </div>
                  <div style={{ fontSize: '16px', marginTop: '4px', maxWidth: '500px' }}>{profile.headline}</div>
                  <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                    {profile.location}
                  </div>
                  <div style={{ color: '#0a66c2', fontWeight: 600, fontSize: '14px', marginTop: '4px' }}>
                    {profile.link}
                  </div>
                  <div style={{ color: '#0a66c2', fontWeight: 600, fontSize: '14px', marginTop: '8px' }}>
                    {profile.followers} followers · {profile.connections} connections
                  </div>
                </div>
                {isAdeeb && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '240px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={GMU_LOGO_BASE64} style={{ width: '32px', height: '32px', objectFit: 'contain' }} alt="GMU" />
                      <span style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.2 }}>George Mason University - Costello College of Business</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={GMU_LOGO_BASE64} style={{ width: '32px', height: '32px', objectFit: 'contain' }} alt="GMU" />
                      <span style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.2 }}>George Mason University</span>
                    </div>
                  </div>
                )}
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
              <div style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
                <button style={{ backgroundColor: '#0a66c2', color: 'white', border: 'none', borderRadius: '24px', padding: '6px 16px', fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>+ Follow</button>
                <button style={{ backgroundColor: 'white', color: '#0a66c2', border: '1px solid #0a66c2', borderRadius: '24px', padding: '6px 16px', fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>Message</button>
                <button style={{ backgroundColor: 'white', color: '#666', border: '1px solid #666', borderRadius: '24px', padding: '6px 16px', fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}>More</button>
              </div>

              {/* Open to work card */}
              {isAdeeb && (
                <div style={{ backgroundColor: '#dde7f1', borderRadius: '8px', padding: '12px 16px', marginTop: '20px' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Open to work</div>
                  <div style={{ fontSize: '14px' }}>Data Analyst and Data Scientist roles</div>
                  <div style={{ color: '#0a66c2', fontWeight: 600, fontSize: '14px', marginTop: '4px', cursor: 'pointer' }}>Show details</div>
                </div>
              )}
            </div>
          </div>

          {/* About Section */}
          {profile.about && (
            <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '24px', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>About</h2>
              <div style={{ fontSize: '14px', lineHeight: 1.5, color: '#333' }}>
                {profile.about.length > 200 ? (
                  <>
                    {profile.about.substring(0, 200)} <span style={{ color: '#666', cursor: 'pointer' }}>...see more</span>
                  </>
                ) : (
                  profile.about
                )}
              </div>
            </div>
          )}

          {/* Activity Section */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '24px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Activity</h2>
                <div style={{ color: '#0a66c2', fontWeight: 600, fontSize: '14px', marginTop: '4px' }}>875 followers</div>
              </div>
              <button style={{ backgroundColor: 'white', color: '#0a66c2', border: '1px solid #0a66c2', borderRadius: '24px', padding: '6px 16px', fontWeight: 600 }}>+ Follow</button>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button style={{ backgroundColor: '#01754f', color: 'white', border: 'none', borderRadius: '16px', padding: '4px 12px', fontWeight: 600, fontSize: '14px' }}>Posts</button>
              <button style={{ backgroundColor: 'white', color: '#666', border: '1px solid #e0e0e0', borderRadius: '16px', padding: '4px 12px', fontWeight: 600, fontSize: '14px' }}>Comments</button>
            </div>

            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {profile.activity.map((act, i) => (
                <div key={i} style={{ minWidth: '240px', flex: 1, border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' }}>
                  <div style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <img src={getFakeImageUrl(resultId, 'avatar')} style={{ width: '32px', height: '32px', borderRadius: '50%', filter: 'blur(4px)' }} alt="" />
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 600 }}>{profile.name} <span style={{ color: '#666', fontWeight: 400 }}>· 3rd+</span></div>
                          <div style={{ fontSize: '10px', color: '#666' }}>Graduate Research Assistant @ Georg...</div>
                          <div style={{ fontSize: '10px', color: '#666' }}>{act.time} · <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5c-3.59 0-6.5-2.91-6.5-6.5S4.41 1.5 8 1.5 14.5 4.41 14.5 8 11.59 14.5 8 14.5zM8.5 4H7v5h4V7.5H8.5V4z"/></svg></div>
                        </div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#666"><path d="M12 8a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z"/></svg>
                    </div>
                    <div style={{ fontSize: '12px', marginBottom: '8px', height: '48px', overflow: 'hidden' }}>{act.content}</div>
                    <div style={{ backgroundColor: '#f3f2ef', borderRadius: '4px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {act.image === 'starting-new-position' ? (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#89a8cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                        </div>
                      ) : act.image === 'hackathon' ? (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>
                          Group photo
                        </div>
                      ) : (
                        <div style={{ color: '#999' }}>Image</div>
                      )}
                    </div>
                  </div>
                  <div style={{ padding: '8px 12px', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', color: '#666' }}>{act.likes} reactions · {act.comments} comments</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #e0e0e0', marginTop: '16px', padding: '12px 0 0', textAlign: 'center' }}>
              <span style={{ color: '#666', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>{"Show all activity ->"}</span>
            </div>
          </div>

          {/* Experience Section */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '24px', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {profile.experience.map((exp, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px' }}>
                  {exp.company.includes('George Mason') ? (
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={GMU_LOGO_BASE64} style={{ width: '80%', height: '80%', objectFit: 'contain' }} alt="" />
                    </div>
                  ) : exp.company.includes('IISc') ? (
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={IISC_LOGO_BASE64} style={{ width: '80%', height: '80%', objectFit: 'contain' }} alt="" />
                    </div>
                  ) : (
                    <CompanyLogo company={exp.company.split(' · ')[0]} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 600 }}>{exp.title}</div>
                    <div style={{ fontSize: '14px' }}>{exp.company}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{exp.duration}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{exp.location}</div>
                    {exp.description && (
                      <div style={{ marginTop: '8px', fontSize: '14px', color: '#333' }}>
                        {exp.description.map((d, j) => (
                          <div key={j} style={{ marginBottom: '4px', display: 'flex', gap: '8px' }}>
                            <span style={{ color: '#666' }}>•</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '24px', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {profile.education.map((edu, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px' }}>
                  {edu.school.includes('George Mason') ? (
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={GMU_LOGO_BASE64} style={{ width: '80%', height: '80%', objectFit: 'contain' }} alt="" />
                    </div>
                  ) : edu.school.includes('Ramaiah') ? (
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={RAMAIAH_LOGO_URL} style={{ width: '80%', height: '80%', objectFit: 'contain' }} alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  ) : (
                    <CompanyLogo company={edu.school} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 600 }}>{edu.school}</div>
                    <div style={{ fontSize: '14px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{edu.years}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Licenses & Certifications */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '24px', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Licenses & certifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <CompanyLogo company="AWS" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: 600 }}>AWS Academy Graduate - AWS Academy Data Engineering</div>
                  <div style={{ fontSize: '14px' }}>Amazon Web Services (AWS)</div>
                  <button style={{ marginTop: '8px', border: '1px solid #666', borderRadius: '16px', backgroundColor: 'white', color: '#666', padding: '4px 12px', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Show credential <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <CompanyLogo company="Google Cloud" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: 600 }}>Perform Foundational Infrastructure Tasks in Google Cloud</div>
                  <div style={{ fontSize: '14px' }}>Qwiklabs</div>
                  <button style={{ marginTop: '8px', border: '1px solid #666', borderRadius: '16px', backgroundColor: 'white', color: '#666', padding: '4px 12px', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Show credential <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                  </button>
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #e0e0e0', marginTop: '16px', padding: '12px 0 0', textAlign: 'center' }}>
              <span style={{ color: '#666', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>{"Show all 8 licenses & certifications ->"}</span>
            </div>
          </div>

          {/* Volunteering */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '24px', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Volunteering</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <CompanyLogo company="Google Developer" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: 600 }}>Core Member</div>
                  <div style={{ fontSize: '14px' }}>Google Developer Student Clubs, Ramaiah Institute of Technology</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>May 2022 - Jun 2024 · 2 yrs 2 mos</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Science and Technology</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <CompanyLogo company="ClutchRIT Esports" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: 600 }}>Senior Coordinator</div>
                  <div style={{ fontSize: '14px' }}>ClutchRIT Esports</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Feb 2023 - Jun 2024 · 1 yr 5 mos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '24px', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>Graphic Design</div>
                <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <img src={getFakeImageUrl(resultId, 'avatar')} style={{ width: '24px', height: '24px', borderRadius: '50%', filter: 'blur(3px)' }} alt="" />
                  Snapchat Opinion Leader at Under 25
                </div>
              </div>
              <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '16px' }}>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>Augmented Reality (AR)</div>
                <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <img src={getFakeImageUrl(resultId, 'avatar')} style={{ width: '24px', height: '24px', borderRadius: '50%', filter: 'blur(3px)' }} alt="" />
                  Snapchat Opinion Leader at Under 25
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #e0e0e0', marginTop: '16px', padding: '12px 0 0', textAlign: 'center' }}>
              <span style={{ color: '#666', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>{"Show all 12 skills ->"}</span>
            </div>
          </div>

          {/* Interests */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '24px', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Interests</h2>
            <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #e0e0e0', marginBottom: '16px' }}>
              {['Companies', 'Groups', 'Newsletters', 'Schools'].map((tab, i) => (
                <div key={tab} style={{ 
                  padding: '8px 0', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  color: i === 0 ? '#01754f' : '#666', 
                  borderBottom: i === 0 ? '2px solid #01754f' : 'none',
                  cursor: 'pointer'
                }}>{tab}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <CompanyLogo company="Kforce Inc" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Kforce Inc</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>1,078,443 followers</div>
                  <button style={{ marginTop: '8px', border: '1px solid #666', borderRadius: '16px', backgroundColor: 'white', color: '#666', padding: '4px 12px', fontWeight: 600, fontSize: '14px' }}>+ Follow</button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <CompanyLogo company="Michael Page" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Michael Page</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>4,136,806 followers</div>
                  <button style={{ marginTop: '8px', border: '1px solid #666', borderRadius: '16px', backgroundColor: 'white', color: '#666', padding: '4px 12px', fontWeight: 600, fontSize: '14px' }}>+ Follow</button>
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #e0e0e0', marginTop: '16px', padding: '12px 0 0', textAlign: 'center' }}>
              <span style={{ color: '#666', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>{"Show all companies ->"}</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: isMobile ? '100%' : '300px', flexShrink: 0 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '16px', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>More profiles for you</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {profile.suggestedProfiles.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', borderBottom: i < profile.suggestedProfiles.length - 1 ? '1px solid #e0e0e0' : 'none', paddingBottom: '12px' }}>
                  <img src={getFakeImageUrl(p.seed, 'avatar')} style={{ width: '48px', height: '48px', borderRadius: '50%', filter: 'blur(5px)' }} alt="" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{p.name} <span style={{ color: '#666', fontWeight: 400 }}>· {p.company}</span></div>
                    <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.2', marginTop: '2px', height: '2.4em', overflow: 'hidden' }}>{p.title}</div>
                    <button style={{ marginTop: '8px', border: '1px solid #666', borderRadius: '24px', backgroundColor: 'white', color: '#666', padding: '4px 16px', fontWeight: 600, fontSize: '14px' }}>
                      {i === 0 ? '+ Follow' : 'Message'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <span style={{ color: '#666', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Show all</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '16px', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>People you may know</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { name: 'Pravallika Avula', title: 'Database Administrator at Pittsburgh Regional Transit', seed: 'pravallika' },
                { name: 'Harika k', title: 'Analyst', seed: 'harika' },
                { name: 'Stephanie Lopez', title: 'Shift Team Lead at Mom & Pop', seed: 'stephanie' }
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #e0e0e0', paddingBottom: '12px' }}>
                  <img src={getFakeImageUrl(p.seed, 'avatar')} style={{ width: '48px', height: '48px', borderRadius: '50%', filter: 'blur(5px)' }} alt="" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{p.name} <svg width="12" height="12" viewBox="0 0 24 24" fill="#666"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
                    <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.2' }}>{p.title}</div>
                    <button style={{ marginTop: '8px', border: '1px solid #666', borderRadius: '24px', backgroundColor: 'white', color: '#666', padding: '4px 16px', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <span style={{ color: '#666', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Show all</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
