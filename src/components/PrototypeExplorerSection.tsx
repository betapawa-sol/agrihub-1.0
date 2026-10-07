import React, { useState } from 'react';
import { ChevronRight, Layers } from 'lucide-react';
import {
  PROTOTYPE_HOTSPOTS,
  GENERATED_IMAGES,
  PrototypeHotspot,
} from '../config/agripowerConfig';
import { ResilientImage } from './ResilientImage';
import { BrandLogo } from './BrandLogo';

interface PrototypeExplorerSectionProps {
  customLogoUrl?: string | null;
}

type GalleryViewId = 'aerial' | 'ground' | 'cold-room' | 'processing-irrigation';

const GALLERY_VIEWS: {
  id: GalleryViewId;
  label: string;
  caption: string;
  image: string;
}[] = [
  {
    id: 'aerial',
    label: 'Aerial Drone View',
    caption:
      'Integrated site layout showing solar canopy, battery container, walk-in cold storage, header tank, and agro-processing bay.',
    image: GENERATED_IMAGES.aerialExplorer,
  },
  {
    id: 'ground',
    label: 'Ground-Level Exterior',
    caption:
      'Community-facing produce sorting apron, shaded check-in kiosk, and walk-in cold storage container.',
    image: GENERATED_IMAGES.heroGround,
  },
  {
    id: 'cold-room',
    label: 'Cold-Storage Facility',
    caption:
      'Food-grade insulated walk-in cold room with ventilated 20kg plastic crates and digital inventory tracking.',
    image: GENERATED_IMAGES.coldStorage,
  },
  {
    id: 'processing-irrigation',
    label: 'Processing & Irrigation',
    caption:
      'Three-phase electric milling bay and solar water pumping storage tank serving surrounding plots.',
    image: GENERATED_IMAGES.irrigationProcessing,
  },
];

export const PrototypeExplorerSection: React.FC<PrototypeExplorerSectionProps> = ({
  customLogoUrl,
}) => {
  const [selectedView, setSelectedView] = useState<GalleryViewId>('aerial');
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    PROTOTYPE_HOTSPOTS[0].id
  );

  const activeHotspot: PrototypeHotspot =
    PROTOTYPE_HOTSPOTS.find((h) => h.id === activeHotspotId) ||
    PROTOTYPE_HOTSPOTS[0];

  const currentGallery =
    GALLERY_VIEWS.find((v) => v.id === selectedView) || GALLERY_VIEWS[0];

  const showInteractivePins =
    selectedView === 'aerial' || selectedView === 'ground';

  return (
    <section
      id="prototype"
      aria-labelledby="prototype-heading"
      className="py-20 md:py-28 border-b border-[#171A18]/10 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
              <span>04. Meet the Prototype</span>
              <span aria-hidden="true" className="text-[#777D77]">·</span>
              <span className="text-[#777D77]">
                Prototype Concept · Illustrative Engineering Design
              </span>
            </div>
            <h2
              id="prototype-heading"
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#171A18] leading-[1.12] text-balance"
            >
              Built for the realities of{' '}
              <span className="font-serif italic font-normal text-[#086B3A]">
                African farming communities.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#171A18]/80 leading-relaxed">
              Explore our modular pilot hub architecture. Click any of the eight
              numbered engineering hotspots on the prototype visual—or select a
              system from the directory—to inspect what it does, why it matters,
              and how it contributes to hub cash flow.
            </p>
          </div>

          {/* Camera Angle / Sub-System View Switcher */}
          <div
            role="group"
            aria-label="Select prototype camera view"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FAF8F2] border border-[#171A18]/12 rounded-xl self-start"
          >
            {GALLERY_VIEWS.map((view) => (
              <button
                key={view.id}
                type="button"
                onClick={() => setSelectedView(view.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedView === view.id
                    ? 'bg-[#086B3A] text-white'
                    : 'text-[#171A18]/75 hover:text-[#171A18]'
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Hotspot Explorer Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Interactive Prototype Canvas with Hotspots */}
          <div className="lg:col-span-8 bg-[#171A18] rounded-xl overflow-hidden border border-[#171A18]/15">
            {/* Top Status Strip with Official Betapawa Logo */}
            <div className="bg-[#FAF8F2] px-4 sm:px-6 py-3 border-b border-[#171A18]/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <BrandLogo size="sm" customLogoUrl={customLogoUrl} />
                <span aria-hidden="true" className="text-[#777D77]">·</span>
                <span className="text-xs font-semibold text-[#171A18]">
                  {currentGallery.label}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#777D77]">
                <Layers className="w-3.5 h-3.5 text-[#086B3A]" />
                <span>Prototype Concept (Pre-Operational Design)</span>
              </div>
            </div>

            {/* Image Container with Interactive Hotspot Pins (Desktop/Tablet) */}
            <div className="relative aspect-16/9 w-full overflow-hidden select-none">
              <ResilientImage
                src={currentGallery.image}
                alt={`Betapawa AgriPower Hub — ${currentGallery.label}: ${currentGallery.caption}`}
                className="w-full h-full object-cover"
              />

              {/* Hotspot Overlay Pins (Shown on md+ screens for Aerial and Ground views) */}
              {showInteractivePins && (
                <div className="hidden sm:block absolute inset-0 bg-black/15">
                  {PROTOTYPE_HOTSPOTS.map((spot) => {
                    const isSelected = spot.id === activeHotspotId;
                    const leftPos =
                      selectedView === 'aerial' ? spot.x : spot.groundX;
                    const topPos =
                      selectedView === 'aerial' ? spot.y : spot.groundY;

                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setActiveHotspotId(spot.id)}
                        aria-label={`Inspect hotspot ${spot.number}: ${spot.title}`}
                        aria-pressed={isSelected}
                        style={{ left: `${leftPos}%`, top: `${topPos}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded-full transition-transform duration-150 ${
                          isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                        }`}
                      >
                        <span
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-xs font-bold shadow-md border transition-colors ${
                            isSelected
                              ? 'bg-[#F49A16] text-[#171A18] border-white'
                              : 'bg-[#064B2D]/95 text-white border-white/60 hover:bg-[#086B3A]'
                          }`}
                        >
                          <span>{spot.number}</span>
                          <span className="hidden xl:inline font-sans font-semibold text-[11px] pr-0.5">
                            {spot.title.split(' ')[0]}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Bottom Caption Scrim */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-xs sm:text-sm text-white/90">
                  {currentGallery.caption}
                </p>
                <span className="text-[11px] font-mono text-[#F49A16] shrink-0">
                  Active Node: {activeHotspot.number}. {activeHotspot.title}
                </span>
              </div>
            </div>

            {/* Quick Hotspot Selector Strip Below Image (Works on all viewports) */}
            <div className="bg-[#FAF8F2] p-3 sm:p-4 border-t border-[#171A18]/10">
              <div className="text-[11px] font-medium text-[#777D77] mb-2">
                Select a Hub Subsystem (1–8) to Inspect Engineering &amp; Commercial Role:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PROTOTYPE_HOTSPOTS.map((spot) => {
                  const isSelected = spot.id === activeHotspotId;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveHotspotId(spot.id)}
                      className={`px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors flex items-center justify-between gap-1.5 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#086B3A] text-white border-[#086B3A]'
                          : 'bg-white text-[#171A18] border-[#171A18]/12 hover:border-[#086B3A]'
                      }`}
                    >
                      <span className="truncate">
                        <strong className="font-mono mr-1">{spot.number}.</strong>
                        {spot.title}
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSelected ? 'text-[#F49A16]' : 'text-[#777D77]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Detailed Explanatory Panel for Selected Hotspot */}
          <div className="lg:col-span-4 bg-[#FAF8F2] border border-[#171A18]/12 rounded-xl p-6 space-y-5">
            <div className="pb-4 border-b border-[#171A18]/10">
              <div className="flex items-center justify-between text-xs text-[#086B3A] font-medium">
                <span>Subsystem {activeHotspot.number} of 08</span>
                <span>{activeHotspot.category}</span>
              </div>
              <h3 className="mt-1.5 text-xl font-bold text-[#171A18]">
                {activeHotspot.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-[#777D77]">
                {activeHotspot.technicalSpec}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-white border border-[#171A18]/10 rounded-lg p-4">
                <div className="text-xs font-semibold text-[#086B3A] mb-1">
                  01. What the Component Does
                </div>
                <p className="text-[#171A18]/85 leading-relaxed">
                  {activeHotspot.whatItDoes}
                </p>
              </div>

              <div className="bg-white border border-[#171A18]/10 rounded-lg p-4">
                <div className="text-xs font-semibold text-[#086B3A] mb-1">
                  02. Why It Matters for Farmers
                </div>
                <p className="text-[#171A18]/85 leading-relaxed">
                  {activeHotspot.whyItMatters}
                </p>
              </div>

              <div className="bg-white border border-[#171A18]/10 rounded-lg p-4">
                <div className="text-xs font-semibold text-[#F49A16] mb-1">
                  03. Contribution to Hub Business Model
                </div>
                <p className="text-[#171A18]/85 leading-relaxed">
                  {activeHotspot.businessModelContribution}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#777D77]">
              <button
                type="button"
                onClick={() => {
                  const idx = PROTOTYPE_HOTSPOTS.findIndex(
                    (h) => h.id === activeHotspotId
                  );
                  const prevIdx =
                    (idx - 1 + PROTOTYPE_HOTSPOTS.length) %
                    PROTOTYPE_HOTSPOTS.length;
                  setActiveHotspotId(PROTOTYPE_HOTSPOTS[prevIdx].id);
                }}
                className="font-semibold text-[#171A18] hover:text-[#086B3A] cursor-pointer"
              >
                ← Previous Component
              </button>
              <button
                type="button"
                onClick={() => {
                  const idx = PROTOTYPE_HOTSPOTS.findIndex(
                    (h) => h.id === activeHotspotId
                  );
                  const nextIdx = (idx + 1) % PROTOTYPE_HOTSPOTS.length;
                  setActiveHotspotId(PROTOTYPE_HOTSPOTS[nextIdx].id);
                }}
                className="font-semibold text-[#086B3A] hover:underline cursor-pointer"
              >
                Next Component →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
