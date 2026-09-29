import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    try {
      window.localStorage.clear();
      window.sessionStorage.clear();
    } catch {
      // ignore
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFAF5] text-[#52321B] flex flex-col items-center justify-center p-6 text-center">
          <h1 className="font-serif-display text-3xl font-bold mb-2">
            Abbasi Bakers &amp; Sweets
          </h1>
          <p className="text-sm text-[#52321B]/80 mb-4">
            Refreshing menu and bakery storefront...
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="py-2.5 px-6 bg-[#52321B] text-white text-xs font-semibold uppercase tracking-widest"
          >
            Reload Storefront
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);
