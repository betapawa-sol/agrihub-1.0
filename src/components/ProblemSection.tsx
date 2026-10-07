import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Info } from 'lucide-react';
import {
  PROBLEM_STAGES,
  PAIN_POINTS,
  GENERATED_IMAGES,
} from '../config/agripowerConfig';
import { ResilientImage } from './ResilientImage';

export const ProblemSection: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>(
    PROBLEM_STAGES[1].id
  );
  const [storyMode, setStoryMode] = useState<'without' | 'with'>('without');

  const activeStage =
    PROBLEM_STAGES.find((s) => s.id === selectedStageId) || PROBLEM_STAGES[0];

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="py-20 md:py-28 border-b border-[#171A18]/10 bg-[#FAF8F2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
            <span>01. The Structural Bottleneck</span>
            <span aria-hidden="true" className="text-[#777D77]">·</span>
            <span className="text-[#777D77]">First-Mile Energy &amp; Value Loss</span>
          </div>
          <h2
            id="problem-heading"
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#171A18] leading-[1.12] text-balance"
          >
            Food is produced in the field.{' '}
            <span className="font-serif italic font-normal text-[#064B2D]">
              Value is often lost before it reaches the market.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#171A18]/80 leading-relaxed">
            Across rural agricultural corridors, the absence of reliable,
            affordable productive energy at the farm gate forces smallholder
            communities to absorb physical crop spoilage, high diesel fuel
            costs, and steep harvest-glut price discounts.
          </p>
        </div>

        {/* Interactive Horizontal Process Diagram: HARVEST -> NO COLD STORAGE -> FORCED EARLY SALES -> LOST VALUE */}
        <div className="mt-12 bg-white border border-[#171A18]/10 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#171A18]/10">
            <div>
              <h3 className="text-base font-semibold text-[#171A18]">
                First-Mile Post-Harvest Value Erosion Chain
              </h3>
              <p className="text-xs text-[#777D77] mt-0.5">
                Select any stage in the sequence below to inspect the operational mechanism and published evidence.
              </p>
            </div>
            <span className="text-xs text-[#777D77]">
               Regional evidence with source citations
            </span>
          </div>

          {/* 4-Step Horizontal Chain */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {PROBLEM_STAGES.map((stage, index) => {
              const isSelected = stage.id === selectedStageId;
              return (
                <div key={stage.id} className="relative flex items-stretch">
                  <button
                    type="button"
                    onClick={() => setSelectedStageId(stage.id)}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#086B3A] ${
                      isSelected
                        ? 'bg-[#064B2D] text-white border-[#064B2D]'
                        : 'bg-[#FAF8F2] text-[#171A18] border-[#171A18]/12 hover:border-[#086B3A]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono text-xs font-semibold tabular-nums ${
                            isSelected ? 'text-[#F49A16]' : 'text-[#086B3A]'
                          }`}
                        >
                          {stage.stageNumber}.
                        </span>
                        {index < PROBLEM_STAGES.length - 1 && (
                          <ArrowRight
                            className={`w-4 h-4 hidden md:block ${
                              isSelected ? 'text-white/70' : 'text-[#777D77]'
                            }`}
                          />
                        )}
                      </div>
                      <h4 className="mt-2 text-base font-semibold leading-snug">
                        {stage.stageTitle}
                      </h4>
                      <p
                        className={`mt-2 text-xs leading-relaxed ${
                          isSelected ? 'text-white/85' : 'text-[#171A18]/75'
                        }`}
                      >
                        {stage.shortDesc}
                      </p>
                    </div>

                    <div
                      className={`mt-4 pt-3 border-t text-xs font-mono tabular-nums ${
                        isSelected
                          ? 'border-white/15 text-[#F49A16]'
                          : 'border-[#171A18]/10 text-[#086B3A]'
                      }`}
                    >
                      {stage.metricValue}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Selected Stage Detail & Sourced Citation Panel */}
          <div className="mt-6 pt-6 border-t border-[#171A18]/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs text-[#086B3A] font-medium">
                <span>Stage {activeStage.stageNumber} Mechanism</span>
                <span aria-hidden="true">·</span>
                <span>{activeStage.stageTitle}</span>
              </div>
              <p className="mt-2 text-sm sm:text-base text-[#171A18]/85 leading-relaxed">
                {activeStage.detailedDesc}
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#FAF8F2] border border-[#171A18]/10 rounded-lg p-4">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-2xl font-bold text-[#086B3A] tabular-nums">
                  {activeStage.metricValue}
                </span>
                <a
                  href={activeStage.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#086B3A] hover:underline"
                >
                  <span>Verify Source ({activeStage.sourceYear})</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="mt-1 text-xs font-medium text-[#171A18]">
                {activeStage.metricLabel}
              </p>
              <div className="mt-3 pt-2.5 border-t border-[#171A18]/10 text-[11px] text-[#777D77] space-y-1">
                <p>
                  <strong className="text-[#171A18]/80">Citation:</strong>{' '}
                  {activeStage.sourceName} ({activeStage.sourceYear}).
                </p>
                <p className="flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#F49A16] shrink-0 mt-0.5" />
                  <span>
                    <strong>Context Caveat:</strong> {activeStage.scopeCaveat}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Before & After Comparison + 6 Supporting Pain Points */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 5 Columns: Interactive Before vs. After Field Story Card */}
          <div className="lg:col-span-5 bg-white border border-[#171A18]/10 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-[#171A18]/10 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-[#171A18]">
                  Harvest Day Comparison
                </h3>
                <p className="text-xs text-[#777D77]">
                  Perishable horticulture value chain dynamics
                </p>
              </div>
              <div
                role="group"
                aria-label="Compare harvest scenario"
                className="flex items-center gap-1 p-1 bg-[#FAF8F2] border border-[#171A18]/10 rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => setStoryMode('without')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    storyMode === 'without'
                      ? 'bg-[#171A18] text-white'
                      : 'text-[#171A18]/70 hover:text-[#171A18]'
                  }`}
                >
                  Status Quo
                </button>
                <button
                  type="button"
                  onClick={() => setStoryMode('with')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    storyMode === 'with'
                      ? 'bg-[#086B3A] text-white'
                      : 'text-[#171A18]/70 hover:text-[#171A18]'
                  }`}
                >
                  With AgriPower™
                </button>
              </div>
            </div>

            <div className="aspect-4/3 w-full overflow-hidden relative">
              <ResilientImage
                src={
                  storyMode === 'without'
                    ? GENERATED_IMAGES.farmerStory
                    : GENERATED_IMAGES.coldStorage
                }
                alt={
                  storyMode === 'without'
                    ? 'Smallholder farmers sorting harvested produce at sunrise under time pressure'
                    : 'Farmers storing fresh tomatoes and peppers inside a solar walk-in cold room'
                }
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <span className="text-xs font-mono text-[#F49A16]">
                  {storyMode === 'without'
                    ? 'Scenario A · Ambient Farm-Gate Exposure'
                    : 'Scenario B · Pay-Per-Use Cold & Processing Access'}
                </span>
                <p className="text-sm font-medium mt-0.5">
                  {storyMode === 'without'
                    ? 'Harvested crates sit in 34°C ambient heat; farmer must sell before dusk regardless of spot price.'
                    : 'Crates enter 8°C solar walk-in storage for an illustrative fee per crate per day; farmer sells when market clears.'}
                </p>
              </div>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-[#171A18]/10">
                <span className="text-[#777D77]">Shelf-Life Window (Tomatoes/Peppers)</span>
                <span className="font-mono font-semibold text-[#171A18] tabular-nums">
                  {storyMode === 'without' ? '2 – 3 Days (Ambient)' : '14 – 21 Days (Cold Room)'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#171A18]/10">
                <span className="text-[#777D77]">Primary Power Source</span>
                <span className="font-mono font-semibold text-[#171A18]">
                  {storyMode === 'without'
                    ? 'None or expensive diesel genset'
                    : 'Solar mini-grid + LiFePO4 battery'}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#777D77]">Farmer Upfront Capital Required</span>
                <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                  {storyMode === 'without'
                    ? 'High if buying standalone gear'
                    : '$0 CAPEX (Pay-per-use tariff)'}
                </span>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: 6 Core Pain Points */}
          <div className="lg:col-span-7">
            <h3 className="text-lg font-semibold text-[#171A18] mb-4">
              Six Interconnected Barriers Holding Back Rural Agricultural Value
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PAIN_POINTS.map((point, idx) => (
                <div
                  key={point.id}
                  className="bg-white border border-[#171A18]/10 rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs font-semibold text-[#086B3A] tabular-nums">
                      0{idx + 1}.
                    </div>
                    <h4 className="mt-1.5 text-base font-semibold text-[#171A18]">
                      {point.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-[#171A18]/75 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
