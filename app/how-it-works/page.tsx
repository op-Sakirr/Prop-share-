'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  HelpCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  Code2,
  ArrowRight,
  Database,
  Lock,
  Layers,
} from 'lucide-react';
import { encodePropertyData, decodePropertyData } from '@/lib/encoder';
import { PropertyData } from '@/lib/types';

export default function HowItWorksPage() {
  const [testTitle, setTestTitle] = useState('Skyline Villa Bandra');
  const [testPrice, setTestPrice] = useState('₹ 3.5 Crore');
  const [testLocation, setTestLocation] = useState('Bandra West, Mumbai');

  const testData: PropertyData = {
    title: testTitle,
    price: testPrice,
    image: '/presets/luxury_modern_villa_1792955666247.jpg',
    location: testLocation,
    type: 'Villa',
    bhk: '4 BHK',
    status: 'Ready to Move',
  };

  const encodedStr = encodePropertyData(testData);
  const decodedData = decodePropertyData(encodedStr);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <Navbar />

      {/* Header */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-7xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Architecture & Technology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Zero Database & WhatsApp-Safe Base64 Architecture
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Understand how all property details, pricing, images, and specifications are packed into a single URL that never breaks on WhatsApp.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-1 space-y-12">
        {/* Comparison: Why ordinary links break vs PropShare */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bad ordinary link */}
          <div className="rounded-2xl border border-rose-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <XCircle className="h-5 w-5" />
              <h3 className="font-bold text-slate-900 text-base">Standard Base64 (Kyu WhatsApp Par Toot Jata Hai)</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>
                  <strong>Unsafe Characters:</strong> Standard Base64 uses <code className="bg-rose-50 text-rose-700 px-1 py-0.5 rounded font-mono">+</code> and <code className="bg-rose-50 text-rose-700 px-1 py-0.5 rounded font-mono">/</code> which WhatsApp regex treats as sentence separators or path slashes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>
                  <strong>Trailing Padding:</strong> Equals sign <code className="bg-rose-50 text-rose-700 px-1 py-0.5 rounded font-mono">=</code> at the end of base64 often gets clipped off in copy-pasting or SMS forwarding.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>
                  <strong>Text Boundary Clashing:</strong> When links are embedded next to emojis or punctuation in messages, WhatsApp links can break mid-word.
                </span>
              </li>
            </ul>
          </div>

          {/* PropShare Solution */}
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50/40 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="font-bold text-slate-900 text-base">PropShare Solution (100% Unbreakable Guarantee)</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>
                  <strong>LZ-String URI-Safe Compression:</strong> Encodes strictly into safe characters <code className="bg-white text-emerald-800 px-1 py-0.5 rounded font-mono">[a-zA-Z0-9\-_$]</code> with zero slashes or plus signs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>
                  <strong>Payload Minification:</strong> Key fields are minified (<code className="font-mono text-emerald-900 font-bold">t</code> for title, <code className="font-mono text-emerald-900 font-bold">p</code> for price, etc.), cutting data size by 65%.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>
                  <strong>Isolated URL Messaging:</strong> The share message template isolates the link on its own separate line without touching any markdown characters.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-emerald-400">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Zero Database (No DB)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traditional websites require PostgreSQL, MongoDB, or Firebase servers. If those servers go down or cost bills are missed, property links die. With PropShare, <strong>the link IS the database</strong>. As long as the web app is up, the link will open forever.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-emerald-400">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. 100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No buyer phone numbers, seller names, or private price discussions are stored in our records. Neither we nor any third-party crawler can scrape or sell your client listings.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-emerald-400">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Hybrid Dual Mode</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supports both query parameter <code className="bg-slate-100 text-slate-800 px-1 rounded font-mono">?d=...</code> and zero-server client hash <code className="bg-slate-100 text-slate-800 px-1 rounded font-mono">#d=...</code> so you can choose the cleanest delivery style for your buyers.
            </p>
          </div>
        </div>

        {/* Live Interactive Encoder / Decoder Lab */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">Live Base64 Compression Test Lab</h2>
            </div>
            <p className="text-xs text-slate-600">
              Test how text fields get transformed into unbreakable URL strings in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Property Name</label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Asking Price</label>
              <input
                type="text"
                value={testPrice}
                onChange={(e) => setTestPrice(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={testLocation}
                onChange={(e) => setTestLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Compressed URL Payload ({encodedStr.length} characters)</span>
                <span className="text-emerald-700 font-mono text-[11px]">100% URL-Safe</span>
              </div>
              <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto break-all max-h-32">
                {encodedStr}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Instant Decompressed Result</span>
                <span className="text-slate-500 font-mono text-[11px]">JSON Payload</span>
              </div>
              <pre className="p-3 bg-slate-50 text-slate-800 font-mono text-xs rounded-xl overflow-x-auto border border-slate-200 max-h-32">
                {JSON.stringify(decodedData, null, 2)}
              </pre>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <span>Build Real Property Link Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
