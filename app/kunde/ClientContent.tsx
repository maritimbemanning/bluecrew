"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input, Select, Textarea } from "../components/FormControls";
import { WORK, COUNTIES, MUNICIPALITIES_BY_COUNTY } from "../lib/constants";
import { sx } from "../lib/styles";

export default function ClientContent() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");
  const submitted = sent === "client";
  const [county, setCounty] = useState("");
  const [municipality, setMunicipality] = useState("");
  const municipalityOptions = useMemo(
    () => (county ? MUNICIPALITIES_BY_COUNTY[county] ?? [] : []),
    [county],
  );

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
      <Select
        label="Fylke"
        name="c_county"
        options={COUNTIES}
        value={county}
        onChange={(value) => {
          setCounty(value);
          if (!value) {
            setMunicipality("");
          } else if (!(MUNICIPALITIES_BY_COUNTY[value] || []).includes(municipality)) {
            setMunicipality("");
          }
        }}
        placeholder="Velg fylke"
        required
      />
      <Select
        label="Kommune/by"
        name="c_municipality"
        options={municipalityOptions}
        value={municipality}
        onChange={setMunicipality}
        placeholder={county ? "Velg kommune" : "Velg fylke først"}
        disabled={!county}
        required={!!county}
      />
      <Select label="Type behov" name="need_type" options={Object.keys(WORK)} placeholder="Velg kategori" required />
      <Select
        label="Oppdragstype"
        name="need_duration"
        options={["Langsiktig bemanning", "Midlertidig bemanning", "Usikker / kombinasjon"]}
        placeholder="Velg ønsket varighet"
        required
      />
      <Textarea label="Kort beskrivelse av oppdraget" name="desc" rows={4} full />
      <div style={{ gridColumn: "1 / -1" }}>
        <button type="submit" style={sx.btnMain}>
          Send forespørsel
        </button>
      </div>
    </form>
  );
}
