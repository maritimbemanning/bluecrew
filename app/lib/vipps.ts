/**
 * Vipps Login Utilities
 * 
 * Helper functions for Vipps OAuth integration:
 * - Session encryption/decryption (AES-256-GCM)
 * - Fødselsnummer hashing (SHA-256, GDPR-safe)
 * - Token validation
 */

import crypto from 'crypto';

function sanitizeBaseUrl(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function getVippsApiBase(): string {
  const envBase = process.env.VIPPS_API_BASE_URL?.trim();
  if (envBase) {
    return sanitizeBaseUrl(envBase);
  }
  return 'https://api.vipps.no';
}

export interface VippsSession {
  verified: boolean;
  name: string;
  givenName: string;
  familyName: string;
  phone: string;
  birthDate: string;
  nationalIdHash: string; // SHA-256 of fødselsnummer
  vippsUserId: string; // Vipps user ID (sub)
  verifiedAt: string; // ISO timestamp
}

export interface VippsUserInfo {
  sub: string; // Vipps user ID
  name: string;
  given_name: string;
  family_name: string;
  birthdate: string; // YYYY-MM-DD
  phone_number: string; // +47XXXXXXXX
  phone_number_verified: boolean;
}

/**
 * Hash Norwegian fødselsnummer (SSN) using SHA-256
 * GDPR-compliant: We never store the actual SSN, only the hash
 * 
 * @param ssn - 11-digit fødselsnummer (e.g., "12345678901")
 * @returns SHA-256 hash as hex string
 */
export function hashNationalId(ssn: string): string {
  return crypto
    .createHash('sha256')
    .update(ssn)
    .digest('hex');
}

/**
 * Encrypt Vipps session data for secure cookie storage
 * Uses AES-256-GCM for authenticated encryption
 * 
 * @param session - VippsSession object to encrypt
 * @returns Encrypted string (base64)
 */
export function encryptSession(session: VippsSession): string {
  const secret = process.env.SESSION_SECRET;
  
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters');
  }

  // Derive 32-byte key from secret
  const key = crypto
    .createHash('sha256')
    .update(secret)
    .digest();

  // Generate random IV (12 bytes for GCM)
  const iv = crypto.randomBytes(12);

  // Encrypt session data
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  const sessionJson = JSON.stringify(session);
  let encrypted = cipher.update(sessionJson, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Get authentication tag
  const authTag = cipher.getAuthTag();

  // Combine: iv + authTag + encrypted (all hex)
  const combined = iv.toString('hex') + authTag.toString('hex') + encrypted;
  
  // Return as base64 for cookie storage
  return Buffer.from(combined, 'hex').toString('base64');
}

/**
 * Decrypt Vipps session from cookie
 * 
 * @param encryptedSession - Encrypted session string (base64)
 * @returns Decrypted VippsSession object or null if invalid
 */
export function decryptSession(encryptedSession: string): VippsSession | null {
  try {
    const secret = process.env.SESSION_SECRET;
    
    if (!secret || secret.length < 32) {
      throw new Error('SESSION_SECRET must be at least 32 characters');
    }

    // Derive key
    const key = crypto
      .createHash('sha256')
      .update(secret)
      .digest();

    // Decode from base64
    const combined = Buffer.from(encryptedSession, 'base64').toString('hex');

    // Extract components
    const iv = Buffer.from(combined.substring(0, 24), 'hex'); // 12 bytes = 24 hex chars
    const authTag = Buffer.from(combined.substring(24, 56), 'hex'); // 16 bytes = 32 hex chars
    const encrypted = combined.substring(56);

    // Decrypt
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Parse JSON
    const session = JSON.parse(decrypted) as VippsSession;

    // Validate session structure
    if (!session.verified || !session.nationalIdHash || !session.verifiedAt) {
      return null;
    }

    // Check if session is expired (24 hours)
    const verifiedAt = new Date(session.verifiedAt);
    const now = new Date();
    const hoursSinceVerification = (now.getTime() - verifiedAt.getTime()) / (1000 * 60 * 60);

    if (hoursSinceVerification > 24) {
      return null; // Session expired
    }

    return session;

  } catch (error) {
    console.error('Session decryption error:', error);
    return null;
  }
}

/**
 * Validate Vipps access token
 * 
 * @param accessToken - Vipps OAuth access token
 * @returns True if token is valid
 */
export async function validateVippsToken(accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${getVippsApiBase()}/vipps-userinfo-api/userinfo`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Vipps token validation error:', error);
    return false;
  }
}

/**
 * Get Vipps user info from access token
 * 
 * @param accessToken - Vipps OAuth access token
 * @returns User info or null if failed
 */
export async function getVippsUserInfo(accessToken: string): Promise<VippsUserInfo | null> {
  try {
    const response = await fetch(`${getVippsApiBase()}/vipps-userinfo-api/userinfo`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Ocp-Apim-Subscription-Key': process.env.VIPPS_SUBSCRIPTION_KEY!,
      },
    });

    if (!response.ok) {
      console.error('Vipps userinfo failed:', response.status, await response.text());
      return null;
    }

    return await response.json() as VippsUserInfo;

  } catch (error) {
    console.error('Get Vipps user info error:', error);
    return null;
  }
}

/**
 * Create VippsSession from Vipps user info
 * 
 * @param userInfo - User info from Vipps API
 * @returns VippsSession object ready for encryption
 */
export function createSession(userInfo: VippsUserInfo): VippsSession {
  return {
    verified: true,
    name: userInfo.name,
    givenName: userInfo.given_name,
    familyName: userInfo.family_name,
    phone: userInfo.phone_number,
    birthDate: userInfo.birthdate,
    nationalIdHash: hashNationalId(userInfo.sub), // Vipps sub contains fødselsnummer
    vippsUserId: userInfo.sub,
    verifiedAt: new Date().toISOString(),
  };
}
