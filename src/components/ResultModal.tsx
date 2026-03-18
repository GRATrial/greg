import React from 'react';
import { SimResult } from '../data/results';
import { getFakeImageUrl } from '../utils/fakeImages';

interface ResultModalProps {
  result: SimResult | null;
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large header image */}
        <img
          src={getFakeImageUrl(result.id, 'header')}
          alt=""
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            marginBottom: '16px',
            backgroundColor: '#dadce0'
          }}
        />
        <div style={{ padding: '0 24px 24px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 400, margin: '0 0 8px 0', color: '#202124' }}>
                {result.displayName}
              </h2>
              <p style={{ fontSize: '14px', color: '#5f6368', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {result.platform === 'LinkedIn' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0077b5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                {result.platform === 'Facebook' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877f2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )}
                {result.platform === 'Instagram' && (
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.513c-2.03 0-3.675-1.645-3.675-3.675 0-2.03 1.645-3.675 3.675-3.675 2.03 0 3.675 1.645 3.675 3.675 0 2.03-1.645 3.675-3.675 3.675zm4.961-10.405c0 .731-.592 1.323-1.322 1.323s-1.322-.592-1.322-1.323.592-1.323 1.322-1.323 1.322.592 1.322 1.323z"/>
                    </svg>
                  </div>
                )}
                {result.platform} · {result.urlLike}
              </p>
            </div>
            <button
              onClick={onClose}
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
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f3f4'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '14px', color: '#4d5156', lineHeight: '1.58', margin: '0 0 12px 0' }}>
              {result.snippet}
            </p>
            {result.location && (
              <p style={{ fontSize: '14px', color: '#5f6368', margin: '0 0 12px 0' }}>
                Location: {result.location}
              </p>
            )}
          </div>
          <div style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#5f6368'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong style={{ color: '#202124' }}>Discoverability:</strong> {result.discoverability}
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong style={{ color: '#202124' }}>Footprint:</strong> {result.footprint}
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: '#202124' }}>Race:</strong> {result.race}
            </p>
          </div>
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #dadce0' }}>
            <p style={{ fontSize: '12px', color: '#5f6368', margin: 0 }}>
              <strong style={{ color: '#202124' }}>Disclaimer:</strong> This is a fictional profile for research simulation only. No real data is displayed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

