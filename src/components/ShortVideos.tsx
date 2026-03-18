import React from 'react';
import { getFakeVideoThumbnail } from '../utils/fakeImages';

interface VideoResult {
  id: string;
  title: string;
  source: string;
  duration: string;
  views: string;
  thumbnailKey?: string;
}

interface ShortVideosProps {
  videos: VideoResult[];
}

export const ShortVideos: React.FC<ShortVideosProps> = ({ videos }) => {
  if (videos.length === 0) return null;

  return (
    <div style={{ marginTop: '32px', marginBottom: '32px' }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: 400,
        color: '#202124',
        marginBottom: '16px',
        lineHeight: '1.3'
      }}>
        Short videos
      </h2>
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: '8px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#dadce0 transparent'
      }}>
        {videos.map((video) => (
          <div
            key={video.id}
            style={{
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #dadce0',
              transition: 'box-shadow 0.2s',
              flexShrink: 0,
              width: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#e8eaed' }}>
              <img
                src={getFakeVideoThumbnail(video.id)}
                alt=""
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(2px)'
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.1)'
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#fff" opacity={0.8}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                fontSize: '12px',
                padding: '2px 4px',
                borderRadius: '2px',
                fontWeight: 500
              }}>
                {video.duration}
              </div>
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#1a0dab',
                margin: '0 0 4px 0',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {video.title}
              </h3>
              <div style={{
                fontSize: '12px',
                color: '#5f6368',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {video.source === 'Instagram' && (
                  <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.513c-2.03 0-3.675-1.645-3.675-3.675 0-2.03 1.645-3.675 3.675-3.675 2.03 0 3.675 1.645 3.675 3.675 0 2.03-1.645 3.675-3.675 3.675zm4.961-10.405c0 .731-.592 1.323-1.322 1.323s-1.322-.592-1.322-1.323.592-1.323 1.322-1.323 1.322.592 1.322 1.323z"/>
                    </svg>
                  </div>
                )}
                {video.source}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#70757a'
              }}>
                {video.views}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

