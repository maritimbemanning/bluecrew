"use client";

import { useState, useEffect } from "react";

const styles = {
  calculatorContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "2rem",
  },
  formSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: 16,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#333",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  labelIcon: {
    fontSize: "1.25rem",
  },
  select: {
    padding: "0.875rem 1rem",
    fontSize: "1rem",
    border: "2px solid #e0e0e0",
    borderRadius: 10,
    backgroundColor: "white",
    color: "#333",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem",
    backgroundColor: "#f0f7ff",
    borderRadius: 10,
    border: "2px solid #e3f2fd",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#333",
  },
  checkbox: {
    width: "1.25rem",
    height: "1.25rem",
    cursor: "pointer",
    accentColor: "#1976d2",
  },
  resultSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  resultCard: {
    padding: "2.5rem",
    background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
    borderRadius: 16,
    boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3), 0 16px 32px rgba(25, 118, 210, 0.15)",
    color: "white",
    position: "relative" as const,
    overflow: "hidden",
  },
  resultLabel: {
    fontSize: "1rem",
    fontWeight: 600,
    opacity: 0.9,
    marginBottom: "1rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  salaryAmount: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.5rem",
    marginBottom: "0.5rem",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  currencySymbol: {
    fontSize: "1.5rem",
    fontWeight: 600,
    opacity: 0.8,
  },
  amount: {
    fontSize: "3rem",
    fontWeight: "bold",
    lineHeight: 1,
  },
  monthlySalary: {
    fontSize: "1.125rem",
    opacity: 0.85,
    marginBottom: "2rem",
    fontWeight: 500,
  },
  breakdown: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    marginTop: "1.5rem",
  },
  breakdownItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.95rem",
  },
  breakdownLabel: {
    opacity: 0.85,
    fontWeight: 500,
  },
  breakdownValue: {
    fontWeight: 700,
    fontSize: "1rem",
  },
  disclaimer: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    fontSize: "0.875rem",
    lineHeight: 1.5,
    backdropFilter: "blur(10px)",
  },
  ctaBox: {
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    border: "2px dashed #e0e0e0",
    textAlign: "center" as const,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  ctaTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "0.5rem",
  },
  ctaText: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  ctaButton: {
    display: "inline-block",
    padding: "1rem 2rem",
    backgroundColor: "#1976d2",
    color: "white",
    textDecoration: "none",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: "1.05rem",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 8px rgba(25, 118, 210, 0.2)",
  },
};

type Position = "matros" | "dekksoffiser" | "styrmann" | "kaptein" | "maskinoffiser" | "akvatekniker";
type Experience = "0-2" | "2-5" | "5-10" | "10+";
type WorkType = "havbruk" | "offshore" | "servicefartoy" | "kystfart";

interface SalaryData {
  position: Position;
  baseSalary: number;
  experienceMultiplier: Record<Experience, number>;
  workTypeBonus: Record<WorkType, number>;
  certificationBonus?: number;
}

const salaryData: SalaryData[] = [
  {
    position: "matros",
    baseSalary: 450000,
    experienceMultiplier: { "0-2": 1.0, "2-5": 1.2, "5-10": 1.35, "10+": 1.5 },
    workTypeBonus: { havbruk: 0, offshore: 50000, servicefartoy: 20000, kystfart: 0 },
  },
  {
    position: "dekksoffiser",
    baseSalary: 550000,
    experienceMultiplier: { "0-2": 1.0, "2-5": 1.25, "5-10": 1.4, "10+": 1.6 },
    workTypeBonus: { havbruk: 30000, offshore: 80000, servicefartoy: 40000, kystfart: 10000 },
  },
  {
    position: "styrmann",
    baseSalary: 650000,
    experienceMultiplier: { "0-2": 1.0, "2-5": 1.3, "5-10": 1.45, "10+": 1.65 },
    workTypeBonus: { havbruk: 40000, offshore: 100000, servicefartoy: 50000, kystfart: 15000 },
  },
  {
    position: "kaptein",
    baseSalary: 750000,
    experienceMultiplier: { "0-2": 1.0, "2-5": 1.35, "5-10": 1.5, "10+": 1.7 },
    workTypeBonus: { havbruk: 50000, offshore: 120000, servicefartoy: 60000, kystfart: 20000 },
  },
  {
    position: "maskinoffiser",
    baseSalary: 600000,
    experienceMultiplier: { "0-2": 1.0, "2-5": 1.28, "5-10": 1.43, "10+": 1.62 },
    workTypeBonus: { havbruk: 35000, offshore: 90000, servicefartoy: 45000, kystfart: 12000 },
  },
  {
    position: "akvatekniker",
    baseSalary: 420000,
    experienceMultiplier: { "0-2": 1.0, "2-5": 1.24, "5-10": 1.43, "10+": 1.62 },
    workTypeBonus: { havbruk: 0, offshore: 40000, servicefartoy: 25000, kystfart: 5000 },
    certificationBonus: 80000,
  },
];

const positionLabels: Record<Position, string> = {
  matros: "Matros",
  dekksoffiser: "Dekksoffiser",
  styrmann: "Styrmann",
  kaptein: "Kaptein",
  maskinoffiser: "Maskinoffiser",
  akvatekniker: "Akvatekniker",
};

const workTypeLabels: Record<WorkType, string> = {
  havbruk: "Havbruk",
  offshore: "Offshore",
  servicefartoy: "Servicefartøy",
  kystfart: "Kystfart",
};

export function SalaryCalculator() {
  const [position, setPosition] = useState<Position>("matros");
  const [experience, setExperience] = useState<Experience>("0-2");
  const [workType, setWorkType] = useState<WorkType>("havbruk");
  const [hasCertification, setHasCertification] = useState<boolean>(false);
  const [calculatedSalary, setCalculatedSalary] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    calculateSalary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, experience, workType, hasCertification]);

  const calculateSalary = () => {
    setIsAnimating(true);
    const data = salaryData.find((d) => d.position === position);
    if (!data) return;

    const baseSalary = data.baseSalary;
    const expMultiplier = data.experienceMultiplier[experience];
    const workBonus = data.workTypeBonus[workType];
    const certBonus = position === "akvatekniker" && hasCertification ? data.certificationBonus || 0 : 0;
    const total = Math.round(baseSalary * expMultiplier + workBonus + certBonus);

    const start = calculatedSalary;
    const end = total;
    const duration = 500;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.round(start + (end - start) * easeOutCubic(progress));
      setCalculatedSalary(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    animate();
  };

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const formatSalary = (salary: number) => salary.toLocaleString("nb-NO", { maximumFractionDigits: 0 });
  const monthlySalary = Math.round(calculatedSalary / 12);

  return (
    <div style={styles.calculatorContainer}>
      <div className="calc-form" style={styles.formSection}>
        <div style={styles.inputGroup}>
          <label htmlFor="position" style={styles.label}>
            <span style={styles.labelIcon}>👔</span>
            Velg stilling
          </label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value as Position)}
            className="calc-select"
            style={styles.select}
          >
            {Object.entries(positionLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="experience" style={styles.label}>
            <span style={styles.labelIcon}>📊</span>
            Erfaring (år)
          </label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value as Experience)}
            className="calc-select"
            style={styles.select}
          >
            <option value="0-2">0-2 år (Nyutdannet)</option>
            <option value="2-5">2-5 år (Erfaren)</option>
            <option value="5-10">5-10 år (Senior)</option>
            <option value="10+">10+ år (Expert)</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="workType" style={styles.label}>
            <span style={styles.labelIcon}>🚢</span>
            Type arbeid
          </label>
          <select
            id="workType"
            value={workType}
            onChange={(e) => setWorkType(e.target.value as WorkType)}
            className="calc-select"
            style={styles.select}
          >
            {Object.entries(workTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {position === "akvatekniker" && (
          <div style={styles.inputGroup}>
            <label className="calc-checkbox-label" style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={hasCertification}
                onChange={(e) => setHasCertification(e.target.checked)}
                style={styles.checkbox}
              />
              <span style={styles.labelIcon}>📜</span>
              Fagbrev (+80 000 kr/år)
            </label>
          </div>
        )}
      </div>

      <div style={styles.resultSection}>
        <div className="calc-result-card" style={styles.resultCard}>
          <h3 style={styles.resultLabel}>Forventet årslønn</h3>
          <div style={{...styles.salaryAmount, transform: isAnimating ? "scale(1.05)" : "scale(1)"}}>
            <span style={styles.currencySymbol}>kr</span>
            <span style={styles.amount}>{formatSalary(calculatedSalary)}</span>
          </div>
          <p style={styles.monthlySalary}>≈ {formatSalary(monthlySalary)} kr per måned</p>

          <div style={styles.breakdown}>
            <div style={styles.breakdownItem}>
              <span style={styles.breakdownLabel}>Grunnlønn:</span>
              <span style={styles.breakdownValue}>{formatSalary(salaryData.find((d) => d.position === position)?.baseSalary || 0)} kr</span>
            </div>
            <div style={styles.breakdownItem}>
              <span style={styles.breakdownLabel}>Erfaringstillegg:</span>
              <span style={styles.breakdownValue}>{((salaryData.find((d) => d.position === position)?.experienceMultiplier[experience] || 1) - 1) * 100}%</span>
            </div>
            <div style={styles.breakdownItem}>
              <span style={styles.breakdownLabel}>Arbeidstype bonus:</span>
              <span style={styles.breakdownValue}>+{formatSalary(salaryData.find((d) => d.position === position)?.workTypeBonus[workType] || 0)} kr</span>
            </div>
            {position === "akvatekniker" && hasCertification && (
              <div style={styles.breakdownItem}>
                <span style={styles.breakdownLabel}>Fagbrev-tillegg:</span>
                <span style={styles.breakdownValue}>+{formatSalary(salaryData.find((d) => d.position === position)?.certificationBonus || 0)} kr</span>
              </div>
            )}
          </div>

          <div style={styles.disclaimer}>
            <p>💡 <strong>Merk:</strong> Dette er estimerte tall basert på lønnsundersøkelser og tariffavtaler fra 2024-2025. Faktisk lønn kan variere betydelig.</p>
            <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", opacity: 0.85 }}>
              📊 <strong>Kilder:</strong> SSB, NHO Sjøfarts lønnsrapport 2024, Norsk Sjøoffisersforbunds tariffavtaler.
            </p>
          </div>
        </div>

        <div className="calc-cta-box" style={styles.ctaBox}>
          <h4 style={styles.ctaTitle}>Klar for å søke?</h4>
          <p style={styles.ctaText}>Vi har oppdrag som matcher din profil og lønnsforventning.</p>
          <a href="/jobbsoker/registrer" className="calc-cta-button" style={styles.ctaButton}>Registrer deg nå →</a>
        </div>
      </div>
    </div>
  );
}
