import React, { useState, useEffect } from 'react';
import { trackImageClick } from '../utils/tracking';

interface ImageItem {
  id: string;
  title: string;
  source: string;
  imageUrl: string;
}

interface ImagesSectionProps {
  images: ImageItem[];
  isDark?: boolean;
  persona?: string;
}

export const ImagesSection: React.FC<ImagesSectionProps> = ({ images, isDark, persona = 'greg' }) => {
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
  const borderColor = isDark ? '#3c4043' : '#ebebeb';
  const subTextColor = isDark ? '#9aa0a6' : '#70757a';
  const linkColor = isDark ? '#8ab4f8' : '#1a0dab';

  return (
    <div style={{ 
      marginBottom: '32px', 
      marginTop: '16px', 
      borderTop: `1px solid ${borderColor}`, 
      paddingTop: '24px' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: 400,
          color: textColor,
          margin: 0
        }}>
          Images
        </h2>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: subTextColor }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '12px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => trackImageClick(image.id, image.title, persona)}
            style={{
              flexShrink: 0,
              cursor: 'pointer',
              width: isMobile ? '140px' : '160px'
            }}
          >
            <div style={{
              width: '100%',
              height: isMobile ? '140px' : '160px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '8px',
              backgroundColor: isDark ? '#3c4043' : '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              border: `1px solid ${borderColor}`
            }}>
              <img
                src={image.imageUrl}
                alt={image.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              fontSize: '14px',
              color: textColor,
              lineHeight: '1.3',
              marginBottom: '2px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: '36px'
            }}>
              {image.title}
            </div>
            <div style={{
              fontSize: '12px',
              color: subTextColor,
              lineHeight: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '4px'
            }}>
              {image.source === 'Facebook' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877f2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )}
              {image.source === 'LinkedIn' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0077b5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              )}
              {image.source === 'Instagram' && (
                <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.513c-2.03 0-3.675-1.645-3.675-3.675 0-2.03 1.645-3.675 3.675-3.675 2.03 0 3.675 1.645 3.675 3.675 0 2.03-1.645 3.675-3.675 3.675zm4.961-10.405c0 .731-.592 1.323-1.322 1.323s-1.322-.592-1.322-1.323.592-1.323 1.322-1.323 1.322.592 1.322 1.323z"/>
                  </svg>
                </div>
              )}
              <span>{image.source}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        style={{
          marginTop: '16px',
          padding: '10px 24px',
          border: `1px solid ${isDark ? '#5f6368' : '#dadce0'}`,
          borderRadius: '24px',
          backgroundColor: isDark ? 'transparent' : '#f8f9fa',
          color: isDark ? '#e8eaed' : '#202124',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? '#3c4043' : '#f1f3f4';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? 'transparent' : '#f8f9fa';
        }}
      >
        Show more images
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </button>
    </div>
  );
};
