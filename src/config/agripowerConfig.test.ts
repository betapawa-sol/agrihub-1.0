import {
  DEFAULT_UNIT_ECONOMICS,
  calculateUnitEconomics,
} from './agripowerConfig';

/**
 * Automated Verification Suite for Betapawa AgriPower™ Unit-Economics & Storage Calculations
 */
export function runAgriPowerCalculationTests(): {
  passed: boolean;
  results: { name: string; passed: boolean; detail: string }[];
} {
  const results: { name: string; passed: boolean; detail: string }[] = [];

  // Test 1: Default CAPEX aggregation
  const base = calculateUnitEconomics(DEFAULT_UNIT_ECONOMICS);
  const expectedCapex = 58000 + 24000 + 16000 + 12000; // $110,000
  results.push({
    name: 'Total Initial CAPEX Aggregation',
    passed: base.totalCapex === expectedCapex,
    detail: `Expected $${expectedCapex}, got $${base.totalCapex}`,
  });

  // Test 2: Monthly & Annual Revenue aggregation
  const expectedMonthlyRev = 1150 + 1350 + 650 + 550; // $3,700
  results.push({
    name: 'Monthly & Annual Revenue Calculation',
    passed:
      base.monthlyRevenue === expectedMonthlyRev &&
      base.annualRevenue === expectedMonthlyRev * 12,
    detail: `Monthly $${base.monthlyRevenue}, Annual $${base.annualRevenue}`,
  });

  // Test 3: Operating Cash Flow vs. Net Cash Flow (after Debt & Reserve) distinction
  const expectedOpex = 380 + 480; // $860
  const expectedOperatingCf = expectedMonthlyRev - expectedOpex; // $2,840
  const expectedNetCf = expectedOperatingCf - 420 - 220; // $2,200
  results.push({
    name: 'Operating Cash Flow vs. Post-Debt/Reserve Net Cash Flow',
    passed:
      base.monthlyOperatingCashFlow === expectedOperatingCf &&
      base.monthlyNetCashFlowAfterDebtAndReserve === expectedNetCf,
    detail: `Operating CF $${base.monthlyOperatingCashFlow}/mo, Net CF $${base.monthlyNetCashFlowAfterDebtAndReserve}/mo`,
  });

  // Test 4: Service Revenue Contribution shares sum to 100%
  const sumShares = base.serviceContributions.reduce(
    (acc, s) => acc + s.sharePct,
    0
  );
  results.push({
    name: 'Service Revenue Shares Sum to 100%',
    passed: Math.abs(sumShares - 100) < 0.01,
    detail: `Sum of shares = ${sumShares.toFixed(2)}%`,
  });

  return {
    passed: results.every((r) => r.passed),
    results,
  };
}
