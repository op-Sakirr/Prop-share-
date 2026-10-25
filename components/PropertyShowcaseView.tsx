'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PropertyData } from '@/lib/types';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Compass,
  CheckCircle2,
  Share2,
  Printer,
  QrCode,
  Copy,
  Check,
  Building2,
  MessageCircle,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import QrModal from './QrModal';
import { generateWhatsAppMessage, getWhatsAppShareIntentUrl } from '@/lib/encoder';

interface PropertyShowcaseViewProps {
  data: PropertyData;
  rawShareUrl?: string;
}

export default function PropertyShowcaseView({ data, rawShareUrl }: PropertyShowcaseViewProps) {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const currentUrl =
    rawShareUrl || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const whatsAppInquiryMessage = `Hello${
    data.sellerName ? ` ${data.sellerName}` : ''
  }! I am interested in *${data.title}* listed for *${data.price}* (${data.location || 'Featured listing'}). Could you please share more details or arrange a site visit?`;

  const sellerWhatsAppLink = getWhatsAppShareIntentUrl(
    whatsAppInquiryMessage,
    data.sellerPhone
  );

  const forwardWhatsAppLink = getWhatsAppShareIntentUrl(
    generateWhatsAppMessage(currentUrl, data)
  );

  const mapsSearchUrl = data.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${data.title} ${data.location}`
      )}`
    : null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white print:bg-white print:text-black">
      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline">PropShare Studio</span>
            <span className="sm:hidden">Create Listing</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQrOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors min-h-[38px]"
              title="Show QR Code"
            >
              <QrCode className="h-4 w-4 text-emerald-400" />
              <span className="hidden md:inline">QR Code</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors min-h-[38px]"
              title="Print Brochure"
            >
              <Printer className="h-4 w-4" />
              <span>Print Flyer</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors min-h-[38px]"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied Link' : 'Copy'}</span>
            </button>

            <a
              href={forwardWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm min-h-[38px]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Share</span>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Main Showcase Hero Container */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
          {/* Media Viewport */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
            {!imageError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={data.image}
                alt={data.title}
                onError={() => setImageError(true)}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-center">
                <Building2 className="h-16 w-16 text-emerald-500 mb-3" />
                <h3 className="text-xl font-bold text-white">{data.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Real Estate Visual Showcase</p>
              </div>
            )}

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />

            {/* Top Badges overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-auto">
              <div className="flex flex-wrap items-center gap-2">
                {data.status && (
                  <span className="rounded-lg bg-emerald-600/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-md">
                    {data.status}
                  </span>
                )}
                {data.type && (
                  <span className="rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-3 py-1 text-xs font-medium text-slate-200">
                    {data.type}
                  </span>
                )}
              </div>

              <div className="rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/60 px-3 py-1 text-xs text-slate-300 font-mono">
                100% URL-Safe
              </div>
            </div>

            {/* Bottom Hero Overlay Information */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 pointer-events-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white text-balance drop-shadow-sm">
                    {data.title}
                  </h1>

                  {data.location && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-300">
                      <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="font-medium">{data.location}</span>
                      {mapsSearchUrl && (
                        <a
                          href={mapsSearchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-xs text-emerald-400 hover:text-emerald-300 ml-1 underline decoration-emerald-500/50"
                        >
                          View Map <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Display */}
                <div className="flex flex-col items-start md:items-end bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3.5 sm:px-5 sm:py-3 rounded-2xl shrink-0 shadow-lg">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    Offered Price
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                    {data.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 border-t border-slate-800 bg-slate-900/50">
            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                <Bed className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Bedrooms</div>
                <div className="text-sm sm:text-base font-bold text-white">{data.bhk || 'Config On Request'}</div>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                <Bath className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Bathrooms</div>
                <div className="text-sm sm:text-base font-bold text-white">{data.bathrooms || 'Standard'}</div>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                <Maximize2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Carpet Area</div>
                <div className="text-sm sm:text-base font-bold text-white">{data.area || 'Spacious Layout'}</div>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Furnishing / Facing</div>
                <div className="text-sm sm:text-base font-bold text-white truncate max-w-[140px]">
                  {data.furnishing || data.facing || 'Semi-Furnished'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout: Left Details + Right Action Card */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details & Amenities (2 spans) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description & Overview */}
            {data.description && (
              <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <h2 className="text-base font-semibold text-white tracking-tight">Property Overview & Details</h2>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                  {data.description}
                </p>
              </section>
            )}

            {/* Amenities Grid */}
            {data.amenities && data.amenities.length > 0 && (
              <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8 space-y-5">
                <h2 className="text-base font-semibold text-white tracking-tight">Featured Amenities & Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {data.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 px-3.5 py-3 text-sm text-slate-200"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="font-medium text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Facts Table */}
            <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8 space-y-4">
              <h2 className="text-base font-semibold text-white tracking-tight">Property Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="border-b border-slate-800 pb-2.5">
                  <span className="text-slate-400 block text-xs">Property Type</span>
                  <span className="text-white font-medium">{data.type || 'Residential'}</span>
                </div>
                <div className="border-b border-slate-800 pb-2.5">
                  <span className="text-slate-400 block text-xs">Ownership / Status</span>
                  <span className="text-white font-medium">{data.status || 'Ready for Possession'}</span>
                </div>
                <div className="border-b border-slate-800 pb-2.5">
                  <span className="text-slate-400 block text-xs">Facing Direction</span>
                  <span className="text-white font-medium">{data.facing || 'Road Facing / Prime'}</span>
                </div>
                <div className="border-b border-slate-800 pb-2.5">
                  <span className="text-slate-400 block text-xs">Furnishing</span>
                  <span className="text-white font-medium">{data.furnishing || 'As per listing'}</span>
                </div>
                <div className="border-b border-slate-800 pb-2.5">
                  <span className="text-slate-400 block text-xs">Storage / Mode</span>
                  <span className="text-emerald-400 font-mono text-xs">Zero DB · Base64 URL</span>
                </div>
                <div className="border-b border-slate-800 pb-2.5">
                  <span className="text-slate-400 block text-xs">Listed At</span>
                  <span className="text-slate-300 flex items-center gap-1 font-mono text-xs">
                    <Calendar className="h-3 w-3" />
                    {data.timestamp
                      ? new Date(data.timestamp).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Verified Listing'}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Verified Contact & WhatsApp Inquiry Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-20 rounded-2xl border border-slate-800 bg-slate-950/90 p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-lg font-bold">
                    {(data.sellerName || 'Owner').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">
                      {data.sellerName || 'Verified Property Owner'}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-emerald-400 mt-0.5">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{data.sellerRole || 'Direct Listing'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price summary badge */}
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-3.5">
                <div className="text-[11px] uppercase tracking-wider text-slate-400">Total Price</div>
                <div className="text-xl font-bold text-white tabular-nums">{data.price}</div>
              </div>

              {/* Primary Call to Action: WhatsApp Chat */}
              <div className="space-y-3">
                <a
                  href={sellerWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/30 min-h-[48px] active:scale-[0.98]"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </a>

                {data.sellerPhone && (
                  <a
                    href={`tel:${data.sellerPhone.replace(/[^0-9+]/g, '')}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors min-h-[44px]"
                  >
                    <PhoneCall className="h-4 w-4 text-emerald-400" />
                    <span>Call: {data.sellerPhone}</span>
                  </a>
                )}
              </div>

              {/* Share & QR Utilities */}
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="text-xs text-slate-400 font-medium">Share or Save this Property</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors min-h-[40px]"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={() => setQrOpen(true)}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors min-h-[40px]"
                  >
                    <QrCode className="h-3.5 w-3.5 text-emerald-400" />
                    <span>View QR</span>
                  </button>
                </div>
              </div>

              {/* Zero Database Privacy Guarantee */}
              <div className="rounded-lg bg-slate-900/60 p-3 text-[11px] text-slate-400 leading-relaxed border border-slate-800/60">
                <span className="font-semibold text-slate-300">🔒 Zero Database Privacy:</span> This property page is
                rendered directly from the encrypted Base64 URL parameter. No server holds or tracks this data.
              </div>
            </div>
          </div>
        </div>

        {/* Viral Footer Banner */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Want to share your own property like this?</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
              Create an unbreakable WhatsApp property showcase in 30 seconds. No database, zero signup required.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-emerald-500 transition-colors shadow-md whitespace-nowrap min-h-[44px]"
          >
            <Share2 className="h-4 w-4" />
            <span>Create Your Own Free Link</span>
          </Link>
        </div>
      </main>

      {/* QR Modal */}
      <QrModal isOpen={qrOpen} onClose={() => setQrOpen(false)} url={currentUrl} title={data.title} />
    </div>
  );
}
