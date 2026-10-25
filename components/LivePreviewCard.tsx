'use client';

import React, { useState } from 'react';
import { PropertyData } from '@/lib/types';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Building2,
  ExternalLink,
  MessageCircle,
  Smartphone,
  Monitor,
  Sparkles,
} from 'lucide-react';

interface LivePreviewCardProps {
  data: PropertyData;
  onOpenFullscreen?: () => void;
}

export default function LivePreviewCard({ data, onOpenFullscreen }: LivePreviewCardProps) {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Live Recipient Preview</h3>
            <p className="text-[11px] text-slate-500">How buyers will see it on WhatsApp</p>
          </div>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all min-h-[32px] ${
              deviceMode === 'mobile'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Mobile phone view"
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all min-h-[32px] ${
              deviceMode === 'desktop'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Desktop browser view"
          >
            <Monitor className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="mt-4 flex justify-center items-start overflow-hidden bg-slate-900/95 rounded-xl p-3 sm:p-4 text-white">
        <div
          className={`w-full transition-all duration-300 ${
            deviceMode === 'mobile' ? 'max-w-[340px]' : 'max-w-full'
          }`}
        >
          {/* Mock Mobile Status bar if mobile */}
          {deviceMode === 'mobile' && (
            <div className="flex items-center justify-between text-[10px] text-slate-400 px-2 py-1 mb-2 border-b border-slate-800">
              <span>9:41 AM</span>
              <span className="font-semibold text-emerald-400">WhatsApp Link Preview</span>
              <span>100%</span>
            </div>
          )}

          {/* Mini Card */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-lg">
            {/* Image */}
            <div className="relative aspect-[16/10] w-full bg-slate-800 overflow-hidden">
              {!imgError && data.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={data.image}
                  alt={data.title}
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 p-4 text-center">
                  <Building2 className="h-8 w-8 text-emerald-500 mb-1" />
                  <span className="text-xs">No image provided yet</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Status & price */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="rounded-md bg-emerald-600/90 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  {data.status || 'For Sale'}
                </span>
                {data.type && (
                  <span className="rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300">
                    {data.type}
                  </span>
                )}
              </div>

              <div className="absolute bottom-2 left-2 right-2">
                <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1 drop-shadow-sm">
                  {data.title || 'Property Name Goes Here'}
                </h4>
                <div className="flex items-center justify-between text-xs mt-0.5">
                  <span className="text-slate-300 flex items-center gap-1 truncate max-w-[180px]">
                    <MapPin className="h-3 w-3 text-emerald-400 shrink-0" />
                    {data.location || 'Location / City'}
                  </span>
                  <span className="font-extrabold text-emerald-400 tabular-nums">
                    {data.price || '₹ Price'}
                  </span>
                </div>
              </div>
            </div>

            {/* Specs row */}
            <div className="grid grid-cols-3 divide-x divide-slate-800 border-t border-slate-800 bg-slate-900/60 p-2 text-center text-[11px]">
              <div>
                <span className="text-slate-400 text-[10px] block">BHK</span>
                <span className="font-semibold text-white">{data.bhk || '3 BHK'}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Area</span>
                <span className="font-semibold text-white">{data.area || '2,100 sqft'}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Furnished</span>
                <span className="font-semibold text-white truncate block">{data.furnishing || 'Furnished'}</span>
              </div>
            </div>

            {/* Description excerpt */}
            {data.description && (
              <div className="p-3 border-t border-slate-800 text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {data.description}
              </div>
            )}

            {/* Amenities preview tags */}
            {data.amenities && data.amenities.length > 0 && (
              <div className="p-3 border-t border-slate-800 flex flex-wrap gap-1.5 text-[10px] text-slate-400">
                {data.amenities.slice(0, 4).map((a, i) => (
                  <span key={i} className="text-slate-300">
                    {i > 0 ? '· ' : ''}
                    {a}
                  </span>
                ))}
                {data.amenities.length > 4 && <span>+{data.amenities.length - 4} more</span>}
              </div>
            )}

            {/* Action Bar mockup */}
            <div className="p-3 border-t border-slate-800 flex items-center gap-2 bg-slate-950">
              <div className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Chat on WhatsApp</span>
              </div>
              {onOpenFullscreen && (
                <button
                  type="button"
                  onClick={onOpenFullscreen}
                  className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-white"
                  title="Test link fullscreen"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
