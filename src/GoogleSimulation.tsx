import React, { useState, useMemo, useEffect, useRef } from 'react';
import { TopBar } from './components/TopBar';
import { Tabs } from './components/Tabs';
import { ResultCard } from './components/ResultCard';
import { ResultModal } from './components/ResultModal';
import { LinkedInProfileView as LinkedInProfile } from './components/LinkedInProfile';
import { FacebookProfileView as FacebookProfile } from './components/FacebookProfile';
import { InstagramProfile } from './components/InstagramProfile';
import { XProfile } from './components/XProfile';
import { PeopleAlsoSearchFor } from './components/PeopleAlsoSearchFor';

import {
  RESULTS_Greg_Krieger,
  type SimResult
} from './data/results';
import { getRelatedSearches } from './data/relatedSearches';
import { trackPageView, trackTabChange, trackPagination, trackSearch, trackResultClick, trackEvent, trackProfileView, trackProfileClose, trackSessionEnd, type ProlificParams } from './utils/tracking';

interface GoogleSimulationProps {
  searchType?: 'greg';
}

const GoogleSimulation: React.FC<GoogleSimulationProps> = ({ searchType = 'greg' }) => {
  const [searchQuery, setSearchQuery] = useState('Greg Krieger');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedResult, setSelectedResult] = useState<SimResult | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const resultsPerPage = 10;

  // Capture returnUrl and condition from the initial URL before any rewrites
  const initialParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const returnUrl = useMemo(() => initialParams.get('returnUrl') || 'https://gmusom.pdx1.qualtrics.com/jfe/form/SV_b31xkRd4nrOoMBw', [initialParams]);
  const footprintCondition = useMemo(() => initialParams.get('condition') || 'present', [initialParams]);

  // Capture Prolific parameters from URL
  const prolificParams: ProlificParams = useMemo(() => ({
    prolificPid: initialParams.get('PROLIFIC_PID') || undefined,
    studyId: initialParams.get('STUDY_ID') || undefined,
    sessionIdProlific: initialParams.get('SESSION_ID') || undefined,
  }), [initialParams]);

  // Force light mode as requested
  const isDark = false;

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize history state from URL or defaults
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page') || '1', 10);
    const tab = urlParams.get('tab') || 'All';
    const resultId = urlParams.get('result');
    
    if (page !== currentPage) setCurrentPage(page);
    if (tab !== activeTab) setActiveTab(tab);
    
    // If there's a result ID in URL, find and set it
    if (resultId) {
      const result = RESULTS_Greg_Krieger.find(r => r.id === resultId);
      if (result) setSelectedResult(result);
    }
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        const { page, tab, resultId } = event.state;
        if (page !== undefined) setCurrentPage(page);
        if (tab !== undefined) setActiveTab(tab);
        if (resultId !== undefined) {
          if (resultId) {
            const result = RESULTS_Greg_Krieger.find(r => r.id === resultId);
            setSelectedResult(result || null);
          } else {
            setSelectedResult(null);
          }
        }
      } else {
        // Fallback to URL params
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get('page') || '1', 10);
        const tab = urlParams.get('tab') || 'All';
        const resultId = urlParams.get('result');
        setCurrentPage(page);
        setActiveTab(tab);
        if (resultId) {
          const result = RESULTS_Greg_Krieger.find(r => r.id === resultId);
          setSelectedResult(result || null);
        } else {
          setSelectedResult(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL and history when state changes (but not on initial mount)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams();
    if (returnUrl) params.set('returnUrl', returnUrl);
    if (footprintCondition === 'absent') params.set('condition', 'absent');
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (activeTab !== 'All') params.set('tab', activeTab);
    if (selectedResult) params.set('result', selectedResult.id);
    
    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    const state = {
      page: currentPage,
      tab: activeTab,
      resultId: selectedResult?.id || null
    };

    // Only push state if it's different from current URL
    const currentSearch = window.location.search;
    const newSearch = params.toString() ? `?${params.toString()}` : '';
    if (currentSearch !== newSearch) {
      window.history.pushState(state, '', newUrl);
    }
  }, [currentPage, activeTab, selectedResult, footprintCondition]);

  // Reset to first page when activeTab changes
  useEffect(() => {
    if (activeTab) {
      setCurrentPage(1);
    }
  }, [activeTab]);

  // Track page view on mount
  useEffect(() => {
    trackPageView('greg', currentPage, activeTab, footprintCondition, prolificParams);
  }, []);

  // Track session end when user closes/navigates away
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackSessionEnd('greg', currentPage, activeTab, footprintCondition, prolificParams);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentPage, activeTab, footprintCondition]);

  // Track tab changes (skip first render to avoid spurious event on mount)
  const isFirstTabRender = useRef(true);
  useEffect(() => {
    if (isFirstTabRender.current) {
      isFirstTabRender.current = false;
      return;
    }
    if (activeTab) {
      trackTabChange(activeTab, 'greg', footprintCondition, prolificParams);
    }
  }, [activeTab, footprintCondition]);

  // Track pagination (skip first render to avoid spurious event on mount)
  const isFirstPagRender = useRef(true);
  useEffect(() => {
    if (isFirstPagRender.current) {
      isFirstPagRender.current = false;
      return;
    }
    trackPagination(currentPage, 'greg', footprintCondition, prolificParams);
  }, [currentPage, footprintCondition]);

  // Get results for Greg (filter out LinkedIn/Facebook/Instagram/X in footprint absent condition;
  // also pin canonical target profiles to the top of the SERP via stable sort on isTarget)
  const allResults = useMemo(() => {
    const base = footprintCondition === 'absent'
      ? RESULTS_Greg_Krieger.filter(r => r.platform !== 'LinkedIn' && r.platform !== 'Facebook' && r.platform !== 'Instagram' && r.platform !== 'X')
      : RESULTS_Greg_Krieger;
    return [...base].sort((a, b) => {
      if (a.isTarget && !b.isTarget) return -1;
      if (!a.isTarget && b.isTarget) return 1;
      return 0;
    });
  }, [footprintCondition]);

  // Filter results by active tab
  const filteredResults = useMemo(() => {
    let filtered = allResults;
    if (activeTab !== 'All' && activeTab !== 'Videos' && activeTab !== 'Images' && activeTab !== 'News' && activeTab !== 'Short videos' && activeTab !== 'Shopping') {
      filtered = filtered.filter(result => result.platform === activeTab);
    }
    return filtered;
  }, [allResults, activeTab]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 10;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Safety check
  if (!allResults || allResults.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>No results found</h1>
        <p>Greg Krieger results are not available.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <TopBar 
        searchQuery={searchQuery} 
        onSearchChange={(query) => {
          setSearchQuery(query);
          if (query) {
            trackSearch(query, 'greg', footprintCondition, prolificParams);
          }
        }} 
        isDark={isDark} 
      />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} isDark={isDark} />

      <div style={{ maxWidth: '1128px', margin: '0 auto', padding: isMobile ? '0 8px' : '0 16px' }}>
        {/* Back to survey button - outside the results column */}
        <div style={{ paddingTop: isMobile ? '12px' : '20px', paddingBottom: '8px' }}>
          <button
            onClick={() => {
              if (!returnUrl) {
                console.error('Missing returnUrl query parameter');
                return;
              }
              trackEvent({
                eventType: 'click',
                elementType: 'done_searching_button',
                elementText: 'Done Searching',
                persona: 'greg',
                page: currentPage,
                tab: activeTab,
                condition: footprintCondition,
                ...prolificParams,
              });
              // Build return URL with Prolific params appended
              const finalReturnUrl = new URL(returnUrl);
              if (prolificParams.prolificPid) finalReturnUrl.searchParams.set('PROLIFIC_PID', prolificParams.prolificPid);
              if (prolificParams.studyId) finalReturnUrl.searchParams.set('STUDY_ID', prolificParams.studyId);
              if (prolificParams.sessionIdProlific) finalReturnUrl.searchParams.set('SESSION_ID', prolificParams.sessionIdProlific);
              window.location.href = finalReturnUrl.toString();
            }}
            style={{
              backgroundColor: '#1a73e8',
              border: 'none',
              borderRadius: '24px',
              padding: '12px 24px',
              cursor: 'pointer',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(26, 115, 232, 0.4)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1557b0'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(26, 115, 232, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1a73e8'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(26, 115, 232, 0.4)'; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Done Searching</span>
          </button>
        </div>
        <div style={{ display: 'flex', gap: isMobile ? '0' : '32px' }}>
          {/* Main Results Column */}
          <div style={{ flex: '1', minWidth: 0, width: '100%' }}>
            {/* Results Count */}
            <div style={{ color: '#70757a', fontSize: '14px', marginBottom: '16px' }}>
              About 1,340,000 results (0.42 seconds)
            </div>

            {/* Results List */}
            {filteredResults.length === 0 ? (
              <div style={{ padding: '40px 0', textAlign: 'center' }}>
                <p style={{ color: '#70757a', fontSize: '16px' }}>
                  No results found. Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div>
                {paginatedResults.map((result, index) => {
                  return (
                    <React.Fragment key={result.id}>
                      <ResultCard
                        result={result}
                        onOpen={(result) => {
                          trackResultClick(result.id, result.platform, result.displayName, 'greg', footprintCondition, prolificParams);
                          // In footprint absent condition, no profiles open
                          if (footprintCondition === 'absent') return;
                          // Open overlays only for the canonical TARGET profile of each platform
                          // (namesake/aggregation results stay clickable but silent — trackResultClick already fired above)
                          if (result.isTarget && (result.platform === 'LinkedIn' || result.platform === 'Facebook' || result.platform === 'Instagram' || result.platform === 'X')) {
                            setSelectedResult(result);
                            trackProfileView(result.id, result.platform, result.displayName, 'greg', footprintCondition, prolificParams);
                            // Update URL for result view
                            const params = new URLSearchParams(window.location.search);
                            params.set('result', result.id);
                            window.history.pushState(
                              { page: currentPage, tab: activeTab, resultId: result.id },
                              '',
                              `${window.location.pathname}?${params.toString()}`
                            );
                          }
                        }}
                        isDark={isDark}
                        persona="greg"
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {filteredResults.length > 0 && totalPages > 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '4px',
                marginTop: '32px',
                marginBottom: '32px',
                paddingTop: '20px',
                borderTop: '1px solid #ebebeb',
                flexWrap: 'wrap',
                padding: '20px 8px'
              }}>
                {currentPage > 1 && (
                  <button
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                    }}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #dadce0',
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      color: '#1a0dab',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>‹</span> Previous
                  </button>
                )}

                {getPageNumbers().map((page, index) => {
                  if (page === '...') return <span key={`ellipsis-${index}`} style={{ padding: '0 8px', color: '#70757a' }}>...</span>;
                  const pageNum = page as number;
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                      }}
                      style={{
                        minWidth: '40px',
                        height: '40px',
                        padding: '0 8px',
                        border: '1px solid #dadce0',
                        borderRadius: '4px',
                        backgroundColor: isActive ? '#1a0dab' : 'transparent',
                        color: isActive ? '#fff' : '#1a0dab',
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontWeight: isActive ? 500 : 400
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {currentPage < totalPages && (
                  <button
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                    }}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #dadce0',
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      color: '#1a0dab',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Next <span>›</span>
                  </button>
                )}
              </div>
            )}

            {/* People Also Search For */}
            {activeTab === 'All' && filteredResults.length > 0 && (
              <PeopleAlsoSearchFor 
                searches={getRelatedSearches(searchQuery || 'Michael Johnson')} 
                searchQuery={searchQuery}
                onSearchClick={setSearchQuery}
              />
            )}
          </div>
        </div>
      </div>

      {/* Result Modal, LinkedIn Profile, Facebook Profile, Instagram Profile, or X Profile */}
      {selectedResult && (
        selectedResult.platform === 'LinkedIn' ? (
          <LinkedInProfile
            resultId={selectedResult.id}
            persona="greg"
            condition={footprintCondition}
            prolificParams={prolificParams}
            onClose={() => {
              if (selectedResult) {
                trackProfileClose(selectedResult.id, 'LinkedIn', 'greg', footprintCondition, prolificParams);
              }
              setSelectedResult(null);
              // Update URL when closing result
              const params = new URLSearchParams(window.location.search);
              params.delete('result');
              const newUrl = params.toString()
                ? `${window.location.pathname}?${params.toString()}`
                : window.location.pathname;
              window.history.pushState(
                { page: currentPage, tab: activeTab, resultId: null },
                '',
                newUrl
              );
            }}
          />
        ) : selectedResult.platform === 'Facebook' ? (
          <FacebookProfile
            resultId={selectedResult.id}
            persona="greg"
            condition={footprintCondition}
            prolificParams={prolificParams}
            onClose={() => {
              if (selectedResult) {
                trackProfileClose(selectedResult.id, 'Facebook', 'greg', footprintCondition, prolificParams);
              }
              setSelectedResult(null);
              // Update URL when closing result
              const params = new URLSearchParams(window.location.search);
              params.delete('result');
              const newUrl = params.toString()
                ? `${window.location.pathname}?${params.toString()}`
                : window.location.pathname;
              window.history.pushState(
                { page: currentPage, tab: activeTab, resultId: null },
                '',
                newUrl
              );
            }}
          />
        ) : selectedResult.platform === 'Instagram' ? (
          <InstagramProfile
            resultId={selectedResult.id}
            persona="greg"
            condition={footprintCondition}
            prolificParams={prolificParams}
            onClose={() => {
              if (selectedResult) {
                trackProfileClose(selectedResult.id, 'Instagram', 'greg', footprintCondition, prolificParams);
              }
              setSelectedResult(null);
              // Update URL when closing result
              const params = new URLSearchParams(window.location.search);
              params.delete('result');
              const newUrl = params.toString()
                ? `${window.location.pathname}?${params.toString()}`
                : window.location.pathname;
              window.history.pushState(
                { page: currentPage, tab: activeTab, resultId: null },
                '',
                newUrl
              );
            }}
          />
        ) : selectedResult.platform === 'X' ? (
          <XProfile
            resultId={selectedResult.id}
            persona="greg"
            condition={footprintCondition}
            prolificParams={prolificParams}
            onClose={() => {
              if (selectedResult) {
                trackProfileClose(selectedResult.id, 'X', 'greg', footprintCondition, prolificParams);
              }
              setSelectedResult(null);
              // Update URL when closing result
              const params = new URLSearchParams(window.location.search);
              params.delete('result');
              const newUrl = params.toString()
                ? `${window.location.pathname}?${params.toString()}`
                : window.location.pathname;
              window.history.pushState(
                { page: currentPage, tab: activeTab, resultId: null },
                '',
                newUrl
              );
            }}
          />
        ) : (
          <ResultModal
            result={selectedResult}
            onClose={() => {
              setSelectedResult(null);
              // Update URL when closing result
              const params = new URLSearchParams(window.location.search);
              params.delete('result');
              const newUrl = params.toString()
                ? `${window.location.pathname}?${params.toString()}`
                : window.location.pathname;
              window.history.pushState(
                { page: currentPage, tab: activeTab, resultId: null },
                '',
                newUrl
              );
            }}
          />
        )
      )}
    </div>
  );
};

export default GoogleSimulation;
