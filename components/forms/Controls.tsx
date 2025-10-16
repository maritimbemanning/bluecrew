"use client";

import type { ChangeEvent } from "react";

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
};

type InputProps = BaseProps & {
  type?: string;
};

type SelectProps = BaseProps & {
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

type TextareaProps = BaseProps & {
  rows?: number;
  full?: boolean;
};

type FileInputProps = BaseProps & {
  accept?: string;
};

export const formStyles = {
  shell: {
    margin: "0 auto",
    width: "min(860px, 92vw)",
    display: "flex",
    flexDirection: "column" as const,
    gap: 24,
  },
  intro: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
  form: {
    display: "grid",
    gap: 18,
    padding: 28,
    borderRadius: 20,
    background: "#F8FAFC",
    border: "1px solid #E2E8F0",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  label: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
    fontSize: 14,
    color: "#0F172A",
    fontWeight: 600,
  },
  input: {
    borderRadius: 10,
    border: "1px solid #CBD5F5",
    padding: "10px 12px",
    fontSize: 14,
    fontWeight: 500,
    color: "#0F172A",
    background: "#fff",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },
  inputErr: {
    borderColor: "#DC2626",
    boxShadow: "0 0 0 3px rgba(220,38,38,0.12)",
  },
  errText: {
    color: "#DC2626",
    fontSize: 12,
  },
  inlineRadios: {
    display: "flex",
    gap: 16,
    fontWeight: 500,
    color: "#0F172A",
  },
  checkGrid: {
    display: "grid",
    gap: 8,
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  },
  checkItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #CBD5F5",
    background: "#fff",
    fontSize: 13,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 10,
  },
  tagItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    border: "1px solid #CBD5F5",
    padding: "6px 12px",
    fontSize: 13,
    background: "#fff",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 22px",
    borderRadius: 999,
    background: "#0B1F3A",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    border: "none",
    cursor: "pointer",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    borderRadius: 999,
    background: "#1D4ED8",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    border: "none",
    cursor: "pointer",
  },
  success: {
    padding: 20,
    borderRadius: 16,
    background: "#ECFDF5",
    color: "#047857",
    border: "1px solid #BBF7D0",
    fontWeight: 600,
    textAlign: "center" as const,
  },
};

export function Input({ label, name, type = "text", required, error }: InputProps) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={formStyles.label} htmlFor={id}>
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
        style={{ ...formStyles.input, ...(error ? formStyles.inputErr : undefined) }}
      />
      {error ? (
        <div id={errId} style={formStyles.errText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}

export function Select({
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder,
  disabled,
  required,
  error,
}: SelectProps) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <label style={formStyles.label} htmlFor={id}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <select
        id={id}
        name={name}
        value={value ?? ""}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        style={{
          ...formStyles.input,
          ...(disabled ? { opacity: 0.65 } : null),
          ...(error ? formStyles.inputErr : null),
        }}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <div id={errId} style={formStyles.errText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}

export function Textarea({ label, name, rows = 4, full, required }: TextareaProps) {
  const id = `${name}-id`;
  return (
    <label
      style={{
        ...formStyles.label,
        gridColumn: full ? "1 / -1" : undefined,
      }}
      htmlFor={id}
    >
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <textarea
        id={id}
        name={name}
        rows={rows}
        style={{ ...formStyles.input, height: rows * 24 }}
        required={required}
      />
    </label>
  );
}

export function FileInput({ label, name, accept, required, error }: FileInputProps) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={formStyles.label} htmlFor={id}>
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
        style={formStyles.input}
      />
      {error ? (
        <div id={errId} style={formStyles.errText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}
