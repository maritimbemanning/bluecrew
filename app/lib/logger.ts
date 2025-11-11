/**
 * Logging utility
 * Provides structured logging with different levels
 * Respects NODE_ENV to control output
 */

// type LogLevel = "debug" | "info" | "warn" | "error"; // unused for now

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private isProduction = process.env.NODE_ENV === "production";
  private isTest = process.env.NODE_ENV === "test";

  /**
   * Debug logging - only shown in development
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(`🔍 [DEBUG] ${message}`, context || "");
    }
  }

  /**
   * Info logging - shown in all environments except test
   */
  info(message: string, context?: LogContext): void {
    if (!this.isTest) {
      console.log(`ℹ️  [INFO] ${message}`, context || "");
    }
  }

  /**
   * Warning logging - shown in all environments
   */
  warn(message: string, context?: LogContext): void {
    console.warn(`⚠️  [WARN] ${message}`, context || "");
  }

  /**
   * Error logging - always shown, sends to error monitoring in production
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    
    console.error(`❌ [ERROR] ${message}`, {
      error: errorObj.message,
      stack: this.isDevelopment ? errorObj.stack : undefined,
      ...context,
    });

    // In production, you could send to external service here
    // e.g., Sentry, LogRocket, DataDog, etc.
    if (this.isProduction) {
      // TODO: Send to error monitoring service
    }
  }

  /**
   * Success logging - shown in all environments except test
   */
  success(message: string, context?: LogContext): void {
    if (!this.isTest) {
      console.log(`✅ [SUCCESS] ${message}`, context || "");
    }
  }

  /**
   * API request logging
   */
  request(method: string, path: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(`→ [${method}] ${path}`, context || "");
    }
  }

  /**
   * API response logging
   */
  response(method: string, path: string, status: number, duration?: number): void {
    if (this.isDevelopment) {
      const emoji = status < 400 ? "✓" : "✗";
      const time = duration ? ` (${duration}ms)` : "";
      console.log(`${emoji} [${method}] ${path} ${status}${time}`);
    }
  }

  /**
   * Performance timing
   */
  time(label: string): void {
    if (this.isDevelopment) {
      console.time(label);
    }
  }

  /**
   * End performance timing
   */
  timeEnd(label: string): void {
    if (this.isDevelopment) {
      console.timeEnd(label);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export type for consumers
export type { LogContext };
