import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Send,
  X,
  ClipboardCheck,
  Upload,
} from 'lucide-react';
import {
  GENERATED_IMAGES,
  BETAPAWA_READINESS_CHECKLIST,
} from '../config/agripowerConfig';
import { ResilientImage } from './ResilientImage';
import { BrandLogo } from './BrandLogo';

interface ClosingCtaAndFooterProps {
  activePathway: 'investor' | 'partner' | 'brief';
  onSelectPathway: (pathway: 'investor' | 'partner' | 'brief') => void;
  onNavigate: (sectionId: string) => void;
  checklistModalOpen: boolean;
  onCloseChecklistModal: () => void;
  onOpenChecklistModal: () => void;
  customLogoUrl: string | null;
  onChangeCustomLogoUrl: (url: string | null) => void;
}

export interface LeadSubmission {
  id: string;
  pathway: 'investor' | 'partner' | 'brief';
  fullName: string;
  organisation: string;
  workEmail: string;
  country: string;
  stakeholderType: string;
  areaOfInterest: string;
  message: string;
  submittedAt: string;
}

export const ClosingCtaAndFooter: React.FC<ClosingCtaAndFooterProps> = ({
  activePathway,
  onSelectPathway,
  onNavigate,
  checklistModalOpen,
  onCloseChecklistModal,
  onOpenChecklistModal,
  customLogoUrl,
  onChangeCustomLogoUrl,
}) => {
  // Lead Form State
  const [fullName, setFullName] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [country, setCountry] = useState('');
  const [stakeholderType, setStakeholderType] = useState('Climate / Impact Investor');
  const [areaOfInterest, setAreaOfInterest] = useState('Pilot Hub Project Finance / Equity');
  const [message, setMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<LeadSubmission | null>(
    null
  );

  // Legal Modals State
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Update default stakeholder & area of interest when pathway switches
  useEffect(() => {
    if (activePathway === 'investor') {
      setStakeholderType('Climate / Impact Investor');
      setAreaOfInterest('Pilot Hub Project Finance / Equity');
    } else if (activePathway === 'partner') {
      setStakeholderType('Farmer Cooperative / Agribusiness');
      setAreaOfInterest('Hosting a Pilot Hub / Off-Take Partnership');
    } else {
      setStakeholderType('Development Finance / Institutional Fund');
      setAreaOfInterest('Full Financial Model & Investor Memorandum');
    }
  }, [activePathway]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Spam check
    if (honeypot.trim() !== '') {
      setFormError('Spam protection triggered. Please clear hidden fields.');
      return;
    }

    if (fullName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (organisation.trim().length < 2) {
      setFormError('Please enter your organisation or cooperative name.');
      return;
    }
    if (!validateEmail(workEmail)) {
      setFormError('Please enter a valid work or institutional email address.');
      return;
    }
    if (country.trim().length < 2) {
      setFormError('Please specify your country or operating region.');
      return;
    }
    if (!privacyAccepted) {
      setFormError(
        'Please confirm the privacy notice to submit your enquiry.'
      );
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      const record: LeadSubmission = {
        id: `ENQ-${Math.floor(10000 + Math.random() * 89999)}`,
        pathway: activePathway,
        fullName: fullName.trim(),
        organisation: organisation.trim(),
        workEmail: workEmail.trim(),
        country: country.trim(),
        stakeholderType,
        areaOfInterest,
        message: message.trim(),
        submittedAt: new Date().toISOString(),
      };
      setSubmittedRecord(record);
      setIsSubmitting(false);
    }, 250);
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChangeCustomLogoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* SECTION N: STRONG CLOSING CTA & MULTI-PATHWAY LEAD CAPTURE */}
      <section
        id="contact"
        aria-labelledby="closing-cta-heading"
        className="py-20 md:py-28 bg-white border-b border-[#171A18]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full-Width Photographic Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-[#171A18]/15 bg-[#171A18]">
            <div className="aspect-16/9 sm:aspect-21/9 w-full max-h-[440px] overflow-hidden">
              <ResilientImage
                src={GENERATED_IMAGES.farmerStory}
                alt="African farmer, harvested produce crates, and the Betapawa AgriPower solar hub at sunrise"
                className="w-full h-full object-cover opacity-55"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35 p-6 sm:p-10 md:p-14 flex flex-col justify-center">
              <div className="max-w-2xl text-white">
                <div className="flex items-center gap-2 text-xs font-mono text-[#F49A16] mb-3">
                  <span>Betapawa AgriPower™</span>
                  <span aria-hidden="true">·</span>
                  <span>Pilot &amp; Capital Partnerships</span>
                </div>
                <h2
                  id="closing-cta-heading"
                  className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-balance"
                >
                  Let&apos;s power the next generation of African agriculture.
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed max-w-xl">
                  We are building a scalable model for productive energy in
                  farming communities. Join us to validate the model,
                  demonstrate measurable impact and expand access to reliable
                  energy.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPathway('partner');
                      document
                        .getElementById('lead-capture-form')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-3 bg-[#086B3A] hover:bg-[#064B2D] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Partner on the Pilot
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPathway('investor');
                      document
                        .getElementById('lead-capture-form')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-3 bg-white hover:bg-[#FAF8F2] text-[#171A18] text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Explore Investment Opportunities
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated Lead-Capture Pathways Form */}
          <div
            id="lead-capture-form"
            className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            {/* Left 5 Cols: Pathway Guidance & Audience Clarity */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-xs font-semibold text-[#086B3A]">
                  Direct Enquiry &amp; Diligence Routing
                </div>
                <h3 className="mt-1.5 text-2xl font-bold text-[#171A18]">
                  Select Your Engagement Pathway
                </h3>
                <p className="mt-2 text-sm text-[#171A18]/80 leading-relaxed">
                  Whether you are an infrastructure or climate-tech investor, an
                  agricultural cooperative seeking productive energy, or an
                  equipment partner, select the appropriate pathway so your
                  enquiry reaches the right Betapawa lead.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'investor' as const,
                    title: '01. Investment & Project Finance Enquiry',
                    desc: 'For climate-tech funds, impact investors, DFIs, and blended-finance providers evaluating pilot or portfolio capital.',
                  },
                  {
                    id: 'partner' as const,
                    title: '02. Pilot Site & Agricultural Partnership',
                    desc: 'For farmer cooperatives, produce aggregators, cold-chain operators, and OEM equipment partners.',
                  },
                  {
                    id: 'brief' as const,
                    title: '03. Request the Investor Brief & Model',
                    desc: 'Obtain the full multi-year spreadsheet model, site selection criteria, and technical BoQ overview.',
                  },
                ].map((item) => {
                  const isSelected = activePathway === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectPathway(item.id);
                        setSubmittedRecord(null);
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#064B2D] text-white border-[#064B2D]'
                          : 'bg-[#FAF8F2] text-[#171A18] border-[#171A18]/12 hover:border-[#086B3A]'
                      }`}
                    >
                      <div className="text-sm font-bold">{item.title}</div>
                      <p
                        className={`mt-1 text-xs leading-relaxed ${
                          isSelected ? 'text-white/85' : 'text-[#777D77]'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 7 Cols: Validated Form */}
            <div className="lg:col-span-7 bg-[#FAF8F2] border border-[#171A18]/15 rounded-xl p-6 sm:p-8">
              {submittedRecord ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-white border border-[#086B3A]/30 rounded-xl p-6 sm:p-8 space-y-4"
                >
                  <div className="flex items-center gap-3 text-[#086B3A]">
                    <CheckCircle2 className="w-7 h-7 shrink-0" />
                    <div>
                      <div className="text-xs font-mono font-semibold">
                        Reference ID: {submittedRecord.id}
                      </div>
                      <h4 className="text-xl font-bold text-[#171A18]">
                        Enquiry Logged for Betapawa AgriPower™
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm text-[#171A18]/80 leading-relaxed">
                    Thank you, <strong>{submittedRecord.fullName}</strong> (
                    {submittedRecord.organisation}). Your{' '}
                    <strong>
                      {submittedRecord.pathway === 'investor'
                        ? 'Investment Enquiry'
                        : submittedRecord.pathway === 'partner'
                        ? 'Pilot Partnership Proposal'
                        : 'Investor Brief Request'}
                    </strong>{' '}
                    has been validated and recorded.
                  </p>

                  <div className="bg-[#FAF8F2] border border-[#171A18]/10 rounded-lg p-4 text-xs space-y-1.5 font-mono">
                    <div>
                      <span className="text-[#777D77]">Work Email:</span>{' '}
                      {submittedRecord.workEmail}
                    </div>
                    <div>
                      <span className="text-[#777D77]">Stakeholder:</span>{' '}
                      {submittedRecord.stakeholderType} ({submittedRecord.country})
                    </div>
                    <div>
                      <span className="text-[#777D77]">Focus Area:</span>{' '}
                      {submittedRecord.areaOfInterest}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedRecord(null);
                        setFullName('');
                        setMessage('');
                      }}
                      className="px-4 py-2 text-xs font-semibold bg-[#086B3A] text-white rounded-lg cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#171A18]/10 pb-3">
                    <h4 className="text-base font-bold text-[#171A18]">
                      {activePathway === 'investor'
                        ? 'Investment & Capital Partner Form'
                        : activePathway === 'partner'
                        ? 'Pilot Site & Value-Chain Partner Form'
                        : 'Request the Investor Brief & Model'}
                    </h4>
                    <span className="text-xs text-[#086B3A] font-medium">
                      All fields validated
                    </span>
                  </div>

                  {/* Anti-spam Honeypot (Hidden from sighted and screen-reader users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp-company-fax">Leave this field blank</label>
                    <input
                      id="hp-company-fax"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {formError && (
                    <div
                      role="alert"
                      className="p-3.5 bg-red-50 border border-red-300 rounded-lg flex items-center gap-2.5 text-xs text-red-900 font-medium"
                    >
                      <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="lead-fullname"
                        className="block text-xs font-semibold text-[#171A18] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="lead-fullname"
                        type="text"
                        required
                        placeholder="e.g. Amara Okafor"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#171A18]/20 rounded-lg text-[#171A18] focus:outline-2 focus:outline-[#086B3A]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lead-org"
                        className="block text-xs font-semibold text-[#171A18] mb-1.5"
                      >
                        Organisation / Cooperative *
                      </label>
                      <input
                        id="lead-org"
                        type="text"
                        required
                        placeholder="e.g. Sahel Climate Infrastructure Fund"
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#171A18]/20 rounded-lg text-[#171A18] focus:outline-2 focus:outline-[#086B3A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="lead-email"
                        className="block text-xs font-semibold text-[#171A18] mb-1.5"
                      >
                        Work Email *
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        required
                        placeholder="name@organisation.org"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#171A18]/20 rounded-lg text-[#171A18] focus:outline-2 focus:outline-[#086B3A]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lead-country"
                        className="block text-xs font-semibold text-[#171A18] mb-1.5"
                      >
                        Country / Operating Region *
                      </label>
                      <input
                        id="lead-country"
                        type="text"
                        required
                        placeholder="e.g. Nigeria / Kenya / UK"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#171A18]/20 rounded-lg text-[#171A18] focus:outline-2 focus:outline-[#086B3A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="lead-stakeholder"
                        className="block text-xs font-semibold text-[#171A18] mb-1.5"
                      >
                        Stakeholder Type *
                      </label>
                      <select
                        id="lead-stakeholder"
                        value={stakeholderType}
                        onChange={(e) => setStakeholderType(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#171A18]/20 rounded-lg text-[#171A18]"
                      >
                        <option value="Climate / Impact Investor">
                          Climate / Impact Investor
                        </option>
                        <option value="Development Finance Institution (DFI)">
                          Development Finance Institution (DFI)
                        </option>
                        <option value="Agricultural Value-Chain Investor">
                          Agricultural Value-Chain Investor
                        </option>
                        <option value="Farmer Cooperative / Agribusiness">
                          Farmer Cooperative / Agribusiness
                        </option>
                        <option value="Agro-Processor / Cold-Chain Operator">
                          Agro-Processor / Cold-Chain Operator
                        </option>
                        <option value="Equipment Manufacturer (OEM)">
                          Equipment Manufacturer (OEM)
                        </option>
                        <option value="Government / Development Partner">
                          Government / Development Partner
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="lead-interest"
                        className="block text-xs font-semibold text-[#171A18] mb-1.5"
                      >
                        Primary Area of Interest *
                      </label>
                      <select
                        id="lead-interest"
                        value={areaOfInterest}
                        onChange={(e) => setAreaOfInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#171A18]/20 rounded-lg text-[#171A18]"
                      >
                        <option value="Pilot Hub Project Finance / Equity">
                          Pilot Hub Project Finance / Equity
                        </option>
                        <option value="Catalytic Grant / Blended Finance">
                          Catalytic Grant / Blended Finance
                        </option>
                        <option value="Hosting a Pilot Hub / Off-Take Partnership">
                          Hosting a Pilot Hub / Off-Take Partnership
                        </option>
                        <option value="Full Financial Model & Investor Memorandum">
                          Full Financial Model &amp; Investor Memorandum
                        </option>
                        <option value="Equipment Supply & Technical Integration">
                          Equipment Supply &amp; Technical Integration
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lead-message"
                      className="block text-xs font-semibold text-[#171A18] mb-1.5"
                    >
                      Optional Message / Site or Mandate Details
                    </label>
                    <textarea
                      id="lead-message"
                      rows={3}
                      placeholder="Share brief context on your investment mandate, cooperative location, or technical inquiry..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#171A18]/20 rounded-lg text-[#171A18] focus:outline-2 focus:outline-[#086B3A]"
                    />
                  </div>

                  {/* Privacy Consent Checkbox */}
                  <div className="flex items-start gap-2.5">
                    <input
                      id="lead-privacy"
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-1 accent-[#086B3A] w-4 h-4 cursor-pointer"
                    />
                    <label
                      htmlFor="lead-privacy"
                      className="text-xs text-[#777D77] leading-relaxed cursor-pointer"
                    >
                      I agree that Betapawa Solutions Limited may store and
                      process these details solely for responding to my
                      AgriPower™ partnership or investment enquiry in accordance
                      with our{' '}
                      <button
                        type="button"
                        onClick={() => setLegalModal('privacy')}
                        className="text-[#086B3A] underline font-medium"
                      >
                        Privacy Policy
                      </button>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-[#086B3A] hover:bg-[#064B2D] disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? 'Validating & Logging Enquiry...'
                        : activePathway === 'investor'
                        ? 'Submit Investment Enquiry'
                        : activePathway === 'partner'
                        ? 'Submit Pilot Partnership Enquiry'
                        : 'Request Investor Brief & Model'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION O: QUIET, TRUSTWORTHY FOOTER */}
      <footer
        aria-label="Site Footer"
        className="bg-[#171A18] text-white py-16 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand & Description */}
            <div className="lg:col-span-5 space-y-4">
              <BrandLogo variant="light" size="md" customLogoUrl={customLogoUrl} />
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-md">
                <strong className="text-white">Betapawa AgriPower™</strong> is
                an agricultural productive-use energy platform developed by{' '}
                <strong className="text-white">
                  Betapawa Solutions Limited
                </strong>
                —deploying modular solar hubs for cold storage, irrigation, and
                agro-processing across African farming communities.
              </p>
              <div className="text-xs font-mono text-[#F49A16]">
                Powering Food. Powering Income. Powering Resilience.
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-3 space-y-2.5 text-xs">
              <div className="font-semibold text-white uppercase tracking-wider mb-3">
                Platform Navigation
              </div>
              <ul className="space-y-2 text-white/75">
                {[
                  { id: 'problem', label: 'The Problem' },
                  { id: 'solution', label: 'Our Solution (6 Services)' },
                  { id: 'how-it-works', label: 'How It Works' },
                  { id: 'prototype', label: 'Meet the Prototype' },
                  { id: 'business-model', label: 'Unit-Economics Calculator' },
                  { id: 'impact', label: 'Impact Measurement' },
                  { id: 'scalability', label: 'Portfolio Scalability' },
                  { id: 'investors', label: 'Investors & Partners' },
                  { id: 'faq', label: 'Frequently Asked Questions' },
                ].map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.id);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Corporate Governance */}
            <div className="lg:col-span-4 space-y-3 text-xs">
              <div className="font-semibold text-white uppercase tracking-wider mb-3">
                Corporate &amp; Investor Relations
              </div>
              <p className="text-white/75 leading-relaxed">
                <strong className="text-white">Entity:</strong> Betapawa
                Solutions Limited
              </p>
              <p className="text-white/75 leading-relaxed">
                <strong className="text-white">Direct Contact Route:</strong>{' '}
                Configured via the validated Investor &amp; Partner Enquiry
                portal above (no unverified phone numbers or addresses are
                displayed prior to official corporate release).
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenChecklistModal}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ClipboardCheck className="w-3.5 h-3.5 text-[#F49A16]" />
                  <span>Information Readiness &amp; Brand Config</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
            <div>
              © {new Date().getFullYear()} Betapawa Solutions Limited. All
              rights reserved. Betapawa AgriPower™ is a trademark of Betapawa
              Solutions Limited.
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms of Use &amp; Financial Disclaimer
              </button>
              <button
                type="button"
                onClick={onOpenChecklistModal}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Diligence Checklist
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL 1: BETAPAWA INFORMATION READINESS CHECKLIST & OFFICIAL LOGO UPLOADER */}
      {checklistModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checklist-modal-title"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-[#FAF8F2] border border-[#171A18]/20 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#171A18]/10">
              <div>
                <div className="text-xs font-mono text-[#086B3A] font-semibold">
                  Deliverable Section 11 · Governance &amp; Brand Configuration
                </div>
                <h3
                  id="checklist-modal-title"
                  className="mt-1 text-xl font-bold text-[#171A18]"
                >
                  Betapawa Information Readiness Checklist &amp; Brand Asset Uploader
                </h3>
              </div>
              <button
                type="button"
                onClick={onCloseChecklistModal}
                aria-label="Close modal"
                className="p-2 rounded-lg text-[#777D77] hover:text-[#171A18] hover:bg-[#171A18]/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Logo File Override Utility */}
            <div className="mt-5 bg-white border border-[#171A18]/12 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-[#171A18]">
                    Official Betapawa Logo Asset Configuration
                  </h4>
                  <p className="text-xs text-[#777D77] mt-0.5">
                    The site renders the official Betapawa sunburst mark with green &ldquo;Beta&rdquo; (#086B3A) and orange &ldquo;Pawa&rdquo; (#F49A16). You can also upload a local transparent PNG/SVG file to apply across all brand touchpoints.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <label className="px-3.5 py-2 bg-[#086B3A] hover:bg-[#064B2D] text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileUpload}
                      className="hidden"
                    />
                  </label>
                  {customLogoUrl && (
                    <button
                      type="button"
                      onClick={() => onChangeCustomLogoUrl(null)}
                      className="px-3 py-2 text-xs font-medium text-[#171A18] border border-[#171A18]/20 rounded-lg cursor-pointer"
                    >
                      Reset Default
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Checklist Table */}
            <div className="mt-5 space-y-3">
              <div className="text-xs font-semibold text-[#171A18]">
                Checklist of Information Required from Betapawa Before Final Institutional Release:
              </div>
              {BETAPAWA_READINESS_CHECKLIST.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#171A18]/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-[#086B3A]">
                        {item.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[#777D77]">
                        Priority: {item.priority}
                      </span>
                    </div>
                    <div className="mt-1 text-sm font-bold text-[#171A18]">
                      {item.item}
                    </div>
                    <p className="mt-1 text-xs text-[#777D77]">{item.detail}</p>
                  </div>
                  <div className="text-xs font-mono text-[#F49A16] bg-[#171A18] px-3 py-1.5 rounded-md shrink-0 self-start sm:self-center">
                    {item.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#171A18]/10 flex justify-end">
              <button
                type="button"
                onClick={onCloseChecklistModal}
                className="px-5 py-2.5 bg-[#171A18] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close Checklist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PRIVACY POLICY & TERMS OF USE */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-[#FAF8F2] border border-[#171A18]/20 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#171A18]/10">
              <h3
                id="legal-modal-title"
                className="text-lg font-bold text-[#171A18]"
              >
                {legalModal === 'privacy'
                  ? 'Privacy Policy & Data Protection Notice'
                  : 'Terms of Use & Forward-Looking Financial Disclaimer'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label="Close legal notice"
                className="p-1.5 rounded-lg text-[#777D77] hover:text-[#171A18] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-[#171A18]/80 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Purpose of Data Collection:</strong> Betapawa
                    Solutions Limited collects contact and organisational
                    information submitted through the AgriPower™ enquiry forms
                    solely to evaluate potential investment, pilot partnership,
                    and technical collaboration enquiries.
                  </p>
                  <p>
                    <strong>2. Privacy-Conscious Analytics &amp; Storage:</strong>{' '}
                    We do not sell, rent, or trade personal data to third
                    parties. Lead submissions are restricted to authorised
                    corporate development and investor relations personnel.
                  </p>
                  <p>
                    <strong>3. Data Subject Rights:</strong> You may request
                    access to, correction of, or deletion of your enquiry
                    records at any time by contacting Betapawa Solutions
                    Limited.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Informational Purpose Only:</strong> This website
                    and its interactive calculators are provided for
                    informational and discussion purposes only and do not
                    constitute a public offer, solicitation, or securities
                    prospectus.
                  </p>
                  <p>
                    <strong>2. Illustrative Assumptions &amp; Pilot Targets:</strong>{' '}
                    All unit-economics figures, payback periods, and impact
                    metrics labelled as &ldquo;Illustrative Assumptions&rdquo;,
                    &ldquo;Modelled Estimates&rdquo;, or &ldquo;Pilot
                    Targets&rdquo; represent engineering models and working
                    hypotheses prior to full pilot validation. Actual project
                    performance may vary materially based on site conditions,
                    crop seasonality, tariff regulation, and macroeconomic
                    factors.
                  </p>
                  <p>
                    <strong>3. No Guaranteed Returns:</strong> Betapawa
                    Solutions Limited makes no representation or warranty of
                    guaranteed financial yield or farmer income uplift.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#171A18]/10 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 bg-[#086B3A] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
