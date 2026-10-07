import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, SlidersHorizontal, Check } from 'lucide-react';
import {
  GENERATED_IMAGES,
  TractionMetric,
} from '../config/agripowerConfig';
import { ResilientImage } from './ResilientImage';
import { BrandLogo } from './BrandLogo';

interface HeroSectionProps {
  tractionMetrics: TractionMetric[];
  onUpdateTraction: (id: string, newValue: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenLeadForm: (pathway: 'investor' | 'partner' | 'brief') => void;
  customLogoUrl?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  tractionMetrics,
  onUpdateTraction,
  onNavigate,
  onOpenLeadForm,
  customLogoUrl,
}) => {
  const [heroView, setHeroView] = useState<'ground' | 'aerial'>('ground');
  const [editingTraction, setEditingTraction] = useState(false);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative pt-24 md:pt-32 pb-16 md:pb-24 border-b border-[#171A18]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Kicker — Clean Unboxed Text (Zero-Pill Discipline) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#086B3A] mb-5"
        >
          <span>Betapawa AgriPower™</span>
          <span aria-hidden="true" className="text-[#777D77]">·</span>
          <span className="text-[#171A18]/80">
            Distributed clean-energy infrastructure for Africa&apos;s food economy.
          </span>
          <span aria-hidden="true" className="text-[#777D77]">·</span>
          <span className="text-[#777D77]">
            Powering Food. Powering Income. Powering Resilience.
          </span>
        </motion.div>

        {/* Main Hero Grid: Left Editorial Proposition, Right/Bottom Cinematic Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-[#171A18] leading-[1.08] text-balance"
            >
              Africa doesn&apos;t just need more energy.{' '}
              <span className="font-serif italic font-normal text-[#086B3A]">
                Its food systems need energy that creates value.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base sm:text-lg text-[#171A18]/80 leading-relaxed max-w-2xl"
            >
              Betapawa AgriPower brings reliable solar power, cold storage,
              irrigation and agro-processing together in one modular hub—helping
              farming communities preserve more food, improve productivity and
              capture more economic value.
            </motion.p>

            {/* Core Commercial Principle Callout */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 pl-4 border-l-2 border-[#F49A16] text-sm text-[#171A18]/85 max-w-xl"
            >
              <strong className="font-semibold text-[#171A18]">
                Commercial Principle:
              </strong>{' '}
              Farmers should not have to purchase expensive infrastructure to
              access the productive services they need. They pay for the services
              they use.
            </motion.div>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => onNavigate('prototype')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#086B3A] hover:bg-[#064B2D] active:translate-y-[1px] rounded-lg transition-all duration-150 inline-flex items-center gap-2.5 whitespace-nowrap cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086B3A]"
              >
                <span>Explore the AgriPower Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenLeadForm('partner')}
                className="px-6 py-3.5 text-sm font-semibold text-[#171A18] bg-white hover:bg-[#171A18]/5 active:translate-y-[1px] border border-[#171A18]/20 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086B3A]"
              >
                Partner With Betapawa
              </button>
            </motion.div>
          </div>

          {/* Right Column: Quick Architectural Summary & Interactive View Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-white border border-[#171A18]/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#171A18]/10">
              <div>
                <h2 className="text-sm font-semibold text-[#171A18]">
                  Modular Hub Architecture
                </h2>
                <p className="text-xs text-[#777D77] mt-0.5">
                  8 integrated systems · Adapted to local crop value chains
                </p>
              </div>
              <span className="font-mono text-xs text-[#086B3A] font-medium tabular-nums">
                Pilot Spec v1.0
              </span>
            </div>

            <ol className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-[#171A18]/85">
              <li className="flex items-baseline gap-2">
                <span className="font-mono text-[#086B3A] font-semibold tabular-nums">01.</span>
                <span>Solar mini-grid infrastructure</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="font-mono text-[#086B3A] font-semibold tabular-nums">02.</span>
                <span>LiFePO4 battery storage</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="font-mono text-[#086B3A] font-semibold tabular-nums">03.</span>
                <span>Smart metering &amp; prepaid pay</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="font-mono text-[#086B3A] font-semibold tabular-nums">04.</span>
                <span>Pay-per-use cold storage</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="font-mono text-[#086B3A] font-semibold tabular-nums">05.</span>
                <span>Solar-powered irrigation</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="font-mono text-[#086B3A] font-semibold tabular-nums">06.</span>
                <span>Productive agro-processing</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="font-mono text-[#086B3A] font-semibold tabular-nums">07.</span>
                <span>Digital customer CRM</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="font-mono text-[#086B3A] font-semibold tabular-nums">08.</span>
                <span>Auditable impact telemetry</span>
              </li>
            </ol>

            <div className="mt-5 pt-4 border-t border-[#171A18]/10 flex items-center justify-between text-xs text-[#777D77]">
              <span>Unit Economics &amp; Payback Model</span>
              <button
                type="button"
                onClick={() => onNavigate('business-model')}
                className="font-semibold text-[#086B3A] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Cinematic Hub Visual (Ground-Level & Aerial Drone Prototype Switcher) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 relative rounded-xl overflow-hidden border border-[#171A18]/15 bg-[#171A18]"
        >
          {/* Top Bar Over Image: Official Brand Touchpoint & Camera Perspective Toggle */}
          <div className="bg-[#FAF8F2]/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-[#171A18]/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <BrandLogo size="sm" customLogoUrl={customLogoUrl} />
              <span aria-hidden="true" className="text-[#777D77]">·</span>
              <span className="text-xs text-[#171A18]/80 font-medium">
                {heroView === 'ground'
                  ? 'Ground-Level Prototype Render — Modular Community Hub'
                  : 'Aerial Drone Prototype Render — Integrated Site Layout'}
              </span>
              <span aria-hidden="true" className="text-[#777D77] hidden sm:inline">·</span>
              <span className="text-xs text-[#777D77] hidden sm:inline">
                Prototype Concept (Illustrative Design)
              </span>
            </div>

            {/* Interactive Segmented Control (Allowed by Zero-Pill Rule for Functional Controls) */}
            <div
              role="group"
              aria-label="Select prototype perspective"
              className="flex items-center gap-1 p-1 bg-[#171A18]/8 rounded-lg"
            >
              <button
                type="button"
                onClick={() => setHeroView('ground')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  heroView === 'ground'
                    ? 'bg-white text-[#171A18] shadow-xs'
                    : 'text-[#171A18]/70 hover:text-[#171A18]'
                }`}
              >
                Ground-Level View
              </button>
              <button
                type="button"
                onClick={() => setHeroView('aerial')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  heroView === 'aerial'
                    ? 'bg-white text-[#171A18] shadow-xs'
                    : 'text-[#171A18]/70 hover:text-[#171A18]'
                }`}
              >
                Aerial Drone View
              </button>
            </div>
          </div>

          <div className="relative aspect-16/9 w-full max-h-[580px] overflow-hidden">
            <ResilientImage
              src={
                heroView === 'ground'
                  ? GENERATED_IMAGES.heroGround
                  : GENERATED_IMAGES.aerialExplorer
              }
              alt={
                heroView === 'ground'
                  ? 'Betapawa AgriPower Hub ground-level prototype showing solar canopy, walk-in cold storage, farmers with produce crates, and irrigated plots'
                  : 'Betapawa AgriPower Hub aerial drone prototype showing solar PV array, battery storage, cold room, irrigation tank, and agro-processing bay'
              }
              loading="eager"
              className="w-full h-full object-cover object-center transition-transform duration-500"
            />

            {/* Measured Contrast Scrim at Bottom */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-white/80 mb-1.5">
                  <span>Architectural Prototype Visualization</span>
                  <span aria-hidden="true">·</span>
                  <span>Solar Canopy + Walk-In Cold Storage + Irrigation + Milling</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-white/95">
                  Designed at a practical, financeable pilot scale for rural horticultural and staple-crop clusters—avoiding oversized industrial overhead.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('prototype')}
                className="self-start md:self-auto px-4 py-2 text-xs font-semibold bg-white text-[#171A18] hover:bg-[#FAF8F2] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Inspect 8 Interactive Hotspots →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Credibility Strip: Distinguishing Existing Betapawa Core Traction vs. AgriPower Pilot Targets */}
        <div className="mt-10 bg-white border border-[#171A18]/10 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#171A18]/10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#777D77]">
              <strong className="font-semibold text-[#171A18]">
                Company Traction &amp; Pilot Baseline
              </strong>
              <span aria-hidden="true">·</span>
              <span>
                Separating historical Betapawa Solutions Limited records from AgriPower™ pilot targets
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEditingTraction((prev) => !prev)}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-medium text-[#086B3A] hover:underline cursor-pointer"
            >
              {editingTraction ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Done Configuring Traction</span>
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Configure Verified Figures</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tractionMetrics.map((metric) => (
              <div
                key={metric.id}
                className="flex flex-col justify-between border-l-2 border-[#086B3A]/25 pl-4"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#777D77]">
                    <span className="font-medium text-[#171A18]/75">
                      {metric.scope}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#086B3A]">{metric.classification}</span>
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-[#171A18]">
                    {metric.label}
                  </div>

                  {editingTraction ? (
                    <div className="mt-2">
                      <label htmlFor={`traction-${metric.id}`} className="sr-only">
                        {metric.label}
                      </label>
                      <input
                        id={`traction-${metric.id}`}
                        type="text"
                        value={metric.value}
                        onChange={(e) => onUpdateTraction(metric.id, e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm font-mono bg-[#FAF8F2] border border-[#086B3A] rounded-md text-[#171A18]"
                      />
                    </div>
                  ) : (
                    <div className="mt-1 font-mono text-xl sm:text-2xl font-semibold text-[#171A18] tabular-nums">
                      {metric.value}
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <p className="text-xs text-[#777D77]">{metric.unit}</p>
                  <p className="text-[11px] text-[#777D77]/85 mt-1 leading-snug">
                    {metric.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => onNavigate('problem')}
            aria-label="Scroll to The Problem section"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#777D77] hover:text-[#086B3A] transition-colors cursor-pointer"
          >
            <span>Examine the agricultural value-loss problem</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
