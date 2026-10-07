import React, { useState } from 'react';
import { RotateCcw, Download, ArrowRight, FileSpreadsheet } from 'lucide-react';
import {
  REVENUE_STREAMS,
  DEFAULT_UNIT_ECONOMICS,
  UnitEconomicsInputs,
  calculateUnitEconomics,
} from '../config/agripowerConfig';

interface BusinessModelSectionProps {
  inputs: UnitEconomicsInputs;
  onChangeInputs: (next: UnitEconomicsInputs) => void;
  onResetInputs: () => void;
  onOpenLeadForm: (pathway: 'investor' | 'partner' | 'brief') => void;
}

export const BusinessModelSection: React.FC<BusinessModelSectionProps> = ({
  inputs,
  onChangeInputs,
  onResetInputs,
  onOpenLeadForm,
}) => {
  const [selectedStreamId, setSelectedStreamId] = useState<string>(
    REVENUE_STREAMS[1].id // Cold storage default selected
  );

  const activeStream =
    REVENUE_STREAMS.find((s) => s.id === selectedStreamId) ||
    REVENUE_STREAMS[0];

  const outputs = calculateUnitEconomics(inputs);

  const handleFieldChange = (field: keyof UnitEconomicsInputs, val: number) => {
    onChangeInputs({
      ...inputs,
      [field]: Number.isNaN(val) ? 0 : Math.max(0, val),
    });
  };

  const applyPreset = (preset: 'conservative' | 'base' | 'high') => {
    if (preset === 'base') {
      onResetInputs();
    } else if (preset === 'conservative') {
      onChangeInputs({
        ...DEFAULT_UNIT_ECONOMICS,
        monthlyEnergySales: 900,
        monthlyColdStorageRev: 1050,
        monthlyIrrigationRev: 480,
        monthlyProcessingRev: 420,
      });
    } else if (preset === 'high') {
      onChangeInputs({
        ...DEFAULT_UNIT_ECONOMICS,
        monthlyEnergySales: 1450,
        monthlyColdStorageRev: 1750,
        monthlyIrrigationRev: 850,
        monthlyProcessingRev: 750,
      });
    }
  };

  const handleDownloadCsv = () => {
    const rows = [
      ['Betapawa AgriPower™ — Illustrative Single-Hub Unit Economics Model'],
      ['Classification', 'Illustrative assumptions — replace with validated pilot data'],
      [''],
      ['CATEGORY', 'PARAMETER', 'VALUE (USD)', 'NOTES'],
      ['CAPEX', 'Solar and Battery CAPEX', inputs.solarBatteryCapex, 'PV array, LiFePO4 storage, hybrid inverters'],
      ['CAPEX', 'Cold-Room CAPEX', inputs.coldRoomCapex, 'Walk-in insulated chamber, refrigeration unit, crates'],
      ['CAPEX', 'Irrigation & Processing CAPEX', inputs.irrigationProcessingCapex, 'Solar pump, tank, milling/drying machinery'],
      ['CAPEX', 'Installation & Development Costs', inputs.installationDevCosts, 'Civil works, logistics, commissioning'],
      ['CAPEX TOTAL', 'Total Initial CAPEX', outputs.totalCapex, 'Sum of initial hub capital expenditure'],
      [''],
      ['MONTHLY REVENUE', 'Monthly Energy Sales', inputs.monthlyEnergySales, 'Prepaid kWh tariff sales'],
      ['MONTHLY REVENUE', 'Monthly Cold-Storage Revenue', inputs.monthlyColdStorageRev, 'Pay-per-crate-per-day storage fees'],
      ['MONTHLY REVENUE', 'Monthly Irrigation Revenue', inputs.monthlyIrrigationRev, 'Water delivery / seasonal irrigation fees'],
      ['MONTHLY REVENUE', 'Monthly Agro-Processing Revenue', inputs.monthlyProcessingRev, 'Milling, drying, and pressing fees'],
      ['REVENUE TOTAL', 'Total Monthly Revenue', outputs.monthlyRevenue, 'Monthly gross operating revenue'],
      ['REVENUE ANNUAL', 'Total Annual Revenue', outputs.annualRevenue, '12-month run-rate revenue'],
      [''],
      ['MONTHLY EXPENSES', 'Operating & Maintenance (O&M)', inputs.monthlyOmExpenses, 'Preventive maintenance, telemetry, spares'],
      ['MONTHLY EXPENSES', 'Staff Costs', inputs.monthlyStaffCosts, 'Site attendant, operator, security'],
      ['EXPENSES TOTAL', 'Monthly Operating Expenses (OPEX)', outputs.monthlyOperatingExpenses, 'O&M + Staff costs'],
      ['RESERVE & DEBT', 'Equipment Replacement Reserve', inputs.monthlyReplacementReserve, 'Sinking fund for battery/inverter/pump lifecycle'],
      ['RESERVE & DEBT', 'Monthly Financing / Debt Service Costs', inputs.monthlyFinancingCosts, 'Illustrative interest/principal servicing'],
      [''],
      ['CASH FLOW & RETURNS', 'Monthly Operating Cash Flow (EBITDA proxy)', outputs.monthlyOperatingCashFlow, 'Monthly Revenue minus Operating Expenses (before reserve & debt)'],
      ['CASH FLOW & RETURNS', 'Annual Operating Cash Flow (EBITDA proxy)', outputs.annualOperatingCashFlow, 'Annual Revenue minus Annual OPEX'],
      ['CASH FLOW & RETURNS', 'Monthly Net Cash Flow (After Reserve & Financing)', outputs.monthlyNetCashFlowAfterDebtAndReserve, 'Operating Cash Flow minus Replacement Reserve and Financing Costs'],
      ['CASH FLOW & RETURNS', 'Operating Margin (%)', outputs.operatingMarginPct.toFixed(1) + '%', 'Operating Cash Flow / Total Revenue'],
      ['CASH FLOW & RETURNS', 'Estimated Unlevered Payback Period (Years)', outputs.estimatedPaybackYears.toFixed(1), 'Total CAPEX / (Annual Operating Cash Flow - Annual Replacement Reserve)'],
      ['CASH FLOW & RETURNS', 'Break-Even Utilisation (%)', outputs.breakEvenUtilisationPct.toFixed(1) + '%', 'Share of modelled revenue required to cover OPEX + Reserve + Financing'],
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows.map((e) => e.map((cell) => `"${cell}"`).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Betapawa_AgriPower_Illustrative_Unit_Economics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="business-model"
      aria-labelledby="business-model-heading"
      className="py-20 md:py-28 border-b border-[#171A18]/10 bg-[#FAF8F2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#086B3A] mb-3">
            <span>05. Commercial Architecture &amp; Unit Economics</span>
            <span aria-hidden="true" className="text-[#777D77]">·</span>
            <span className="text-[#777D77]">
              Multi-Stream Productive Infrastructure
            </span>
          </div>
          <h2
            id="business-model-heading"
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#171A18] leading-[1.12] text-balance"
          >
            Infrastructure that earns revenue{' '}
            <span className="font-serif italic font-normal text-[#086B3A]">
              while creating measurable impact.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#171A18]/80 leading-relaxed">
            Single-application rural energy assets often struggle with seasonal
            under-utilisation. Betapawa AgriPower diversifies hub cash flow
            across five distinct revenue streams—combining daily base loads with
            high-margin seasonal agricultural services.
          </p>
        </div>

        {/* Part 1: Five Revenue Streams Interactive Explorer */}
        <div className="mt-12 bg-white border border-[#171A18]/12 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#171A18]/10">
            <div>
              <h3 className="text-base font-bold text-[#171A18]">
                Five Diversified Hub Revenue Streams
              </h3>
              <p className="text-xs text-[#777D77] mt-0.5">
                Select any revenue stream below to inspect payer profile, collection mechanism, cost drivers, and risk controls.
              </p>
            </div>
            <span className="text-xs text-[#086B3A] font-medium">
              100% Prepaid or Contracted Collection
            </span>
          </div>

          {/* 5 Stream Selector Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {REVENUE_STREAMS.map((stream) => {
              const isSelected = stream.id === selectedStreamId;
              return (
                <button
                  key={stream.id}
                  type="button"
                  onClick={() => setSelectedStreamId(stream.id)}
                  aria-pressed={isSelected}
                  className={`text-left p-4 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-[#086B3A] ${
                    isSelected
                      ? 'bg-[#064B2D] text-white border-[#064B2D]'
                      : 'bg-[#FAF8F2] text-[#171A18] border-[#171A18]/10 hover:border-[#086B3A]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-bold tabular-nums ${
                          isSelected ? 'text-[#F49A16]' : 'text-[#086B3A]'
                        }`}
                      >
                        {stream.index}.
                      </span>
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isSelected ? 'text-white/80' : 'text-[#777D77]'
                        }`}
                      >
                        ~{stream.illustrativeSharePct}% mix
                      </span>
                    </div>
                    <h4 className="mt-2 text-sm font-bold leading-snug">
                      {stream.name}
                    </h4>
                  </div>

                  <p
                    className={`mt-3 pt-2 border-t text-[11px] ${
                      isSelected
                        ? 'border-white/15 text-white/85'
                        : 'border-[#171A18]/10 text-[#777D77]'
                    }`}
                  >
                    {stream.pricingUnit}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Revenue Stream 6-Point Breakdown */}
          <div className="mt-6 pt-6 border-t border-[#171A18]/10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#086B3A]">
                  Stream {activeStream.index}
                </span>
                <span aria-hidden="true" className="text-[#777D77]">·</span>
                <h4 className="text-lg font-bold text-[#171A18]">
                  {activeStream.name}
                </h4>
              </div>
              <span className="font-mono text-xs text-[#777D77]">
                Pricing Basis: {activeStream.pricingUnit}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                <div className="text-xs font-semibold text-[#086B3A] mb-1">
                  01. Who Pays
                </div>
                <p className="text-[#171A18]/85 leading-relaxed">
                  {activeStream.whoPays}
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                <div className="text-xs font-semibold text-[#086B3A] mb-1">
                  02. What They Pay For
                </div>
                <p className="text-[#171A18]/85 leading-relaxed">
                  {activeStream.whatTheyPayFor}
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                <div className="text-xs font-semibold text-[#086B3A] mb-1">
                  03. How Revenue Is Collected
                </div>
                <p className="text-[#171A18]/85 leading-relaxed">
                  {activeStream.collectionMechanism}
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                <div className="text-xs font-semibold text-[#171A18] mb-1">
                  04. Main Cost Drivers
                </div>
                <p className="text-[#171A18]/85 leading-relaxed">
                  {activeStream.mainCostDrivers}
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                <div className="text-xs font-semibold text-[#F49A16] mb-1">
                  05. Key Operational Risks &amp; Mitigants
                </div>
                <p className="text-[#171A18]/85 leading-relaxed">
                  {activeStream.keyOperationalRisks}
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#171A18]/8">
                <div className="text-xs font-semibold text-[#086B3A] mb-1">
                  06. Contribution to Hub Profitability
                </div>
                <p className="text-[#171A18]/85 leading-relaxed">
                  {activeStream.profitabilityContribution}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Interactive Unit-Economics Calculator */}
        <div className="mt-12 bg-white border border-[#171A18]/15 rounded-xl overflow-hidden shadow-xs">
          {/* Calculator Top Header */}
          <div className="bg-[#171A18] text-white p-6 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#F49A16] font-mono mb-1">
                <span>Interactive Single-Hub Unit-Economics Sandbox</span>
                <span aria-hidden="true" className="text-white/40">·</span>
                <span>
                  Illustrative assumptions — replace with validated pilot data
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Test Hub CAPEX, Monthly Service Revenues &amp; Operating Cash Flows
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => applyPreset('conservative')}
                className="px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
              >
                Conservative Utilisation
              </button>
              <button
                type="button"
                onClick={() => applyPreset('base')}
                className="px-3 py-1.5 text-xs font-medium bg-[#086B3A] hover:bg-[#064B2D] text-white rounded-lg transition-colors cursor-pointer"
              >
                Base Pilot Case
              </button>
              <button
                type="button"
                onClick={() => applyPreset('high')}
                className="px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
              >
                High Utilisation
              </button>
              <button
                type="button"
                onClick={onResetInputs}
                className="px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white border border-white/20 rounded-lg inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Calculator Body: Left 7 Cols Inputs, Right 5 Cols Live Financial Outputs */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* 12 Editable Inputs */}
            <div className="lg:col-span-7 space-y-8">
              {/* Group 1: Initial CAPEX Inputs */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#171A18]/10 mb-4">
                  <h4 className="text-sm font-bold text-[#171A18]">
                    A. Initial Hub Capital Expenditure (CAPEX — USD)
                  </h4>
                  <span className="font-mono text-xs font-semibold text-[#086B3A] tabular-nums">
                    Subtotal: ${outputs.totalCapex.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      key: 'solarBatteryCapex' as const,
                      label: 'Solar PV & Battery CAPEX ($)',
                      step: 1000,
                    },
                    {
                      key: 'coldRoomCapex' as const,
                      label: 'Cold-Room Facility CAPEX ($)',
                      step: 1000,
                    },
                    {
                      key: 'irrigationProcessingCapex' as const,
                      label: 'Irrigation & Processing CAPEX ($)',
                      step: 1000,
                    },
                    {
                      key: 'installationDevCosts' as const,
                      label: 'Installation & Dev Costs ($)',
                      step: 500,
                    },
                  ].map((field) => (
                    <div
                      key={field.key}
                      className="p-3.5 bg-[#FAF8F2] border border-[#171A18]/10 rounded-lg"
                    >
                      <label
                        htmlFor={`input-${field.key}`}
                        className="block text-xs font-medium text-[#171A18]/85 mb-1.5"
                      >
                        {field.label}
                      </label>
                      <input
                        id={`input-${field.key}`}
                        type="number"
                        min={0}
                        step={field.step}
                        value={inputs[field.key]}
                        onChange={(e) =>
                          handleFieldChange(field.key, parseFloat(e.target.value))
                        }
                        className="w-full px-3 py-1.5 bg-white border border-[#171A18]/20 rounded-md font-mono text-sm font-semibold text-[#171A18] tabular-nums focus:outline-2 focus:outline-[#086B3A]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Group 2: Monthly Revenue Inputs */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#171A18]/10 mb-4">
                  <h4 className="text-sm font-bold text-[#171A18]">
                    B. Monthly Hub Service Revenues (USD / Month)
                  </h4>
                  <span className="font-mono text-xs font-semibold text-[#086B3A] tabular-nums">
                    Subtotal: ${outputs.monthlyRevenue.toLocaleString()}/mo
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      key: 'monthlyEnergySales' as const,
                      label: 'Monthly Energy Sales ($/mo)',
                      step: 50,
                    },
                    {
                      key: 'monthlyColdStorageRev' as const,
                      label: 'Monthly Cold-Storage Revenue ($/mo)',
                      step: 50,
                    },
                    {
                      key: 'monthlyIrrigationRev' as const,
                      label: 'Monthly Irrigation Revenue ($/mo)',
                      step: 50,
                    },
                    {
                      key: 'monthlyProcessingRev' as const,
                      label: 'Monthly Processing Revenue ($/mo)',
                      step: 50,
                    },
                  ].map((field) => (
                    <div
                      key={field.key}
                      className="p-3.5 bg-[#FAF8F2] border border-[#171A18]/10 rounded-lg"
                    >
                      <label
                        htmlFor={`input-${field.key}`}
                        className="block text-xs font-medium text-[#171A18]/85 mb-1.5"
                      >
                        {field.label}
                      </label>
                      <input
                        id={`input-${field.key}`}
                        type="number"
                        min={0}
                        step={field.step}
                        value={inputs[field.key]}
                        onChange={(e) =>
                          handleFieldChange(field.key, parseFloat(e.target.value))
                        }
                        className="w-full px-3 py-1.5 bg-white border border-[#171A18]/20 rounded-md font-mono text-sm font-semibold text-[#171A18] tabular-nums focus:outline-2 focus:outline-[#086B3A]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Group 3: Monthly Operating Expenses, Financing & Replacement Reserve */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#171A18]/10 mb-4">
                  <h4 className="text-sm font-bold text-[#171A18]">
                    C. Monthly Operating Costs, Financing &amp; Reserve (USD / Month)
                  </h4>
                  <span className="font-mono text-xs font-semibold text-[#777D77] tabular-nums">
                    Site OPEX: ${outputs.monthlyOperatingExpenses.toLocaleString()}/mo
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      key: 'monthlyOmExpenses' as const,
                      label: 'Operating & Maintenance (O&M) ($/mo)',
                      step: 25,
                    },
                    {
                      key: 'monthlyStaffCosts' as const,
                      label: 'Site Staff & Operator Costs ($/mo)',
                      step: 25,
                    },
                    {
                      key: 'monthlyFinancingCosts' as const,
                      label: 'Monthly Financing / Debt Service ($/mo)',
                      step: 25,
                    },
                    {
                      key: 'monthlyReplacementReserve' as const,
                      label: 'Equipment Replacement Reserve ($/mo)',
                      step: 25,
                    },
                  ].map((field) => (
                    <div
                      key={field.key}
                      className="p-3.5 bg-[#FAF8F2] border border-[#171A18]/10 rounded-lg"
                    >
                      <label
                        htmlFor={`input-${field.key}`}
                        className="block text-xs font-medium text-[#171A18]/85 mb-1.5"
                      >
                        {field.label}
                      </label>
                      <input
                        id={`input-${field.key}`}
                        type="number"
                        min={0}
                        step={field.step}
                        value={inputs[field.key]}
                        onChange={(e) =>
                          handleFieldChange(field.key, parseFloat(e.target.value))
                        }
                        className="w-full px-3 py-1.5 bg-white border border-[#171A18]/20 rounded-md font-mono text-sm font-semibold text-[#171A18] tabular-nums focus:outline-2 focus:outline-[#086B3A]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Live Calculated Outputs & Service Contribution */}
            <div className="lg:col-span-5 bg-[#FAF8F2] border border-[#171A18]/15 rounded-xl p-6 space-y-6">
              <div className="border-b border-[#171A18]/10 pb-3">
                <div className="text-xs font-semibold text-[#086B3A]">
                  Modelled Unit-Economics Outputs
                </div>
                <div className="text-[11px] text-[#777D77]">
                  Illustrative assumptions — not a guarantee of future financial performance
                </div>
              </div>

              {/* Primary KPI Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-white border border-[#171A18]/10 rounded-lg p-3.5">
                  <span className="text-xs text-[#777D77]">Total Initial CAPEX</span>
                  <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-[#171A18] tabular-nums">
                    ${outputs.totalCapex.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white border border-[#171A18]/10 rounded-lg p-3.5">
                  <span className="text-xs text-[#777D77]">Annual Revenue</span>
                  <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-[#086B3A] tabular-nums">
                    ${outputs.annualRevenue.toLocaleString()}/yr
                  </div>
                </div>
                <div className="bg-white border border-[#171A18]/10 rounded-lg p-3.5">
                  <span className="text-xs text-[#777D77]">
                    Annual Operating Cash Flow
                  </span>
                  <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-[#086B3A] tabular-nums">
                    ${outputs.annualOperatingCashFlow.toLocaleString()}/yr
                  </div>
                  <span className="text-[10px] text-[#777D77]">
                    EBITDA proxy (Before Reserve &amp; Debt)
                  </span>
                </div>
                <div className="bg-white border border-[#171A18]/10 rounded-lg p-3.5">
                  <span className="text-xs text-[#777D77]">Operating Margin</span>
                  <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-[#171A18] tabular-nums">
                    {outputs.operatingMarginPct.toFixed(1)}%
                  </div>
                  <span className="text-[10px] text-[#777D77]">
                    Operating CF / Gross Revenue
                  </span>
                </div>
              </div>

              {/* Detailed Cash Flow Waterfall Table Distinguishing Operating CF vs Debt/Reserve CF */}
              <div className="bg-white border border-[#171A18]/10 rounded-lg p-4 space-y-2 text-xs">
                <div className="font-semibold text-[#171A18] pb-1.5 border-b border-[#171A18]/10">
                  Monthly Cash Flow Reconciliation
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#777D77]">Gross Monthly Revenue</span>
                  <span className="font-mono font-semibold text-[#171A18] tabular-nums">
                    ${outputs.monthlyRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#777D77]">
                    Less: Monthly Operating Expenses (O&amp;M + Staff)
                  </span>
                  <span className="font-mono text-[#171A18] tabular-nums">
                    -${outputs.monthlyOperatingExpenses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-t border-[#171A18]/10 font-semibold">
                  <span className="text-[#086B3A]">
                    = Monthly Operating Cash Flow (Site EBITDA)
                  </span>
                  <span className="font-mono text-[#086B3A] tabular-nums">
                    ${outputs.monthlyOperatingCashFlow.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-1 text-[#777D77]">
                  <span>Less: Equipment Replacement Reserve</span>
                  <span className="font-mono tabular-nums">
                    -${inputs.monthlyReplacementReserve.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-1 text-[#777D77]">
                  <span>Less: Illustrative Financing / Debt Service</span>
                  <span className="font-mono tabular-nums">
                    -${inputs.monthlyFinancingCosts.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#171A18]/15 font-bold text-[#171A18]">
                  <span>= Monthly Net Cash Flow (Post-Debt &amp; Reserve)</span>
                  <span className="font-mono tabular-nums">
                    ${outputs.monthlyNetCashFlowAfterDebtAndReserve.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payback & Break-Even Metrics */}
              <div className="grid grid-cols-2 gap-3.5 text-xs">
                <div className="p-3.5 bg-[#064B2D] text-white rounded-lg">
                  <span className="text-white/75">Est. Unlevered Payback</span>
                  <div className="mt-1 font-mono text-xl font-bold text-[#F49A16] tabular-nums">
                    {outputs.estimatedPaybackYears > 0
                      ? `${outputs.estimatedPaybackYears.toFixed(1)} Years`
                      : 'N/A'}
                  </div>
                  <span className="text-[10px] text-white/70">
                    CAPEX / (Operating CF − Reserve)
                  </span>
                </div>
                <div className="p-3.5 bg-[#171A18] text-white rounded-lg">
                  <span className="text-white/75">Break-Even Utilisation</span>
                  <div className="mt-1 font-mono text-xl font-bold text-white tabular-nums">
                    {outputs.breakEvenUtilisationPct.toFixed(0)}%
                  </div>
                  <span className="text-[10px] text-white/70">
                    Covers OPEX + Reserve + Debt
                  </span>
                </div>
              </div>

              {/* Revenue Contribution by Service */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#171A18] mb-2">
                  <span>Revenue Contribution by Service</span>
                  <span className="font-mono text-[#777D77] tabular-nums">
                    100% = ${outputs.monthlyRevenue.toLocaleString()}/mo
                  </span>
                </div>
                <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#171A18]/10">
                  {outputs.serviceContributions.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        width: `${item.sharePct}%`,
                        backgroundColor: item.color,
                      }}
                      title={`${item.name}: ${item.sharePct.toFixed(1)}%`}
                    />
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  {outputs.serviceContributions.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded border border-[#171A18]/8"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <span
                          className="w-2 h-2 rounded-xs shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="truncate">{item.name}</span>
                      </span>
                      <span className="font-mono font-semibold tabular-nums ml-1">
                        {item.sharePct.toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Investor Model Area */}
              <div className="pt-4 border-t border-[#171A18]/12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-[#171A18]/5 text-[#171A18] border border-[#171A18]/20 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#086B3A]" />
                  <span>Download Model CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLeadForm('brief')}
                  className="flex-1 py-2.5 px-4 bg-[#086B3A] hover:bg-[#064B2D] text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Request Full Financial Model</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
