/**
 * Environment variable validation
 * Run this at app startup to ensure all required env vars are present
 */

type EnvVar = {
  name: string;
  required: boolean;
  description: string;
};

const ENV_VARS: EnvVar[] = [
  // Supabase
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    required: true,
    description: "Supabase project URL",
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    required: true,
    description: "Supabase anonymous key",
  },
  {
    name: "SUPABASE_SERVICE_ROLE_KEY",
    required: true,
    description: "Supabase service role key (server-side only)",
  },

  // Redis (for rate limiting)
  {
    name: "UPSTASH_REDIS_REST_URL",
    required: true,
    description: "Upstash Redis REST URL",
  },
  {
    name: "UPSTASH_REDIS_REST_TOKEN",
    required: true,
    description: "Upstash Redis REST token",
  },

  // Email
  {
    name: "RESEND_API_KEY",
    required: true,
    description: "Resend API key for sending emails",
  },
  {
    name: "RESEND_FROM_EMAIL",
    required: true,
    description: "From email address for Resend",
  },
  {
    name: "RESEND_TO_EMAILS",
    required: true,
    description: "Comma-separated list of recipient emails",
  },

  // Vipps (optional for MVP, but required for production)
  {
    name: "VIPPS_CLIENT_ID",
    required: false,
    description: "Vipps OAuth client ID",
  },
  {
    name: "VIPPS_CLIENT_SECRET",
    required: false,
    description: "Vipps OAuth client secret",
  },
  {
    name: "VIPPS_SUBSCRIPTION_KEY",
    required: false,
    description: "Vipps API subscription key",
  },
  {
    name: "VIPPS_API_BASE_URL",
    required: false,
    description: "Vipps API base URL",
  },
  {
    name: "VIPPS_REDIRECT_URI",
    required: false,
    description: "Vipps OAuth redirect URI",
  },

  // Analytics (optional)
  {
    name: "NEXT_PUBLIC_PLAUSIBLE_DOMAIN",
    required: false,
    description: "Plausible Analytics domain",
  },
  // CSRF Protection
  {
    name: "CSRF_SECRET",
    required: false,
    description: "Secret for CSRF token generation (recommended for production)",
  },
];

class EnvironmentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnvironmentError";
  }
}

/**
 * Validates that all required environment variables are set
 * Throws an error if any required variables are missing
 */
export function validateEnvironment(): void {
  const missing: EnvVar[] = [];
  const warnings: EnvVar[] = [];

  for (const envVar of ENV_VARS) {
    const value = process.env[envVar.name];

    if (!value || value.trim() === "") {
      if (envVar.required) {
        missing.push(envVar);
      } else {
        warnings.push(envVar);
      }
    }
  }

  if (missing.length > 0) {
    const errorMessage = [
      "❌ Missing required environment variables:",
      "",
      ...missing.map(
        (v) => `  - ${v.name}: ${v.description}`
      ),
      "",
      "Please set these variables in your .env.local file or deployment environment.",
    ].join("\n");

    throw new EnvironmentError(errorMessage);
  }

  if (warnings.length > 0 && process.env.NODE_ENV !== "test") {
    console.warn("⚠️  Optional environment variables not set:");
    for (const v of warnings) {
      console.warn(`  - ${v.name}: ${v.description}`);
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("✅ Environment variables validated successfully");
  }
}

/**
 * Gets an environment variable with type safety
 * Throws an error if the variable is required but not set
 */
export function getEnv(name: string, required = true): string {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    if (required) {
      throw new EnvironmentError(
        `Environment variable ${name} is required but not set`
      );
    }
    return "";
  }

  return value;
}

/**
 * Gets a public environment variable (NEXT_PUBLIC_*)
 * These are safe to use on the client side
 */
export function getPublicEnv(name: string, required = true): string {
  if (!name.startsWith("NEXT_PUBLIC_")) {
    throw new Error(
      `getPublicEnv can only be used with NEXT_PUBLIC_* variables. Got: ${name}`
    );
  }
  return getEnv(name, required);
}
