'use client';

import React, { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { decodePropertyData } from '@/lib/encoder';
import { PropertyData } from '@/lib/types';
import { PRESET_PROPERTIES } from '@/lib/presets';
import PropertyShowcaseView from '@/components/PropertyShowcaseView';
import Link from 'next/link';
import { AlertCircle, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';

function ViewPropertyContent() {
  const searchParams = useSearchParams();

  const { property, error } = useMemo(() => {
    try {
      // 1. Try search param 'd' or 'data'
      const paramData = searchParams.get('d') || searchParams.get('data');

      // 2. Try window hash if param is missing
      let hashData = '';
      if (typeof window !== 'undefined' && window.location.hash) {
        hashData = window.location.hash;
      }

      const raw = paramData || hashData;

      if (!raw) {
        // If someone visits /view directly without data, load the first demo preset so they see how it looks
        return { property: PRESET_PROPERTIES[0].defaultData, error: null };
      }

      const decoded = decodePropertyData(raw);
      if (decoded && (decoded.title || decoded.price || decoded.image)) {
        return { property: decoded, error: null };
      }
      return {
        property: null,
        error: 'Property data could not be parsed. The link may have been truncated or modified.',
      };
    } catch (err) {
      console.error('Error decoding property:', err);
      return {
        property: null,
        error: 'An error occurred while loading property details.',
      };
    }
  }, [searchParams]);

  if (error || !property) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
        <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Invalid or Incomplete Link</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {error || 'This link does not contain valid property data.'}
          </p>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
            >
              <span>Create a New Property Link</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/preview"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Explore Sample Properties</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <PropertyShowcaseView data={property} />;
}

export default function ViewPropertyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
          <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin" />
        </div>
      }
    >
      <ViewPropertyContent />
    </Suspense>
  );
}
