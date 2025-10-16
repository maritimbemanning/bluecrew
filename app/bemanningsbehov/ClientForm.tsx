"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Input, Select, Textarea, formStyles } from "@/components/forms/Controls";

const NEED_TYPES = [
  "Servicefartøy mannskap",
  "Havbruk",
  "Fiskeri",
  "Midlertidig",
  "Annet",
];

function ClientForm() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");

  if (sent === "client") {
    return <div style={formStyles.success}>Takk! Vi tar kontakt innen kort tid.</div>;
  }

  return (
    <form action="/api/submit-client" method="POST" style={formStyles.form} noValidate>
      <Input label="Selskap" name="company" required />
      <Input label="Kontaktperson" name="contact" required />
      <Input label="E-post" name="c_email" type="email" required />
      <Input label="Telefon" name="c_phone" required />
      <Input label="Lokasjon/område" name="location" />
      <Select label="Type behov" name="need_type" options={NEED_TYPES} />
      <Textarea
        label="Kort beskrivelse av oppdraget"
        name="desc"
        rows={5}
        full
        required
      />
      <div style={{ gridColumn: "1 / -1" }}>
        <button type="submit" style={formStyles.secondaryButton}>
          Send forespørsel
        </button>
      </div>
    </form>
  );
}

export default function ClientFormShell() {
  return (
    <Suspense fallback={<div style={{ height: 48 }} />}>
      <ClientForm />
    </Suspense>
  );
}
