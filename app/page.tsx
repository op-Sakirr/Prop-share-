'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyForm from '@/components/PropertyForm';
import { ShieldCheck, Zap, Link as LinkIcon, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Zero Database · 100% Client-Side Base64 Encoding</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto text-balance">
            WhatsApp Par Bhejo <span className="text-emerald-400">Ultra-Luxury</span> Property Showcases
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Bas form bharo (Naam, Price aur Photo) aur turant ek unbreakable link paao. Jab buyer link kholega, use ek shaandar digital brochure dikhega bina kisi database ke!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp Par Kabhi Break Nahi Hoga</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Koi Server Ya Database Nahi</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Direct WhatsApp Inquiry Button</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Interactive Workspace Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 flex-1 w-full">
        <PropertyForm />
      </section>

      {/* 3 Simple Steps */}
      <section className="border-t border-slate-200 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Yeh Kaise Kaam Karta Hai? (3 Simple Steps)</h2>
            <p className="text-sm text-slate-600">
              Kisi account ya database ki zaroorat nahi. Saari information link ke andar hi compress ho jaati hai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-base shadow-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Form Bharo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Property ka naam, price, aur photo daalo. Sath me location, BHK aur seller ka WhatsApp number bhi add kar sakte ho.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-base shadow-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Unbreakable Link Generate Karo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hamara algorithm saare data ko URL-Safe Base64 me compress kar deta hai. Isme koi aise characters nahi hote jo WhatsApp par cut ya wrap ho sakein.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-base shadow-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">WhatsApp Par Send Karo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buyer jab bhi link par click karega, use ek 5-star hotel jaisi property landing page dikhegi jaha se wo direct aapko WhatsApp par message bhej sakega.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">100% Privacy & Zero Database</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Aapka data kisi server par store nahi hota. Link hi database hai, isliye link lifetime active rehta hai aur kabhi expire nahi hota.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <LinkIcon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">WhatsApp Link Formatting Guarantee</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Standard base64 symbols (+, /, =) ko filter karke URI-safe base64 banaya gaya hai jisse WhatsApp regex link ko kabhi beech me se cut nahi karta.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">1-Click WhatsApp Lead Generator</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Showcase page par &quot;Chat on WhatsApp&quot; button hota hai. Buyer click karte hi pre-filled inquiry ke saath aapki chat me aa jaata hai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
