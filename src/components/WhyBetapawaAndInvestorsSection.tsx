import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ClipboardCheck,
  Building2,
  Briefcase,
  Handshake,
} from 'lucide-react';
import { FAQ_ITEMS } from '../config/agripowerConfig';

interface WhyBetapawaAndInvestorsSectionProps {
  onOpenLeadForm: (pathway: 'investor' | 'partner' | 'brief') => void;
  onOpenChecklistModal: () => void;
}

const CAPABILITIES = [
  {
    index: '01',
    title: 'Solar Mini-Grid Development',
    detail:
      'Site feasibility, load profiling, distribution network engineering, and community tariff structuring for rural electrification and productive loads.',
  },
  {
    index: '02',
    title: 'C&I Solar Engineering Experience',
    detail:
      'Design, procurement, and commissioning of commercial and industrial solar-hybrid systems built for high uptime and harsh operating environments.',
  },
  {
    index: '03',
    title: 'Smart Metering & Prepaid Payments',
    detail:
      'Integration of STS prepaid metering, automated load-limiting, and mobile-money/USSD token generation to ensure disciplined revenue collection.',
  },
  {
    index: '04',
    title: 'Off-Grid Customer Operations',
    detail:
      'Field-tested community engagement, local operator training, and tariff onboarding tailored to rural households and micro-enterprises.',
  },
  {
    index: '05',
    title: 'Energy System Design & Deployment',
    detail:
      'End-to-end EPC execution—balancing solar PV kWp, LiFePO4 battery sizing, and thermal storage to minimise levelised cost of energy (LCOE).',
  },
  {
    index: '06',
    title: 'Productive-Use Energy Integration',
    detail:
      'Matching three-phase agricultural appliances—walk-in cold rooms, variable-frequency solar pumps, and grain mills—to solar generation curves.',
  },
  {
    index: '07',
    title: 'Digital Monitoring & CRM Telemetry',
    detail:
      'Remote inverter, battery, and smart-meter telemetry paired with customer transaction logs for preventive maintenance and investor reporting.',
  },
];

const STAKEHOLDER_GROUPS = [
  {
    group: 'Capital & Institutional Partners',
    items: [
      {
        name: 'Climate-Tech Investors',
        valueProp:
          'Back a replicable distributed energy + cold-chain infrastructure platform addressing food-system resilience across African growth markets.',
      },
      {
        name: 'Impact Investors',
        valueProp:
          'Target measurable, auditable outcomes across smallholder income resilience, post-harvest loss reduction, gender inclusion, and diesel displacement.',
      },
      {
        name: 'Development Finance Institutions (DFIs)',
        valueProp:
          'Deploy catalytic first-loss, project debt, or results-based financing into standardized rural productive-use infrastructure.',
      },
      {
        name: 'Agricultural Value-Chain Investors',
        valueProp:
          'Strengthen first-mile cold chain and processing quality for portfolio agribusinesses and regional commodity aggregators.',
      },
    ],
  },
  {
    group: 'Value-Chain, Technology & Field Partners',
    items: [
      {
        name: 'Equipment Manufacturers (OEMs)',
        valueProp:
          'Supply commercial cold rooms, solar water pumps, smart meters, and agro-processing machinery into a standardized multi-hub rollout.',
      },
      {
        name: 'Farmer Cooperatives',
        valueProp:
          'Host an AgriPower™ hub to give members walk-in cooling, dry-season irrigation, and milling without cooperative balance-sheet debt.',
      },
      {
        name: 'Agro-Processors & Off-Takers',
        valueProp:
          'Secure pre-cooled, graded, and primary-processed agricultural commodities at predictable quality standards directly at the farm gate.',
      },
      {
        name: 'Cold-Chain Operators & Gov/Development Partners',
        valueProp:
          'Co-locate first-mile spoke nodes and align rural electrification programs with national food-security and agricultural adaptation mandates.',
      },
    ],
  },
];

export const WhyBetapawaAndInvestorsSection: React.FC<
  WhyBetapawaAndInvestorsSectionProps
> = ({ onOpenLeadForm, onOpenChecklistModal }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [faqCategory, setFaqCategory] = useState<string>('All');

  const filteredFaqs =
    faqCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((f) => f.category === faqCategory);

  return (
    <>
      {/* SECTION K: WHY BETAPAWA */}
      <section
        id="why-betapawa"
        aria-labelledby="why-betapawa-heading"
        className="py-20 md:py-28 border-b border-[#171A18]/10 bg-[#FAF8F2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
              <span>09. Why Betapawa Solutions Limited</span>
              <span aria-hidden="true" className="text-[#777D77]">·</span>
              <span className="text-[#777D77]">
                Core Execution Capabilities &amp; Strategic Product Expansion
              </span>
            </div>
            <h2
              id="why-betapawa-heading"
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#171A18] leading-[1.12] text-balance"
            >
              Clean-energy infrastructure,{' '}
              <span className="font-serif italic font-normal text-[#086B3A]">
                designed around productive use.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#171A18]/80 leading-relaxed">
              Betapawa AgriPower™ is not a standalone concept built in a vacuum.
              It is a dedicated productive-use product line built on Betapawa
              Solutions Limited&apos;s established engineering, solar deployment,
              and off-grid operational capabilities.
            </p>
          </div>

          {/* Core Business vs AgriPower Expansion Comparison */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-[#171A18]/12 rounded-xl p-6 sm:p-7">
              <div className="text-xs font-mono text-[#086B3A] font-semibold">
                FOUNDATION · ESTABLISHED BUSINESS
              </div>
              <h3 className="mt-1.5 text-xl font-bold text-[#171A18]">
                Betapawa Solutions Limited (Core Platform)
              </h3>
              <p className="mt-2 text-sm text-[#171A18]/80 leading-relaxed">
                Provides the technical backbone: solar PV and battery system
                engineering, procurement, C&amp;I and mini-grid execution, smart
                prepaid metering integration, and rural field maintenance teams.
              </p>
              <div className="mt-4 pt-4 border-t border-[#171A18]/10 text-xs text-[#777D77]">
                Role in AgriPower™: EPC developer, technical operator, and
                metering/telemetry platform provider.
              </div>
            </div>

            <div className="bg-[#064B2D] text-white rounded-xl p-6 sm:p-7">
              <div className="text-xs font-mono text-[#F49A16] font-semibold">
                GROWTH ENGINE · PRODUCT EXPANSION
              </div>
              <h3 className="mt-1.5 text-xl font-bold">
                Betapawa AgriPower™ (Productive-Use Hubs)
              </h3>
              <p className="mt-2 text-sm text-white/85 leading-relaxed">
                Extends Betapawa&apos;s energy infrastructure directly into the
                agricultural value chain—packaging solar generation with walk-in
                cold storage, solar water pumping, and agro-processing under a
                pay-per-use service model.
              </p>
              <div className="mt-4 pt-4 border-t border-white/15 text-xs text-white/80">
                Current Stage: Prototype engineering complete · Structuring Pilot
                Hub 01 with anchor partners.
              </div>
            </div>
          </div>

          {/* 7 Core Capabilities Grid */}
          <div className="mt-10">
            <h3 className="text-base font-bold text-[#171A18] mb-4">
              Seven Substantiated Technical &amp; Operational Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.index}
                  className="bg-white border border-[#171A18]/10 rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#086B3A]">
                      {cap.index}.
                    </span>
                    <h4 className="mt-1.5 text-sm font-bold text-[#171A18]">
                      {cap.title}
                    </h4>
                    <p className="mt-2 text-xs text-[#171A18]/75 leading-relaxed">
                      {cap.detail}
                    </p>
                  </div>
                </div>
              ))}

              {/* 8th Card: Leadership & Verification Checklist Trigger */}
              <div className="bg-[#FAF8F2] border border-[#086B3A]/30 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#086B3A]">
                    Governance &amp; Diligence
                  </span>
                  <h4 className="mt-1.5 text-sm font-bold text-[#171A18]">
                    Leadership Profiles &amp; Data Readiness Checklist
                  </h4>
                  <p className="mt-2 text-xs text-[#171A18]/75 leading-relaxed">
                    We never display fabricated team bios or unapproved partner
                    logos. Inspect our live Information Readiness Checklist for
                    investor data-room verification.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenChecklistModal}
                  className="mt-4 w-full py-2 px-3 bg-white hover:bg-[#086B3A] text-[#086B3A] hover:text-white border border-[#086B3A] rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  <span>View Diligence Checklist</span>
                </button>
              </div>
            </div>
          </div>

          {/* Leadership & Execution Governance Structure */}
          <div className="mt-10 bg-white border border-[#171A18]/10 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#171A18]/10">
              <div>
                <h3 className="text-base font-bold text-[#171A18]">
                  Leadership &amp; Project Execution Structure
                </h3>
                <p className="text-xs text-[#777D77]">
                  Full curriculum vitae, executive headshots, and partner endorsements provided in the verified Investor Brief.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenLeadForm('brief')}
                className="self-start sm:self-auto text-xs font-semibold text-[#086B3A] hover:underline cursor-pointer"
              >
                Request Team Bios in Investor Brief →
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                <div className="font-mono text-[#086B3A] font-semibold">
                  Executive Leadership
                </div>
                <div className="mt-1 text-sm font-bold text-[#171A18]">
                  Managing Director &amp; Chief Executive
                </div>
                <p className="mt-1.5 text-[#777D77] leading-relaxed">
                  Leads Betapawa Solutions Limited strategy, project finance
                  structuring, institutional partnerships, and mini-grid
                  portfolio development.
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                <div className="font-mono text-[#086B3A] font-semibold">
                  Engineering &amp; Operations
                </div>
                <div className="mt-1 text-sm font-bold text-[#171A18]">
                  Head of Solar EPC &amp; Productive-Use Systems
                </div>
                <p className="mt-1.5 text-[#777D77] leading-relaxed">
                  Oversees hybrid PV-battery architecture, cold-room thermal
                  integration, smart metering deployment, and field O&amp;M
                  technicians.
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                <div className="font-mono text-[#086B3A] font-semibold">
                  Agribusiness &amp; Impact
                </div>
                <div className="mt-1 text-sm font-bold text-[#171A18]">
                  Community Cooperative &amp; M&amp;E Lead
                </div>
                <p className="mt-1.5 text-[#777D77] leading-relaxed">
                  Manages cooperative onboarding, crate/processing tariff
                  calibration, off-taker partnerships, and longitudinal farmer
                  impact surveys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION L: INVESTOR AND PARTNER PROPOSITION */}
      <section
        id="investors"
        aria-labelledby="investors-heading"
        className="py-20 md:py-28 border-b border-[#171A18]/10 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
              <span>10. Investor &amp; Partner Proposition</span>
              <span aria-hidden="true" className="text-[#777D77]">·</span>
              <span className="text-[#777D77]">
                Project Capital, Blended Finance &amp; Value-Chain Partnerships
              </span>
            </div>
            <h2
              id="investors-heading"
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#171A18] leading-[1.12] text-balance"
            >
              Help build the energy infrastructure{' '}
              <span className="font-serif italic font-normal text-[#086B3A]">
                behind Africa&apos;s food economy.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#171A18]/80 leading-relaxed">
              We are structuring capital and field partnerships to deploy,
              validate, and scale the Betapawa AgriPower™ hub model across
              high-potential agricultural corridors.
            </p>
          </div>

          {/* Four-Party Financing & Operational Structure Diagram */}
          <div className="mt-12 bg-[#171A18] text-white rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/15">
              <div>
                <h3 className="text-lg font-bold">
                  Illustrative Hub Financing &amp; Cash-Flow Structure
                </h3>
                <p className="text-xs text-white/75 mt-0.5">
                  Potential structures include asset finance, project debt, equity, and catalytic blended finance depending on risk, economics, and investor mandate.
                </p>
              </div>
              <span className="text-xs font-mono text-[#F49A16]">
                No guaranteed yield · Subject to actual performance
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/8 border border-white/15 rounded-xl p-5">
                <div className="font-mono text-xs text-[#F49A16] font-bold">
                  01. PROJECT CAPITAL
                </div>
                <h4 className="mt-2 text-base font-bold">
                  Finances Hub Infrastructure
                </h4>
                <p className="mt-2 text-xs text-white/80 leading-relaxed">
                  Funds the solar PV canopy, LiFePO4 battery storage, walk-in
                  cold room, solar irrigation pump, and agro-processing equipment
                  via equity, asset finance, project debt, or blended facilities.
                </p>
              </div>

              <div className="bg-white/8 border border-white/15 rounded-xl p-5">
                <div className="font-mono text-xs text-[#34D399] font-bold">
                  02. BETAPAWA
                </div>
                <h4 className="mt-2 text-base font-bold">
                  Develops, Deploys, Operates &amp; Maintains
                </h4>
                <p className="mt-2 text-xs text-white/80 leading-relaxed">
                  Executes site selection with cooperatives, completes EPC
                  installation, manages smart metering and prepaid collections,
                  and performs preventive O&amp;M to safeguard asset uptime.
                </p>
              </div>

              <div className="bg-white/8 border border-white/15 rounded-xl p-5">
                <div className="font-mono text-xs text-[#F49A16] font-bold">
                  03. CUSTOMERS
                </div>
                <h4 className="mt-2 text-base font-bold">
                  Pay for Productive Services Consumed
                </h4>
                <p className="mt-2 text-xs text-white/80 leading-relaxed">
                  Smallholder farmers, market vendors, and rural SMEs pay
                  affordable prepaid tariffs per crate stored, per m³ pumped, per
                  kg processed, and per kWh used.
                </p>
              </div>

              <div className="bg-white/8 border border-white/15 rounded-xl p-5">
                <div className="font-mono text-xs text-[#34D399] font-bold">
                  04. CAPITAL PROVIDERS
                </div>
                <h4 className="mt-2 text-base font-bold">
                  Receive Performance-Linked Returns
                </h4>
                <p className="mt-2 text-xs text-white/80 leading-relaxed">
                  Net operating cash flows (after site O&amp;M, staff, and
                  equipment replacement reserves) service capital providers in
                  accordance with agreed financing terms and actual project
                  performance.
                </p>
              </div>
            </div>
          </div>

          {/* Stakeholder Opportunity Matrix */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {STAKEHOLDER_GROUPS.map((section) => (
              <div
                key={section.group}
                className="bg-[#FAF8F2] border border-[#171A18]/12 rounded-xl p-6"
              >
                <h3 className="text-base font-bold text-[#171A18] pb-3 border-b border-[#171A18]/10">
                  {section.group}
                </h3>
                <div className="mt-4 space-y-3.5">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white border border-[#171A18]/8 rounded-lg p-4"
                    >
                      <div className="text-sm font-bold text-[#086B3A]">
                        {item.name}
                      </div>
                      <p className="mt-1 text-xs text-[#171A18]/80 leading-relaxed">
                        {item.valueProp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Three Dedicated Investor & Partner CTAs */}
          <div className="mt-10 bg-[#FAF8F2] border border-[#171A18]/15 rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#171A18]">
                Engage with the Betapawa AgriPower™ Team
              </h3>
              <p className="text-xs sm:text-sm text-[#777D77] mt-1">
                Select your pathway below to open a dedicated enquiry route.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenLeadForm('investor')}
                className="px-5 py-3 bg-[#086B3A] hover:bg-[#064B2D] text-white text-xs sm:text-sm font-semibold rounded-lg inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Briefcase className="w-4 h-4 text-[#F49A16]" />
                <span>Discuss Investment</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenLeadForm('partner')}
                className="px-5 py-3 bg-[#171A18] hover:bg-[#171A18]/90 text-white text-xs sm:text-sm font-semibold rounded-lg inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Handshake className="w-4 h-4 text-[#F49A16]" />
                <span>Become a Pilot Partner</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenLeadForm('brief')}
                className="px-5 py-3 bg-white hover:bg-[#171A18]/5 text-[#171A18] border border-[#171A18]/25 text-xs sm:text-sm font-semibold rounded-lg inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#086B3A]" />
                <span>Request the Investor Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION M: FREQUENTLY ASKED QUESTIONS */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="py-20 md:py-28 border-b border-[#171A18]/10 bg-[#FAF8F2]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
                <span>11. Frequently Asked Questions</span>
                <span aria-hidden="true" className="text-[#777D77]">·</span>
                <span className="text-[#777D77]">
                  Candid Answers for Investors, Cooperatives &amp; Communities
                </span>
              </div>
              <h2
                id="faq-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171A18]"
              >
                Key Questions &amp; Diligence Clarifications
              </h2>
            </div>

            {/* Category Filter */}
            <div
              role="group"
              aria-label="Filter FAQ category"
              className="flex flex-wrap items-center gap-1 p-1 bg-white border border-[#171A18]/12 rounded-lg self-start"
            >
              {[
                'All',
                'Product & Farmers',
                'Economics & Finance',
                'Pilot & Operations',
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFaqCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    faqCategory === cat
                      ? 'bg-[#086B3A] text-white'
                      : 'text-[#171A18]/70 hover:text-[#171A18]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accessible Accordion List */}
          <div className="mt-10 space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-[#171A18]/12 rounded-xl overflow-hidden"
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${faq.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.id}`}
                      onClick={() =>
                        setOpenFaqId(isOpen ? null : faq.id)
                      }
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F2]/60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#086B3A]"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs font-bold text-[#086B3A] tabular-nums">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[#171A18]">
                          {faq.question}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:inline text-xs text-[#777D77]">
                          {faq.category}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#086B3A]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#777D77]" />
                        )}
                      </div>
                    </button>
                  </h3>
                  {isOpen && (
                    <div
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      className="px-6 pb-5 pt-1 text-sm text-[#171A18]/80 leading-relaxed border-t border-[#171A18]/8"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
