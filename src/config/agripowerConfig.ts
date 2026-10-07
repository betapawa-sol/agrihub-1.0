/**
 * Betapawa AgriPower™ — Central Configuration, Editable Assumptions & Data Integrity Layer
 *
 * All financial, operational, and impact figures are strictly classified into one of three categories:
 * 1. "Verified Company Record" — Historical figures from Betapawa Solutions Limited's core solar business (configurable).
 * 2. "Pilot Target" — Explicit future goals to be tested and measured during the AgriPower™ demonstration pilot.
 * 3. "Illustrative Assumption" — Transparent sample inputs for interactive calculators and demonstrations.
 */

import heroGroundImg from '../assets/images/agripower_hub_ground_hero_1791401618638.jpg';
import aerialExplorerImg from '../assets/images/agripower_hub_aerial_explorer_1791401634616.jpg';
import coldStorageImg from '../assets/images/agripower_cold_storage_1791401643966.jpg';
import irrigationProcessingImg from '../assets/images/agripower_irrigation_processing_1791401653287.jpg';
import farmerStoryImg from '../assets/images/agripower_farmer_story_1791401663888.jpg';

export type DataClassification =
  | 'Verified Company Record'
  | 'Pilot Target'
  | 'Modelled Estimate'
  | 'Illustrative Assumption'
  | 'Awaiting Pilot Measurement';

export interface TractionMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  scope: 'Betapawa Core Business' | 'AgriPower™ Pilot Program';
  classification: DataClassification;
  note: string;
}

export const GENERATED_IMAGES = {
  heroGround: heroGroundImg,
  aerialExplorer: aerialExplorerImg,
  coldStorage: coldStorageImg,
  irrigationProcessing: irrigationProcessingImg,
  farmerStory: farmerStoryImg,
  userSuppliedLogoUrl:
    'https://images.openai.com/static-rsc-4/jXb5vksocUMAyMa81o1r1ujDBctMYkKH008mWIF5OynWcZlf0_YJhSUli10-Sq-B3VfcMUW9sP9ICm24pzYi-y0vrCFQC66RKN_xTfIF3JC0OU0d0S7HrCEBPJi_Sc6I9p6xDnihgdbV2d-d9MCsjm9VjVvmDDcq3prlyMvDROO7hYhJP8azeHzrmJrfWakS?purpose=fullsize',
};

export const INITIAL_TRACTION_METRICS: TractionMetric[] = [
  {
    id: 'solar-projects',
    label: 'Solar Projects Completed',
    value: 'Configurable (Verify)',
    unit: 'C&I and mini-grid installations',
    scope: 'Betapawa Core Business',
    classification: 'Verified Company Record',
    note: 'Represents cumulative solar installations delivered by Betapawa Solutions Limited prior to AgriPower launch. Replace with audited company figure.',
  },
  {
    id: 'households-connected',
    label: 'Households & SMEs Connected',
    value: 'Configurable (Verify)',
    unit: 'active metered connections',
    scope: 'Betapawa Core Business',
    classification: 'Verified Company Record',
    note: 'Existing off-grid and mini-grid customers served by Betapawa core operations. Distinct from AgriPower agricultural hubs.',
  },
  {
    id: 'pipeline-capacity',
    label: 'Project Pipeline Capacity',
    value: '2.4 MWp',
    unit: 'in development across target clusters',
    scope: 'Betapawa Core Business',
    classification: 'Pilot Target',
    note: 'Combined C&I, mini-grid, and productive-use pipeline under technical feasibility assessment.',
  },
  {
    id: 'agripower-farmers',
    label: 'Farmers Reached via AgriPower™',
    value: '0 Measured / 250 Target',
    unit: 'smallholder farmers per pilot hub',
    scope: 'AgriPower™ Pilot Program',
    classification: 'Pilot Target',
    note: 'AgriPower™ is currently in prototype and pilot structuring stage. 250 farmers per hub is the Year 1 pilot target.',
  },
];

export interface ProblemCitation {
  id: string;
  stageNumber: string;
  stageTitle: string;
  shortDesc: string;
  detailedDesc: string;
  metricValue: string;
  metricLabel: string;
  sourceName: string;
  sourceYear: string;
  sourceUrl: string;
  scopeCaveat: string;
}

export const PROBLEM_STAGES: ProblemCitation[] = [
  {
    id: 'harvest',
    stageNumber: '01',
    stageTitle: 'Harvest in the Field',
    shortDesc: 'Smallholder farmers invest months of labour, seed, and water into perishable horticulture and staple crops.',
    detailedDesc:
      'Across Sub-Saharan Africa, smallholder farmers produce the majority of domestic food supply. However, harvest periods frequently coincide with high ambient temperatures (30°C–38°C) and fragmented rural transport links.',
    metricValue: '60%–80%',
    metricLabel: 'of domestic food supply produced by smallholder farms in Sub-Saharan Africa',
    sourceName: 'FAO — Smallholders Data Portrait & Regional Overview',
    sourceYear: '2023',
    sourceUrl: 'https://www.fao.org/family-farming/data-sources/dataportrait/farm-size/en/',
    scopeCaveat: 'Share varies significantly by country, crop type, and proximity to commercial agricultural corridors.',
  },
  {
    id: 'no-cold-storage',
    stageNumber: '02',
    stageTitle: 'No Cold Storage or Reliable Energy',
    shortDesc: 'Without pre-cooling or cold rooms at the farm gate, perishable crops begin deteriorating within hours of harvest.',
    detailedDesc:
      'Where rural grid access is absent or intermittent, farmers and aggregators rely on expensive diesel generators or have zero cooling capacity. Perishable vegetables such as tomatoes, peppers, and leafy greens lose moisture and firmness rapidly.',
    metricValue: '30%–50%',
    metricLabel: 'estimated post-harvest loss range for perishable fruits and vegetables in parts of Sub-Saharan Africa',
    sourceName: 'FAO — The State of Food and Agriculture / Post-Harvest Loss Estimates',
    sourceYear: '2022',
    sourceUrl: 'https://www.fao.org/platform-food-loss-waste/flw-data/en/',
    scopeCaveat: 'Losses depend heavily on crop variety, season, road quality, and local market distance; not uniform across all communities.',
  },
  {
    id: 'forced-sales',
    stageNumber: '03',
    stageTitle: 'Forced Early Sales at Farm Gate',
    shortDesc: 'Unable to store produce for even 48 hours, farmers must accept steep discounts from spot buyers at peak harvest gluts.',
    detailedDesc:
      'When an entire farming cluster harvests simultaneously without cold storage or drying/milling equipment, local market supply spikes. Farmers face a stark choice: sell immediately at depressed farm-gate prices or watch inventory spoil.',
    metricValue: '25%–45%',
    metricLabel: 'typical farm-gate price compression during peak harvest glut vs. off-peak weeks',
    sourceName: 'World Bank & Postharvest Education Foundation — Horticultural Value Chain Studies',
    sourceYear: '2023',
    sourceUrl: 'https://www.worldbank.org/en/topic/agriculture',
    scopeCaveat: 'Price differentials fluctuate by commodity, weather shocks, and regional wholesale market structure.',
  },
  {
    id: 'lost-value',
    stageNumber: '04',
    stageTitle: 'Lost Economic & Nutritional Value',
    shortDesc: 'Raw commodities leave rural communities unprocessed, while high diesel expenses erode remaining household margins.',
    detailedDesc:
      'Beyond physical spoilage, communities lose the economic margin of primary agro-processing (milling, drying, grading, cold aggregation). Diesel-powered pumping and milling expose farmers to volatile fuel prices and frequent mechanical downtime.',
    metricValue: '$0.45–$0.85/kWh',
    metricLabel: 'effective cost of small-scale rural diesel generation compared to solar mini-grid tariffs',
    sourceName: 'IEA — Africa Energy Outlook & ESMAP Mini-Grid Market Report',
    sourceYear: '2023',
    sourceUrl: 'https://www.iea.org/reports/africa-energy-outlook-2022',
    scopeCaveat: 'Diesel generation costs vary with national fuel subsidies, transport distance, and generator load factor.',
  },
];

export const PAIN_POINTS = [
  {
    id: 'cold-chain',
    title: 'Inadequate Cold-Chain Infrastructure',
    description:
      'First-mile pre-cooling and walk-in cold storage are rarely available within walking or tricycle distance of smallholder horticulture clusters.',
  },
  {
    id: 'diesel-costs',
    title: 'High Diesel & Energy Costs',
    description:
      'Small petrol and diesel engines for water pumping and grain milling suffer from fuel price volatility, adulterated fuel, and high maintenance costs.',
  },
  {
    id: 'irrigation-access',
    title: 'Limited Access to Dry-Season Irrigation',
    description:
      'Reliance on rain-fed farming restricts many communities to a single growing season per year, leaving land and labour underutilised during dry months.',
  },
  {
    id: 'local-processing',
    title: 'Insufficient Local Agro-Processing',
    description:
      'Selling ungraded, uncleaned, or unprocessed raw crops shifts value-addition margins away from farming communities to urban intermediaries.',
  },
  {
    id: 'time-pressure',
    title: 'Perishable Produce Sold Under Time Pressure',
    description:
      'Without storage buffer capacity, farmers have weak bargaining leverage when negotiating with travelling aggregators at the end of market day.',
  },
  {
    id: 'capital-barrier',
    title: 'Prohibitive Upfront Equipment CAPEX',
    description:
      'Individual smallholder farmers cannot afford standalone solar cold rooms or commercial mills—they need pay-per-use infrastructure, not equipment debt.',
  },
];

export interface PrototypeHotspot {
  id: string;
  number: string;
  title: string;
  category: string;
  x: number; // percentage on aerial image
  y: number; // percentage on aerial image
  groundX: number; // percentage on ground image
  groundY: number; // percentage on ground image
  whatItDoes: string;
  whyItMatters: string;
  businessModelContribution: string;
  technicalSpec: string;
}

export const PROTOTYPE_HOTSPOTS: PrototypeHotspot[] = [
  {
    id: 'solar-generation',
    number: '01',
    title: 'Solar PV Generation Array',
    category: 'Generation Infrastructure',
    x: 34,
    y: 26,
    groundX: 42,
    groundY: 22,
    whatItDoes:
      'High-efficiency monocrystalline solar PV canopy mounted on a hot-dip galvanized steel structure, shading the facility below while generating clean DC power.',
    whyItMatters:
      'Eliminates exposure to volatile diesel supply chains and reduces canopy ambient heat load on the cold-storage module below by up to 4°C.',
    businessModelContribution:
      'Provides near-zero marginal cost daytime electricity matched directly to peak agricultural cooling, pumping, and milling loads.',
    technicalSpec: '35 kWp – 60 kWp modular array (Illustrative Pilot Spec)',
  },
  {
    id: 'battery-management',
    number: '02',
    title: 'Battery & Smart Energy Management',
    category: 'Storage & Dispatch',
    x: 48,
    y: 35,
    groundX: 28,
    groundY: 48,
    whatItDoes:
      'Containerised LiFePO4 battery energy storage system paired with hybrid inverters and automated load-priority controllers.',
    whyItMatters:
      'Ensures 24/7 thermal continuity for cold storage overnight and during cloud cover without over-sizing battery capacity via thermal-storage staging.',
    businessModelContribution:
      'Protects high-value stored produce against spoilage risk and enables evening lighting and commercial power sales.',
    technicalSpec: '75 kWh – 120 kWh LiFePO4 + EMS controller (Illustrative Pilot Spec)',
  },
  {
    id: 'cold-storage',
    number: '03',
    title: 'Walk-In Pay-Per-Use Cold Room',
    category: 'Thermal Preservation',
    x: 56,
    y: 46,
    groundX: 54,
    groundY: 49,
    whatItDoes:
      'Food-grade polyurethane insulated walk-in cold chamber maintaining 4°C–12°C with phase-change thermal backup and ventilated stackable crate racks.',
    whyItMatters:
      'Extends the shelf life of tomatoes, peppers, and leafy vegetables from 2–3 days to 14–21 days, removing forced same-day harvest sales.',
    businessModelContribution:
      'Generates recurring daily crate storage fees ($0.20–$0.40/crate/day illustrative) with high gross margins and strong seasonal anchor demand.',
    technicalSpec: '15–25 metric ton capacity / 600–1,000 standard crates (Illustrative Pilot Spec)',
  },
  {
    id: 'irrigation',
    number: '04',
    title: 'Solar Irrigation Pumping & Header Tank',
    category: 'Water Delivery',
    x: 22,
    y: 54,
    groundX: 16,
    groundY: 56,
    whatItDoes:
      'Variable-frequency solar submersible/surface water pump feeding an elevated header tank and metered distribution manifolds for adjacent farm plots.',
    whyItMatters:
      'Uses daytime excess solar generation ("dump load" capture) to pump water into gravity storage, enabling dry-season cultivation without diesel pumps.',
    businessModelContribution:
      'Monetises midday surplus solar kWh through volumetric water fees ($/m³) or seasonal per-hectare irrigation subscriptions.',
    technicalSpec: '40–80 m³/day water delivery capacity (Illustrative Pilot Spec)',
  },
  {
    id: 'processing',
    number: '05',
    title: 'Productive-Use Agro-Processing Bay',
    category: 'Value Addition',
    x: 68,
    y: 58,
    groundX: 74,
    groundY: 52,
    whatItDoes:
      'Covered three-phase electrical bay housing commercial grain hammer mills, solar-assisted forced-air crop dryers, threshers, or oilseed presses.',
    whyItMatters:
      'Replaces noisy, polluting diesel mills and allows farmers to convert raw grain, cassava, or chillies into shelf-stable, higher-margin products.',
    businessModelContribution:
      'Drives daytime anchor kWh consumption and collects either per-kilogram processing tariffs or equipment lease-to-use fees.',
    technicalSpec: '15 kW dedicated 3-phase productive load bus (Illustrative Pilot Spec)',
  },
  {
    id: 'smart-metering',
    number: '06',
    title: 'Smart Metering & Digital Payment Point',
    category: 'Commercial Control',
    x: 44,
    y: 64,
    groundX: 46,
    groundY: 63,
    whatItDoes:
      'IoT-enabled prepaid smart meters, USSD/mobile-money payment terminal, and digital crate check-in/check-out ticketing kiosk.',
    whyItMatters:
      'Eliminates cash-handling leakage, provides farmers with transparent receipts, and gives investors auditable, real-time revenue and kWh telemetry.',
    businessModelContribution:
      'Enforces 100% upfront prepaid collection across electricity, cold storage, and processing, minimising accounts-receivable risk.',
    technicalSpec: 'STS-compliant smart meters + GSM/satellite telemetry (Illustrative Pilot Spec)',
  },
  {
    id: 'produce-handling',
    number: '07',
    title: 'Shaded Produce Sorting & Grading Area',
    category: 'Quality Assurance',
    x: 62,
    y: 72,
    groundX: 64,
    groundY: 68,
    whatItDoes:
      'Hygienic, shaded washing, sorting, and crate-weighing deck where harvested crops are inspected and pre-cooled before entering the cold room.',
    whyItMatters:
      'Prevents field heat and damaged produce from contaminating stored batches, while helping cooperatives grade produce for wholesale buyers.',
    businessModelContribution:
      'Increases buyer confidence at the hub, attracting regional off-takers and supporting higher crate turnover.',
    technicalSpec: 'Digital platform scales + food-safe crate sanitisation station',
  },
  {
    id: 'farmer-access',
    number: '08',
    title: 'Farmer & Off-Taker Access Courtyard',
    category: 'Community Logistics',
    x: 32,
    y: 76,
    groundX: 33,
    groundY: 74,
    whatItDoes:
      'Accessible loading bay designed for pedestrian farmers, cargo tricycles, and regional aggregation trucks with clear safety zoning.',
    whyItMatters:
      'Ensures women farmers, youth operators, and cooperative buyers can load and unload crates safely and efficiently during peak market hours.',
    businessModelContribution:
      'Transforms the energy site into a trusted local trade aggregation node, strengthening community retention and daily footfall.',
    technicalSpec: 'All-weather compacted apron + LED security lighting',
  },
];

export interface RevenueStreamSpec {
  id: string;
  index: string;
  name: string;
  pricingUnit: string;
  whoPays: string;
  whatTheyPayFor: string;
  collectionMechanism: string;
  mainCostDrivers: string;
  keyOperationalRisks: string;
  profitabilityContribution: string;
  illustrativeSharePct: number;
}

export const REVENUE_STREAMS: RevenueStreamSpec[] = [
  {
    id: 'energy-sales',
    index: '01',
    name: 'Prepaid Energy Sales',
    pricingUnit: 'Tariff per kWh consumed ($/kWh)',
    whoPays: 'Local agro-processors, rural workshops, welding/milling micro-enterprises, and adjacent commercial stalls.',
    whatTheyPayFor: 'Reliable single-phase and three-phase AC solar electricity delivered via the hub mini-grid.',
    collectionMechanism: 'Prepaid STS smart meters via mobile money or USSD token top-up prior to consumption.',
    mainCostDrivers: 'Solar PV array depreciation, LiFePO4 battery cycle wear, smart meter connectivity, and distribution line O&M.',
    keyOperationalRisks: 'Daytime vs. evening load mismatch, seasonal demand dips, and regulatory tariff approval timelines.',
    profitabilityContribution: 'Provides predictable baseline daily cash flow with ~75%+ gross margin post-installation.',
    illustrativeSharePct: 29,
  },
  {
    id: 'cold-storage',
    index: '02',
    name: 'Pay-Per-Use Cold Storage',
    pricingUnit: 'Fee per 20kg crate per day ($/crate/day)',
    whoPays: 'Smallholder vegetable/fruit farmers, women market vendors, and rural produce aggregators.',
    whatTheyPayFor: 'Temperature-controlled storage (4°C–12°C), clean stackable crates, and digital inventory check-in.',
    collectionMechanism: 'Mobile money or prepaid smart-card payment upon crate check-in / prior to crate release.',
    mainCostDrivers: 'Cold room compressor electricity load, refrigerant maintenance, crate replacement, and hub attendant wages.',
    keyOperationalRisks: 'Crop seasonality creating off-peak utilisation troughs; mitigated by multi-crop scheduling and vendor aggregation.',
    profitabilityContribution: 'Highest revenue density per kWh consumed; core differentiator driving farmer retention.',
    illustrativeSharePct: 33,
  },
  {
    id: 'irrigation',
    index: '03',
    name: 'Solar Irrigation Services',
    pricingUnit: 'Volumetric water fee ($/m³) or seasonal plot subscription',
    whoPays: 'Dry-season horticulture farmers and out-grower cooperative members cultivating plots near the hub.',
    whatTheyPayFor: 'Pumped, pressurized water delivered from borehole/surface source via elevated storage to field hydrants.',
    collectionMechanism: 'Prepaid water meter tokens or seasonal cooperative service agreements backed by harvest proceeds.',
    mainCostDrivers: 'Submersible pump maintenance, borehole/intake upkeep, storage tank and mainline piping amortisation.',
    keyOperationalRisks: 'Groundwater table fluctuations, wet-season demand drop, and pipe damage in shared fields.',
    profitabilityContribution: 'Monetises excess midday solar generation that would otherwise be curtailed, boosting overall asset utilisation.',
    illustrativeSharePct: 16,
  },
  {
    id: 'agro-processing',
    index: '04',
    name: 'Productive-Use Agro-Processing',
    pricingUnit: 'Fee per kg processed ($/kg) or hourly equipment use',
    whoPays: 'Grain, cassava, oilseed, and spice farmers, as well as local cooperative processing groups.',
    whatTheyPayFor: 'Access to electric milling, threshing, hulling, or solar-assisted drying equipment housed at the hub.',
    collectionMechanism: 'Digital weigh-scale ticketing settled via mobile money or prepaid hub wallet before batch processing.',
    mainCostDrivers: 'Processing machinery wear parts (screens, hammers, belts), operator labour, and peak 3-phase power draw.',
    keyOperationalRisks: 'Mechanical wear from foreign matter in uncleaned grain; managed via trained hub operators and preventive maintenance.',
    profitabilityContribution: 'Captures harvest-season volume spikes and anchors high daytime power factor.',
    illustrativeSharePct: 14,
  },
  {
    id: 'infrastructure-services',
    index: '05',
    name: 'Infrastructure & Anchor Off-Taker Services',
    pricingUnit: 'Monthly capacity reservation / B2B SLA contract',
    whoPays: 'Agricultural cooperatives, commercial cold-chain logistics firms, seed companies, and anchor off-takers.',
    whatTheyPayFor: 'Dedicated cold-room bay reservation, aggregation staging space, and verified quality/temperature data logs.',
    collectionMechanism: 'Monthly B2B bank transfer or standing commercial off-take service contracts.',
    mainCostDrivers: 'Dedicated account management, SLA uptime guarantees, and calibrated temperature/impact reporting.',
    keyOperationalRisks: 'Counterparty credit concentration; mitigated by advance security deposits and diversified cooperative tenants.',
    profitabilityContribution: 'De-risks base fixed OPEX through contracted monthly recurring floor revenue.',
    illustrativeSharePct: 8,
  },
];

export interface UnitEconomicsInputs {
  // CAPEX Inputs ($)
  solarBatteryCapex: number;
  coldRoomCapex: number;
  irrigationProcessingCapex: number;
  installationDevCosts: number;
  // Monthly Revenue Inputs ($/month)
  monthlyEnergySales: number;
  monthlyColdStorageRev: number;
  monthlyIrrigationRev: number;
  monthlyProcessingRev: number;
  // Monthly Expenses & Reserve Inputs ($/month)
  monthlyOmExpenses: number;
  monthlyStaffCosts: number;
  monthlyFinancingCosts: number;
  monthlyReplacementReserve: number;
}

export const DEFAULT_UNIT_ECONOMICS: UnitEconomicsInputs = {
  solarBatteryCapex: 58000,
  coldRoomCapex: 24000,
  irrigationProcessingCapex: 16000,
  installationDevCosts: 12000,
  monthlyEnergySales: 1150,
  monthlyColdStorageRev: 1350,
  monthlyIrrigationRev: 650,
  monthlyProcessingRev: 550,
  monthlyOmExpenses: 380,
  monthlyStaffCosts: 480,
  monthlyFinancingCosts: 420,
  monthlyReplacementReserve: 220,
};

export interface UnitEconomicsOutputs {
  totalCapex: number;
  monthlyRevenue: number;
  monthlyOperatingExpenses: number; // O&M + Staff
  monthlyOperatingCashFlow: number; // EBITDA proxy: Revenue - (O&M + Staff)
  monthlyNetCashFlowAfterDebtAndReserve: number; // Operating Cash Flow - Financing - Replacement Reserve
  annualRevenue: number;
  annualOperatingCashFlow: number;
  annualNetCashFlow: number;
  operatingMarginPct: number;
  estimatedPaybackYears: number; // Unlevered CAPEX / Annual Operating Cash Flow (after reserve)
  breakEvenUtilisationPct: number; // (O&M + Staff + Reserve + Financing) / Monthly Revenue at current baseline
  serviceContributions: {
    name: string;
    monthlyAmount: number;
    sharePct: number;
    color: string;
  }[];
}

export function calculateUnitEconomics(inputs: UnitEconomicsInputs): UnitEconomicsOutputs {
  const totalCapex =
    Math.max(0, inputs.solarBatteryCapex) +
    Math.max(0, inputs.coldRoomCapex) +
    Math.max(0, inputs.irrigationProcessingCapex) +
    Math.max(0, inputs.installationDevCosts);

  const monthlyRevenue =
    Math.max(0, inputs.monthlyEnergySales) +
    Math.max(0, inputs.monthlyColdStorageRev) +
    Math.max(0, inputs.monthlyIrrigationRev) +
    Math.max(0, inputs.monthlyProcessingRev);

  const monthlyOperatingExpenses =
    Math.max(0, inputs.monthlyOmExpenses) + Math.max(0, inputs.monthlyStaffCosts);

  const monthlyOperatingCashFlow = monthlyRevenue - monthlyOperatingExpenses;

  const totalMonthlyOutflows =
    monthlyOperatingExpenses +
    Math.max(0, inputs.monthlyFinancingCosts) +
    Math.max(0, inputs.monthlyReplacementReserve);

  const monthlyNetCashFlowAfterDebtAndReserve = monthlyRevenue - totalMonthlyOutflows;

  const annualRevenue = monthlyRevenue * 12;
  const annualOperatingCashFlow = monthlyOperatingCashFlow * 12;
  const annualNetCashFlow = monthlyNetCashFlowAfterDebtAndReserve * 12;

  const operatingMarginPct =
    monthlyRevenue > 0 ? (monthlyOperatingCashFlow / monthlyRevenue) * 100 : 0;

  // Unlevered asset payback uses Operating Cash Flow less Equipment Replacement Reserve
  const annualCashAvailableForCapexRecovery =
    (monthlyOperatingCashFlow - Math.max(0, inputs.monthlyReplacementReserve)) * 12;

  const estimatedPaybackYears =
    annualCashAvailableForCapexRecovery > 0
      ? totalCapex / annualCashAvailableForCapexRecovery
      : 0;

  // Break-even utilisation is the % of current modelled revenue needed to cover O&M + Staff + Replacement Reserve + Financing
  const breakEvenUtilisationPct =
    monthlyRevenue > 0 ? Math.min(100, (totalMonthlyOutflows / monthlyRevenue) * 100) : 100;

  const safeRev = monthlyRevenue > 0 ? monthlyRevenue : 1;

  const serviceContributions = [
    {
      name: 'Cold Storage',
      monthlyAmount: inputs.monthlyColdStorageRev,
      sharePct: (inputs.monthlyColdStorageRev / safeRev) * 100,
      color: '#086B3A',
    },
    {
      name: 'Energy Sales',
      monthlyAmount: inputs.monthlyEnergySales,
      sharePct: (inputs.monthlyEnergySales / safeRev) * 100,
      color: '#064B2D',
    },
    {
      name: 'Solar Irrigation',
      monthlyAmount: inputs.monthlyIrrigationRev,
      sharePct: (inputs.monthlyIrrigationRev / safeRev) * 100,
      color: '#F49A16',
    },
    {
      name: 'Agro-Processing',
      monthlyAmount: inputs.monthlyProcessingRev,
      sharePct: (inputs.monthlyProcessingRev / safeRev) * 100,
      color: '#3B7A57',
    },
  ];

  return {
    totalCapex,
    monthlyRevenue,
    monthlyOperatingExpenses,
    monthlyOperatingCashFlow,
    monthlyNetCashFlowAfterDebtAndReserve,
    annualRevenue,
    annualOperatingCashFlow,
    annualNetCashFlow,
    operatingMarginPct,
    estimatedPaybackYears,
    breakEvenUtilisationPct,
    serviceContributions,
  };
}

export interface ImpactMetricItem {
  id: string;
  pillar: 'Environmental' | 'Agricultural' | 'Economic' | 'Social';
  title: string;
  unit: string;
  baseAnnualPerHub: number;
  classification: DataClassification;
  serviceCategory: 'all' | 'cold-storage' | 'irrigation' | 'processing' | 'energy';
  customerSegment: 'all' | 'smallholders' | 'women-youth' | 'smes';
  methodologySummary: string;
  formulaAndFactors: string;
  systemBoundary: string;
  verificationProtocol: string;
}

export const IMPACT_METRICS: ImpactMetricItem[] = [
  // ENVIRONMENTAL
  {
    id: 'env-electricity',
    pillar: 'Environmental',
    title: 'Renewable Electricity Delivered',
    unit: 'kWh / year',
    baseAnnualPerHub: 64200,
    classification: 'Pilot Target',
    serviceCategory: 'energy',
    customerSegment: 'all',
    methodologySummary:
      'Total AC solar electricity metered across cold storage, water pumping, agro-processing, and community SME loads.',
    formulaAndFactors:
      'Sum of STS smart-meter kWh logs across all hub feeder circuits over a 365-day reporting period (45 kWp × 4.2 peak sun hours × 93% system efficiency × 93% utilisation).',
    systemBoundary: 'Hub generation busbar to customer smart-meter load terminals.',
    verificationProtocol: 'Automated hourly IoT smart-meter telemetry reconciled against inverter generation logs.',
  },
  {
    id: 'env-diesel',
    pillar: 'Environmental',
    title: 'Diesel Fuel Consumption Avoided',
    unit: 'Litres / year',
    baseAnnualPerHub: 19800,
    classification: 'Modelled Estimate',
    serviceCategory: 'energy',
    customerSegment: 'all',
    methodologySummary:
      'Estimated volume of diesel fuel displaced compared to standalone 5–15 kVA rural diesel generators and petrol irrigation pumps.',
    formulaAndFactors:
      'Renewable kWh delivered to productive loads × 0.31 litres/kWh specific fuel consumption baseline for partial-load small rural diesel gensets.',
    systemBoundary: 'On-site stationary cooling, pumping, and milling operations within the hub catchment.',
    verificationProtocol: 'Baseline farmer fuel-expenditure survey prior to hub commissioning + metered kWh substitution.',
  },
  {
    id: 'env-ghg',
    pillar: 'Environmental',
    title: 'Estimated GHG Emissions Avoided',
    unit: 'tCO₂e / year',
    baseAnnualPerHub: 53.1,
    classification: 'Modelled Estimate',
    serviceCategory: 'energy',
    customerSegment: 'all',
    methodologySummary:
      'Gross greenhouse gas emissions avoided from displacing stationary diesel generation and petrol water pumping.',
    formulaAndFactors:
      '19,800 L diesel avoided × 2.68 kg CO₂e/litre (IPCC 2006 / UNFCCC AMS-I.L small-scale off-grid diesel emission factor). Does not include unverified methane reductions from avoided food rotting.',
    systemBoundary: 'Scope 1 stationary fuel combustion displaced at the hub and irrigated plots; excludes lifecycle PV embodied carbon.',
    verificationProtocol: 'Calculated in accordance with UNFCCC CDM small-scale methodology AMS-I.L / Gold Standard metering guidelines.',
  },

  // AGRICULTURAL
  {
    id: 'agri-crates',
    pillar: 'Agricultural',
    title: 'Perishable Produce Stored',
    unit: 'Metric Tons / year',
    baseAnnualPerHub: 340,
    classification: 'Pilot Target',
    serviceCategory: 'cold-storage',
    customerSegment: 'smallholders',
    methodologySummary:
      'Total weight of horticulture crops (tomatoes, peppers, leafy greens, tubers) checked into the walk-in cold room.',
    formulaAndFactors:
      '17,000 crate check-ins/year × 20 kg average net produce weight per standard ventilated plastic crate.',
    systemBoundary: 'Physical produce batches weighed at the hub intake scale upon cold-room entry.',
    verificationProtocol: 'Digital weigh-scale intake tickets linked to farmer wallet IDs.',
  },
  {
    id: 'agri-spoilage',
    pillar: 'Agricultural',
    title: 'Post-Harvest Loss Reduction Target',
    unit: '% loss rate change',
    baseAnnualPerHub: 62,
    classification: 'Pilot Target',
    serviceCategory: 'cold-storage',
    customerSegment: 'smallholders',
    methodologySummary:
      'Target relative reduction in physical spoilage for cold-stored batches compared to ambient shade storage (e.g., reducing batch loss from ~32% baseline to <12%).',
    formulaAndFactors:
      '((Baseline ambient spoilage % − Cold-room exit spoilage %) / Baseline ambient spoilage %) × 100.',
    systemBoundary: 'From hub check-in to off-taker dispatch or market withdrawal.',
    verificationProtocol: 'Matched-sample crate weight and quality grading at check-in vs. check-out against control group.',
  },
  {
    id: 'agri-processed',
    pillar: 'Agricultural',
    title: 'Agricultural Volume Processed Locally',
    unit: 'Metric Tons / year',
    baseAnnualPerHub: 215,
    classification: 'Pilot Target',
    serviceCategory: 'processing',
    customerSegment: 'smallholders',
    methodologySummary:
      'Total mass of grains, legumes, tubers, or dried crops processed using electric machinery at the hub.',
    formulaAndFactors: 'Sum of weighed batch inputs across milling, threshing, and solar-drying bays.',
    systemBoundary: 'On-site agro-processing bay.',
    verificationProtocol: 'Operator batch logs cross-checked against dedicated 3-phase processing feeder kWh consumption.',
  },
  {
    id: 'agri-water',
    pillar: 'Agricultural',
    title: 'Water Delivered for Solar Irrigation',
    unit: 'm³ / year',
    baseAnnualPerHub: 16500,
    classification: 'Modelled Estimate',
    serviceCategory: 'irrigation',
    customerSegment: 'smallholders',
    methodologySummary:
      'Total cubic metres of irrigation water pumped using solar energy during dry and shoulder growing seasons.',
    formulaAndFactors: '60 m³/day average pumping output × 275 active irrigation days per year.',
    systemBoundary: 'Borehole/intake flowmeter to elevated header tank discharge manifold.',
    verificationProtocol: 'Inline ultrasonic/mechanical flowmeter telemetry paired with pump VFD runtime logs.',
  },

  // ECONOMIC
  {
    id: 'econ-value-preserved',
    pillar: 'Economic',
    title: 'Estimated Value of Produce Preserved',
    unit: 'USD / year',
    baseAnnualPerHub: 48500,
    classification: 'Modelled Estimate',
    serviceCategory: 'cold-storage',
    customerSegment: 'smallholders',
    methodologySummary:
      'Gross market value of perishable produce saved from physical spoilage and forced end-of-day distress discounting.',
    formulaAndFactors:
      '340 MT stored × 20% net spoilage avoided (68 MT saved) × $713/MT average wholesale horticulture price.',
    systemBoundary: 'Gross farm-gate/wholesale value retained prior to deducting crate storage tariffs.',
    verificationProtocol: 'Weekly local market price tracking combined with hub check-out grading logs.',
  },
  {
    id: 'econ-income-change',
    pillar: 'Economic',
    title: 'Target Farmer Net Revenue Uplift',
    unit: '% hypothesis range',
    baseAnnualPerHub: 24,
    classification: 'Pilot Target',
    serviceCategory: 'all',
    customerSegment: 'smallholders',
    methodologySummary:
      'Hypothesised net seasonal crop revenue increase for regular hub users after paying cold-storage, irrigation, or processing fees.',
    formulaAndFactors:
      '((Post-adoption net crop income − Baseline net crop income) / Baseline net crop income) × 100.',
    systemBoundary: 'Participating smallholder household seasonal crop enterprise budget.',
    verificationProtocol: 'Pre-pilot baseline socio-economic survey and post-harvest longitudinal follow-up survey.',
  },
  {
    id: 'econ-customer-spend',
    pillar: 'Economic',
    title: 'Annual Hub Service Revenue (Customer Spend)',
    unit: 'USD / year',
    baseAnnualPerHub: 44400,
    classification: 'Illustrative Assumption',
    serviceCategory: 'all',
    customerSegment: 'all',
    methodologySummary:
      'Total customer payments collected across electricity, cold storage, irrigation, and agro-processing services.',
    formulaAndFactors: 'Matches the base unit-economics model ($3,700/month × 12 months).',
    systemBoundary: 'Prepaid mobile money and digital wallet receipts recorded on the hub ledger.',
    verificationProtocol: 'Audited mobile-money merchant settlement statements and smart-meter billing database.',
  },
  {
    id: 'econ-jobs',
    pillar: 'Economic',
    title: 'Direct & Indirect Local Jobs Supported',
    unit: 'Full-time & seasonal roles',
    baseAnnualPerHub: 18,
    classification: 'Pilot Target',
    serviceCategory: 'all',
    customerSegment: 'women-youth',
    methodologySummary:
      'Includes 4 direct hub staff (site manager, cold-room attendant, processing technician, security) plus ~14 ancillary sorting, crate-handling, and aggregation roles.',
    formulaAndFactors: 'Payroll records for direct staff + registered cooperative service providers operating on-site.',
    systemBoundary: 'On-site hub operations and immediate first-mile logistics.',
    verificationProtocol: 'Employment contracts and monthly cooperative attendance registries.',
  },

  // SOCIAL
  {
    id: 'soc-farmers-served',
    pillar: 'Social',
    title: 'Active Farmers & Agribusinesses Served',
    unit: 'Registered users / hub',
    baseAnnualPerHub: 250,
    classification: 'Pilot Target',
    serviceCategory: 'all',
    customerSegment: 'smallholders',
    methodologySummary:
      'Unique smallholder farmers, market traders, and rural SMEs transacting at least 3 times per season at the hub.',
    formulaAndFactors: 'Count of unique active customer IDs in the digital customer management platform.',
    systemBoundary: 'Registered hub catchment area (typically 5–10 km radius).',
    verificationProtocol: 'Digital CRM transaction logs (de-duplicated by phone/wallet ID).',
  },
  {
    id: 'soc-women-youth',
    pillar: 'Social',
    title: 'Women & Youth Participation Target',
    unit: '% of active users',
    baseAnnualPerHub: 55,
    classification: 'Pilot Target',
    serviceCategory: 'all',
    customerSegment: 'women-youth',
    methodologySummary:
      'Share of registered cold-storage, processing, and retail vendor accounts held by women and youth (under 35).',
    formulaAndFactors: '(Active women & youth customer IDs / Total active customer IDs) × 100.',
    systemBoundary: 'Registered hub customer base and direct site workforce.',
    verificationProtocol: 'Gender- and age-disaggregated onboarding registration data.',
  },
  {
    id: 'soc-smes',
    pillar: 'Social',
    title: 'Rural Micro-Enterprises Enabled',
    unit: 'Businesses / hub',
    baseAnnualPerHub: 14,
    classification: 'Pilot Target',
    serviceCategory: 'energy',
    customerSegment: 'smes',
    methodologySummary:
      'Local enterprises (grain millers, produce aggregators, cold-chain retailers, equipment repair shops) powered by hub electricity.',
    formulaAndFactors: 'Count of active commercial smart-meter connections and processing tenancy agreements.',
    systemBoundary: 'Mini-grid commercial distribution feeder.',
    verificationProtocol: 'Commercial smart-meter connection agreements.',
  },
];

export interface FAQItem {
  id: string;
  category: 'Product & Farmers' | 'Economics & Finance' | 'Pilot & Operations';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'what-is-agripower',
    category: 'Product & Farmers',
    question: 'What is Betapawa AgriPower™?',
    answer:
      'Betapawa AgriPower™ is a modular, solar-powered productive-use energy platform developed by Betapawa Solutions Limited. Each hub integrates solar PV generation, battery storage, smart prepaid metering, walk-in cold storage, solar irrigation pumping, and agro-processing equipment into a single community facility.',
  },
  {
    id: 'target-customers',
    category: 'Product & Farmers',
    question: 'Who are the target customers?',
    answer:
      'Our primary end-users are smallholder horticulture and staple-crop farmers, farmer cooperatives, women market vendors, local produce aggregators, and rural micro-enterprises. At the institutional level, we partner with commercial off-takers, agro-processors, and rural development programmes that require reliable first-mile cold chain and processing infrastructure.',
  },
  {
    id: 'how-farmer-pays',
    category: 'Product & Farmers',
    question: 'How does a farmer pay for services?',
    answer:
      'Farmers pay strictly for the services they use through a transparent, pay-as-you-go digital model: per crate per day for cold storage, per kilogram (or batch) for agro-processing, per cubic metre (or seasonal plot subscription) for irrigation water, and per kilowatt-hour (kWh) for prepaid electricity via mobile money or USSD tokens.',
  },
  {
    id: 'own-equipment',
    category: 'Product & Farmers',
    question: 'Does a farmer need to own solar equipment?',
    answer:
      'No. That is our core commercial principle: farmers should not have to purchase expensive solar panels, batteries, or cold rooms to access productive services. Betapawa and its project-finance partners own, operate, and maintain the infrastructure while farmers pay affordable service tariffs.',
  },
  {
    id: 'hub-services',
    category: 'Product & Farmers',
    question: 'What services can a hub offer?',
    answer:
      'Every hub is modular and configured to match the local crop calendar. Core modules include: (1) AC/DC solar mini-grid power, (2) walk-in temperature-controlled cold storage, (3) solar water pumping and storage for irrigation, (4) three-phase agro-processing (milling, drying, threshing, pressing), and (5) shaded produce sorting, weighing, and aggregation.',
  },
  {
    id: 'how-financed',
    category: 'Economics & Finance',
    question: 'How is a hub financed?',
    answer:
      'Hubs are structured as revenue-generating infrastructure assets. Depending on project stage and investor mandate, capital structures can combine catalytic grants or concessional blended finance (for pilot validation and first-loss de-risking), project debt or asset finance (for repeatable equipment deployment), and corporate/SPV equity.',
  },
  {
    id: 'cost-determinants',
    category: 'Economics & Finance',
    question: 'What determines the cost of a hub?',
    answer:
      'Total CAPEX depends on four primary variables: (1) required solar kWp and LiFePO4 battery kWh capacity, (2) cold-room tonnage and target temperature regime, (3) borehole depth and irrigation command area, and (4) selection of agro-processing machinery and site logistics. A typical modular pilot hub is modelled between $85,000 and $135,000 (illustrative range, subject to site engineering).',
  },
  {
    id: 'measure-impact',
    category: 'Pilot & Operations',
    question: 'How does Betapawa measure impact?',
    answer:
      'Impact measurement is embedded into daily hub operations rather than treated as an afterthought. Smart meters automatically log renewable kWh delivered and diesel displaced; digital intake scales record every crate of produce stored and processed; and structured baseline and follow-up surveys track farmer spoilage rates, seasonal price realisation, and gender inclusion.',
  },
  {
    id: 'cooperative-partner',
    category: 'Pilot & Operations',
    question: 'How can a cooperative become a pilot partner?',
    answer:
      'Agricultural cooperatives, out-grower schemes, and produce aggregators can apply through our Pilot Partnership pathway below. We evaluate sites based on year-round crop density, minimum active farmer membership (typically 150+ farmers), land tenure security, water availability, and road access for off-takers.',
  },
  {
    id: 'investor-model',
    category: 'Economics & Finance',
    question: 'How can an investor obtain the detailed financial model?',
    answer:
      'Visitors can explore our transparent unit-economics calculator directly on this page and download the illustrative CSV model assumptions immediately. Institutional investors, DFIs, and impact funds can request the full multi-year financial model and Pilot Investment Memorandum via the Investor Brief form.',
  },
  {
    id: 'first-pilot-location',
    category: 'Pilot & Operations',
    question: 'Where will the first pilot be deployed?',
    answer:
      'Candidate agricultural clusters are currently undergoing technical, hydrological, and cooperative demand screening across Betapawa’s target operating markets. Final site selection for Pilot Hub 01 will be confirmed jointly with our anchor agricultural and catalytic capital partners prior to construction.',
  },
  {
    id: 'already-operational',
    category: 'Pilot & Operations',
    question: 'Is the AgriPower™ hub already operational?',
    answer:
      'Betapawa Solutions Limited is an established clean-energy company with existing solar and mini-grid deployment capabilities. Betapawa AgriPower™ is our dedicated productive-use agricultural hub product line currently in the prototype and pilot-structuring phase. All architectural renders and hub unit-economics on this page represent our pilot engineering design and illustrative assumptions prior to pilot commissioning.',
  },
];

export interface ReadinessChecklistItem {
  id: string;
  category: string;
  item: string;
  status: 'Configured (Placeholder / Illustrative)' | 'Action Required from Betapawa';
  priority: 'High' | 'Medium';
  detail: string;
}

export const BETAPAWA_READINESS_CHECKLIST: ReadinessChecklistItem[] = [
  {
    id: 'chk-traction',
    category: 'Company Traction',
    item: 'Audited historical Betapawa core solar metrics',
    status: 'Action Required from Betapawa',
    priority: 'High',
    detail:
      'Insert exact verified counts for completed C&I/mini-grid projects and connected households in the Hero Credibility Strip.',
  },
  {
    id: 'chk-pilot-site',
    category: 'Pilot Deployment',
    item: 'Confirmed Pilot Hub 01 site location & anchor cooperative name',
    status: 'Action Required from Betapawa',
    priority: 'High',
    detail:
      'Once final site selection and cooperative MOU are signed, update FAQ #11 and the Impact Dashboard hub selector.',
  },
  {
    id: 'chk-capex-quotes',
    category: 'Financial Model',
    item: 'Vendor-validated EPC & equipment BoQ quotes for Pilot Hub 01',
    status: 'Configured (Placeholder / Illustrative)',
    priority: 'High',
    detail:
      'Unit-economics calculator currently uses transparent illustrative assumptions ($110k base CAPEX). Replace defaults with final EPC BoQ.',
  },
  {
    id: 'chk-team-bios',
    category: 'Leadership & Governance',
    item: 'Authorised executive photographs, full biographies & LinkedIn URLs',
    status: 'Action Required from Betapawa',
    priority: 'Medium',
    detail:
      'Section K includes structured leadership cards ready for authorised headshots and verified biographies.',
  },
  {
    id: 'chk-farmer-stories',
    category: 'Impact & Testimonials',
    item: 'Consented baseline farmer interviews & partner logos',
    status: 'Action Required from Betapawa',
    priority: 'Medium',
    detail:
      'Section I and Section K avoid fabricated testimonials or unapproved partner logos. Populate only after written consent is obtained.',
  },
  {
    id: 'chk-contact-details',
    category: 'Corporate Communications',
    item: 'Official registered office address, investor relations email & LinkedIn URL',
    status: 'Action Required from Betapawa',
    priority: 'High',
    detail:
      'Footer and lead-capture routing are ready to bind to Betapawa’s official corporate email and verified social handles.',
  },
];
