import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  onOpenLeadForm: (pathway: 'investor' | 'partner' | 'brief') => void;
  customLogoUrl?: string | null;
}

const NAV_ITEMS = [
  { id: 'problem', label: 'The Problem' },
  { id: 'solution', label: 'Our Solution' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'impact', label: 'Impact' },
  { id: 'business-model', label: 'Business Model' },
  { id: 'investors', label: 'Investors' },
];

export const Navigation: React.FC<NavigationProps> = ({
  onNavigate,
  onOpenLeadForm,
  customLogoUrl,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#FAF8F2]/95 backdrop-blur-md border-b border-[#171A18]/10 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Zone (Single element, no subtitle badges) */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#086B3A] rounded-sm shrink-0"
        >
          <BrandLogo size="md" customLogoUrl={customLogoUrl} />
        </a>

        {/* Zone 2: Centre/Right Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#171A18]/80"
        >
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`relative py-1 whitespace-nowrap hover:text-[#086B3A] transition-colors duration-150 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#086B3A] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#086B3A] ${
                idx >= 5 ? 'hidden xl:inline-block' : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('prototype')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#171A18] hover:text-[#086B3A] border border-[#171A18]/20 hover:border-[#086B3A] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086B3A]"
          >
            Explore the Hub
          </button>
          <button
            type="button"
            onClick={() => onOpenLeadForm('partner')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#086B3A] hover:bg-[#064B2D] active:translate-y-[0.5px] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086B3A]"
          >
            Partner With Us
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center">
          <button
            ref={menuBtnRef}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2.5 rounded-lg text-[#171A18] hover:bg-[#171A18]/5 focus-visible:outline-2 focus-visible:outline-[#086B3A]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#FAF8F2] border-b border-[#171A18]/15 px-4 pt-3 pb-6 shadow-xl"
        >
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="px-3 py-3 text-base font-medium text-[#171A18] hover:bg-[#086B3A]/8 hover:text-[#086B3A] rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-[#777D77]" />
              </a>
            ))}
            <a
              href="#prototype"
              onClick={(e) => handleNavClick(e, 'prototype')}
              className="px-3 py-3 text-base font-medium text-[#171A18] hover:bg-[#086B3A]/8 hover:text-[#086B3A] rounded-lg transition-colors flex items-center justify-between"
            >
              <span>Meet the Prototype</span>
              <ArrowRight className="w-4 h-4 text-[#777D77]" />
            </a>
          </nav>

          <div className="mt-5 pt-4 border-t border-[#171A18]/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('prototype');
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-[#171A18] border border-[#171A18]/25 rounded-lg text-center hover:border-[#086B3A]"
            >
              Explore the Hub
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadForm('partner');
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#086B3A] hover:bg-[#064B2D] rounded-lg text-center"
            >
              Partner With Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
