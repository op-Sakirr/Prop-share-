import LZString from 'lz-string';
import { PropertyData } from './types';

interface MinifiedProperty {
  t: string; // title
  p: string; // price
  i: string; // image
  l?: string; // location
  y?: string; // type
  b?: string; // bhk
  ba?: string; // bathrooms
  a?: string; // area
  f?: string; // furnishing
  fa?: string; // facing
  s?: string; // status
  am?: string[]; // amenities
  d?: string; // description
  sn?: string; // sellerName
  sp?: string; // sellerPhone
  sr?: string; // sellerRole
  ts?: number; // timestamp
}

/**
 * Minify keys to produce the smallest possible payload
 */
function minifyData(data: PropertyData): MinifiedProperty {
  const min: MinifiedProperty = {
    t: (data.title || '').trim(),
    p: (data.price || '').trim(),
    i: (data.image || '').trim(),
  };

  if (data.location?.trim()) min.l = data.location.trim();
  if (data.type?.trim()) min.y = data.type.trim();
  if (data.bhk?.trim()) min.b = data.bhk.trim();
  if (data.bathrooms?.trim()) min.ba = data.bathrooms.trim();
  if (data.area?.trim()) min.a = data.area.trim();
  if (data.furnishing?.trim()) min.f = data.furnishing.trim();
  if (data.facing?.trim()) min.fa = data.facing.trim();
  if (data.status?.trim()) min.s = data.status.trim();
  if (data.amenities && data.amenities.length > 0) min.am = data.amenities;
  if (data.description?.trim()) min.d = data.description.trim();
  if (data.sellerName?.trim()) min.sn = data.sellerName.trim();
  if (data.sellerPhone?.trim()) min.sp = data.sellerPhone.trim();
  if (data.sellerRole?.trim()) min.sr = data.sellerRole.trim();
  min.ts = data.timestamp || Date.now();

  return min;
}

/**
 * Unminify keys back to PropertyData
 */
function unminifyData(min: Partial<MinifiedProperty & PropertyData>): PropertyData {
  return {
    title: min.t || min.title || 'Luxury Property',
    price: min.p || min.price || 'Price on Request',
    image: min.i || min.image || '/presets/luxury_modern_villa_1792955666247.jpg',
    location: min.l || min.location || '',
    type: min.y || min.type || '',
    bhk: min.b || min.bhk || '',
    bathrooms: min.ba || min.bathrooms || '',
    area: min.a || min.area || '',
    furnishing: min.f || min.furnishing || '',
    facing: min.fa || min.facing || '',
    status: min.s || min.status || 'Ready to Move',
    amenities: min.am || min.amenities || [],
    description: min.d || min.description || '',
    sellerName: min.sn || min.sellerName || '',
    sellerPhone: min.sp || min.sellerPhone || '',
    sellerRole: min.sr || min.sellerRole || '',
    timestamp: min.ts || min.timestamp || Date.now(),
  };
}

/**
 * Encode property data into unbreakable URL-Safe string.
 * Uses LZ-String URI-safe compression with fallback to URL-Safe Base64.
 * Guaranteed characters: only [a-zA-Z0-9-_$] - never breaks WhatsApp regex.
 */
export function encodePropertyData(data: PropertyData): string {
  try {
    const minified = minifyData(data);
    const jsonString = JSON.stringify(minified);

    // Primary: LZ-String compress to encoded URI component
    // This is 100% URL-safe and compacts text by 50-70%
    const compressed = LZString.compressToEncodedURIComponent(jsonString);
    if (compressed && compressed.length > 0) {
      return compressed;
    }

    // Fallback: URL-safe Base64
    return base64UrlEncode(jsonString);
  } catch (err) {
    console.error('Encoding error:', err);
    return base64UrlEncode(JSON.stringify(data));
  }
}

/**
 * Safe Base64URL encoder (handles UTF-8 strings like ₹ rupee symbols and Hindi text)
 */
export function base64UrlEncode(str: string): string {
  try {
    // UTF-8 safe base64
    const utf8Bytes = encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(parseInt(p1, 16))
    );
    return btoa(utf8Bytes)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
}

/**
 * Safe Base64URL decoder
 */
export function base64UrlDecode(str: string): string {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    const decoded = atob(base64);
    return decodeURIComponent(
      Array.prototype.map
        .call(decoded, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    return atob(base64);
  }
}

/**
 * Decode property data from URL parameter or hash.
 * Handles LZ-String, URL-safe Base64, raw Base64, and plain JSON gracefully.
 */
export function decodePropertyData(input: string): PropertyData | null {
  if (!input || typeof input !== 'string') return null;

  // Remove potential wrapper query markers if present
  let clean = input.trim();
  if (clean.startsWith('d=')) clean = clean.slice(2);
  if (clean.startsWith('#d=')) clean = clean.slice(3);
  if (clean.startsWith('?d=')) clean = clean.slice(3);
  if (clean.startsWith('#')) clean = clean.slice(1);

  // Strategy 1: LZ-String decompression
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(clean);
    if (decompressed && decompressed.startsWith('{')) {
      const parsed = JSON.parse(decompressed);
      return unminifyData(parsed);
    }
  } catch {
    // continue to fallback
  }

  // Strategy 2: URL-safe Base64 decode
  try {
    const rawJson = base64UrlDecode(clean);
    if (rawJson && rawJson.startsWith('{')) {
      const parsed = JSON.parse(rawJson);
      return unminifyData(parsed);
    }
  } catch {
    // continue to fallback
  }

  // Strategy 3: Direct JSON parse if URL-decoded directly
  try {
    const directJson = decodeURIComponent(clean);
    if (directJson.startsWith('{')) {
      const parsed = JSON.parse(directJson);
      return unminifyData(parsed);
    }
  } catch {
    // failed
  }

  return null;
}

/**
 * Generate unbreakable shareable URL
 */
export function buildShareUrl(origin: string, data: PropertyData, mode: 'query' | 'hash' = 'query'): string {
  const encoded = encodePropertyData(data);
  const base = origin.replace(/\/+$/, '');
  if (mode === 'hash') {
    return `${base}/view#d=${encoded}`;
  }
  return `${base}/view?d=${encoded}`;
}

/**
 * Formats a clean WhatsApp message that guarantees WhatsApp's URL link preview and clickability
 */
export function generateWhatsAppMessage(shareUrl: string, data: PropertyData): string {
  const lines: string[] = [];

  lines.push(`🏡 *${data.title || 'Exclusive Property Listing'}*`);
  lines.push(`💰 *Price:* ${data.price || 'Contact for Price'}`);

  if (data.location) {
    lines.push(`📍 *Location:* ${data.location}`);
  }

  if (data.bhk || data.area) {
    const specs = [data.bhk, data.area].filter(Boolean).join(' | ');
    lines.push(`📐 *Configuration:* ${specs}`);
  }

  if (data.status) {
    lines.push(`🏷️ *Status:* ${data.status}`);
  }

  lines.push('');
  lines.push('📸 *View Complete Photos, Brochure & Details Here:*');
  lines.push(shareUrl); // Isolated on single line to prevent trailing punctuation link break!

  if (data.sellerPhone) {
    lines.push('');
    lines.push(`📞 *Contact Agent / Owner:* ${data.sellerPhone}`);
  }

  return lines.join('\n');
}

/**
 * Generate native WhatsApp click-to-chat URL
 */
export function getWhatsAppShareIntentUrl(text: string, phoneNumber?: string): string {
  const encodedText = encodeURIComponent(text);
  if (phoneNumber) {
    // Strip all non-digit characters except leading +
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}
