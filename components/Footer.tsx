'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ShieldCheck, Zap, Link as LinkIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Home className="h-4 w-4" />
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-base">PropShare</span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Create instant real estate brochures and unbreakable WhatsApp share links.
              No database, no server storage, zero expiration — 100% encoded in URL-safe Base64.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Private (No DB)
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <Zap className="h-3.5 w-3.5" /> Instant Delivery
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <LinkIcon className="h-3.5 w-3.5" /> WhatsApp-Safe URLs
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-colors">
                  Property Form & Generator
                </Link>
              </li>
              <li>
                <Link href="/preview" className="hover:text-slate-900 transition-colors">
                  Sample Properties & Presets
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-slate-900 transition-colors">
                  How Base64 Encoding Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-3">Key Features</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>High-Res Luxury Brochure</li>
              <li>One-Click WhatsApp Chat</li>
              <li>Client-Side Compression</li>
              <li>QR Code Generation</li>
              <li>Printable Property Flyer</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PropShare. Designed for Real Estate Brokers, Owners, and Buyers.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-800 transition-colors">
              Create New Listing
            </Link>
            <span>·</span>
            <Link href="/how-it-works" className="hover:text-slate-800 transition-colors">
              Tech Architecture
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
