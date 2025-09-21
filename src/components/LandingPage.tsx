'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import type { Theme, CrackleEffect, ParallaxOffset } from '@/types';

export default function LandingPage() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [crackles, setCrackles] = useState<CrackleEffect[]>([]);
  // const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [hueOffset, setHueOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      // setMousePos({ x: e.clientX, y: e.clientY });
      setOffset({ x, y });
      
      // Mouse-based hue offset for gradient color changes
      const hueX = (e.clientX / window.innerWidth) * 360;
      const hueY = (e.clientY / window.innerHeight) * 180;
      setHueOffset({ x: hueX, y: hueY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  };

  const handleCrackle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newCrackle: CrackleEffect = {
      id: Date.now(),
      x,
      y
    };
    
    setCrackles(prev => [...prev, newCrackle]);
    
    setTimeout(() => {
      setCrackles(prev => prev.filter(c => c.id !== newCrackle.id));
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setSubmitted(true);
    // Here you would typically send the email to your backend
  };

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-[#0a0a0d]' : 'bg-[#f0e7d8]',
    text: theme === 'dark' ? 'text-white' : 'text-[#1a1a17]',
    textMuted: theme === 'dark' ? 'text-white/70' : 'text-[#1a1a17]/70',
    glass: theme === 'dark' ? 'glass-dark' : 'glass-light',
    border: theme === 'dark' ? 'border-white/10' : 'border-[#1a1a17]/10',
    emerald: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
  };

  return (
    <div className={clsx('min-h-screen transition-colors duration-300 relative', themeClasses.bg, themeClasses.text)}>
      {/* Global Background Effects - Behind All Content */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Global Colored Hue Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute transition-all duration-200 ease-out"
            style={{
              left: '-100%',
              top: '-100%',
              width: '300%',
              height: '300%',
              transform: `translate3d(${offset.x * 25 + Math.min(scrollY * 0.03, 120)}px, ${offset.y * 25 + Math.min(scrollY * 0.02, 80)}px, 0)`,
              background: `
                radial-gradient(circle at ${25 + offset.x * 6}% ${15 + offset.y * 4}%, 
                  hsl(${280 + hueOffset.x * 0.15}, 65%, 35%) 0%, 
                  transparent 40%),
                radial-gradient(circle at ${75 + offset.x * 4}% ${85 + offset.y * 6}%, 
                  hsl(${160 + hueOffset.y * 0.2}, 65%, 30%) 0%, 
                  transparent 40%),
                radial-gradient(circle at ${50 + offset.x * 5}% ${50 + offset.y * 5}%, 
                  hsl(${320 + hueOffset.x * 0.12}, 60%, 25%) 0%, 
                  transparent 45%)
              `,
              opacity: 0.18,
            }}
          />
        </div>
        
        {/* Global Square Grid Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className={clsx(
              "absolute transition-transform duration-150 ease-out",
              theme === 'dark' 
                ? "bg-[linear-gradient(transparent_94%,rgba(255,255,255,0.025)_94%),linear-gradient(90deg,transparent_94%,rgba(255,255,255,0.025)_94%)]"
                : "bg-[linear-gradient(transparent_94%,rgba(26,26,23,0.025)_94%),linear-gradient(90deg,transparent_94%,rgba(26,26,23,0.025)_94%)]"
            )}
            style={{
              left: '-100%',
              top: '-100%',
              width: '300%',
              height: '300%',
              backgroundSize: '24px 24px',
              transform: `translate3d(${offset.x * 12 + Math.min(scrollY * 0.025, 100)}px, ${offset.y * 12 + Math.min(scrollY * 0.035, 140)}px, 0)`,
              opacity: 0.25,
            }}
          />
        </div>
      </div>
      
      {/* Header */}
      <header className={clsx(
        'sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300',
        themeClasses.glass,
        themeClasses.border
      )}>
        <div className={clsx(
          "absolute inset-0 bg-[size:20px_20px] opacity-40",
          theme === 'dark'
            ? "bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.08)_95%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.08)_95%)]"
            : "bg-[linear-gradient(transparent_95%,rgba(26,26,23,0.08)_95%),linear-gradient(90deg,transparent_95%,rgba(26,26,23,0.08)_95%)]"
        )} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(157,78,221,0.25),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.25),transparent_35%),radial-gradient(circle_at_60%_80%,rgba(56,189,248,0.2),transparent_35%)] blur-3xl opacity-70" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={theme === 'dark' ? '/rhytm-logo-dark.png' : '/rhytm-logo-light.png'}
              alt="RHYTM Logo"
              width={160}
              height={90}
              className="h-22 w-auto"
              priority
            />
          </div>
          
          {/* Mobile Hamburger Menu Button */}
          <button 
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className={clsx(
              "w-6 h-0.5 bg-current transition-all duration-300",
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            )}></div>
            <div className={clsx(
              "w-6 h-0.5 bg-current transition-all duration-300",
              mobileMenuOpen ? "opacity-0" : ""
            )}></div>
            <div className={clsx(
              "w-6 h-0.5 bg-current transition-all duration-300",
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            )}></div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how" className="font-bold hover:text-emerald-400 transition-colors">
              How it works
              <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a href="#features" className="font-bold hover:text-emerald-400 transition-colors">
              Features
              <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a href="#waitlist" className="font-bold hover:text-emerald-400 transition-colors">
              Waiting list
              <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-sm transition-colors duration-200',
                theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-[#1a1a17]/10 hover:bg-[#1a1a17]/20'
              )}
            >
              Dark • {theme === 'dark' ? 'On' : 'Off'}
            </button>
            <a 
              href="#waitlist"
              className={clsx(
                'px-3 py-1.5 rounded-lg border transition-all duration-200 hover:-translate-y-0.5',
                theme === 'dark' 
                  ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200' 
                  : 'bg-emerald-600/20 border-emerald-600/40 text-emerald-800'
              )}
            >
              Join Beta
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={clsx(
          'md:hidden fixed top-[7rem] left-0 right-0 z-40 border-b transition-all duration-300',
          themeClasses.glass,
          themeClasses.border
        )}>
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            <a 
              href="#how" 
              className="block font-bold hover:text-emerald-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it works
            </a>
            <a 
              href="#features" 
              className="block font-bold hover:text-emerald-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#waitlist" 
              className="block font-bold hover:text-emerald-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Waiting list
            </a>
            <div className="pt-4 border-t border-white/10">
              <button 
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className={clsx(
                  'w-full px-3 py-2 rounded-lg text-sm transition-colors duration-200 text-left',
                  theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-[#1a1a17]/10 hover:bg-[#1a1a17]/20'
                )}
              >
                Dark • {theme === 'dark' ? 'On' : 'Off'}
              </button>
              <a 
                href="#waitlist"
                className={clsx(
                  'block w-full mt-3 px-3 py-2 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 text-center',
                  theme === 'dark' 
                    ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200' 
                    : 'bg-emerald-600/20 border-emerald-600/40 text-emerald-800'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Beta
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        className="relative overflow-hidden flex items-center min-h-[81vh] cursor-pointer transition-all duration-75 ease-out z-10"
        onClick={handleCrackle}
        style={{
          transform: `translateY(${scrollY * -0.4}px)`,
          opacity: Math.max(0.1, 1 - scrollY / 600),
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute transition-all duration-100 ease-out"
            style={{
              left: '-50%',
              top: '-50%',
              width: '200%',
              height: '200%',
              transform: `translate3d(${offset.x * 40 + scrollY * 0.3}px, ${offset.y * 40 + scrollY * 0.2}px, 0)`,
              background: `
                radial-gradient(circle at ${20 + offset.x * 10}% ${10 + offset.y * 5}%, 
                  hsl(${280 + hueOffset.x * 0.2}, 70%, 60%) 0%, 
                  transparent 35%),
                radial-gradient(circle at ${80 + offset.x * 5}% ${20 + offset.y * 10}%, 
                  hsl(${160 + hueOffset.y * 0.3}, 70%, 55%) 0%, 
                  transparent 35%),
                radial-gradient(circle at ${60 + offset.x * 8}% ${80 + offset.y * 6}%, 
                  hsl(${200 + hueOffset.x * 0.15}, 70%, 65%) 0%, 
                  transparent 35%)
              `,
              opacity: 0.5,
            }}
          />
          <div 
            className={clsx(
              "absolute bg-[size:20px_20px] opacity-40 transition-transform duration-75 ease-out",
              theme === 'dark' 
                ? "bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.08)_95%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.08)_95%)]"
                : "bg-[linear-gradient(transparent_95%,rgba(26,26,23,0.08)_95%),linear-gradient(90deg,transparent_95%,rgba(26,26,23,0.08)_95%)]"
            )}
            style={{
              left: '-50%',
              top: '-50%',
              width: '200%',
              height: '200%',
              transform: `translate3d(${offset.x * 20 + scrollY * 0.1}px, ${offset.y * 20 + scrollY * 0.15}px, 0)`,
            }}
          />
        </div>

        {/* Crackle Effects */}
        {crackles.map(crackle => (
          <div
            key={crackle.id}
            className="absolute w-4 h-4 border-2 border-emerald-400 rounded-full animate-crackle pointer-events-none"
            style={{
              left: crackle.x,
              top: crackle.y,
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-4xl font-bold gradient-text leading-tight">
              Stop wasting time.<br />
              Find the perfect tracks.
            </h1>
            
            <p className={clsx('mt-3 md:text-base leading-relaxed', themeClasses.textMuted)}>
              AI-powered curation for aspiring and veteran DJs. Tell us your vibe, and we'll surface tracks that fit your style — fast.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#waitlist"
                className="bg-emerald-500 text-black px-5 py-3 rounded-xl font-semibold hover:-translate-y-0.5 transition-transform duration-200 text-center"
              >
                Join the waiting list
              </a>
              <a 
                href="#demo"
                className={clsx(
                  'px-5 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 text-center',
                  theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-[#1a1a17]/10 hover:bg-[#1a1a17]/20'
                )}
              >
                Watch demo
              </a>
            </div>
            
            <ul className={clsx('space-y-2 pt-6 text-sm', themeClasses.textMuted)}>
              <li>• Cut through thousands of tracks with AI that understands your play style.</li>
              <li>• Get recommendations that match your BPM, key, genre and vibe.</li>
              <li>• Auto-sync to Beatport DJ — exporting is just the fallback.</li>
            </ul>
          </div>

          {/* Right Column - Visual */}
          <div className="relative flex justify-center">
            <div 
              className="relative"
              style={{
                transform: `translate3d(${offset.x * 15}px, ${offset.y * 15}px, 0)`,
              }}
            >
              <Image
                src="/hero-headphones.png"
                alt="DJ Headphones with vibrant colors and music elements"
                width={553}
                height={553}
                className="w-[460px] h-[460px] md:w-[553px] md:h-[553px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            
            {/* Floating Musical Notes */}
            {[
              { symbol: '♪', color: 'text-emerald-400', pos: 'top-8 right-8', delay: '0s' },
              { symbol: '♫', color: 'text-blue-400', pos: 'top-20 left-8', delay: '0.5s' },
              { symbol: '♪', color: 'text-purple-400', pos: 'top-4 left-1/2', delay: '1s' },
              { symbol: '♫', color: 'text-cyan-400', pos: 'top-1/2 -left-4', delay: '1.5s' },
              { symbol: '♪', color: 'text-yellow-400', pos: 'top-1/2 -right-6', delay: '2s' },
              { symbol: '♫', color: 'text-pink-400', pos: 'bottom-12 left-4', delay: '2.5s' },
              { symbol: '♪', color: 'text-rose-400', pos: 'bottom-8 right-12', delay: '3s' },
              { symbol: '♫', color: 'text-indigo-400', pos: 'bottom-16 left-1/2', delay: '3.5s' },
            ].map((note, i) => (
              <div
                key={i}
                className={clsx(
                  'absolute text-2xl pointer-events-none animate-bounce',
                  note.color,
                  note.pos
                )}
                style={{
                  animationDelay: note.delay,
                  animationDuration: '3s',
                }}
              >
                {note.symbol}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section 
        className="relative py-4 z-20 transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${Math.max(-50, scrollY * -0.3 + 50)}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Mobile Layout - Vertical Stack */}
          <div className="lg:hidden space-y-6">
            {/* 1. DJ Frustrated Image */}
            <div className="flex justify-center">
              <div className="relative w-101 h-101">
                <Image
                  src="/dj frustrated looking for vynil tracks.png"
                  alt="DJ frustrated looking for vinyl tracks"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* 2. Problem Description */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                Too many tracks. Too little time.
              </h2>
              <p className={clsx('text-lg leading-relaxed', themeClasses.textMuted)}>
                Sifting through endless lists wastes creative energy. Most tracks aren't right for your style — or your next set.
              </p>
              <ul className="space-y-4 text-left max-w-2xl mx-auto">
                {[
                  { 
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                    ), 
                    text: 'Hours lost scrolling and sampling.' 
                  },
                  { 
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                      </svg>
                    ), 
                    text: 'Good music buried under noise.' 
                  },
                  { 
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                        <path d="M6 8h2"/>
                        <path d="M6 12h3"/>
                        <path d="M6 16h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                        <path d="M6 20h2"/>
                      </svg>
                    ), 
                    text: 'Hard to explore new directions that still fit your personality.' 
                  },
                ].map((item, i) => (
                  <li key={i} className={clsx('flex items-center gap-4', themeClasses.textMuted)}>
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. DJ Computer Image */}
            <div className="flex justify-center">
              <div className="relative w-101 h-101">
                <Image
                  src="/dj digging for tracks online.png"
                  alt="DJ digging for tracks online"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* 4. Solution Text */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold gradient-text">
                Beatport Curator solves this.
              </h3>
              <p className={clsx('leading-relaxed', themeClasses.textMuted)}>
                Our AI learns your DJ profile and vibe instructions, filters out the noise, and puts the right tracks front and center.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  { label: 'Time saved / wk', value: '5–10h' },
                  { label: 'Irrelevant tracks', value: '−80%' },
                  { label: 'Fresh finds', value: '+3×' },
                  { label: 'Set readiness', value: 'Faster' },
                ].map((tile, i) => (
                  <div key={i} className={clsx('rounded-xl p-4 text-center', themeClasses.glass, themeClasses.border)}>
                    <div className="text-lg font-bold gradient-text">{tile.value}</div>
                    <div className={clsx('text-sm mt-1', themeClasses.textMuted)}>{tile.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout - 2x2 Grid */}
          <div className="hidden lg:block space-y-4">
            {/* Top Row */}
            <div className="grid grid-cols-2 gap-12 items-center">
              {/* Left - Problem Description */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                  Too many tracks. Too little time.
                </h2>
                <p className={clsx('text-lg leading-relaxed', themeClasses.textMuted)}>
                  Sifting through endless lists wastes creative energy. Most tracks aren't right for your style — or your next set.
                </p>
                <ul className="space-y-4">
                  {[
                    { 
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12,6 12,12 16,14"/>
                        </svg>
                      ), 
                      text: 'Hours lost scrolling and sampling.' 
                    },
                    { 
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="m21 21-4.35-4.35"/>
                        </svg>
                      ), 
                      text: 'Good music buried under noise.' 
                    },
                    { 
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                          <path d="M6 8h2"/>
                          <path d="M6 12h3"/>
                          <path d="M6 16h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                          <path d="M6 20h2"/>
                        </svg>
                      ), 
                      text: 'Hard to explore new directions that still fit your personality.' 
                    },
                  ].map((item, i) => (
                    <li key={i} className={clsx('flex items-center gap-4', themeClasses.textMuted)}>
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right - DJ Frustrated Image */}
              <div className="flex justify-center">
                <div className="relative w-115 h-115">
                  <Image
                    src="/dj frustrated looking for vynil tracks.png"
                    alt="DJ frustrated looking for vinyl tracks"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-2 gap-12 items-center">
              {/* Left - DJ Computer Image */}
              <div className="flex justify-center">
                <div className="relative w-115 h-115">
                  <Image
                    src="/dj digging for tracks online.png"
                    alt="DJ digging for tracks online"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Right - Solution Text Box (No Grey Background) */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold gradient-text">
                  Beatport Curator solves this.
                </h3>
                <p className={clsx('leading-relaxed', themeClasses.textMuted)}>
                  Our AI learns your DJ profile and vibe instructions, filters out the noise, and puts the right tracks front and center.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Time saved / wk', value: '5–10h' },
                    { label: 'Irrelevant tracks', value: '−80%' },
                    { label: 'Fresh finds', value: '+3×' },
                    { label: 'Set readiness', value: 'Faster' },
                  ].map((tile, i) => (
                    <div key={i} className={clsx('rounded-xl p-4 text-center', themeClasses.glass, themeClasses.border)}>
                      <div className="text-lg font-bold gradient-text">{tile.value}</div>
                      <div className={clsx('text-sm mt-1', themeClasses.textMuted)}>{tile.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className={clsx('relative overflow-hidden py-20 border-y z-10', themeClasses.glass, themeClasses.border)}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Header */}
          <div className="space-y-4 mb-16">
            {/* Custom DJ Turntable Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-emerald-400">
                  <circle cx="24" cy="24" r="20" stroke="url(#turntable-gradient)" strokeWidth="2" fill="none"/>
                  <circle cx="24" cy="24" r="12" stroke="url(#turntable-gradient)" strokeWidth="2" fill="none"/>
                  <circle cx="24" cy="24" r="4" fill="url(#turntable-gradient)"/>
                  <path d="M24 4v8M24 36v8M4 24h8M36 24h8" stroke="url(#turntable-gradient)" strokeWidth="1" opacity="0.6"/>
                  <defs>
                    <linearGradient id="turntable-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9D4EDD" />
                      <stop offset="50%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#56CCF2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">How it Works</h2>
            <p className={clsx('text-lg max-w-2xl mx-auto', themeClasses.textMuted)}>
              Get started in three simple steps and transform your music discovery process
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {[
              {
                number: 1,
                title: 'Connect',
                description: 'Secure OAuth to Beatport. Sync your library & playlists.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                )
              },
              {
                number: 2,
                title: 'Tell your vibe',
                description: 'Genres, BPM range, keys, artists you like — or just type it in natural language.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/>
                    <circle cx="18" cy="16" r="3"/>
                  </svg>
                )
              },
              {
                number: 3,
                title: 'Get the good stuff',
                description: 'Curated tracks matched to your style. Add to Collections and auto-sync to Beatport DJ.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                    <path d="M20 3v4"/>
                    <path d="M22 5h-4"/>
                    <path d="M4 17v2"/>
                    <path d="M5 18H3"/>
                  </svg>
                )
              }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-6 group max-w-2xl mx-auto text-left">
                {/* Number Badge */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xl flex items-center justify-center">
                    {step.number}
                  </div>
                  {/* Icon Badge */}
                  <div className={clsx(
                    'absolute -top-2 -right-2 w-8 h-8 rounded-full border flex items-center justify-center',
                    themeClasses.glass,
                    themeClasses.border,
                    themeClasses.emerald
                  )}>
                    {step.icon}
                  </div>
                  {/* Connector Line */}
                  {i < 2 && (
                    <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-emerald-400/50 to-transparent" />
                  )}
                </div>
                
                {/* Content */}
                <div className="pt-2">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className={clsx('text-sm leading-relaxed', themeClasses.textMuted)}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-12">
            <a 
              href="#waitlist"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-black px-8 py-4 rounded-xl text-lg font-semibold hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
            >
              Start Your Journey
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>
            </a>
            <p className={clsx('text-sm mt-4', themeClasses.textMuted)}>
              Join thousands of DJs already using RHYTM
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative overflow-hidden py-20 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Everything you need to curate faster
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'AI Recommendations',
                description: 'Learns your style from likes, skips, collections and vibe prompts.'
              },
              {
                title: 'Natural Language Search',
                description: 'Ask for \'peak-time melodic techno 126–128 BPM, 8A\' and get spot-on results.'
              },
              {
                title: 'Auto Sync to Beatport DJ',
                description: 'Primary workflow: one click, your collection becomes a Beatport DJ playlist.'
              },
              {
                title: 'Compact Discover Table',
                description: '# · ▶ · Title · Artists · Genre · BPM · Key · Actions. Sticky top menus & filters.'
              },
              {
                title: 'Offline & Queue',
                description: 'Work on the go. Changes sync when you\'re back online.'
              },
              {
                title: 'Export Fallbacks',
                description: 'CSV, M3U, JSON when you need manual workflows.'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={clsx(
                  'rounded-2xl p-4 border hover:-translate-y-0.5 hover:shadow-md transition-all duration-200',
                  themeClasses.glass,
                  themeClasses.border
                )}
              >
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className={clsx('text-sm', themeClasses.textMuted)}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className={clsx('relative overflow-hidden py-20 border-y z-10', themeClasses.glass, themeClasses.border)}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Trusted by DJs Worldwide
            </h2>
            <p className={clsx('text-lg', themeClasses.textMuted)}>
              Join thousands of DJs who've transformed their music discovery
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'I save hours every week and still push my sound in the direction I want.',
                author: 'Resident DJ',
                image: '/dj-portrait-1.jpg'
              },
              {
                quote: 'It finally surfaces tracks that actually fit my style, not just what\'s trending.',
                author: 'Aspiring DJ',
                image: '/dj-portrait-2.jpg'
              },
              {
                quote: 'Consistent quality selections, faster — this shortens prep for every set.',
                author: 'Newcomer DJ',
                image: '/dj-portrait-3.jpg'
              }
            ].map((testimonial, i) => (
              <div 
                key={i} 
                className={clsx(
                  'rounded-2xl p-6 border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 group',
                  themeClasses.glass,
                  themeClasses.border
                )}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-emerald-400/20 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.author} Portrait`}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <blockquote className={clsx('text-sm leading-relaxed', themeClasses.textMuted)}>
                    "{testimonial.quote}"
                  </blockquote>
                  <cite className="text-sm font-semibold not-italic">
                    — {testimonial.author}
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="relative overflow-hidden min-h-[80vh] flex items-center py-20 z-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Beta Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold">LIMITED BETA ACCESS</span>
          </div>

          {/* Title */}
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text leading-tight">
              Be the First to Experience<br />
              <span className="text-3xl md:text-5xl">The Future of DJ Curation</span>
            </h1>
            <p className={clsx('text-xl max-w-3xl mx-auto', themeClasses.textMuted)}>
              Join the exclusive beta and get <span className="text-emerald-400 font-semibold">50% off</span> when we launch. Only <span className="text-pink-400 font-semibold">500 spots</span> available for early access.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Early Access',
                description: 'Be among the first 500 to try RHYTM before public launch',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12l2 2 4-4"/>
                  </svg>
                )
              },
              {
                title: '50% Discount',
                description: 'Lifetime discount on your subscription when we launch',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                )
              },
              {
                title: 'Shape the Product',
                description: 'Your feedback directly influences our development roadmap',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6"/>
                    <path d="M21 12h-6m-6 0H3"/>
                  </svg>
                )
              }
            ].map((benefit, i) => (
              <div key={i} className={clsx('rounded-2xl p-6 space-y-4', themeClasses.glass, themeClasses.border)}>
                <div className="flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className={clsx('text-sm', themeClasses.textMuted)}>{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to secure your spot"
                  className={clsx(
                    'w-full px-6 py-4 rounded-2xl border-2 text-lg transition-all duration-200 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none',
                    theme === 'dark' 
                      ? 'bg-white/10 placeholder-white/50 text-white border-white/20' 
                      : 'bg-[#1a1a17]/10 placeholder-[#1a1a17]/50 text-[#1a1a17] border-[#1a1a17]/20'
                  )}
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                    <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>
              
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black px-8 py-4 rounded-2xl text-lg font-bold hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] transition-all duration-200"
              >
                Secure My Beta Spot
                <svg className="inline w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          ) : (
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold gradient-text">Welcome to the Beta!</h3>
              <p className={clsx('text-lg', themeClasses.textMuted)}>
                You're now on the list! We'll send you exclusive updates and your early access invitation soon.
              </p>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-8 space-y-4">
            <div className={clsx('flex items-center justify-center gap-2 text-sm', themeClasses.textMuted)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Your email is safe with us. No spam, ever.
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className={clsx('flex items-center gap-2', themeClasses.textMuted)}>
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                2,847 DJs already joined
              </div>
              <div className={clsx('flex items-center gap-2', themeClasses.textMuted)}>
                <div className="w-2 h-2 bg-pink-400 rounded-full" />
                Only 500 spots left
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={clsx('relative overflow-hidden border-t z-10', themeClasses.glass, themeClasses.border)}>
        <div className={clsx(
          "absolute inset-0 bg-[size:20px_20px] opacity-40",
          theme === 'dark'
            ? "bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.08)_95%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.08)_95%)]"
            : "bg-[linear-gradient(transparent_95%,rgba(26,26,23,0.08)_95%),linear-gradient(90deg,transparent_95%,rgba(26,26,23,0.08)_95%)]"
        )} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(157,78,221,0.25),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.25),transparent_35%),radial-gradient(circle_at_60%_80%,rgba(56,189,248,0.2),transparent_35%)] blur-3xl opacity-70" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className={clsx('text-sm', themeClasses.textMuted)}>
            <p>© 2025 RHYTM</p>
            <p className="text-xs">A brand owned by Sky Walker Enterprise</p>
          </div>
          
          <nav className="flex gap-6 mt-4 md:mt-0">
            {[
              { text: 'About', href: '#' },
              { text: 'Privacy', href: '/privacy' },
              { text: 'Terms', href: '/terms' }
            ].map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                className={clsx('text-sm hover:text-emerald-400 transition-colors', themeClasses.textMuted)}
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}