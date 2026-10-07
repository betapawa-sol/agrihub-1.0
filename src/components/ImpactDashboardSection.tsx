import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, ShieldCheck } from 'lucide-react';
import { IMPACT_METRICS, ImpactMetricItem } from '../config/agripowerConfig';

export const ImpactDashboardSection: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<'hub1' | 'hub2' | 'cluster5'>(
    'hub1'
  );
  const [reportingPeriod, setReportingPeriod] = useState<
    'monthly' | 'annual' | 'fiveYear'
  >('annual');
  const [serviceFilter, setServiceFilter] = useState<
    'all' | 'cold-storage' | 'irrigation' | 'processing' | 'energy'
  >('all');
  const [customerFilter, setCustomerFilter] = useState<
    'all' | 'smallholders' | 'women-youth' | 'smes'
  >('all');
  const [expandedMetricId, setExpandedMetricId] = useState<string | null>(
    'env-ghg'
  );

  // Multiplier based on Hub selection and Reporting Period
  const hubMultiplier =
    selectedHub === 'hub1' ? 1 : selectedHub === 'hub2' ? 1.15 : 5;
  const periodMultiplier =
    reportingPeriod === 'monthly'
      ? 1 / 12
      : reportingPeriod === 'annual'
      ? 1
      : 5;

  const formatMetricValue = (metric: ImpactMetricItem) => {
    // Percentages do not multiply by hub count or period
    if (metric.unit.includes('%')) {
      return `${metric.baseAnnualPerHub}%`;
    }
    // Jobs or users multiply by hub count, not by monthly/5-year time period
    if (
      metric.id === 'econ-jobs' ||
      metric.id === 'soc-farmers-served' ||
      metric.id === 'soc-smes'
    ) {
      const scaled = Math.round(metric.baseAnnualPerHub * hubMultiplier);
      return scaled.toLocaleString();
    }

    const raw = metric.baseAnnualPerHub * hubMultiplier * periodMultiplier;
    if (raw < 100) {
      return raw.toFixed(1);
    }
    return Math.round(raw).toLocaleString();
  };

  const formatPeriodUnit = (baseUnit: string) => {
    if (baseUnit.includes('%') || !baseUnit.includes('/ year')) {
      return baseUnit;
    }
    if (reportingPeriod === 'monthly') {
      return baseUnit.replace('/ year', '/ month');
    }
    if (reportingPeriod === 'fiveYear') {
      return baseUnit.replace('/ year', '/ 5-yr cumulative');
    }
    return baseUnit;
  };

  const filteredMetrics = IMPACT_METRICS.filter((m) => {
    const matchesService =
      serviceFilter === 'all' ||
      m.serviceCategory === serviceFilter ||
      m.serviceCategory === 'all';
    const matchesCustomer =
      customerFilter === 'all' ||
      m.customerSegment === customerFilter ||
      m.customerSegment === 'all';
    return matchesService && matchesCustomer;
  });

  const pillars: ('Environmental' | 'Agricultural' | 'Economic' | 'Social')[] =
    ['Environmental', 'Agricultural', 'Economic', 'Social'];

  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="py-20 md:py-28 border-b border-[#171A18]/10 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
            <span>06. Auditable Impact Measurement</span>
            <span aria-hidden="true" className="text-[#777D77]">·</span>
            <span className="text-[#777D77]">
              Environmental, Agricultural, Economic &amp; Social Telemetry
            </span>
          </div>
          <h2
            id="impact-heading"
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#171A18] leading-[1.12] text-balance"
          >
            Measure the value{' '}
            <span className="font-serif italic font-normal text-[#086B3A]">
              of every hub.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#171A18]/80 leading-relaxed">
            Impact claims in climate-tech are only as credible as their
            underlying methodology. Every metric below is tied to a documented
            calculation formula, system boundary, and data-integrity
            classification.
          </p>
        </div>

        {/* Data Classification Legend (Distinguishing Measured vs Verified vs Modelled vs Pilot Target) */}
        <div className="mt-8 bg-[#FAF8F2] border border-[#171A18]/12 rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#171A18] mb-3">
            <ShieldCheck className="w-4 h-4 text-[#086B3A]" />
            <span>Data Integrity &amp; Verification Taxonomy</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="border-l-2 border-[#777D77] pl-3">
              <div className="font-semibold text-[#171A18]">
                01. Measured Results (0 Active)
              </div>
              <p className="text-[#777D77] mt-0.5">
                Direct smart-meter and intake-scale telemetry from commissioned hubs. Populated post-commissioning.
              </p>
            </div>
            <div className="border-l-2 border-[#777D77] pl-3">
              <div className="font-semibold text-[#171A18]">
                02. Independently Verified (0 Active)
              </div>
              <p className="text-[#777D77] mt-0.5">
                Audited by an accredited third-party impact evaluator. Never claimed without published audit evidence.
              </p>
            </div>
            <div className="border-l-2 border-[#F49A16] pl-3">
              <div className="font-semibold text-[#171A18]">
                03. Modelled Estimates (Active)
              </div>
              <p className="text-[#777D77] mt-0.5">
                Derived from engineering specifications and IPCC/UNFCCC baseline emission and fuel factors.
              </p>
            </div>
            <div className="border-l-2 border-[#086B3A] pl-3">
              <div className="font-semibold text-[#171A18]">
                04. Pilot Targets (Active)
              </div>
              <p className="text-[#777D77] mt-0.5">
                Explicit operational KPIs to be tested and validated during Year 1 of the demonstration hub.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Interactive Dashboard Filters: Hub, Reporting Period, Service Type, Customer Category */}
        <div className="mt-6 bg-white border border-[#171A18]/12 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="filter-hub"
              className="block text-xs font-semibold text-[#171A18] mb-1.5"
            >
              1. Hub Archetype / Scope
            </label>
            <select
              id="filter-hub"
              value={selectedHub}
              onChange={(e) =>
                setSelectedHub(e.target.value as 'hub1' | 'hub2' | 'cluster5')
              }
              className="w-full px-3 py-2 text-xs font-medium bg-[#FAF8F2] border border-[#171A18]/20 rounded-lg text-[#171A18] cursor-pointer"
            >
              <option value="hub1">Pilot Hub 01 — Horticulture Cluster (1 Hub)</option>
              <option value="hub2">Pilot Hub 02 — Mixed Grain &amp; Veg (1 Hub)</option>
              <option value="cluster5">Phase 2 Cluster Target (5 Hubs Combined)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-period"
              className="block text-xs font-semibold text-[#171A18] mb-1.5"
            >
              2. Reporting Period
            </label>
            <select
              id="filter-period"
              value={reportingPeriod}
              onChange={(e) =>
                setReportingPeriod(
                  e.target.value as 'monthly' | 'annual' | 'fiveYear'
                )
              }
              className="w-full px-3 py-2 text-xs font-medium bg-[#FAF8F2] border border-[#171A18]/20 rounded-lg text-[#171A18] cursor-pointer"
            >
              <option value="monthly">Monthly Run-Rate Target</option>
              <option value="annual">Year 1 Annual Target (12 Months)</option>
              <option value="fiveYear">5-Year Cumulative Projection</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-service"
              className="block text-xs font-semibold text-[#171A18] mb-1.5"
            >
              3. Productive Service Type
            </label>
            <select
              id="filter-service"
              value={serviceFilter}
              onChange={(e) =>
                setServiceFilter(
                  e.target.value as
                    | 'all'
                    | 'cold-storage'
                    | 'irrigation'
                    | 'processing'
                    | 'energy'
                )
              }
              className="w-full px-3 py-2 text-xs font-medium bg-[#FAF8F2] border border-[#171A18]/20 rounded-lg text-[#171A18] cursor-pointer"
            >
              <option value="all">All Hub Services</option>
              <option value="cold-storage">Cold Storage Chain</option>
              <option value="irrigation">Solar Irrigation</option>
              <option value="processing">Agro-Processing</option>
              <option value="energy">Mini-Grid Electricity</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-customer"
              className="block text-xs font-semibold text-[#171A18] mb-1.5"
            >
              4. Customer Category
            </label>
            <select
              id="filter-customer"
              value={customerFilter}
              onChange={(e) =>
                setCustomerFilter(
                  e.target.value as
                    | 'all'
                    | 'smallholders'
                    | 'women-youth'
                    | 'smes'
                )
              }
              className="w-full px-3 py-2 text-xs font-medium bg-[#FAF8F2] border border-[#171A18]/20 rounded-lg text-[#171A18] cursor-pointer"
            >
              <option value="all">All Customer Segments</option>
              <option value="smallholders">Smallholder Farmers</option>
              <option value="women-youth">Women &amp; Youth Operators</option>
              <option value="smes">Rural Micro-Enterprises (SMEs)</option>
            </select>
          </div>
        </div>

        {/* 4 Impact Pillars Grid */}
        <div className="mt-8 space-y-8">
          {pillars.map((pillar) => {
            const pillarMetrics = filteredMetrics.filter(
              (m) => m.pillar === pillar
            );
            if (pillarMetrics.length === 0) return null;

            return (
              <div
                key={pillar}
                className="bg-[#FAF8F2] border border-[#171A18]/12 rounded-xl p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#171A18]/10">
                  <h3 className="text-base font-bold text-[#171A18]">
                    {pillar} Impact Indicators
                  </h3>
                  <span className="text-xs text-[#777D77]">
                    Click &ldquo;Methodology &amp; Factors&rdquo; on any card to audit calculation
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pillarMetrics.map((metric) => {
                    const isExpanded = expandedMetricId === metric.id;
                    return (
                      <div
                        key={metric.id}
                        className="bg-white border border-[#171A18]/10 rounded-xl p-5 flex flex-col justify-between"
                      >
                        <div>
                          {/* Clean Unboxed Classification Header */}
                          <div className="flex items-center justify-between text-xs text-[#777D77]">
                            <span className="font-medium text-[#086B3A]">
                              {metric.classification}
                            </span>
                            <span>{metric.pillar}</span>
                          </div>

                          <h4 className="mt-2 text-sm font-semibold text-[#171A18]">
                            {metric.title}
                          </h4>

                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#171A18] tabular-nums">
                              {formatMetricValue(metric)}
                            </span>
                            <span className="text-xs text-[#777D77] font-mono">
                              {formatPeriodUnit(metric.unit)}
                            </span>
                          </div>

                          <p className="mt-2.5 text-xs text-[#171A18]/75 leading-relaxed">
                            {metric.methodologySummary}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#171A18]/10">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedMetricId(
                                isExpanded ? null : metric.id
                              )
                            }
                            aria-expanded={isExpanded}
                            className="w-full flex items-center justify-between text-xs font-semibold text-[#086B3A] hover:underline cursor-pointer"
                          >
                            <span className="inline-flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5" />
                              <span>Methodology &amp; Factors</span>
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="mt-3 p-3 bg-[#FAF8F2] rounded-lg border border-[#171A18]/10 text-[11px] text-[#171A18]/85 space-y-2">
                              <div>
                                <strong className="font-semibold text-[#171A18]">
                                  Formula &amp; Factors:
                                </strong>{' '}
                                {metric.formulaAndFactors}
                              </div>
                              <div>
                                <strong className="font-semibold text-[#171A18]">
                                  System Boundary:
                                </strong>{' '}
                                {metric.systemBoundary}
                              </div>
                              <div>
                                <strong className="font-semibold text-[#171A18]">
                                  Verification Protocol:
                                </strong>{' '}
                                {metric.verificationProtocol}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Documentation Note on GHG Emissions Accounting & Baseline */}
        <div className="mt-8 bg-[#064B2D] text-white rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-1.5">
            <div className="text-xs font-mono text-[#F49A16]">
              GHG Emissions Accounting Disclosure (IPCC / UNFCCC AMS-I.L)
            </div>
            <h4 className="text-base sm:text-lg font-bold">
              Transparent Baseline &amp; Boundary Documentation
            </h4>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Avoided emissions are modelled strictly against stationary off-grid
              diesel generation and petrol irrigation pumping (baseline emission
              factor: <span className="font-mono">2.68 kg CO₂e / litre</span>{' '}
              diesel; specific fuel consumption:{' '}
              <span className="font-mono">0.31 L / kWh</span>). We exclude
              speculative soil-carbon or unverified landfill food-waste methane
              credits from base investor reporting until independently audited.
            </p>
          </div>
          <div className="lg:col-span-4 bg-white/10 rounded-lg p-4 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-white/75">Baseline Fuel:</span>
              <span>Off-Grid Diesel / Petrol</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/75">Emission Factor:</span>
              <span className="text-[#F49A16]">2.68 kg CO₂e / L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/75">System Boundary:</span>
              <span>Scope 1 Site Displacement</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/75">Audit Status:</span>
              <span>Pre-Pilot Modelled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
