"use client";

import React from "react";
import styles from "./form-controls.module.css";

const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

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
    <label className={styles.fieldLabel} htmlFor={id}>
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
        className={cx(styles.fieldInput, error && styles.fieldInputError)}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? (
        <div id={errId} className={styles.errorText} role="alert">
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
    <label className={cx(styles.fieldLabel, full && styles.fieldLabelFull)} htmlFor={id}>
      <span>{label}</span>
      {description ? (
        <span className={styles.inlineDescription}>{description}</span>
      ) : null}
      <textarea
        id={id}
        name={name}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cx(styles.fieldInput, error && styles.fieldInputError)}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? (
        <div id={`${id}-err`} className={styles.errorText} role="alert">
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
    <label className={styles.fieldLabel} htmlFor={id}>
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
        className={cx(styles.fieldInput, error && styles.fieldInputError)}
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
        <div id={errId} className={styles.errorText} role="alert">
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
    <label className={styles.fieldLabel} htmlFor={id}>
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
        className={cx(styles.fieldInput, styles.fileInput, error && styles.fieldInputError)}
        onChange={onChange}
      />
      {error ? (
        <div id={errId} className={styles.errorText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}
