"use client";

import { useSearchParams } from "next/navigation";
import { Input, Select, Textarea } from "../components/FormControls";
import { WORK } from "../lib/constants";
import { sx } from "../lib/styles";

export default function ClientContent() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");
  const submitted = sent === "client";

  return submitted ? (
    <div style={sx.ok} role="status">
      Takk for forespørselen! Vi tar kontakt så snart vi har gjennomgått behovet ditt.
    </div>
  ) : (
    <form action="/api/submit-client" method="POST" style={sx.form} noValidate>
      <Input label="Selskap" name="company" required />
      <Input label="Kontaktperson" name="contact" required />
      <Input label="E-post" name="c_email" type="email" required />
      <Input label="Telefon" name="c_phone" required />
      <Input label="Lokasjon/område" name="location" />
      <Select label="Type behov" name="need_type" options={Object.keys(WORK)} placeholder="Velg kategori" />
      <Textarea label="Kort beskrivelse av oppdraget" name="desc" rows={4} full />
      <div style={{ gridColumn: "1 / -1" }}>
        <button type="submit" style={sx.btnMain}>
          Send forespørsel
        </button>
      </div>
    </form>
  );
}
