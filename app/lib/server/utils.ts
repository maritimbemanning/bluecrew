/**
 * Server-side Utility Functions
 * Shared helpers for API routes
 */

/**
 * Extract client IP address from request headers
 * Handles x-forwarded-for (proxy/CDN) and x-real-ip headers
 *
 * @param req - The incoming request
 * @returns The client IP address or "unknown"
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") || "unknown";
}

/**
 * Escape HTML special characters to prevent XSS
 * Use this when inserting user input into HTML templates
 *
 * @param s - The string to escape
 * @returns HTML-escaped string
 */
export function escapeHtml(s: string = ""): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Alias for escapeHtml (shorter name for templates)
 */
export const esc = escapeHtml;

/**
 * Allowed file extensions and their MIME types for uploads
 */
export const ALLOWED_FILE_TYPES = {
  pdf: {
    extensions: [".pdf"],
    mimeTypes: ["application/pdf"],
    magicBytes: [0x25, 0x50, 0x44, 0x46], // %PDF
  },
  image: {
    extensions: [".jpg", ".jpeg", ".png", ".webp"],
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    magicBytes: null, // Multiple formats
  },
} as const;

/**
 * Validate a file upload for security
 * Checks: extension, MIME type, magic bytes (for PDF), and size
 *
 * @param file - The uploaded File object
 * @param options - Validation options
 * @returns Object with isValid and error message
 */
export async function validateFileUpload(
  file: File | null,
  options: {
    required?: boolean;
    maxSizeMB?: number;
    allowedTypes?: ("pdf" | "image")[];
  } = {}
): Promise<{ isValid: boolean; error?: string }> {
  const {
    required = true,
    maxSizeMB = 10,
    allowedTypes = ["pdf"],
  } = options;

  // Check if file exists
  if (!file || typeof file === "string" || file.size === 0) {
    if (required) {
      return { isValid: false, error: "Fil er påkrevd" };
    }
    return { isValid: true };
  }

  // Check file size
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return { isValid: false, error: `Filen er for stor (maks ${maxSizeMB} MB)` };
  }

  // Get file extension
  const ext = "." + (file.name.split(".").pop()?.toLowerCase() || "");

  // Check against allowed types
  let extensionValid = false;
  let mimeValid = false;

  for (const type of allowedTypes) {
    const config = ALLOWED_FILE_TYPES[type];
    if ((config.extensions as readonly string[]).includes(ext)) {
      extensionValid = true;
    }
    if ((config.mimeTypes as readonly string[]).includes(file.type)) {
      mimeValid = true;
    }
  }

  if (!extensionValid) {
    const allowedExts = allowedTypes
      .flatMap((t) => [...ALLOWED_FILE_TYPES[t].extensions])
      .join(", ");
    return { isValid: false, error: `Ugyldig filtype. Tillatte: ${allowedExts}` };
  }

  if (!mimeValid) {
    return { isValid: false, error: "Ugyldig filformat" };
  }

  // For PDFs, validate magic bytes
  if (allowedTypes.includes("pdf") && ext === ".pdf") {
    try {
      const buffer = await file.slice(0, 8).arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const pdfMagic = ALLOWED_FILE_TYPES.pdf.magicBytes;

      const isPdf =
        bytes[0] === pdfMagic[0] &&
        bytes[1] === pdfMagic[1] &&
        bytes[2] === pdfMagic[2] &&
        bytes[3] === pdfMagic[3];

      if (!isPdf) {
        return { isValid: false, error: "Filen er ikke en gyldig PDF" };
      }
    } catch {
      return { isValid: false, error: "Kunne ikke validere filen" };
    }
  }

  return { isValid: true };
}

/**
 * Normalize email address (lowercase, trim)
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Validate Norwegian phone number format
 * Accepts: 8 digits, optionally with +47 prefix and spaces/dashes
 */
export function isValidNorwegianPhone(phone: string): boolean {
  // Remove spaces, dashes, and +47 prefix
  const cleaned = phone.replace(/[\s\-]/g, "").replace(/^\+47/, "");
  // Should be 8 digits
  return /^\d{8}$/.test(cleaned);
}
