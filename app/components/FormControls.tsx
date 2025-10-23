"use client";

import React from "react";
import classes from "./FormControls.module.css";

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
    <label className={classes.field} htmlFor={id}>
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
        className={`${classes.input} ${error ? classes.inputError : ""}`}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? (
        <div id={errId} className={classes.errorText} role="alert">
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
    <label className={`${classes.field} ${full ? classes.fieldFull : ""}`} htmlFor={id}>
      <span>{label}</span>
      {description ? <span className={classes.fieldDescription}>{description}</span> : null}
      <textarea
        id={id}
        name={name}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${classes.input} ${classes.textarea} ${error ? classes.inputError : ""}`}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? (
        <div id={`${id}-err`} className={classes.errorText} role="alert">
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
    <label className={classes.field} htmlFor={id}>
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
        className={`${classes.input} ${error ? classes.inputError : ""}`}
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
        <div id={errId} className={classes.errorText} role="alert">
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
    <label className={`${classes.field} ${classes.fieldClickable}`} htmlFor={id}>
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
        className={classes.input}
        onChange={onChange}
      />
      {error ? (
        <div id={errId} className={classes.errorText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}
