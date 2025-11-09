import { CandidateForm } from "../../CandidateForm";

export const dynamic = "force-dynamic"; // Disable all caching

export const metadata = {
  title: "Registrer deg | Bluecrew",
  description: "Fyll ut jobbsøkerprofil for maritime oppdrag",
  alternates: {
    canonical: "/jobbsoker/registrer/skjema",
  },
};

export default function CandidateFormPage() {
  return <CandidateForm />;
}

