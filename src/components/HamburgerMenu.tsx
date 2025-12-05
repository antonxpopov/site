import { useState, useCallback } from 'react';
import { useThrottledScroll } from '../hooks/useThrottledScroll';
import type { NavLink } from '../types';
import { SCROLL_THRESHOLDS } from '../constants/animations';

const NAV_LINKS: NavLink[] = [
  { label: 'Home', to: '#home' },
  { label: 'About me', to: '#about' },
  { label: 'Artworks', to: '#artworks' },
  { label: 'Blog', to: '#blog' },
  { label: 'Contacts', to: '#contacts' },
];

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useThrottledScroll(() => {
    try {
      const sections = NAV_LINKS.map(link => link.to.substring(1));
      const scrollPosition = window.scrollY + SCROLL_THRESHOLDS.ACTIVE_SECTION_OFFSET;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    } catch (error) {
      console.error('Error in scroll handler:', error);
    }
  }, 100);

  const handleMenuClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      {/* Hamburger Button */}
      <button
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        className="fixed top-6 left-6 z-50 md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-text-muted"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`block w-6 h-0.5 bg-text rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-text rounded mt-1 transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-text rounded mt-1 transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>
      {/* Overlay Menu */}
      <div
        className={`fixed inset-0 bg-black/80 z-40 flex flex-col items-center justify-center gap-6 text-xl font-mono transition-all duration-300 md:hidden ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={handleMenuClose}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {NAV_LINKS.map(({ label, to }) => (
          <a 
            key={to} 
            href={to} 
            className={`text-text hover:text-accent transition-all duration-200 ${activeSection === to ? 'text-accent font-medium' : ''}`}
            onClick={handleMenuClose}
            aria-current={activeSection === to ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </div>
      {/* Desktop Nav (sticky/top) */}
      <nav className="hidden md:flex gap-8 fixed top-8 left-1/2 -translate-x-1/2 z-30 rounded-full px-8 py-2" aria-label="Main navigation">
        {NAV_LINKS.map(({ label, to }) => (
          <a 
            key={to} 
            href={to} 
            className={`text-text hover:text-accent font-mono text-base px-2 py-1 rounded transition-all duration-200 ${activeSection === to ? 'text-accent font-medium' : ''}`}
            aria-current={activeSection === to ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </>
  );
}

