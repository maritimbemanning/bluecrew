"use client";

import React from "react";
import { sx } from "../lib/styles";

export function Input({
  label,
  name,
  type = "text",
  required,
  error,
  onChange,
  onBlur,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  defaultValue?: string;
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
        defaultValue={defaultValue}
        style={{ ...sx.input, ...(error ? sx.inputErr : null) }}
        onChange={onChange}
        onBlur={onBlur}
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
  description,
  error,
  onChange,
  onBlur,
}: {
  label: string;
  name: string;
  rows?: number;
  full?: boolean;
  description?: string;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}) {
  const id = `${name}-id`;
  return (
    <label style={{ ...sx.label, gridColumn: full ? "1 / -1" : undefined }} htmlFor={id}>
      <span>{label}</span>
      {description ? (
        <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{description}</span>
      ) : null}
      <textarea
        id={id}
        name={name}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        style={{ ...sx.input, height: rows * 24, ...(error ? sx.inputErr : null) }}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? (
        <div id={`${id}-err`} style={sx.errText} role="alert">
          {error}
        </div>
      ) : null}
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
  required,
  onBlur,
}: {
  label: string;
  name: string;
  options?: string[];
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
}) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={sx.label} htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        name={name}
        value={value !== undefined ? value : undefined}
        onChange={(e) => (onChange ? onChange(e.target.value) : undefined)}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        required={required}
        style={{
          ...sx.input,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
          ...(error ? sx.inputErr : null),
        }}
        onBlur={onBlur}
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
  onChange,
}: {
  label: string;
  name: string;
  accept?: string;
  error?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={{ ...sx.label, cursor: "pointer" }} htmlFor={id}>
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
        style={{ ...sx.input, cursor: "pointer" }}
        onChange={onChange}
      />
      {error ? (
        <div id={errId} style={sx.errText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}
