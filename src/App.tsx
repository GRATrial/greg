import React, { Component, ErrorInfo, ReactNode } from 'react';
import GoogleSimulation from './GoogleSimulation';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff', minHeight: '100vh' }}>
          <h1 style={{ color: '#d32f2f' }}>Something went wrong</h1>
          <p style={{ color: '#666' }}>{this.state.error?.message || 'Unknown error'}</p>
          <pre style={{ textAlign: 'left', background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {this.state.error?.stack}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              marginTop: '20px', 
              padding: '10px 20px', 
              backgroundColor: '#1976d2', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  // Add a simple check to see if we can render at all
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <GoogleSimulation searchType="greg" />
      </div>
    </ErrorBoundary>
  );
}

export default App;
