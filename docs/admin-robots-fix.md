# FIX: admin.bluecrew.no mangler robots.txt

**Problem:** admin.bluecrew.no har `noindex` meta tag, men mangler `robots.txt` fil som blokkerer crawling.

**Dette kan forårsake:** De 13 "blokkert av robots.txt" feilene i Google Search Console for bluecrew.no.

---

## 🚨 ACTION REQUIRED (bluecrew-admin repo)

### 1. Opprett `public/robots.txt` i bluecrew-admin

```txt
# Bluecrew Admin - Internal tool (no indexing)
# https://admin.bluecrew.no

User-agent: *
Disallow: /

# This is an internal admin portal - not for public indexing
```

### 2. Eller bruk Next.js app/robots.ts (anbefalt)

```typescript
// app/robots.ts (bluecrew-admin)
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/"], // Block everything - this is an internal admin tool
      },
    ],
    // NO sitemap - we don't want Google to index anything
  };
}
```

### 3. VIKTIG: Fjern sitemap fra admin-domenet

Hvis det finnes en `app/sitemap.ts` eller `app/sitemap.xml` i bluecrew-admin:
- **SLETT DEN** eller
- **Gjør den tom:**

```typescript
// app/sitemap.ts (bluecrew-admin)
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Return empty array - nothing should be indexed
  return [];
}
```

---

## ✅ Hvorfor dette er viktig:

1. **Hindrer Google fra å prøve å indeksere admin-siden**
2. **Klargjør for Google at admin.bluecrew.no er helt separat fra bluecrew.no**
3. **Løser sannsynligvis de 13 "blokkert av robots.txt" feilene**

---

## 📍 Hvor fiksen skal gjøres:

**Repo:** `maritimbemanning/bluecrew-admin`  
**Sted:** Enten `public/robots.txt` ELLER `app/robots.ts`  
**Tid:** 2 minutter  

---

## 🔍 Verifiser etter deploy:

```bash
curl https://admin.bluecrew.no/robots.txt
```

Forventet output:
```txt
User-agent: *
Disallow: /
```

---

**Status:** ⏳ TODO - må gjøres i bluecrew-admin repo  
**Prioritet:** Medium (påvirker ikke funksjonalitet, men rydder opp i Search Console)  
**Dato opprettet:** 6. november 2025
