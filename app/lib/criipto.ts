// Criipto Verify Configuration
export const criiptoConfig = {
  domain: process.env.NEXT_PUBLIC_CRIIPTO_DOMAIN || '', // e.g., "bluecrew.criipto.id"
  clientID: process.env.NEXT_PUBLIC_CRIIPTO_CLIENT_ID || '',
  redirectUri: typeof window !== 'undefined' 
    ? `${window.location.origin}/api/auth/criipto/callback`
    : '',
};

export interface CriiptoUser {
  sub: string; // Unique user ID
  name: string;
  ssn?: string; // Norwegian fødselsnummer (if using BankID)
  phone?: string; // Phone number (if using Vipps)
  email?: string;
  identityscheme: string; // e.g., "nobankid", "sevipps"
}
