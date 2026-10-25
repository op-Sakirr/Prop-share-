'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, Copy, Check, QrCode as QrIcon } from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function QrModal({ isOpen, onClose, url, title }: QrModalProps) {
  const [qrSrc, setQrSrc] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        width: 360,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((res) => setQrSrc(res))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!qrSrc) return;
    const a = document.createElement('a');
    a.href = qrSrc;
    a.download = `propshare-qr-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
            <QrIcon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Property QR Code</h3>
        </div>
        <p className="text-xs text-slate-600 mb-4 line-clamp-1">
          Scan with any mobile camera to view: <span className="font-semibold">{title}</span>
        </p>

        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
          {qrSrc ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={qrSrc} alt="Property QR code" className="w-56 h-56 rounded-lg bg-white p-2 shadow-sm" />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-xs text-slate-400">
              Generating QR Code...
            </div>
          )}
          <span className="text-[11px] text-slate-600 mt-2 font-medium">100% Offline Compatible · No Server Needed</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors min-h-[44px]"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied Link' : 'Copy Link'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors min-h-[44px]"
          >
            <Download className="h-4 w-4" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
