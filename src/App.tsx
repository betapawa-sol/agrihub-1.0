/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  INITIAL_TRACTION_METRICS,
  DEFAULT_UNIT_ECONOMICS,
  TractionMetric,
  UnitEconomicsInputs,
} from './config/agripowerConfig';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionTabsSection } from './components/SolutionTabsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PrototypeExplorerSection } from './components/PrototypeExplorerSection';
import { BusinessModelSection } from './components/BusinessModelSection';
import { ImpactDashboardSection } from './components/ImpactDashboardSection';
import { ImpactStoryAndScalability } from './components/ImpactStoryAndScalability';
import { WhyBetapawaAndInvestorsSection } from './components/WhyBetapawaAndInvestorsSection';
import { ClosingCtaAndFooter } from './components/ClosingCtaAndFooter';

export default function App() {
  const [tractionMetrics, setTractionMetrics] = useState<TractionMetric[]>(
    INITIAL_TRACTION_METRICS
  );
  const [unitEconomicsInputs, setUnitEconomicsInputs] =
    useState<UnitEconomicsInputs>(DEFAULT_UNIT_ECONOMICS);
  const [activeLeadPathway, setActiveLeadPathway] = useState<
    'investor' | 'partner' | 'brief'
  >('partner');
  const [checklistModalOpen, setChecklistModalOpen] = useState<boolean>(false);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  const handleUpdateTraction = (id: string, newValue: string) => {
    setTractionMetrics((prev) =>
      prev.map((m) => (m.id === id ? { ...m, value: newValue } : m))
    );
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenLeadForm = (pathway: 'investor' | 'partner' | 'brief') => {
    setActiveLeadPathway(pathway);
    const formEl = document.getElementById('lead-capture-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2] text-[#171A18] selection:bg-[#086B3A] selection:text-white">
      {/* SECTION A: Premium Navigation */}
      <Navigation
        onNavigate={handleNavigate}
        onOpenLeadForm={handleOpenLeadForm}
        customLogoUrl={customLogoUrl}
      />

      <main className="flex-1">
        {/* SECTION B: Hero — Make the Opportunity Immediately Obvious */}
        <HeroSection
          tractionMetrics={tractionMetrics}
          onUpdateTraction={handleUpdateTraction}
          onNavigate={handleNavigate}
          onOpenLeadForm={handleOpenLeadForm}
          customLogoUrl={customLogoUrl}
        />

        {/* SECTION C: The Problem — Show What Is at Stake */}
        <ProblemSection />

        {/* SECTION D: The Solution — Interactive 6-Tab Explainer */}
        <SolutionTabsSection />

        {/* SECTION E: How It Works — Animated System Explainer */}
        <HowItWorksSection />

        {/* SECTION F: Meet the Prototype — Immersive Hub Explorer */}
        <PrototypeExplorerSection customLogoUrl={customLogoUrl} />

        {/* SECTION G: Business Model & Editable Unit-Economics Calculator */}
        <BusinessModelSection
          inputs={unitEconomicsInputs}
          onChangeInputs={setUnitEconomicsInputs}
          onResetInputs={() => setUnitEconomicsInputs(DEFAULT_UNIT_ECONOMICS)}
          onOpenLeadForm={handleOpenLeadForm}
        />

        {/* SECTION H: Auditable Impact Dashboard */}
        <ImpactDashboardSection />

        {/* SECTION I & J: Our Impact Story & Portfolio Scalability */}
        <ImpactStoryAndScalability
          unitEconomicsInputs={unitEconomicsInputs}
          onNavigate={handleNavigate}
        />

        {/* SECTION K, L & M: Why Betapawa, Investor Proposition & FAQ */}
        <WhyBetapawaAndInvestorsSection
          onOpenLeadForm={handleOpenLeadForm}
          onOpenChecklistModal={() => setChecklistModalOpen(true)}
        />

        {/* SECTION N & O: Strong Closing CTA, Lead Form & Footer */}
        <ClosingCtaAndFooter
          activePathway={activeLeadPathway}
          onSelectPathway={setActiveLeadPathway}
          onNavigate={handleNavigate}
          checklistModalOpen={checklistModalOpen}
          onCloseChecklistModal={() => setChecklistModalOpen(false)}
          onOpenChecklistModal={() => setChecklistModalOpen(true)}
          customLogoUrl={customLogoUrl}
          onChangeCustomLogoUrl={setCustomLogoUrl}
        />
      </main>
    </div>
  );
}

