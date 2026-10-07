import React, { useState } from 'react';
import {
  Sun,
  Snowflake,
  Droplets,
  Factory,
  Smartphone,
  Users,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { GENERATED_IMAGES } from '../config/agripowerConfig';
import { ResilientImage } from './ResilientImage';

type SolutionTabId =
  | 'solar'
  | 'cold-storage'
  | 'irrigation'
  | 'processing'
  | 'payments'
  | 'impact';

interface TabDefinition {
  id: SolutionTabId;
  index: string;
  label: string;
  shortLabel: string;
  icon: React.FC<{ className?: string }>;
}

const TABS: TabDefinition[] = [
  { id: 'solar', index: '01', label: 'Solar Power', shortLabel: 'Solar', icon: Sun },
  {
    id: 'cold-storage',
    index: '02',
    label: 'Cold Storage',
    shortLabel: 'Cold Chain',
    icon: Snowflake,
  },
  {
    id: 'irrigation',
    index: '03',
    label: 'Solar Irrigation',
    shortLabel: 'Irrigation',
    icon: Droplets,
  },
  {
    id: 'processing',
    index: '04',
    label: 'Agro-Processing',
    shortLabel: 'Processing',
    icon: Factory,
  },
  {
    id: 'payments',
    index: '05',
    label: 'Smart Payments',
    shortLabel: 'Payments',
    icon: Smartphone,
  },
  {
    id: 'impact',
    index: '06',
    label: 'Farmer Impact',
    shortLabel: 'Impact',
    icon: Users,
  },
];

export const SolutionTabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SolutionTabId>('solar');

  // TAB 1: Configurable Solar Power Specs
  const [solarKwp, setSolarKwp] = useState<number>(45);
  const [batteryKwh, setBatteryKwh] = useState<number>(95);
  const [sunHours, setSunHours] = useState<number>(4.5);
  const expectedDailyGen = Math.round(solarKwp * sunHours * 0.88);

  // TAB 2: Cold Storage Calculator State
  const [numCrates, setNumCrates] = useState<number>(25);
  const [daysStored, setDaysStored] = useState<number>(5);
  const [pricePerCrateDay, setPricePerCrateDay] = useState<number>(0.25);
  const totalStorageFee = numCrates * daysStored * pricePerCrateDay;
  const illustrativeCropValue = numCrates * 16; // ~$16 per 20kg crate wholesale illustrative

  // TAB 3: Solar Irrigation Configurable State
  const [pumpingHours, setPumpingHours] = useState<number>(6.5);
  const [flowRateM3Hr, setFlowRateM3Hr] = useState<number>(9.5);
  const dailyWaterM3 = Math.round(pumpingHours * flowRateM3Hr);
  const irrigatedHectares = +(dailyWaterM3 / 11.5).toFixed(1);
  const seasonalDieselDisplacedL = Math.round(dailyWaterM3 * 0.22 * 240);

  // TAB 4: Agro-Processing Appliance Selector
  const [selectedProcess, setSelectedProcess] = useState<
    'milling' | 'drying' | 'pressing'
  >('milling');

  // TAB 5: Smart Payments Demo State
  const [demoBalance, setDemoBalance] = useState<number>(14.5);
  const [demoKwhBalance, setDemoKwhBalance] = useState<number>(28.4);
  const [demoTransactions, setDemoTransactions] = useState([
    {
      id: 'TX-904',
      time: 'Today, 08:15',
      service: 'Cold Room Check-In (12 Crates × 3 Days)',
      amount: '-$9.00',
      status: 'Settled via Mobile Money',
    },
    {
      id: 'TX-903',
      time: 'Yesterday, 14:40',
      service: 'Maize Hammer Mill (150 kg batch)',
      amount: '-$3.00',
      status: 'Settled via Hub Wallet',
    },
    {
      id: 'TX-902',
      time: 'Yesterday, 09:10',
      service: 'Prepaid Mobile Money Top-Up',
      amount: '+$20.00',
      status: 'Confirmed Token #4819-20',
    },
  ]);

  const handleSimulateTopUp = () => {
    setDemoBalance((prev) => +(prev + 10).toFixed(2));
    setDemoKwhBalance((prev) => +(prev + 35).toFixed(1));
    setDemoTransactions((prev) => [
      {
        id: `TX-${Math.floor(905 + Math.random() * 90)}`,
        time: 'Just now (Demo)',
        service: 'Prepaid Mobile Money Top-Up (+35.0 kWh credit)',
        amount: '+$10.00',
        status: 'Instant STS Token Issued',
      },
      ...prev.slice(0, 4),
    ]);
  };

  const handleSimulateCrateBooking = () => {
    const fee = 3.0;
    if (demoBalance < fee) return;
    setDemoBalance((prev) => +(prev - fee).toFixed(2));
    setDemoTransactions((prev) => [
      {
        id: `TX-${Math.floor(905 + Math.random() * 90)}`,
        time: 'Just now (Demo)',
        service: 'Cold Storage Booking (10 Crates × 1 Day)',
        amount: '-$3.00',
        status: 'Crate Tag #CR-208 Active',
      },
      ...prev.slice(0, 4),
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (idx + 1) % TABS.length;
      setActiveTab(TABS[next].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (idx - 1 + TABS.length) % TABS.length;
      setActiveTab(TABS[prev].id);
    }
  };

  return (
    <section
      id="solution"
      aria-labelledby="solution-heading"
      className="py-20 md:py-28 border-b border-[#171A18]/10 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
            <span>02. The Betapawa AgriPower™ Platform</span>
            <span aria-hidden="true" className="text-[#777D77]">·</span>
            <span className="text-[#777D77]">Modular Productive-Use Hub</span>
          </div>
          <h2
            id="solution-heading"
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#171A18] leading-[1.12] text-balance"
          >
            One hub.{' '}
            <span className="font-serif italic font-normal text-[#086B3A]">
              Multiple income-generating services.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#171A18]/80 leading-relaxed">
            Instead of sizing a standalone solar system for a single seasonal
            load, Betapawa AgriPower stacks complementary daytime and thermal
            loads—cold storage, water pumping, agro-processing, and community
            power—onto one shared generation and smart-metering core.
          </p>
        </div>

        {/* Interactive 6-Tab Bar */}
        <div
          role="tablist"
          aria-label="AgriPower Hub Services"
          className="mt-10 flex items-center gap-1.5 p-1.5 bg-[#FAF8F2] border border-[#171A18]/12 rounded-xl overflow-x-auto"
        >
          {TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#086B3A] ${
                  isSelected
                    ? 'bg-[#086B3A] text-white shadow-xs'
                    : 'text-[#171A18]/75 hover:text-[#171A18] hover:bg-[#171A18]/5'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-[#F49A16]' : 'text-[#086B3A]'
                  }`}
                />
                <span className="font-mono text-xs opacity-75">{tab.index}.</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="mt-8 bg-[#FAF8F2] border border-[#171A18]/12 rounded-xl p-6 sm:p-8 lg:p-10"
        >
          {/* TAB 1: SOLAR POWER */}
          {activeTab === 'solar' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#086B3A] font-medium">
                    <span>01. Solar Power &amp; Storage</span>
                    <span aria-hidden="true">·</span>
                    <span>Configurable Pilot Specification</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-[#171A18]">
                    High-Uptime Solar Mini-Grid &amp; Battery Backbone
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#171A18]/80 leading-relaxed">
                    A canopy-mounted solar PV array paired with containerised
                    LiFePO4 battery storage, hybrid inverters, and automated load
                    dispatch supplies clean single-phase and three-phase AC
                    power across the hub and neighbouring rural enterprises.
                  </p>
                </div>

                {/* Configurable Capacity Sliders */}
                <div className="bg-white border border-[#171A18]/10 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#171A18]">
                      Configure Illustrative Hub Sizing
                    </span>
                    <span className="text-xs text-[#777D77]">
                      Illustrative Assumptions
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor="solar-kwp-slider" className="font-medium text-[#171A18]">
                        Installed Solar PV Capacity
                      </label>
                      <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                        {solarKwp} kWp
                      </span>
                    </div>
                    <input
                      id="solar-kwp-slider"
                      type="range"
                      min={20}
                      max={100}
                      step={5}
                      value={solarKwp}
                      onChange={(e) => setSolarKwp(Number(e.target.value))}
                      className="w-full accent-[#086B3A] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor="battery-kwh-slider" className="font-medium text-[#171A18]">
                        LiFePO4 Battery Storage Capacity
                      </label>
                      <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                        {batteryKwh} kWh
                      </span>
                    </div>
                    <input
                      id="battery-kwh-slider"
                      type="range"
                      min={40}
                      max={200}
                      step={5}
                      value={batteryKwh}
                      onChange={(e) => setBatteryKwh(Number(e.target.value))}
                      className="w-full accent-[#086B3A] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor="sun-hours-slider" className="font-medium text-[#171A18]">
                        Site Peak Sun Hours
                      </label>
                      <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                        {sunHours.toFixed(1)} hrs/day
                      </span>
                    </div>
                    <input
                      id="sun-hours-slider"
                      type="range"
                      min={3.5}
                      max={6.0}
                      step={0.1}
                      value={sunHours}
                      onChange={(e) => setSunHours(Number(e.target.value))}
                      className="w-full accent-[#086B3A] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Output Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-[#171A18]/10 rounded-lg p-4">
                    <span className="text-xs text-[#777D77]">
                      Expected Daily Generation
                    </span>
                    <div className="mt-1 font-mono text-xl font-bold text-[#171A18] tabular-nums">
                      {expectedDailyGen} kWh/day
                    </div>
                    <span className="text-[11px] text-[#086B3A]">
                      Modelled Estimate · 88% PR
                    </span>
                  </div>
                  <div className="bg-white border border-[#171A18]/10 rounded-lg p-4">
                    <span className="text-xs text-[#777D77]">
                      Target Service Availability
                    </span>
                    <div className="mt-1 font-mono text-xl font-bold text-[#171A18] tabular-nums">
                      99.2% Uptime
                    </div>
                    <span className="text-[11px] text-[#086B3A]">
                      Pilot Target · Priority Cold Bus
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual + Energy Dispatch Diagram */}
              <div className="lg:col-span-6 space-y-5">
                <div className="aspect-16/9 rounded-xl overflow-hidden border border-[#171A18]/12">
                  <ResilientImage
                    src={GENERATED_IMAGES.heroGround}
                    alt="Solar PV canopy and battery infrastructure at the Betapawa AgriPower Hub"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-white border border-[#171A18]/10 rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#171A18] mb-3">
                    <span>Smart Energy Dispatch Priority Architecture</span>
                    <span className="font-mono text-[#086B3A] tabular-nums">
                      {expectedDailyGen} kWh Daily Budget
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                      <span className="font-medium">
                        Tier 1 Priority · Cold Room Thermal Load (24/7)
                      </span>
                      <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                        ~{Math.round(expectedDailyGen * 0.34)} kWh/day (34%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                      <span className="font-medium">
                        Tier 2 Priority · Daytime 3-Phase Agro-Processing
                      </span>
                      <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                        ~{Math.round(expectedDailyGen * 0.28)} kWh/day (28%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                      <span className="font-medium">
                        Tier 3 Priority · Midday Solar Water Pumping
                      </span>
                      <span className="font-mono font-semibold text-[#F49A16] tabular-nums">
                        ~{Math.round(expectedDailyGen * 0.2)} kWh/day (20%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                      <span className="font-medium">
                        Tier 4 Priority · Community SMEs &amp; Charging
                      </span>
                      <span className="font-mono font-semibold text-[#171A18] tabular-nums">
                        ~{Math.round(expectedDailyGen * 0.18)} kWh/day (18%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COLD STORAGE (WITH INTERACTIVE CRATE FEE CALCULATOR) */}
          {activeTab === 'cold-storage' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#086B3A] font-medium">
                    <span>02. Pay-Per-Use Cold Storage</span>
                    <span aria-hidden="true">·</span>
                    <span>Cooling-as-a-Service Model</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-[#171A18]">
                    Walk-In Cold Chain Without Farmer Equipment Debt
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#171A18]/80 leading-relaxed">
                    Farmers and market vendors check perishable crops—tomatoes,
                    bell peppers, leafy greens, and fruit—into an insulated,
                    solar-powered walk-in cold room using standard ventilated
                    20kg plastic crates. Customers pay a transparent daily tariff
                    per crate.
                  </p>
                </div>

                {/* Interactive Cold Storage Fee Calculator */}
                <div className="bg-white border border-[#171A18]/12 rounded-xl p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-[#171A18]/10 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#171A18]">
                        Interactive Cold-Storage Fee Calculator
                      </h4>
                      <p className="text-xs text-[#777D77]">
                        Formula: Crates × Days Stored × Price per Crate per Day
                      </p>
                    </div>
                    <span className="text-xs text-[#086B3A] font-medium">
                      Illustrative Rates
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <label htmlFor="calc-crates" className="font-medium text-[#171A18]">
                          Number of 20kg Crates Stored
                        </label>
                        <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                          {numCrates} crates ({numCrates * 20} kg)
                        </span>
                      </div>
                      <input
                        id="calc-crates"
                        type="range"
                        min={1}
                        max={200}
                        value={numCrates}
                        onChange={(e) => setNumCrates(Number(e.target.value))}
                        className="w-full accent-[#086B3A] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <label htmlFor="calc-days" className="font-medium text-[#171A18]">
                          Storage Duration (Days)
                        </label>
                        <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                          {daysStored} {daysStored === 1 ? 'day' : 'days'}
                        </span>
                      </div>
                      <input
                        id="calc-days"
                        type="range"
                        min={1}
                        max={21}
                        value={daysStored}
                        onChange={(e) => setDaysStored(Number(e.target.value))}
                        className="w-full accent-[#086B3A] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <label htmlFor="calc-rate" className="font-medium text-[#171A18]">
                          Illustrative Tariff per Crate per Day (USD equivalent)
                        </label>
                        <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                          ${pricePerCrateDay.toFixed(2)} / crate / day
                        </span>
                      </div>
                      <input
                        id="calc-rate"
                        type="range"
                        min={0.1}
                        max={0.6}
                        step={0.05}
                        value={pricePerCrateDay}
                        onChange={(e) =>
                          setPricePerCrateDay(Number(e.target.value))
                        }
                        className="w-full accent-[#086B3A] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculation Result Output */}
                  <div className="bg-[#064B2D] text-white rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-white/75">
                        Total Illustrative Storage Fee
                      </div>
                      <div className="text-xs font-mono text-white/80 mt-0.5 tabular-nums">
                        {numCrates} crates × {daysStored} days × $
                        {pricePerCrateDay.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="font-mono text-2xl font-bold text-[#F49A16] tabular-nums">
                        ${totalStorageFee.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-white/75 tabular-nums">
                        Protects ~${illustrativeCropValue.toLocaleString()} wholesale crop value
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#777D77]">
                    Note: All tariffs and wholesale crop values above are illustrative assumptions until actual pilot tariffs are finalised with local cooperatives.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="aspect-4/3 rounded-xl overflow-hidden border border-[#171A18]/12">
                  <ResilientImage
                    src={GENERATED_IMAGES.coldStorage}
                    alt="Inside the Betapawa AgriPower walk-in solar cold room with stacked crates of fresh tomatoes and peppers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white border border-[#171A18]/10 rounded-xl p-5">
                  <h4 className="text-xs font-semibold text-[#171A18] mb-3">
                    Target Crop Preservation Parameters (Illustrative Pilot Spec)
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-[#FAF8F2] rounded-lg">
                      <div className="font-semibold text-[#171A18]">Tomatoes</div>
                      <div className="font-mono text-[#086B3A] mt-1 tabular-nums">
                        10°C – 12°C
                      </div>
                      <div className="text-[11px] text-[#777D77] mt-0.5">
                        Up to 14–18 days
                      </div>
                    </div>
                    <div className="p-3 bg-[#FAF8F2] rounded-lg">
                      <div className="font-semibold text-[#171A18]">Bell Peppers</div>
                      <div className="font-mono text-[#086B3A] mt-1 tabular-nums">
                        7°C – 10°C
                      </div>
                      <div className="text-[11px] text-[#777D77] mt-0.5">
                        Up to 14–21 days
                      </div>
                    </div>
                    <div className="p-3 bg-[#FAF8F2] rounded-lg">
                      <div className="font-semibold text-[#171A18]">Leafy Greens</div>
                      <div className="font-mono text-[#086B3A] mt-1 tabular-nums">
                        4°C – 6°C
                      </div>
                      <div className="text-[11px] text-[#777D77] mt-0.5">
                        Up to 7–10 days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOLAR IRRIGATION */}
          {activeTab === 'irrigation' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#086B3A] font-medium">
                    <span>03. Solar-Powered Irrigation</span>
                    <span aria-hidden="true">·</span>
                    <span>Modelled Performance Estimates</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-[#171A18]">
                    Dry-Season Water Security Without Petrol or Diesel Pumps
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#171A18]/80 leading-relaxed">
                    During peak midday sunshine, the hub channels surplus solar
                    generation into variable-frequency water pumps that fill an
                    elevated header tank. Farmers access metered water for drip
                    or furrow irrigation, unlocking second- and third-season
                    harvests.
                  </p>
                </div>

                {/* Interactive Irrigation Simulator */}
                <div className="bg-white border border-[#171A18]/10 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#171A18]">
                      Configure Pumping Parameters
                    </span>
                    <span className="text-xs text-[#086B3A]">
                      Modelled Estimate (Not Measured)
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor="pump-hours" className="font-medium text-[#171A18]">
                        Daily Solar Pumping Window
                      </label>
                      <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                        {pumpingHours.toFixed(1)} hours/day
                      </span>
                    </div>
                    <input
                      id="pump-hours"
                      type="range"
                      min={3}
                      max={9}
                      step={0.5}
                      value={pumpingHours}
                      onChange={(e) => setPumpingHours(Number(e.target.value))}
                      className="w-full accent-[#086B3A] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor="pump-flow" className="font-medium text-[#171A18]">
                        Pump Flow Rate (Depending on Borehole Head)
                      </label>
                      <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                        {flowRateM3Hr.toFixed(1)} m³/hour
                      </span>
                    </div>
                    <input
                      id="pump-flow"
                      type="range"
                      min={4}
                      max={16}
                      step={0.5}
                      value={flowRateM3Hr}
                      onChange={(e) => setFlowRateM3Hr(Number(e.target.value))}
                      className="w-full accent-[#086B3A] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-white border border-[#171A18]/10 rounded-lg p-4">
                    <span className="text-xs text-[#777D77]">Water Delivered</span>
                    <div className="mt-1 font-mono text-lg font-bold text-[#171A18] tabular-nums">
                      {dailyWaterM3} m³/day
                    </div>
                    <span className="text-[11px] text-[#086B3A]">Modelled Estimate</span>
                  </div>
                  <div className="bg-white border border-[#171A18]/10 rounded-lg p-4">
                    <span className="text-xs text-[#777D77]">Area Irrigated</span>
                    <div className="mt-1 font-mono text-lg font-bold text-[#171A18] tabular-nums">
                      ~{irrigatedHectares} Ha
                    </div>
                    <span className="text-[11px] text-[#086B3A]">Modelled Estimate</span>
                  </div>
                  <div className="bg-white border border-[#171A18]/10 rounded-lg p-4 col-span-2 sm:col-span-1">
                    <span className="text-xs text-[#777D77]">Fuel Displaced</span>
                    <div className="mt-1 font-mono text-lg font-bold text-[#171A18] tabular-nums">
                      {seasonalDieselDisplacedL.toLocaleString()} L/yr
                    </div>
                    <span className="text-[11px] text-[#086B3A]">Modelled vs. Petrol Pump</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="aspect-4/3 rounded-xl overflow-hidden border border-[#171A18]/12">
                  <ResilientImage
                    src={GENERATED_IMAGES.irrigationProcessing}
                    alt="Solar irrigation tank and productive agricultural water distribution at Betapawa AgriPower Hub"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white border border-[#171A18]/10 rounded-xl p-5 text-xs space-y-2">
                  <div className="font-semibold text-[#171A18]">
                    Why Coupling Irrigation with Cold Storage Works Financially
                  </div>
                  <p className="text-[#171A18]/75 leading-relaxed">
                    Water storage acts as a low-cost "gravity battery". Instead
                    of installing expensive chemical batteries to store midday
                    solar peaks, the energy management system dispatches excess
                    midday solar kW directly into the borehole pump—converting
                    surplus sunlight into stored irrigation water.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AGRO-PROCESSING */}
          {activeTab === 'processing' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#086B3A] font-medium">
                    <span>04. Productive-Use Agro-Processing</span>
                    <span aria-hidden="true">·</span>
                    <span>First-Mile Value Retention</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-[#171A18]">
                    Retaining Processing Margins Inside the Farming Community
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#171A18]/80 leading-relaxed">
                    Each hub includes a three-phase electrical bay configured for
                    locally relevant primary processing—grain milling, forced-air
                    solar drying, cassava grating, or oilseed pressing—allowing
                    farmers to sell higher-value, shelf-stable outputs.
                  </p>
                </div>

                {/* Appliance Selector */}
                <div className="bg-white border border-[#171A18]/10 rounded-xl p-5 space-y-4">
                  <div className="text-xs font-semibold text-[#171A18]">
                    Select Modular Processing Line (Illustrative Specs)
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProcess('milling')}
                      className={`p-3 rounded-lg text-xs font-medium text-left border transition-colors cursor-pointer ${
                        selectedProcess === 'milling'
                          ? 'bg-[#086B3A] text-white border-[#086B3A]'
                          : 'bg-[#FAF8F2] text-[#171A18] border-[#171A18]/10'
                      }`}
                    >
                      01. Grain Hammer Milling
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProcess('drying')}
                      className={`p-3 rounded-lg text-xs font-medium text-left border transition-colors cursor-pointer ${
                        selectedProcess === 'drying'
                          ? 'bg-[#086B3A] text-white border-[#086B3A]'
                          : 'bg-[#FAF8F2] text-[#171A18] border-[#171A18]/10'
                      }`}
                    >
                      02. Forced-Air Crop Drying
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProcess('pressing')}
                      className={`p-3 rounded-lg text-xs font-medium text-left border transition-colors cursor-pointer ${
                        selectedProcess === 'pressing'
                          ? 'bg-[#086B3A] text-white border-[#086B3A]'
                          : 'bg-[#FAF8F2] text-[#171A18] border-[#171A18]/10'
                      }`}
                    >
                      03. Oilseed Expelling
                    </button>
                  </div>

                  {selectedProcess === 'milling' && (
                    <div className="pt-2 space-y-2 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-[#171A18]/10">
                        <span className="text-[#777D77]">Target Crops</span>
                        <span className="font-medium">Maize, Sorghum, Millet, Soy</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-[#171A18]/10">
                        <span className="text-[#777D77]">Electrical Load</span>
                        <span className="font-mono font-semibold tabular-nums">
                          7.5 kW – 11 kW Three-Phase
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-[#777D77]">Throughput Capacity</span>
                        <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                          300 – 450 kg / hour (Illustrative)
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedProcess === 'drying' && (
                    <div className="pt-2 space-y-2 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-[#171A18]/10">
                        <span className="text-[#777D77]">Target Crops</span>
                        <span className="font-medium">Chillies, Ginger, Sliced Tomatoes, Mango</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-[#171A18]/10">
                        <span className="text-[#777D77]">Electrical Load</span>
                        <span className="font-mono font-semibold tabular-nums">
                          2.2 kW Blower + Thermal Collector
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-[#777D77]">Shelf-Life Extension</span>
                        <span className="font-mono font-semibold text-[#086B3A] tabular-nums">
                          Up to 6–12 months (Dried Grade)
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedProcess === 'pressing' && (
                    <div className="pt-2 space-y-2 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-[#171A18]/10">
                        <span className="text-[#777D77]">Target Crops</span>
                        <span className="font-medium">Groundnut, Sunflower, Sesame, Soybean</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-[#171A18]/10">
                        <span className="text-[#777D77]">Electrical Load</span>
                        <span className="font-mono font-semibold tabular-nums">
                          5.5 kW – 7.5 kW Three-Phase
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-[#777D77]">Dual Output Value</span>
                        <span className="font-mono font-semibold text-[#086B3A]">
                          Edible Oil + High-Protein Livestock Press Cake
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="aspect-4/3 rounded-xl overflow-hidden border border-[#171A18]/12">
                  <ResilientImage
                    src={GENERATED_IMAGES.irrigationProcessing}
                    alt="Farmers operating clean electric agro-processing equipment at the Betapawa AgriPower Hub"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SMART PAYMENTS (INTERACTIVE DEMO WALLET & METER) */}
          {activeTab === 'payments' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#086B3A] font-medium">
                    <span>05. Smart Metering &amp; Digital Payments</span>
                    <span aria-hidden="true">·</span>
                    <span>100% Prepaid Collection</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-[#171A18]">
                    Prepaid Smart Meters &amp; Mobile Money Settlement
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#171A18]/80 leading-relaxed">
                    Every kilowatt-hour of electricity, crate of cold storage,
                    and kilogram of processing is metered and settled digitally
                    via mobile money or USSD prepaid tokens—eliminating cash
                    leakage on site and providing investors with an auditable
                    revenue trail.
                  </p>
                </div>

                <div className="bg-white border border-[#171A18]/10 rounded-xl p-5 space-y-3 text-xs">
                  <div className="font-semibold text-[#171A18]">
                    Try the Interactive Demo Wallet
                  </div>
                  <p className="text-[#777D77]">
                    Click the actions below to simulate how a smallholder farmer
                    or cooperative member tops up their account and books cold
                    storage in the demonstration interface.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleSimulateTopUp}
                      className="px-3.5 py-2 bg-[#086B3A] hover:bg-[#064B2D] text-white font-semibold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Simulate +$10 Mobile Top-Up</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSimulateCrateBooking}
                      className="px-3.5 py-2 bg-[#FAF8F2] hover:bg-[#171A18]/5 text-[#171A18] border border-[#171A18]/20 font-semibold rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Simulate 10-Crate Cold Check-In (-$3)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive Sample Mobile/Operator Dashboard Clearly Labelled "Demo" */}
              <div className="lg:col-span-7 bg-white border border-[#171A18]/15 rounded-xl overflow-hidden shadow-xs">
                <div className="bg-[#171A18] text-white px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold">
                      Betapawa AgriPower™ Customer &amp; Meter Portal
                    </span>
                    <span aria-hidden="true" className="text-white/40">·</span>
                    <span className="font-mono text-[#F49A16]">
                      DEMO ENVIRONMENT (Fictional Data)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDemoBalance(14.5);
                      setDemoKwhBalance(28.4);
                    }}
                    className="text-xs text-white/75 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Demo</span>
                  </button>
                </div>

                <div className="p-5 sm:p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/10">
                      <span className="text-xs text-[#777D77]">
                        Prepaid Wallet Balance (Demo)
                      </span>
                      <div className="mt-1 font-mono text-2xl font-bold text-[#086B3A] tabular-nums">
                        ${demoBalance.toFixed(2)}
                      </div>
                      <span className="text-[11px] text-[#777D77]">
                        Account: Cooperative Member #042
                      </span>
                    </div>
                    <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/10">
                      <span className="text-xs text-[#777D77]">
                        Smart Meter Energy Credit (Demo)
                      </span>
                      <div className="mt-1 font-mono text-2xl font-bold text-[#171A18] tabular-nums">
                        {demoKwhBalance.toFixed(1)} kWh
                      </div>
                      <span className="text-[11px] text-[#086B3A]">
                        STS Meter #8821-09 · Active
                      </span>
                    </div>
                    <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/10">
                      <span className="text-xs text-[#777D77]">
                        Active Cold Storage Crates (Demo)
                      </span>
                      <div className="mt-1 font-mono text-2xl font-bold text-[#171A18] tabular-nums">
                        22 Crates
                      </div>
                      <span className="text-[11px] text-[#777D77]">
                        Bay B · 8.4°C Verified
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#171A18] mb-2.5">
                      <span>Recent Service &amp; Payment Ledger (Demonstration Only)</span>
                      <span className="text-[#777D77] font-normal">USSD &amp; App Synced</span>
                    </div>
                    <div className="divide-y divide-[#171A18]/10 border border-[#171A18]/10 rounded-lg overflow-hidden">
                      {demoTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="p-3 bg-white flex items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <div className="font-medium text-[#171A18]">
                              {tx.service}
                            </div>
                            <div className="text-[11px] text-[#777D77]">
                              {tx.id} · {tx.time} · {tx.status}
                            </div>
                          </div>
                          <div
                            className={`font-mono font-semibold tabular-nums whitespace-nowrap ${
                              tx.amount.startsWith('+')
                                ? 'text-[#086B3A]'
                                : 'text-[#171A18]'
                            }`}
                          >
                            {tx.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FARMER IMPACT */}
          {activeTab === 'impact' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#086B3A] font-medium">
                    <span>06. Farmer &amp; Community Impact</span>
                    <span aria-hidden="true">·</span>
                    <span>Pilot Targets &amp; Methodology</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-[#171A18]">
                    Turning Clean Kilowatt-Hours into Household Resilience
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#171A18]/80 leading-relaxed">
                    Productive energy is a means to an agricultural outcome. We
                    track impact across seven core indicators per hub, connecting
                    smart-meter kWh logs with crate intake weights and baseline
                    vs. follow-up farmer surveys.
                  </p>
                </div>

                <div className="aspect-16/9 rounded-xl overflow-hidden border border-[#171A18]/12">
                  <ResilientImage
                    src={GENERATED_IMAGES.farmerStory}
                    alt="African farmers and cooperative members with fresh produce crates at the solar hub"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 bg-white border border-[#171A18]/10 rounded-xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#171A18]/10">
                  <h4 className="text-sm font-bold text-[#171A18]">
                    Single-Hub Annual Impact Framework
                  </h4>
                  <span className="text-xs text-[#086B3A] font-medium">
                    Status: Pilot Targets · Awaiting Pilot Measurement
                  </span>
                </div>

                <div className="divide-y divide-[#171A18]/10 text-xs">
                  {[
                    {
                      metric: 'Farmers & Agribusinesses Served',
                      target: '250 active users / hub',
                      status: 'Pilot Target',
                      method: 'Unique customer wallet IDs transacting ≥3 times per season',
                    },
                    {
                      metric: 'Perishable Produce Stored',
                      target: '340 Metric Tons / year',
                      status: 'Pilot Target',
                      method: 'Digital intake scale weight logs (17,000 crates × 20kg)',
                    },
                    {
                      metric: 'Post-Harvest Food Loss Avoided',
                      target: '60%+ relative spoilage reduction',
                      status: 'Pilot Target',
                      method: 'Matched-crate check-in vs. check-out grading against ambient control',
                    },
                    {
                      metric: 'Farmer Net Seasonal Income Change',
                      target: '+18% to +28% hypothesis range',
                      status: 'Awaiting Pilot Measurement',
                      method: 'Longitudinal baseline vs. post-harvest household enterprise survey',
                    },
                    {
                      metric: 'Renewable Energy Delivered',
                      target: '64,200 kWh / year',
                      status: 'Pilot Target',
                      method: 'Automated STS smart-meter kWh telemetry across all hub feeders',
                    },
                    {
                      metric: 'Diesel & Petrol Fuel Displaced',
                      target: '19,800 Litres / year',
                      status: 'Illustrative Estimate',
                      method: 'Metered solar kWh replacing standalone diesel genset/pump baseline',
                    },
                    {
                      metric: 'Local Jobs Supported (Direct & Ancillary)',
                      target: '4 direct + ~14 seasonal roles',
                      status: 'Pilot Target',
                      method: 'Hub payroll records and registered cooperative sorting/handling logs',
                    },
                  ].map((row) => (
                    <div
                      key={row.metric}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-semibold text-[#171A18]">
                          {row.metric}
                        </div>
                        <div className="text-[11px] text-[#777D77] mt-0.5">
                          Methodology: {row.method}
                        </div>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <div className="font-mono font-bold text-sm text-[#086B3A] tabular-nums">
                          {row.target}
                        </div>
                        <div className="text-[11px] text-[#777D77]">
                          {row.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
