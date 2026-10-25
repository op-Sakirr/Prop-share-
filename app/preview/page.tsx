'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PRESET_PROPERTIES, PresetProperty } from '@/lib/presets';
import { buildShareUrl, generateWhatsAppMessage, getWhatsAppShareIntentUrl } from '@/lib/encoder';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Bed,
  Maximize2,
  DollarSign,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import QrModal from '@/components/QrModal';

export default function PreviewGalleryPage() {
  const origin = React.useSyncExternalStore(
    () => () => {},
    () => (typeof window !== 'undefined' ? window.location.origin : ''),
    () => ''
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQr, setActiveQr] = useState<{ url: string; title: string } | null>(null);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <Navbar />

      {/* Header */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-7xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Sample Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Curated Luxury Property Presets
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Test how property links look on WhatsApp before creating your own. Each of these listings is encoded with 100% zero-database Base64 links.
          </p>
        </div>
      </section>

      {/* Grid of presets */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRESET_PROPERTIES.map((preset: PresetProperty) => {
            const shareUrl = origin ? buildShareUrl(origin, preset.defaultData, 'query') : '';
            const msg = origin ? generateWhatsAppMessage(shareUrl, preset.defaultData) : '';
            const waIntent = origin ? getWhatsAppShareIntentUrl(msg) : '';

            return (
              <div
                key={preset.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Media banner */}
                <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preset.image}
                    alt={preset.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="rounded-lg bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                      {preset.defaultData.status}
                    </span>
                    <span className="rounded-lg bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-slate-200">
                      {preset.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-bold leading-tight drop-shadow-sm">{preset.defaultData.title}</h3>
                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="text-slate-300 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                        {preset.defaultData.location}
                      </span>
                      <span className="font-extrabold text-emerald-400 text-base tabular-nums">
                        {preset.defaultData.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specs row */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/60 p-3 text-center text-xs">
                  <div>
                    <span className="text-slate-600 text-[11px] block">Bedrooms</span>
                    <span className="font-semibold text-slate-900">{preset.defaultData.bhk}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 text-[11px] block">Carpet Area</span>
                    <span className="font-semibold text-slate-900">{preset.defaultData.area}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 text-[11px] block">Furnishing</span>
                    <span className="font-semibold text-slate-900 truncate block">{preset.defaultData.furnishing}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 flex-1 space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {preset.defaultData.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(preset.defaultData.amenities || []).slice(0, 4).map((a, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                      >
                        {a}
                      </span>
                    ))}
                    {(preset.defaultData.amenities?.length || 0) > 4 && (
                      <span className="text-[10px] text-slate-600 font-medium py-0.5">
                        +{(preset.defaultData.amenities?.length || 0) - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-slate-100 p-4 bg-slate-50/30 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={shareUrl || `/view`}
                      target="_blank"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors min-h-[38px]"
                    >
                      <span>Open Showcase</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleCopy(preset.id, shareUrl)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors min-h-[38px]"
                    >
                      {copiedId === preset.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>{copiedId === preset.id ? 'Copied' : 'Copy Link'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveQr({ url: shareUrl, title: preset.defaultData.title })}
                      className="inline-flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 min-h-[38px] min-w-[38px]"
                      title="Show QR Code"
                    >
                      <QrCode className="h-4 w-4" />
                    </button>
                  </div>

                  <a
                    href={waIntent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-xs min-h-[38px]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Want to list your own real estate property?</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Fill in your own title, price, and photo in our generator form to create an instant WhatsApp link.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <span>Open Form & Generator</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* QR Modal */}
      {activeQr && (
        <QrModal
          isOpen={true}
          onClose={() => setActiveQr(null)}
          url={activeQr.url}
          title={activeQr.title}
        />
      )}

      <Footer />
    </div>
  );
}
