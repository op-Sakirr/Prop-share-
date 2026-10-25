'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PropertyData, COMMON_AMENITIES, PROPERTY_TYPES, BHK_OPTIONS, FURNISHING_OPTIONS, STATUS_OPTIONS } from '@/lib/types';
import { PRESET_PROPERTIES } from '@/lib/presets';
import {
  encodePropertyData,
  buildShareUrl,
  generateWhatsAppMessage,
  getWhatsAppShareIntentUrl,
} from '@/lib/encoder';
import LivePreviewCard from './LivePreviewCard';
import QrModal from './QrModal';
import {
  Sparkles,
  Link as LinkIcon,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  QrCode,
  Image as ImageIcon,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Building,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PropertyForm() {
  const [formData, setFormData] = useState<PropertyData>(() => PRESET_PROPERTIES[0].defaultData);
  const [imageTab, setImageTab] = useState<'presets' | 'url' | 'upload'>('presets');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadWarning, setUploadWarning] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [linkMode, setLinkMode] = useState<'query' | 'hash'>('query');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const origin = React.useSyncExternalStore(
    () => () => {},
    () => (typeof window !== 'undefined' ? window.location.origin : ''),
    () => ''
  );

  const shareUrl = origin ? buildShareUrl(origin, formData, linkMode) : '';
  const encodedLength = origin ? encodePropertyData(formData).length : 0;
  const whatsAppMessage = shareUrl ? generateWhatsAppMessage(shareUrl, formData) : '';
  const whatsAppShareIntent = shareUrl ? getWhatsAppShareIntentUrl(whatsAppMessage) : '';

  const handleInputChange = (field: keyof PropertyData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleAmenity = (item: string) => {
    setFormData((prev) => {
      const current = prev.amenities || [];
      if (current.includes(item)) {
        return { ...prev, amenities: current.filter((a) => a !== item) };
      } else {
        return { ...prev, amenities: [...current, item] };
      }
    });
  };

  const loadPreset = (presetId: string) => {
    const found = PRESET_PROPERTIES.find((p) => p.id === presetId);
    if (found) {
      setFormData(found.defaultData);
      setCustomImageUrl('');
      setUploadWarning(null);
    }
  };

  // Image Upload with client-side canvas compression to WebP to keep URL compact
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WebP).');
      return;
    }

    setUploadLoading(true);
    setUploadWarning(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Downscale to max 600px width/height and compress to WebP at 0.5 quality
        const canvas = document.createElement('canvas');
        const MAX_DIM = 550;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setUploadLoading(false);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use webp or jpeg
        const compressedDataUrl = canvas.toDataURL('image/webp', 0.5);

        handleInputChange('image', compressedDataUrl);
        setUploadLoading(false);

        if (compressedDataUrl.length > 20000) {
          setUploadWarning(
            'Note: Direct photo uploads increase the URL length. A hosted image URL or preset keeps links super compact for WhatsApp.'
          );
        }
      };
      img.onerror = () => {
        setUploadLoading(false);
        alert('Failed to process image.');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    } catch {}
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyMessageToClipboard = () => {
    navigator.clipboard.writeText(whatsAppMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Form Column (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Preset quick picker */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">1-Click Luxury Demo Presets</h3>
            </div>
            <span className="text-xs text-slate-600">Select any preset to auto-fill form</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_PROPERTIES.map((p) => {
              const isSelected = formData.title === p.defaultData.title;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => loadPreset(p.id)}
                  className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="text-xs font-bold truncate w-full">{p.name}</span>
                  <span className="text-[10px] text-slate-600 mt-0.5">{p.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Form */}
        <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="h-5 w-5 text-emerald-600" />
              <span>Property Information (विवरण)</span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Fill in your property details. Everything gets encoded directly into the WhatsApp link with zero database.
            </p>
          </div>

          {/* Section 1: Core 3 Fields (Title, Price, Photo) */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
                Property Name / Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g. Sunset Bay Modern 4BHK Villa"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="price" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Price / Asking Rate <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-1">
                  {['₹ 85 Lakh', '₹ 2.45 Crore', '₹ 60,000 / mo'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleInputChange('price', tag)}
                      className="text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <DollarSign className="h-4 w-4" />
                </div>
                <input
                  id="price"
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="e.g. ₹ 4.85 Crore or ₹ 75 Lakh"
                  className="w-full rounded-xl border border-slate-300 pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none font-medium"
                />
              </div>
            </div>

            {/* Photo Selection Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
                Property Photo (तस्वीर) <span className="text-rose-500">*</span>
              </label>

              {/* Tab selector */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg mb-3">
                <button
                  type="button"
                  onClick={() => setImageTab('presets')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all text-center ${
                    imageTab === 'presets' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Curated Luxury Photos
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all text-center ${
                    imageTab === 'url' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Web Image URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all text-center ${
                    imageTab === 'upload' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Upload File
                </button>
              </div>

              {/* Tab 1: Presets */}
              {imageTab === 'presets' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_PROPERTIES.map((p) => {
                    const isSelected = formData.image === p.image;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleInputChange('image', p.image)}
                        className={`group relative aspect-[4/3] overflow-hidden rounded-xl border text-left transition-all ${
                          isSelected ? 'ring-2 ring-emerald-600 border-transparent' : 'border-slate-200 opacity-80 hover:opacity-100'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-bold text-white line-clamp-1">
                          {p.category}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 p-0.5 rounded-full bg-emerald-600 text-white">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: URL */}
              {imageTab === 'url' && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      placeholder="Paste image link (https://images.unsplash.com/...)"
                      className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customImageUrl.trim()) {
                          handleInputChange('image', customImageUrl.trim());
                        }
                      }}
                      className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Works with any public image URL (Unsplash, Imgur, Cloudinary, property website).
                  </p>
                </div>
              )}

              {/* Tab 3: Upload */}
              {imageTab === 'upload' && (
                <div className="space-y-2">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 rounded-xl hover:border-emerald-600 cursor-pointer bg-slate-50 transition-colors"
                  >
                    <Upload className="h-6 w-6 text-emerald-600 mb-1" />
                    <span className="text-xs font-bold text-slate-800">Choose photo from phone or computer</span>
                    <span className="text-[11px] text-slate-600 mt-0.5">Auto-optimizes into compressed WebP</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  {uploadLoading && (
                    <div className="flex items-center gap-2 text-xs text-emerald-700">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Optimizing image for WhatsApp link...</span>
                    </div>
                  )}
                  {uploadWarning && (
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                      <span>{uploadWarning}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Location, Layout & Specifications */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
                  Location / Area (शहर / इलाका)
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g. Bandra West, Mumbai"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
              </div>

              {/* Property Type */}
              <div>
                <label htmlFor="type" className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5">
                  Property Category
                </label>
                <select
                  id="type"
                  value={formData.type || ''}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none bg-white"
                >
                  <option value="">Select Property Type</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* BHK */}
              <div>
                <label htmlFor="bhk" className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                  Bedrooms
                </label>
                <select
                  id="bhk"
                  value={formData.bhk || ''}
                  onChange={(e) => handleInputChange('bhk', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs text-slate-900 focus:border-emerald-600 outline-none bg-white"
                >
                  <option value="">Any</option>
                  {BHK_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label htmlFor="bathrooms" className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                  Bathrooms
                </label>
                <input
                  id="bathrooms"
                  type="text"
                  value={formData.bathrooms || ''}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  placeholder="e.g. 3 Baths"
                  className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs text-slate-900 focus:border-emerald-600 outline-none"
                />
              </div>

              {/* Carpet Area */}
              <div>
                <label htmlFor="area" className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                  Carpet Area
                </label>
                <input
                  id="area"
                  type="text"
                  value={formData.area || ''}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  placeholder="e.g. 2,150 sq.ft"
                  className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs text-slate-900 focus:border-emerald-600 outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                  Possession
                </label>
                <select
                  id="status"
                  value={formData.status || ''}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs text-slate-900 focus:border-emerald-600 outline-none bg-white"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Collapsible Advanced Details (Amenities, Furnishing, Seller Contact, Description) */}
          <div className="border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full py-2 text-xs font-bold text-slate-800 hover:text-emerald-700 uppercase tracking-wider"
            >
              <span>Seller Contact, Amenities & Description (अतिरिक्त जानकारी)</span>
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-4">
                {/* Seller / Contact Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sellerName" className="block text-xs font-semibold text-slate-800 mb-1">
                      Seller / Agent Name
                    </label>
                    <input
                      id="sellerName"
                      type="text"
                      value={formData.sellerName || ''}
                      onChange={(e) => handleInputChange('sellerName', e.target.value)}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-600 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="sellerPhone" className="block text-xs font-semibold text-slate-800 mb-1">
                      WhatsApp Phone Number (for inquiries)
                    </label>
                    <input
                      id="sellerPhone"
                      type="tel"
                      value={formData.sellerPhone || ''}
                      onChange={(e) => handleInputChange('sellerPhone', e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Furnishing */}
                  <div>
                    <label htmlFor="furnishing" className="block text-xs font-semibold text-slate-800 mb-1">
                      Furnishing Status
                    </label>
                    <select
                      id="furnishing"
                      value={formData.furnishing || ''}
                      onChange={(e) => handleInputChange('furnishing', e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-emerald-600 outline-none bg-white"
                    >
                      <option value="">Select Furnishing</option>
                      {FURNISHING_OPTIONS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Facing */}
                  <div>
                    <label htmlFor="facing" className="block text-xs font-semibold text-slate-800 mb-1">
                      Facing Direction
                    </label>
                    <input
                      id="facing"
                      type="text"
                      value={formData.facing || ''}
                      onChange={(e) => handleInputChange('facing', e.target.value)}
                      placeholder="e.g. North-East / Sea Facing"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-600 outline-none"
                    />
                  </div>
                </div>

                {/* Amenities Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-2">
                    Key Amenities (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_AMENITIES.map((item) => {
                      const isSelected = (formData.amenities || []).includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleAmenity(item)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {isSelected && '✓ '}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-xs font-semibold text-slate-800 mb-1">
                    Property Description & Highlights
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe prime advantages, nearby landmarks, metro proximity, Italian marble finishes, etc."
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 outline-none resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        </form>

        {/* WhatsApp Link Generator Output Card */}
        <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/50 via-white to-slate-50 p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                <LinkIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Your Unbreakable WhatsApp Link</h3>
                <span className="text-xs text-emerald-800 font-medium">
                  Zero Database · Encoded Directly in URL · Never Expires
                </span>
              </div>
            </div>

            {/* URL Mode Toggle */}
            <div className="flex items-center gap-1 text-[11px] bg-slate-200/80 p-0.5 rounded-lg">
              <button
                type="button"
                onClick={() => setLinkMode('query')}
                className={`px-2 py-0.5 rounded font-medium ${
                  linkMode === 'query' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
                title="Use clean query format (?d=...)"
              >
                Standard (?d=)
              </button>
              <button
                type="button"
                onClick={() => setLinkMode('hash')}
                className={`px-2 py-0.5 rounded font-medium ${
                  linkMode === 'hash' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
                title="Use zero-server hash format (#d=...)"
              >
                Hash (#d=)
              </button>
            </div>
          </div>

          {/* Generated URL Box */}
          <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-300 p-2 shadow-xs">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-2 text-xs font-mono text-slate-700 outline-none truncate"
            />
            <button
              type="button"
              onClick={copyLinkToClipboard}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap min-h-[38px]"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          {/* WhatsApp Unbreakable Guarantee Indicators */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 pt-1 border-t border-slate-200/80">
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>WhatsApp-Safe: Clean URI-safe characters only (no spaces, no unescaped slashes)</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              Payload: {encodedLength} chars
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <a
              href={whatsAppShareIntent}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white hover:bg-emerald-500 transition-all shadow-md shadow-emerald-700/20 min-h-[46px]"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Share Directly to WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors min-h-[46px]"
            >
              <QrCode className="h-4 w-4 text-emerald-600" />
              <span>QR Code</span>
            </button>
          </div>

          {/* Pre-formatted WhatsApp Message Preview Box */}
          <div className="rounded-xl bg-slate-100/90 p-3.5 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                WhatsApp Message Template Preview
              </span>
              <button
                type="button"
                onClick={copyMessageToClipboard}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                {copiedMsg ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedMsg ? 'Copied Message' : 'Copy Full Message'}</span>
              </button>
            </div>
            <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap bg-white p-3 rounded-lg border border-slate-200 max-h-32 overflow-y-auto">
              {whatsAppMessage}
            </pre>
          </div>
        </div>
      </div>

      {/* Right Column: Live Interactive Mockup (5 cols) */}
      <div className="lg:col-span-5 sticky top-20 space-y-4">
        <LivePreviewCard
          data={formData}
          onOpenFullscreen={() => {
            if (shareUrl) {
              window.open(shareUrl, '_blank');
            }
          }}
        />

        {/* Quick Help Card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600 space-y-2">
          <h4 className="font-bold text-slate-900 text-sm">💡 Kyu WhatsApp par link break nahi hota?</h4>
          <p className="leading-relaxed">
            Standard Base64 me <code className="text-emerald-700 font-mono">+</code>,{' '}
            <code className="text-emerald-700 font-mono">/</code>, aur{' '}
            <code className="text-emerald-700 font-mono">=</code> symbols hote hain jo WhatsApp ke link detector ko tod dete hain.
          </p>
          <p className="leading-relaxed">
            Hum <strong>LZ-String URI-safe algorithm</strong> use karte hain jo saare special characters ko filter karke
            sirf WhatsApp-friendly URL banata hai. Saath hi message me link ko nayi line par rakha jata hai taaki text formatting usse touch na kare.
          </p>
        </div>
      </div>

      {/* QR Modal */}
      <QrModal isOpen={qrOpen} onClose={() => setQrOpen(false)} url={shareUrl} title={formData.title} />
    </div>
  );
}
