/**
 * OCR Validation Library
 * 
 * Validates STCW certificates and other maritime documents using Tesseract.js OCR.
 * Checks for:
 * - Candidate name match
 * - STCW certificate number format
 * - Expiry dates
 * - Required keywords
 * 
 * Returns confidence score (0-100) and list of issues found.
 */

import Tesseract from 'tesseract.js';
import { createClient } from '@supabase/supabase-js';

interface OCRValidationResult {
  valid: boolean;
  confidence: number;
  issues: string[];
  extractedText?: string;
}

/**
 * Validates STCW certificate document
 * 
 * @param filePath - Path to file in Supabase Storage (e.g., "certificates/xxx.pdf")
 * @param candidateName - Full name of candidate to match against
 * @returns Validation result with confidence score and issues
 */
export async function validateSTCWDocument(
  filePath: string,
  candidateName: string
): Promise<OCRValidationResult> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Download file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('candidates-private')
      .download(filePath);

    if (downloadError || !fileData) {
      return {
        valid: false,
        confidence: 0,
        issues: ['Kunne ikke laste ned fil fra storage'],
      };
    }

    // Convert blob to buffer
    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Run OCR (supports Norwegian + English)
    const { data: { text } } = await Tesseract.recognize(
      buffer,
      'eng+nor',
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        },
      }
    );

    console.log('OCR extracted text length:', text.length);

    // Validate extracted text
    const issues: string[] = [];
    let confidence = 100;

    // Check 1: Candidate name must be present
    const nameParts = candidateName.toLowerCase().split(' ');
    const textLower = text.toLowerCase();
    
    const nameMatches = nameParts.filter(part => 
      part.length > 2 && textLower.includes(part)
    );
    
    if (nameMatches.length === 0) {
      issues.push(`Kandidatnavn "${candidateName}" ikke funnet i sertifikat`);
      confidence -= 40;
    } else if (nameMatches.length < nameParts.length) {
      issues.push(`Kun deler av navnet funnet i sertifikat`);
      confidence -= 20;
    }

    // Check 2: STCW certificate number (Norwegian format: NO-XXXX/XXXX or similar)
    const stcwPatterns = [
      /NO-\d{4}\/\d{4}/i,  // Norwegian: NO-1234/2024
      /\d{2}-\d{4}\/\d{4}/i, // Alternative: 95-1234/2024
      /STCW[:\s]+\d+/i,     // Generic: STCW: 12345
    ];
    
    const hasSTCWNumber = stcwPatterns.some(pattern => pattern.test(text));
    
    if (!hasSTCWNumber) {
      issues.push('STCW-sertifikatnummer ikke funnet eller feil format');
      confidence -= 30;
    }

    // Check 3: Expiry date (must be in the future)
    const datePatterns = [
      /(\d{1,2})[\.\/\-](\d{1,2})[\.\/\-](\d{4})/g, // DD.MM.YYYY or DD/MM/YYYY
      /(\d{4})[\.\/\-](\d{1,2})[\.\/\-](\d{1,2})/g, // YYYY-MM-DD
    ];

    let hasValidDate = false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const pattern of datePatterns) {
      const matches = [...text.matchAll(pattern)];
      
      for (const match of matches) {
        let year: number, month: number, day: number;
        
        if (match[0].startsWith('2')) { // YYYY-MM-DD format
          year = parseInt(match[1]);
          month = parseInt(match[2]);
          day = parseInt(match[3]);
        } else { // DD.MM.YYYY format
          day = parseInt(match[1]);
          month = parseInt(match[2]);
          year = parseInt(match[3]);
        }

        // Check if date is valid and in the future
        if (year >= 2024 && year <= 2040 && month >= 1 && month <= 12) {
          const expiryDate = new Date(year, month - 1, day);
          if (expiryDate > today) {
            hasValidDate = true;
            break;
          }
        }
      }
      
      if (hasValidDate) break;
    }

    if (!hasValidDate) {
      issues.push('Sertifikat utgått eller ingen gyldig fremtidig dato funnet');
      confidence -= 30;
    }

    // Check 4: Required keywords for STCW certificates
    const requiredKeywords = ['STCW', 'Certificate', 'Competency', 'Seafarer', 'Maritime'];
    const foundKeywords = requiredKeywords.filter(kw => 
      text.toLowerCase().includes(kw.toLowerCase())
    );

    if (foundKeywords.length < 2) {
      issues.push('Mangler forventede nøkkelord (STCW, Certificate, Competency, etc.)');
      confidence -= 20;
    }

    // Ensure confidence is between 0-100
    confidence = Math.max(0, Math.min(100, confidence));

    return {
      valid: confidence >= 60, // Threshold: 60% confidence required
      confidence,
      issues,
      extractedText: text.substring(0, 500), // First 500 chars for debugging
    };

  } catch (error) {
    console.error('OCR validation error:', error);
    return {
      valid: false,
      confidence: 0,
      issues: [`OCR feilet: ${error instanceof Error ? error.message : 'Ukjent feil'}`],
    };
  }
}

/**
 * Validates health certificate (optional - can be extended later)
 */
export async function validateHealthCertificate(
  filePath: string,
  candidateName: string
): Promise<OCRValidationResult> {
  // Similar implementation to STCW validation
  // Can be extended later if needed
  return {
    valid: true,
    confidence: 50,
    issues: ['Health certificate validation not yet implemented'],
  };
}
