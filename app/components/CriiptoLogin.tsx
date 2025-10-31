"use client";

interface CriiptoLoginProps {
  provider: "bankid" | "bankid-biometric" | "vipps";
  className?: string;
  children?: React.ReactNode;
}

export default function CriiptoLogin({ provider, className, children }: CriiptoLoginProps) {
  const handleLogin = () => {
    const domain = process.env.NEXT_PUBLIC_CRIIPTO_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_CRIIPTO_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/auth/criipto/callback`;
    
    console.log("Criipto login:", { domain, clientId, redirectUri }); // Debug
    
    if (!domain || !clientId) {
      console.error("Criipto credentials missing!");
      alert("Criipto er ikke konfigurert riktig. Kontakt support.");
      return;
    }
    
    // Criipto uses acr_values to select provider
    let acrValue: string;
    if (provider === "bankid") {
      acrValue = "urn:grn:authn:no:bankid";
    } else if (provider === "bankid-biometric") {
      acrValue = "urn:grn:authn:no:bankid:substantial";
    } else {
      acrValue = "urn:grn:authn:no:vipps";
    }

    const authUrl = new URL(`https://${domain}/oauth2/authorize`);
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid ssn");
    authUrl.searchParams.set("acr_values", acrValue);
    authUrl.searchParams.set("state", Math.random().toString(36).substring(7));

    console.log("Redirecting to:", authUrl.toString()); // Debug
    window.location.href = authUrl.toString();
  };

  return (
    <button type="button" onClick={handleLogin} className={className} style={{ all: "unset", cursor: "pointer" }}>
      {children || `Logg inn med ${provider === "bankid" ? "BankID" : provider === "bankid-biometric" ? "BankID Biometri" : "Vipps"}`}
    </button>
  );
}
