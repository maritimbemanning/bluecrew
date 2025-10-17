"use client";

import React from "react";
import { sx } from "../lib/styles";

export function Input({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={sx.label} htmlFor={id}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        style={{ ...sx.input, ...(error ? sx.inputErr : null) }}
      />
      {error ? (
        <div id={errId} style={sx.errText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}

export function Textarea({
  label,
  name,
  rows = 4,
  full = false,
}: {
  label: string;
  name: string;
  rows?: number;
  full?: boolean;
}) {
  const id = `${name}-id`;
  return (
    <label style={{ ...sx.label, gridColumn: full ? "1 / -1" : undefined }} htmlFor={id}>
      <span>{label}</span>
      <textarea id={id} name={name} rows={rows} style={{ ...sx.input, height: rows * 24 }} />
    </label>
  );
}

export function Select({
  label,
  name,
  options = [] as string[],
  value,
  onChange,
  placeholder,
  disabled,
  error,
}: {
  label: string;
  name: string;
  options?: string[];
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={sx.label} htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        name={name}
        value={value ?? ""}
        onChange={(e) => (onChange ? onChange(e.target.value) : undefined)}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        style={{ ...sx.input, opacity: disabled ? 0.6 : 1, ...(error ? sx.inputErr : null) }}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
      {error ? (
        <div id={errId} style={sx.errText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}

export function FileInput({
  label,
  name,
  accept,
  error,
  required,
}: {
  label: string;
  name: string;
  accept?: string;
  error?: string;
  required?: boolean;
}) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={sx.label} htmlFor={id}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        style={sx.input}
      />
      {error ? (
        <div id={errId} style={sx.errText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}
