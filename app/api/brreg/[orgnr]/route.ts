// app/api/brreg/[orgnr]/route.ts
import { NextRequest, NextResponse } from "next/server";

interface BrregEnhet {
  organisasjonsnummer: string;
  navn: string;
  forretningsadresse?: {
    adresse?: string[];
    postnummer?: string;
    poststed?: string;
    land?: string;
    kommune?: string;
  };
  postadresse?: {
    adresse?: string[];
    postnummer?: string;
    poststed?: string;
    land?: string;
    kommune?: string;
  };
  organisasjonsform?: {
    kode: string;
    beskrivelse: string;
  };
}

/**
 * GET /api/brreg/[orgnr]
 * 
 * Henter organisasjonsdata fra Brønnøysundregistrene.
 * Brukes både av kunde-skjema og admin-portal.
 * 
 * @example
 * GET /api/brreg/936463843
 * Response: { navn: "Bluecrew AS", forretningsadresse: {...}, ... }
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { orgnr: string } }
) {
  try {
    const orgnr = params.orgnr.replace(/\s/g, "");

    // Validate org number format (9 digits)
    if (!/^\d{9}$/.test(orgnr)) {
      return NextResponse.json(
        { error: "Ugyldig organisasjonsnummer. Må være 9 siffer." },
        { status: 400 }
      );
    }

    // Call Brønnøysundregistrene API
    const brregResponse = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter/${orgnr}`,
      {
        headers: {
          Accept: "application/json",
        },
        // Cache for 24 hours (org data doesn't change often)
        next: { revalidate: 86400 },
      }
    );

    if (!brregResponse.ok) {
      if (brregResponse.status === 404) {
        return NextResponse.json(
          { error: "Organisasjon ikke funnet i Enhetsregisteret." },
          { status: 404 }
        );
      }
      throw new Error(`Brreg API error: ${brregResponse.status}`);
    }

    const data: BrregEnhet = await brregResponse.json();

    // Return simplified response
    return NextResponse.json({
      orgnr: data.organisasjonsnummer,
      navn: data.navn,
      forretningsadresse: data.forretningsadresse
        ? {
            adresse: data.forretningsadresse.adresse?.[0] || "",
            postnummer: data.forretningsadresse.postnummer || "",
            poststed: data.forretningsadresse.poststed || "",
            kommune: data.forretningsadresse.kommune || "",
          }
        : null,
      postadresse: data.postadresse
        ? {
            adresse: data.postadresse.adresse?.[0] || "",
            postnummer: data.postadresse.postnummer || "",
            poststed: data.postadresse.poststed || "",
          }
        : null,
      organisasjonsform: data.organisasjonsform
        ? {
            kode: data.organisasjonsform.kode,
            beskrivelse: data.organisasjonsform.beskrivelse,
          }
        : null,
    });
  } catch (error) {
    console.error("Brreg API error:", error);
    return NextResponse.json(
      { error: "Kunne ikke hente organisasjonsdata. Prøv igjen senere." },
      { status: 500 }
    );
  }
}
