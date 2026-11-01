"use client";

import { useState } from "react";
import type { FormField } from "@/lib/copy";

type Text = {
  button: string;
  note: string;
  success: string;
  selectPrompt: string;
  optional: string;
  requiredError: string;
  emailError: string;
  phoneError: string;
  summary: string;
};

const inputClass =
  "t-body w-full min-h-12 rounded-[2px] border border-text/30 bg-paper px-3 py-2 text-text aria-[invalid=true]:border-brand-maroon aria-[invalid=true]:border-2";

export default function LeadForm({ fields, text }: { fields: FormField[]; text: Text }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentTo, setSentTo] = useState<string | null>(null);

  const check = (field: FormField, value: string) => {
    const v = value.trim();
    if (field.required && !v) return text.requiredError;
    if (v && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return text.emailError;
    if (v && field.type === "phone" && v.replace(/\D/g, "").length < 10) return text.phoneError;
    return "";
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const field of fields) {
      const message = check(field, String(data.get(field.name) ?? ""));
      if (message) next[field.name] = message;
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    // TODO: send `data` to the client's form handler here. Nothing is sent anywhere yet.
    setSentTo(String(data.get(fields[0].name)).trim().split(/\s+/)[0]);
  };

  if (sentTo !== null) {
    return (
      <p role="status" className="t-body-lg py-16">
        {text.success.replace("[first name]", sentTo)}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-4 gap-y-5 md:grid-cols-2">
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="t-small font-medium text-brand-maroon md:col-span-2">
          {text.summary}
        </p>
      )}
      {fields.map((field) => {
        const error = errors[field.name];
        const id = `f-${field.name}`;
        const shared = {
          id,
          name: field.name,
          required: field.required,
          "aria-required": field.required,
          "aria-invalid": !!error,
          "aria-describedby": error ? `${id}-e` : undefined,
          // Clear an error while typing, not on blur: a blur-time layout shift moves the submit button mid-click.
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            if (errors[field.name] && !check(field, e.target.value)) {
              const { [field.name]: _cleared, ...rest } = errors;
              setErrors(rest);
            }
          },
        };
        const wide = field.type === "long text" || field.name === "current-situation";
        return (
          <div key={field.name} className={wide ? "md:col-span-2" : ""}>
            <label htmlFor={id} className="t-small mb-1.5 block font-medium">
              {field.label}
              {field.required ? (
                <span aria-hidden="true" className="text-brand-maroon">
                  {" "}
                  *
                </span>
              ) : (
                <span className="font-normal text-text-muted"> {text.optional}</span>
              )}
            </label>
            {field.type === "dropdown" ? (
              <select {...shared} defaultValue="" className={inputClass}>
                <option value="">{text.selectPrompt}</option>
                {field.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : field.type === "long text" ? (
              <textarea {...shared} rows={3} className={inputClass} />
            ) : (
              <input
                {...shared}
                type={field.type === "phone" ? "tel" : field.type}
                autoComplete={{ "full-name": "name", email: "email", phone: "tel" }[field.name]}
                min={field.type === "number" ? 0 : undefined}
                className={inputClass}
              />
            )}
            {error && (
              <p id={`${id}-e`} className="t-small mt-1 text-brand-maroon">
                {error}
              </p>
            )}
          </div>
        );
      })}
      <div className="md:col-span-2">
        <button type="submit" className="btn btn-primary w-full">
          {text.button}
        </button>
        <p className="t-small mt-3 text-text-muted">{text.note}</p>
      </div>
    </form>
  );
}
