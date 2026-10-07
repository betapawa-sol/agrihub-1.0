import React, { useState } from 'react';
import {
  GENERATED_IMAGES,
  UnitEconomicsInputs,
  calculateUnitEconomics,
} from '../config/agripowerConfig';
import { ResilientImage } from './ResilientImage';
import { FileCheck, Film, Users, BarChart3, Network } from 'lucide-react';

interface ImpactStoryAndScalabilityProps {
  unitEconomicsInputs: UnitEconomicsInputs;
  onNavigate: (sectionId: string) => void;
}

const ROADMAP_PHASES = [
  {
    phase: 'Phase 01',
    title: 'Demonstration Hub',
    hubCountRange: '1 Hub',
    focus: 'Validate demand, pricing, utilisation and impact.',
    details:
      'Deploy the first modular AgriPower™ hub in an anchor horticulture/grain cluster. Test pay-per-crate tariffs, daytime solar water pumping dispatch, and prepaid digital collection while establishing baseline farmer socio-economic surveys.',
    milestones: [
      'Commission 45 kWp solar + walk-in cold room + milling bay',
      'Validate ≥65% average seasonal cold-room & processing utilisation',
      'Publish 12-month audited smart-meter and crate-intake dataset',
    ],
  },
  {
    phase: 'Phase 02',
    title: 'Repeatable Deployment',
    hubCountRange: '3 – 5 Hubs',
    focus: 'Standardise designs, operations, metering, maintenance and customer onboarding.',
    details:
      'Convert pilot engineering lessons into pre-engineered containerised skids and standardized cooperative service-level agreements (SLAs). Reduce site installation time and EPC soft costs by ~18%.',
    milestones: [
      'Standardize 3 modular hub archetypes (Horticulture, Grain/Tuber, Mixed)',
      'Centralize remote IoT telemetry & predictive O&M dispatch',
      'Establish repeatable cooperative onboarding and operator training playbook',
    ],
  },
  {
    phase: 'Phase 03',
    title: 'Portfolio Expansion',
    hubCountRange: '10 – 25 Hubs',
    focus: 'Deploy additional hubs through local partnerships and project finance.',
    details:
      'Aggregate standardized hubs into a ring-fenced asset portfolio eligible for local-currency project debt, equipment asset finance, and DFI blended-finance facilities alongside commercial off-takers.',
    milestones: [
      'Unlock bulk OEM procurement discounts across PV, LiFePO4, and cold rooms',
      'Structure multi-hub SPV debt/equity project finance facility',
      'Integrate regional cold-chain logistics off-takers across hub nodes',
    ],
  },
  {
    phase: 'Phase 04',
    title: 'Regional Network',
    hubCountRange: '50+ Hubs',
    focus: 'Build a portfolio of productive-energy assets across suitable African agricultural markets.',
    details:
      'Operate a dense network of distributed clean-energy agricultural infrastructure nodes—connecting thousands of smallholder farmers to reliable cooling, irrigation, processing, and formal wholesale markets.',
    milestones: [
      'Cross-regional agricultural corridor coverage',
      'Institutional infrastructure yield profile backed by diversified crop calendars',
      'Audited, portfolio-wide climate adaptation and emissions-avoidance reporting',
    ],
  },
];

export const ImpactStoryAndScalability: React.FC<
  ImpactStoryAndScalabilityProps
> = ({ unitEconomicsInputs, onNavigate }) => {
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number>(0);
  const [portfolioHubCount, setPortfolioHubCount] = useState<number>(10);
  const [solarPerHubKwp, setSolarPerHubKwp] = useState<number>(45);
  const [farmersPerHub, setFarmersPerHub] = useState<number>(250);

  // Derive single-hub economics directly from the editable assumptions in Section G
  const singleHubEcon = calculateUnitEconomics(unitEconomicsInputs);

  const totalSolarKwp = portfolioHubCount * solarPerHubKwp;
  const totalCapitalRequired = portfolioHubCount * singleHubEcon.totalCapex;
  const totalFarmersReached = portfolioHubCount * farmersPerHub;
  const totalAnnualServiceRevenue =
    portfolioHubCount * singleHubEcon.annualRevenue;
  const totalAnnualOperatingCashFlow =
    portfolioHubCount * singleHubEcon.annualOperatingCashFlow;

  const activePhase = ROADMAP_PHASES[selectedPhaseIdx];

  return (
    <>
      {/* SECTION I: OUR IMPACT STORY */}
      <section
        id="impact-story"
        aria-labelledby="impact-story-heading"
        className="py-20 md:py-28 border-b border-[#171A18]/10 bg-[#FAF8F2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
              <span>07. Our Impact Story &amp; Field Hypothesis</span>
              <span aria-hidden="true" className="text-[#777D77]">·</span>
              <span className="text-[#777D77]">
                Three-Stage Community Transformation Narrative
              </span>
            </div>
            <h2
              id="impact-story-heading"
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#171A18] leading-[1.12] text-balance"
            >
              When energy works for farmers,{' '}
              <span className="font-serif italic font-normal text-[#086B3A]">
                entire communities can benefit.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#171A18]/80 leading-relaxed">
              We do not assume that installing solar panels automatically raises
              every farmer&apos;s income. We treat community impact as a rigorous
              operational hypothesis to be tested, measured, and refined through
              the pilot.
            </p>
          </div>

          {/* Documentary Visual + Three-Stage Narrative */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-16/9 rounded-xl overflow-hidden border border-[#171A18]/15 relative">
                <ResilientImage
                  src={GENERATED_IMAGES.farmerStory}
                  alt="Smallholder farmers and cooperative members gathering fresh produce crates at sunrise"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 text-white">
                  <div className="text-xs font-mono text-[#F49A16]">
                    Documentary Illustration · Field Hypothesis
                  </div>
                  <p className="text-sm font-medium mt-1">
                    Connecting clean electricity directly to post-harvest
                    preservation, dry-season water access, and local value
                    addition.
                  </p>
                </div>
              </div>

              {/* Methodological Honesty Callout */}
              <div className="bg-white border border-[#171A18]/10 rounded-xl p-5 text-xs text-[#171A18]/80 leading-relaxed">
                <strong className="font-semibold text-[#171A18]">
                  Commitment to Evidence Integrity:
                </strong>{' '}
                We publish actual farmer stories, portraits, and income changes
                only when collected from active pilot sites with informed
                written consent. Below is our structured evaluation framework for
                the Pilot Hub 01 cohort.
              </div>
            </div>

            {/* Three-Stage Narrative Cards: BEFORE -> WITH BETAPAWA -> THE OUTCOME */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white border border-[#171A18]/10 rounded-xl p-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#777D77]">
                  <span>STAGE 01 · BASELINE CONDITION</span>
                  <span>BEFORE</span>
                </div>
                <h3 className="mt-1.5 text-lg font-bold text-[#171A18]">
                  Unreliable Electricity, Ambient Spoilage &amp; Forced Early Sales
                </h3>
                <p className="mt-2 text-sm text-[#171A18]/80 leading-relaxed">
                  A smallholder farmer harvests perishable tomatoes or leafy
                  vegetables in 34°C heat. With no walk-in cold room and costly
                  diesel fuel for water pumping or milling, the farmer faces
                  steep post-harvest losses and pressure to sell immediately at
                  depressed harvest-glut prices.
                </p>
              </div>

              <div className="bg-white border-l-4 border-l-[#086B3A] border border-[#171A18]/10 rounded-xl p-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#086B3A] font-semibold">
                  <span>STAGE 02 · INTERVENTION</span>
                  <span>WITH BETAPAWA AGRIPOWER™</span>
                </div>
                <h3 className="mt-1.5 text-lg font-bold text-[#171A18]">
                  Pay-Per-Use Productive Services Without Upfront CAPEX
                </h3>
                <p className="mt-2 text-sm text-[#171A18]/80 leading-relaxed">
                  The farmer accesses walk-in solar cold storage per crate per
                  day, metered solar water pumping during the dry season, and
                  clean electric agro-processing machinery—paying transparently
                  via mobile money only when services are used.
                </p>
              </div>

              <div className="bg-[#064B2D] text-white rounded-xl p-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#F49A16]">
                  <span>STAGE 03 · PILOT HYPOTHESIS TO MEASURE</span>
                  <span>THE OUTCOME</span>
                </div>
                <h3 className="mt-1.5 text-lg font-bold">
                  Opportunity to Reduce Losses, Improve Operations &amp; Retain Value
                </h3>
                <p className="mt-2 text-sm text-white/85 leading-relaxed">
                  By extending crop shelf life from days to weeks and processing
                  raw harvests locally, the farmer has a measurable opportunity
                  to avoid distress discounting, sell higher-grade output, and
                  strengthen household resilience.
                </p>
              </div>
            </div>
          </div>

          {/* Structured Evidence & Field Documentation Slots (Ready for Consented Pilot Data) */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#171A18]/10 rounded-xl p-5">
              <Users className="w-5 h-5 text-[#086B3A] mb-3" />
              <div className="text-xs font-mono text-[#777D77]">
                Field Evidence Slot 01
              </div>
              <h4 className="mt-1 text-sm font-bold text-[#171A18]">
                Farmer Portraits &amp; Consented Testimonials
              </h4>
              <p className="mt-2 text-xs text-[#777D77] leading-relaxed">
                Reserved for verified interviews with participating cooperative
                members following written media consent during Pilot Phase 1.
              </p>
            </div>

            <div className="bg-white border border-[#171A18]/10 rounded-xl p-5">
              <BarChart3 className="w-5 h-5 text-[#086B3A] mb-3" />
              <div className="text-xs font-mono text-[#777D77]">
                Field Evidence Slot 02
              </div>
              <h4 className="mt-1 text-sm font-bold text-[#171A18]">
                Baseline vs. Follow-Up Survey Results
              </h4>
              <p className="mt-2 text-xs text-[#777D77] leading-relaxed">
                Pre-commissioning crop spoilage and price realisation baselines
                compared against 6-month and 12-month post-harvest cohorts.
              </p>
            </div>

            <div className="bg-white border border-[#171A18]/10 rounded-xl p-5">
              <Film className="w-5 h-5 text-[#086B3A] mb-3" />
              <div className="text-xs font-mono text-[#777D77]">
                Field Evidence Slot 03
              </div>
              <h4 className="mt-1 text-sm font-bold text-[#171A18]">
                Short Documentary Field Dispatches
              </h4>
              <p className="mt-2 text-xs text-[#777D77] leading-relaxed">
                Video walkthroughs of crate check-in operations, solar pumping
                schedules, and cooperative off-take days.
              </p>
            </div>

            <div className="bg-white border border-[#171A18]/10 rounded-xl p-5">
              <FileCheck className="w-5 h-5 text-[#086B3A] mb-3" />
              <div className="text-xs font-mono text-[#777D77]">
                Field Evidence Slot 04
              </div>
              <h4 className="mt-1 text-sm font-bold text-[#171A18]">
                Community Partner &amp; Evaluation Reports
              </h4>
              <p className="mt-2 text-xs text-[#777D77] leading-relaxed">
                Statements from cooperative leadership and independent M&amp;E
                advisors assessing pilot unit economics and social inclusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION J: SCALABILITY — ONE HUB BECOMES A NETWORK */}
      <section
        id="scalability"
        aria-labelledby="scalability-heading"
        className="py-20 md:py-28 border-b border-[#171A18]/10 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
              <span>08. Replication &amp; Portfolio Scale</span>
              <span aria-hidden="true" className="text-[#777D77]">·</span>
              <span className="text-[#777D77]">
                From Single Demonstration Hub to Regional Network
              </span>
            </div>
            <h2
              id="scalability-heading"
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#171A18] leading-[1.12] text-balance"
            >
              Designed to replicate.{' '}
              <span className="font-serif italic font-normal text-[#086B3A]">
                Built to adapt.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#171A18]/80 leading-relaxed">
              Every agricultural corridor has a distinct crop calendar, water
              table, customer density, and grid status. Betapawa AgriPower
              standardises the core electrical, metering, and commercial
              architecture so individual hub modules can adapt to local value
              chains without bespoke engineering from scratch.
            </p>
          </div>

          {/* 4-Phase Interactive Network Roadmap */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROADMAP_PHASES.map((p, idx) => {
                  const isSelected = idx === selectedPhaseIdx;
                  return (
                    <button
                      key={p.phase}
                      type="button"
                      onClick={() => {
                        setSelectedPhaseIdx(idx);
                        if (idx === 0) setPortfolioHubCount(1);
                        if (idx === 1) setPortfolioHubCount(5);
                        if (idx === 2) setPortfolioHubCount(15);
                        if (idx === 3) setPortfolioHubCount(50);
                      }}
                      className={`text-left p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#064B2D] text-white border-[#064B2D]'
                          : 'bg-[#FAF8F2] text-[#171A18] border-[#171A18]/12 hover:border-[#086B3A]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span
                            className={
                              isSelected ? 'text-[#F49A16]' : 'text-[#086B3A]'
                            }
                          >
                            {p.phase}
                          </span>
                          <span
                            className={
                              isSelected ? 'text-white/80' : 'text-[#777D77]'
                            }
                          >
                            {p.hubCountRange}
                          </span>
                        </div>
                        <h3 className="mt-2 text-base font-bold">{p.title}</h3>
                        <p
                          className={`mt-1.5 text-xs leading-relaxed ${
                            isSelected ? 'text-white/85' : 'text-[#171A18]/75'
                          }`}
                        >
                          {p.focus}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Phase Detail Card */}
              <div className="bg-[#FAF8F2] border border-[#171A18]/12 rounded-xl p-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#086B3A]">
                  <span>
                    {activePhase.phase} · {activePhase.title}
                  </span>
                  <span>Scale: {activePhase.hubCountRange}</span>
                </div>
                <p className="mt-2 text-sm text-[#171A18]/85 leading-relaxed">
                  {activePhase.details}
                </p>
                <div className="mt-4 pt-4 border-t border-[#171A18]/10">
                  <div className="text-xs font-semibold text-[#171A18] mb-2">
                    Key Phase Gate Deliverables:
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#171A18]/80">
                    {activePhase.milestones.map((m) => (
                      <li key={m} className="flex items-baseline gap-2">
                        <span className="font-mono text-[#086B3A] font-bold">
                          ·
                        </span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Animated/Interactive Network Topology SVG */}
            <div className="lg:col-span-5 bg-[#171A18] text-white rounded-xl p-6 border border-[#171A18]">
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-semibold flex items-center gap-1.5">
                  <Network className="w-4 h-4 text-[#F49A16]" />
                  <span>Regional Hub Topology Visualizer</span>
                </span>
                <span className="font-mono text-[#F49A16] tabular-nums">
                  {portfolioHubCount} {portfolioHubCount === 1 ? 'Hub' : 'Hubs'} Simulated
                </span>
              </div>

              <svg
                viewBox="0 0 400 240"
                className="w-full h-52 bg-[#064B2D]/35 rounded-lg border border-white/10"
                aria-label="Network topology diagram showing central operations connected to distributed agricultural hubs"
              >
                {/* Connecting spokes */}
                {[
                  { x: 90, y: 65, minHubs: 2 },
                  { x: 310, y: 60, minHubs: 3 },
                  { x: 80, y: 175, minHubs: 5 },
                  { x: 320, y: 175, minHubs: 5 },
                  { x: 200, y: 40, minHubs: 10 },
                  { x: 200, y: 200, minHubs: 15 },
                  { x: 45, y: 120, minHubs: 25 },
                  { x: 355, y: 120, minHubs: 35 },
                ].map((node, i) => {
                  const active = portfolioHubCount >= node.minHubs;
                  return (
                    <g key={i}>
                      <line
                        x1="200"
                        y1="120"
                        x2={node.x}
                        y2={node.y}
                        stroke={active ? '#34D399' : '#ffffff22'}
                        strokeWidth={active ? '1.8' : '1'}
                        strokeDasharray={active ? 'none' : '4 4'}
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={active ? 10 : 6}
                        fill={active ? '#086B3A' : '#ffffff15'}
                        stroke={active ? '#F49A16' : '#ffffff30'}
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}

                {/* Central Anchor Hub 01 */}
                <circle
                  cx="200"
                  cy="120"
                  r="24"
                  fill="#F49A16"
                  fillOpacity="0.2"
                />
                <circle
                  cx="200"
                  cy="120"
                  r="15"
                  fill="#F49A16"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
                <text
                  x="200"
                  y="124"
                  textAnchor="middle"
                  fill="#171A18"
                  className="font-mono text-[10px] font-bold"
                >
                  H01
                </text>
              </svg>

              <p className="mt-4 text-xs text-white/75 leading-relaxed">
                Each node adapts its cold-room temperature, pumping capacity, and
                processing machinery to the local crop mix while sharing
                Betapawa&apos;s central telemetry, prepaid billing software, and
                preventive maintenance teams.
              </p>
            </div>
          </div>

          {/* Interactive Portfolio Scale Calculator (Linked to Editable Assumptions) */}
          <div className="mt-10 bg-[#FAF8F2] border border-[#171A18]/15 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#171A18]/10">
              <div>
                <h3 className="text-lg font-bold text-[#171A18]">
                  Interactive Multi-Hub Portfolio Scale Calculator
                </h3>
                <p className="text-xs text-[#777D77] mt-0.5">
                  All portfolio outputs below derive directly from your editable single-hub unit-economics assumptions in Section G (${singleHubEcon.totalCapex.toLocaleString()} CAPEX &amp; ${singleHubEcon.annualRevenue.toLocaleString()}/yr revenue per hub).
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('business-model')}
                className="self-start sm:self-auto text-xs font-semibold text-[#086B3A] hover:underline cursor-pointer whitespace-nowrap"
              >
                Edit Single-Hub Assumptions ↑
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5 bg-white p-5 rounded-xl border border-[#171A18]/10">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <label
                      htmlFor="scale-hubs-slider"
                      className="font-semibold text-[#171A18]"
                    >
                      Number of Deployed AgriPower™ Hubs
                    </label>
                    <span className="font-mono text-sm font-bold text-[#086B3A] tabular-nums">
                      {portfolioHubCount}{' '}
                      {portfolioHubCount === 1 ? 'Hub' : 'Hubs'}
                    </span>
                  </div>
                  <input
                    id="scale-hubs-slider"
                    type="range"
                    min={1}
                    max={100}
                    value={portfolioHubCount}
                    onChange={(e) =>
                      setPortfolioHubCount(Number(e.target.value))
                    }
                    className="w-full accent-[#086B3A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#777D77] font-mono mt-1">
                    <span>1 (Pilot)</span>
                    <span>25 (Cluster)</span>
                    <span>50 (Regional)</span>
                    <span>100 Hubs</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label
                      htmlFor="scale-kwp-input"
                      className="block text-xs font-medium text-[#777D77] mb-1"
                    >
                      Avg. Solar per Hub (kWp)
                    </label>
                    <input
                      id="scale-kwp-input"
                      type="number"
                      min={15}
                      max={150}
                      value={solarPerHubKwp}
                      onChange={(e) =>
                        setSolarPerHubKwp(
                          Math.max(1, Number(e.target.value) || 45)
                        )
                      }
                      className="w-full px-3 py-1.5 text-sm font-mono font-semibold bg-[#FAF8F2] border border-[#171A18]/20 rounded-md tabular-nums"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="scale-farmers-input"
                      className="block text-xs font-medium text-[#777D77] mb-1"
                    >
                      Farmers Reached / Hub
                    </label>
                    <input
                      id="scale-farmers-input"
                      type="number"
                      min={50}
                      max={1000}
                      step={25}
                      value={farmersPerHub}
                      onChange={(e) =>
                        setFarmersPerHub(
                          Math.max(10, Number(e.target.value) || 250)
                        )
                      }
                      className="w-full px-3 py-1.5 text-sm font-mono font-semibold bg-[#FAF8F2] border border-[#171A18]/20 rounded-md tabular-nums"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border border-[#171A18]/10 rounded-xl p-4">
                  <span className="text-xs text-[#777D77]">
                    Illustrative Solar Capacity
                  </span>
                  <div className="mt-1 font-mono text-xl sm:text-2xl font-bold text-[#171A18] tabular-nums">
                    {totalSolarKwp >= 1000
                      ? `${(totalSolarKwp / 1000).toFixed(2)} MWp`
                      : `${totalSolarKwp} kWp`}
                  </div>
                  <span className="text-[11px] text-[#086B3A]">
                    Illustrative Assumption
                  </span>
                </div>

                <div className="bg-white border border-[#171A18]/10 rounded-xl p-4">
                  <span className="text-xs text-[#777D77]">
                    Total Capital Requirement
                  </span>
                  <div className="mt-1 font-mono text-xl sm:text-2xl font-bold text-[#171A18] tabular-nums">
                    ${(totalCapitalRequired / 1_000_000).toFixed(2)}M
                  </div>
                  <span className="text-[11px] text-[#777D77] font-mono tabular-nums">
                    (${totalCapitalRequired.toLocaleString()} CAPEX)
                  </span>
                </div>

                <div className="bg-white border border-[#171A18]/10 rounded-xl p-4">
                  <span className="text-xs text-[#777D77]">
                    Smallholder Farmers Reached
                  </span>
                  <div className="mt-1 font-mono text-xl sm:text-2xl font-bold text-[#086B3A] tabular-nums">
                    {totalFarmersReached.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[#086B3A]">
                    Illustrative Reach
                  </span>
                </div>

                <div className="bg-white border border-[#171A18]/10 rounded-xl p-4 sm:col-span-1">
                  <span className="text-xs text-[#777D77]">
                    Annual Gross Service Revenue
                  </span>
                  <div className="mt-1 font-mono text-xl font-bold text-[#086B3A] tabular-nums">
                    ${totalAnnualServiceRevenue.toLocaleString()}/yr
                  </div>
                  <span className="text-[11px] text-[#777D77]">
                    Derived from Unit-Economics
                  </span>
                </div>

                <div className="bg-white border border-[#171A18]/10 rounded-xl p-4 sm:col-span-2">
                  <span className="text-xs text-[#777D77]">
                    Annual Portfolio Operating Cash Flow (Site EBITDA Proxy)
                  </span>
                  <div className="mt-1 font-mono text-xl font-bold text-[#171A18] tabular-nums">
                    ${totalAnnualOperatingCashFlow.toLocaleString()}/yr
                  </div>
                  <span className="text-[11px] text-[#777D77]">
                    Illustrative linear scaling — actual portfolio economics vary by site &amp; crop
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
