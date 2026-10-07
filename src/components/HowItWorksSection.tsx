import React, { useState } from 'react';
import { ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';

type ExplainerMode = 'energy' | 'farmer' | 'money';

interface StageContent {
  step: number;
  number: string;
  baseTitle: string;
  energy: {
    subtitle: string;
    detail: string;
    metric: string;
    flowLabel: string;
  };
  farmer: {
    subtitle: string;
    detail: string;
    metric: string;
    flowLabel: string;
  };
  money: {
    subtitle: string;
    detail: string;
    metric: string;
    flowLabel: string;
  };
}

const SYSTEM_STAGES: StageContent[] = [
  {
    step: 0,
    number: '01',
    baseTitle: 'Solar panels generate electricity',
    energy: {
      subtitle: 'DC Photovoltaic Generation',
      detail:
        'Canopy-mounted monocrystalline PV modules capture solar irradiance across a 35–60 kWp array, producing clean direct-current (DC) power peaking during midday agricultural work hours.',
      metric: '180–210 kWh/day generated (Illustrative)',
      flowLabel: 'DC Solar Harvest → Hybrid Inverter Bus',
    },
    farmer: {
      subtitle: 'Zero Fuel Procurement Required',
      detail:
        'Instead of travelling to buy petrol or diesel at volatile retail prices, the farming community relies on the hub’s shaded solar canopy operating silently at the centre of the cluster.',
      metric: '0 Litres fuel carried by farmer',
      flowLabel: 'Morning Harvest Arrives at Hub',
    },
    money: {
      subtitle: 'Zero Marginal Fuel Cost CAPEX Asset',
      detail:
        'Project capital finances the long-life PV array upfront (20–25 year panel design life), locking in near-zero marginal generation cost for the life of the hub.',
      metric: '~$0.00/kWh marginal fuel cost',
      flowLabel: 'Project CAPEX Deployed → Generation Asset',
    },
  },
  {
    step: 1,
    number: '02',
    baseTitle: 'Batteries store energy where required',
    energy: {
      subtitle: 'Electrochemical & Thermal Buffering',
      detail:
        'LiFePO4 battery banks store chemical energy for night-time continuity, while the cold room’s phase-change thermal plates and elevated water tank absorb midday surplus solar power.',
      metric: '75–120 kWh LiFePO4 + Thermal Reserve',
      flowLabel: 'Bi-Directional Charge / Discharge',
    },
    farmer: {
      subtitle: 'Round-the-Clock Cold Chain Confidence',
      detail:
        'Farmers storing high-value tomatoes or peppers overnight know the cold room maintains 8°C through the night and during cloudy afternoons without generator cut-outs.',
      metric: '24/7 Continuous Cooling Integrity',
      flowLabel: 'Overnight Produce Protection',
    },
    money: {
      subtitle: 'Smart Sizing Minimises Battery Replacement Cost',
      detail:
        'By shifting water pumping and grain milling to peak sun hours, the hub avoids oversized chemical battery banks—reducing initial CAPEX and funding a dedicated monthly replacement reserve.',
      metric: '$220/mo Replacement Reserve (Illustrative)',
      flowLabel: 'Lifecycle Reserve Protects Asset Value',
    },
  },
  {
    step: 2,
    number: '03',
    baseTitle: 'A smart mini-grid distributes power',
    energy: {
      subtitle: 'Automated Load-Priority AC Distribution',
      detail:
        'The Energy Management System (EMS) balances three-phase and single-phase feeders: prioritising cold-room compressors first, agro-processing second, irrigation third, and SMEs fourth.',
      metric: '3-Phase 400V + Single-Phase 230V Bus',
      flowLabel: 'Balanced Multi-Feeder Dispatch',
    },
    farmer: {
      subtitle: 'One Stop for Multiple Agricultural Needs',
      detail:
        'A farmer can irrigate their plot in the morning, mill dried maize in the afternoon, and store fresh vegetables in the cold room—all at one walk-in community location.',
      metric: '4 Anchor Services at 1 Location',
      flowLabel: 'Farmer Selects Needed Service Bay',
    },
    money: {
      subtitle: 'High Daytime Load Factor Boosts Asset Utilisation',
      detail:
        'Unlike residential-only rural mini-grids that sit idle during sunny midday hours, stacking agricultural loads achieves >85% daytime solar utilisation.',
      metric: '85%+ Daytime Solar Utilisation Target',
      flowLabel: 'Diversified Multi-Service Revenue Mix',
    },
  },
  {
    step: 3,
    number: '04',
    baseTitle: 'Customers access productive-use services',
    energy: {
      subtitle: 'Kilowatt-Hours Converted to Productive Work',
      detail:
        'Electrical energy drives high-efficiency scroll compressors (cold storage), variable-frequency borehole pumps (irrigation), and three-phase electric motors (milling & drying).',
      metric: '45 kW Peak Productive Load Capacity',
      flowLabel: 'Mechanical & Thermal Work Delivered',
    },
    farmer: {
      subtitle: 'Pay-As-You-Use Access Without Equipment Ownership',
      detail:
        'Farmers check in 20kg crates of vegetables, draw metered irrigation water, or mill 100kg sacks of grain on demand—paying only for the exact service units consumed.',
      metric: '$0 Farmer Equipment Debt',
      flowLabel: 'Crates Stored / Water Pumped / Grain Milled',
    },
    money: {
      subtitle: 'Five Complementary Revenue Streams',
      detail:
        'The hub earns service fees per crate-day, per cubic metre of water, per kilogram processed, per kWh sold to SMEs, and monthly SLA retainers from cooperatives.',
      metric: '$3,700/mo Base Illustrative Revenue',
      flowLabel: 'Service Fees Generated Across 5 Streams',
    },
  },
  {
    step: 4,
    number: '05',
    baseTitle: 'Digital meters record consumption and payments',
    energy: {
      subtitle: 'STS Smart Metering & Feeder Sub-Metering',
      detail:
        'Every feeder circuit and customer connection is equipped with tamper-resistant smart meters logging voltage, power factor, and cumulative kWh in 15-minute intervals.',
      metric: '15-Minute Telemetry Interval',
      flowLabel: 'Verified kWh & Crate Ledger Sync',
    },
    farmer: {
      subtitle: 'Instant Mobile Money / USSD Receipts',
      detail:
        'Farmers pay via familiar mobile money or USSD codes on any basic feature phone, receiving an immediate SMS receipt and crate claim tag.',
      metric: '100% Cashless & Transparent Tariffs',
      flowLabel: 'Mobile Money Payment → SMS Receipt',
    },
    money: {
      subtitle: 'Zero Cash Leakage & Auditable Collections',
      detail:
        'Prepaid digital settlement eliminates on-site cash handling risks, enforces upfront working-capital collection, and provides investors with real-time revenue verification.',
      metric: '100% Prepaid Digital Collection',
      flowLabel: 'Merchant Wallet → Hub Operating Account',
    },
  },
  {
    step: 5,
    number: '06',
    baseTitle: 'Operating and impact data inform improvements',
    energy: {
      subtitle: 'Predictive Maintenance & Dispatch Optimisation',
      detail:
        'Cloud telemetry alerts engineers to inverter anomalies, cold-room door-open thermal losses, or filter maintenance needs before downtime occurs.',
      metric: '<24hr Target Fault Resolution',
      flowLabel: 'Telemetry Feedback → EMS Optimisation',
    },
    farmer: {
      subtitle: 'Seasonal Tariff & Capacity Adaptation',
      detail:
        'Utilization logs show cooperatives when harvest peaks occur, helping schedule cold-room space, coordinate wholesale off-taker trucks, and expand processing bays.',
      metric: 'Reduced Spoilage & Stronger Off-Take',
      flowLabel: 'Higher Retained Value → Next Season Reinvestment',
    },
    money: {
      subtitle: 'Auditable Cash Flows & Standardized Replication',
      detail:
        'After covering site O&M, staff, and the replacement reserve, net operating cash flows service project capital and de-risk financing for the next portfolio of hubs.',
      metric: '~6.3 Yr Illustrative Unlevered Payback',
      flowLabel: 'O&M + Reserve → Capital Provider Returns',
    },
  },
];

export const HowItWorksSection: React.FC = () => {
  const [mode, setMode] = useState<ExplainerMode>('energy');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % SYSTEM_STAGES.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying]);

  const currentStage = SYSTEM_STAGES[activeStep];
  const currentModeData = currentStage[mode];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="py-20 md:py-28 border-b border-[#171A18]/10 bg-[#FAF8F2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & 3-Mode Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
              <span>03. System Architecture &amp; Value Flow</span>
              <span aria-hidden="true" className="text-[#777D77]">·</span>
              <span className="text-[#777D77]">Interactive 6-Stage Sequence</span>
            </div>
            <h2
              id="how-it-works-heading"
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#171A18] leading-[1.12] text-balance"
            >
              From sunlight to{' '}
              <span className="font-serif italic font-normal text-[#086B3A]">
                agricultural value.
              </span>
            </h2>
            <p className="mt-4 text-base text-[#171A18]/80 leading-relaxed">
              Switch between the three lenses below to trace how solar kilowatt-hours,
              smallholder produce, and financial cash flows move through a
              Betapawa AgriPower™ hub.
            </p>
          </div>

          {/* 3-Mode Selector: Follow the energy / Follow the farmer / Follow the money */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div
              role="group"
              aria-label="Select system lens"
              className="flex items-center gap-1 p-1.5 bg-white border border-[#171A18]/15 rounded-xl"
            >
              <button
                type="button"
                onClick={() => setMode('energy')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  mode === 'energy'
                    ? 'bg-[#086B3A] text-white'
                    : 'text-[#171A18]/75 hover:text-[#171A18]'
                }`}
              >
                Follow the energy
              </button>
              <button
                type="button"
                onClick={() => setMode('farmer')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  mode === 'farmer'
                    ? 'bg-[#086B3A] text-white'
                    : 'text-[#171A18]/75 hover:text-[#171A18]'
                }`}
              >
                Follow the farmer
              </button>
              <button
                type="button"
                onClick={() => setMode('money')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  mode === 'money'
                    ? 'bg-[#086B3A] text-white'
                    : 'text-[#171A18]/75 hover:text-[#171A18]'
                }`}
              >
                Follow the money
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Animated SVG System Diagram & 6-Stage Flow */}
        <div className="mt-10 bg-white border border-[#171A18]/12 rounded-xl p-6 sm:p-8">
          {/* Top Bar Controls for Stepping / Auto-Sequence */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#171A18]/10">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#171A18]">
                Active Lens:{' '}
                {mode === 'energy'
                  ? 'Electricity Generation, Storage & Dispatch'
                  : mode === 'farmer'
                  ? 'Farmer Service Access & Crop Value Preservation'
                  : 'Prepaid Collections, O&M & Capital Returns'}
              </span>
              <span aria-hidden="true" className="text-[#777D77]">·</span>
              <span className="font-mono text-[#086B3A] tabular-nums">
                Stage 0{activeStep + 1} of 06
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className="px-3 py-1.5 text-xs font-semibold text-[#171A18] bg-[#FAF8F2] hover:bg-[#171A18]/8 border border-[#171A18]/15 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#086B3A]" />
                    <span>Pause Sequence</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#086B3A]" />
                    <span>Auto-Step Flow</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveStep(0);
                }}
                aria-label="Reset sequence to Stage 1"
                className="p-1.5 text-xs text-[#777D77] hover:text-[#171A18] border border-[#171A18]/15 rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Visual SVG Flow Bus (Desktop) */}
          <div className="hidden lg:block my-6">
            <svg
              viewBox="0 0 1100 90"
              className="w-full h-20 overflow-visible"
              aria-hidden="true"
            >
              {/* Base Track Line */}
              <line
                x1="60"
                y1="45"
                x2="1040"
                y2="45"
                stroke="#E5E4DE"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Active Progress Line */}
              <line
                x1="60"
                y1="45"
                x2={60 + activeStep * 196}
                y2="45"
                stroke={mode === 'money' ? '#F49A16' : '#086B3A'}
                strokeWidth="4"
                strokeLinecap="round"
                className="transition-all duration-300"
              />

              {SYSTEM_STAGES.map((st, idx) => {
                const cx = 60 + idx * 196;
                const isPassed = idx <= activeStep;
                const isCurrent = idx === activeStep;
                return (
                  <g
                    key={st.number}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveStep(idx);
                    }}
                    className="cursor-pointer"
                  >
                    {isCurrent && (
                      <circle
                        cx={cx}
                        cy="45"
                        r="24"
                        fill={mode === 'money' ? '#F49A16' : '#086B3A'}
                        fillOpacity="0.15"
                      />
                    )}
                    <circle
                      cx={cx}
                      cy="45"
                      r="16"
                      fill={
                        isCurrent
                          ? '#F49A16'
                          : isPassed
                          ? '#086B3A'
                          : '#FAF8F2'
                      }
                      stroke={isPassed ? '#086B3A' : '#777D77'}
                      strokeWidth="2"
                    />
                    <text
                      x={cx}
                      y="49"
                      textAnchor="middle"
                      fill={isPassed ? '#FFFFFF' : '#171A18'}
                      className="font-mono text-[11px] font-bold select-none"
                    >
                      {st.number}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* 6 Interactive Stage Cards */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {SYSTEM_STAGES.map((stage, idx) => {
              const isCurrent = idx === activeStep;
              const isPassed = idx < activeStep;
              const stageModeInfo = stage[mode];
              return (
                <button
                  key={stage.number}
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveStep(idx);
                  }}
                  aria-pressed={isCurrent}
                  className={`text-left p-4 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-[#086B3A] ${
                    isCurrent
                      ? 'bg-[#064B2D] text-white border-[#064B2D] shadow-sm'
                      : isPassed
                      ? 'bg-[#FAF8F2] text-[#171A18] border-[#086B3A]/40'
                      : 'bg-[#FAF8F2]/60 text-[#171A18]/80 border-[#171A18]/10 hover:border-[#086B3A]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-bold tabular-nums ${
                          isCurrent ? 'text-[#F49A16]' : 'text-[#086B3A]'
                        }`}
                      >
                        {stage.number}.
                      </span>
                      {idx < SYSTEM_STAGES.length - 1 && (
                        <ArrowRight
                          className={`w-3.5 h-3.5 ${
                            isCurrent ? 'text-[#F49A16]' : 'text-[#777D77]/60'
                          }`}
                        />
                      )}
                    </div>
                    <h3 className="mt-2 text-xs sm:text-sm font-semibold leading-snug">
                      {stage.baseTitle}
                    </h3>
                  </div>

                  <div
                    className={`mt-3 pt-2 border-t text-[11px] font-medium ${
                      isCurrent
                        ? 'border-white/15 text-white/90'
                        : 'border-[#171A18]/10 text-[#777D77]'
                    }`}
                  >
                    {stageModeInfo.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Expanded Inspection Panel */}
          <div className="mt-6 bg-[#FAF8F2] border border-[#171A18]/12 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#086B3A] font-medium">
                <span>Stage {currentStage.number}</span>
                <span aria-hidden="true">·</span>
                <span>{currentStage.baseTitle}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#171A18]/75">
                  {currentModeData.subtitle}
                </span>
              </div>
              <h4 className="mt-1.5 text-lg sm:text-xl font-bold text-[#171A18]">
                {currentModeData.subtitle}
              </h4>
              <p className="mt-2 text-sm sm:text-base text-[#171A18]/80 leading-relaxed">
                {currentModeData.detail}
              </p>
            </div>

            <div className="lg:col-span-4 bg-white border border-[#171A18]/10 rounded-lg p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs text-[#777D77]">
                  Active System Transfer
                </span>
                <div className="mt-1 font-mono text-xs font-semibold text-[#086B3A]">
                  {currentModeData.flowLabel}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#171A18]/10">
                <span className="text-xs text-[#777D77]">
                  Key Performance Indicator
                </span>
                <div className="mt-0.5 font-mono text-base font-bold text-[#171A18] tabular-nums">
                  {currentModeData.metric}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep(
                      (prev) =>
                        (prev - 1 + SYSTEM_STAGES.length) % SYSTEM_STAGES.length
                    )
                  }
                  className="text-xs font-semibold text-[#171A18]/70 hover:text-[#171A18] cursor-pointer"
                >
                  ← Previous Stage
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep((prev) => (prev + 1) % SYSTEM_STAGES.length)
                  }
                  className="text-xs font-semibold text-[#086B3A] hover:underline cursor-pointer"
                >
                  Next Stage →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
