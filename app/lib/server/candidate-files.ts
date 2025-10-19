import { createHash } from "node:crypto";

const CV_PREFIX = "cv";
const CERT_PREFIX = "cert";

export function createCandidateStorageBase(email: string, submittedAt: string) {
  return createHash("sha256").update(`${email.toLowerCase()}|${submittedAt}`).digest("hex");
}

export function buildCvPath(base: string) {
  return `${CV_PREFIX}/${base}.pdf`;
}

export function buildCertificatePath(base: string, extension: string) {
  const normalized = extension.startsWith(".") ? extension.toLowerCase() : `.${extension.toLowerCase()}`;
  return `${CERT_PREFIX}/${base}/certificate${normalized}`;
}

export function getCertificatePrefix(base: string) {
  return `${CERT_PREFIX}/${base}/`;
}

export function extractExtension(filename: string) {
  const lower = filename.toLowerCase();
  const match = lower.match(/\.(pdf|zip|doc|docx)$/);
  return match ? match[0] : null;
}
