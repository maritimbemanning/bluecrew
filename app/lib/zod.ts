// @ts-nocheck
/*
 * Minimal subset of Zod used for form validation when external packages
 * cannot be installed in the execution environment. This is intentionally
 * lightweight and only implements the pieces required by the schemas in the
 * application (string, boolean, enum, literal, array, object, optional and
 * refinement helpers).
 */

export type ZodIssue = { path: (string | number)[]; message: string };
export type SafeParseSuccess<T> = { success: true; data: T };
export type SafeParseError = { success: false; error: { issues: ZodIssue[] } };
export type SafeParseReturnType<T> = SafeParseSuccess<T> | SafeParseError;

interface ParseContext {
  path: (string | number)[];
  issues: ZodIssue[];
}

interface ParseResult<T> {
  ok: boolean;
  data?: T;
}

function addIssue(ctx: ParseContext, message: string) {
  ctx.issues.push({ path: ctx.path.slice(), message });
}

abstract class ZodType<T> {
  protected refinements: { check: (data: T) => boolean; message: string }[] = [];
  protected superRefinements: ((data: T, ctx: { addIssue: (message: string, path?: (string | number)[]) => void }) => void)[] = [];

  optional(): ZodOptional<T> {
    return new ZodOptional(this as unknown as ZodType<T>);
  }

  refine(check: (data: T) => boolean, message = "Ugyldig verdi") {
    this.refinements.push({ check, message });
    return this;
  }

  superRefine(fn: (data: T, ctx: { addIssue: (message: string, path?: (string | number)[]) => void }) => void) {
    this.superRefinements.push(fn);
    return this;
  }

  protected postProcess(data: T, ctx: ParseContext): ParseResult<T> {
    for (const ref of this.refinements) {
      if (!ref.check(data)) {
        addIssue(ctx, ref.message);
      }
    }

    for (const superRef of this.superRefinements) {
      superRef(data, {
        addIssue: (message: string, path?: (string | number)[]) => {
          ctx.issues.push({ path: path ? path.slice() : ctx.path.slice(), message });
        },
      });
    }

    return { ok: ctx.issues.length === 0, data };
  }

  safeParse(value: unknown): SafeParseReturnType<T> {
    const ctx: ParseContext = { path: [], issues: [] };
    const result = this._parse(value, ctx);

    if (!result.ok || ctx.issues.length > 0) {
      return { success: false, error: { issues: ctx.issues } };
    }

    return { success: true, data: result.data as T };
  }

  protected abstract _parse(value: unknown, ctx: ParseContext): ParseResult<T>;
}

class ZodString extends ZodType<string> {
  private minLength?: { value: number; message?: string };
  private maxLength?: { value: number; message?: string };
  private shouldTrim = false;
  private emailMessage?: string;
  private pattern?: { regex: RegExp; message?: string };

  min(value: number, message?: string) {
    this.minLength = { value, message };
    return this;
  }

  max(value: number, message?: string) {
    this.maxLength = { value, message };
    return this;
  }

  trim() {
    this.shouldTrim = true;
    return this;
  }

  email(message = "Ugyldig e-post") {
    this.emailMessage = message;
    return this;
  }

  regex(regex: RegExp, message?: string) {
    this.pattern = { regex, message };
    return this;
  }

  protected _parse(value: unknown, ctx: ParseContext): ParseResult<string> {
    if (typeof value !== "string") {
      addIssue(ctx, "Må være tekst");
      return { ok: false };
    }

    const output = this.shouldTrim ? value.trim() : value;

    if (this.minLength && output.length < this.minLength.value) {
      addIssue(ctx, this.minLength.message || `Må være minst ${this.minLength.value} tegn`);
    }

    if (this.maxLength && output.length > this.maxLength.value) {
      addIssue(ctx, this.maxLength.message || `Må være maks ${this.maxLength.value} tegn`);
    }

    if (this.pattern && !this.pattern.regex.test(output)) {
      addIssue(ctx, this.pattern.message || "Ugyldig format");
    }

    if (this.emailMessage) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(output)) {
        addIssue(ctx, this.emailMessage);
      }
    }

    return this.postProcess(output, ctx);
  }
}

class ZodBoolean extends ZodType<boolean> {
  protected _parse(value: unknown, ctx: ParseContext): ParseResult<boolean> {
    if (typeof value !== "boolean") {
      addIssue(ctx, "Må være av/på");
      return { ok: false };
    }

    return this.postProcess(value, ctx);
  }
}

class ZodLiteral<T> extends ZodType<T> {
  constructor(private literalValue: T) {
    super();
  }

  protected _parse(value: unknown, ctx: ParseContext): ParseResult<T> {
    if (value !== this.literalValue) {
      addIssue(ctx, `Må være ${this.literalValue}`);
      return { ok: false };
    }

    return this.postProcess(value as T, ctx);
  }
}

class ZodEnum<T extends [string, ...string[]]> extends ZodType<T[number]> {
  private values: Set<string>;

  constructor(private options: T, private message?: string) {
    super();
    this.values = new Set(options);
  }

  protected _parse(value: unknown, ctx: ParseContext): ParseResult<T[number]> {
    if (typeof value !== "string" || !this.values.has(value)) {
      addIssue(ctx, this.message || "Ugyldig verdi");
      return { ok: false };
    }

    return this.postProcess(value as T[number], ctx);
  }
}

class ZodArray<T> extends ZodType<T[]> {
  private minLength?: { value: number; message?: string };

  constructor(private element: ZodType<T>) {
    super();
  }

  min(value: number, message?: string) {
    this.minLength = { value, message };
    return this;
  }

  protected _parse(value: unknown, ctx: ParseContext): ParseResult<T[]> {
    if (!Array.isArray(value)) {
      addIssue(ctx, "Må være en liste");
      return { ok: false };
    }

    if (this.minLength && value.length < this.minLength.value) {
      addIssue(ctx, this.minLength.message || `Må velge minst ${this.minLength.value}`);
    }

    const results: T[] = [];

    value.forEach((item, index) => {
      const childCtx: ParseContext = { path: ctx.path.concat(index), issues: ctx.issues };
      const result = this.element._parse(item, childCtx);
      if (result.ok) {
        results.push(result.data as T);
      }
    });

    return this.postProcess(results, ctx);
  }
}

class ZodObject<T extends Record<string, unknown>> extends ZodType<T> {
  constructor(private shape: { [K in keyof T]: ZodType<T[K]> }) {
    super();
  }

  protected _parse(value: unknown, ctx: ParseContext): ParseResult<T> {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      addIssue(ctx, "Må være et objekt");
      return { ok: false };
    }

    const result: Partial<Record<keyof T, unknown>> = {};

    for (const key of Object.keys(this.shape) as (keyof T)[]) {
      const schema = this.shape[key];
      const childCtx: ParseContext = { path: ctx.path.concat(key), issues: ctx.issues };
      const parsed = schema._parse((value as Record<string, unknown>)[key as string], childCtx);
      if (parsed.ok) {
        result[key] = parsed.data as T[keyof T];
      }
    }

    return this.postProcess(result as T, ctx);
  }
}

class ZodOptional<T> extends ZodType<T | undefined> {
  constructor(private inner: ZodType<T>) {
    super();
  }

  protected _parse(value: unknown, ctx: ParseContext): ParseResult<T | undefined> {
    if (value === undefined) {
      return this.postProcess(undefined, ctx);
    }

    if (value === null) {
      return this.postProcess(undefined, ctx);
    }

    const parsed = this.inner._parse(value, ctx);
    if (!parsed.ok) {
      return { ok: false };
    }

    return this.postProcess(parsed.data as T, ctx);
  }
}

class ZodRecord<T> extends ZodType<Record<string, T>> {
  constructor(private valueSchema: ZodType<T>) {
    super();
  }

  protected _parse(value: unknown, ctx: ParseContext): ParseResult<Record<string, T>> {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      addIssue(ctx, "Må være et objekt");
      return { ok: false };
    }

    const result: Record<string, T> = {} as Record<string, T>;

    for (const key of Object.keys(value as Record<string, unknown>)) {
      const childCtx: ParseContext = { path: ctx.path.concat(key), issues: ctx.issues };
      const parsed = this.valueSchema._parse((value as Record<string, unknown>)[key], childCtx);
      if (parsed.ok) {
        result[key] = parsed.data as T;
      }
    }

    return this.postProcess(result, ctx);
  }
}

const z = {
  string: () => new ZodString(),
  boolean: () => new ZodBoolean(),
  literal: <T>(value: T) => new ZodLiteral(value),
  enum: <T extends [string, ...string[]]>(values: T, message?: string) => new ZodEnum(values, message),
  array: <T>(schema: ZodType<T>) => new ZodArray(schema),
  object: <T extends Record<string, unknown>>(shape: { [K in keyof T]: ZodType<T[K]> }) => new ZodObject<T>(shape),
  record: <T>(schema: ZodType<T>) => new ZodRecord<T>(schema),
};

export { z };
