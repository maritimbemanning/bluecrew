"use client";

import { useState, useEffect } from "react";
import * as styles from "./SalaryCalculator.css";

type Position =
  | "matros"
  | "dekksoffiser"
  | "styrmann"
  | "kaptein"
  | "maskinoffiser"
  | "akvatekniker";
type Experience = "0-2" | "2-5" | "5-10" | "10+";
type WorkType = "havbruk" | "offshore" | "servicefartoy" | "kystfart";
type Certification = "none" | "fagbrev";

interface SalaryData {
  position: Position;
  baseSalary: number;
  experienceMultiplier: Record<Experience, number>;
  workTypeBonus: Record<WorkType, number>;
  certificationBonus?: number; // Fagbrev-tillegg (bare Akvatekniker)
}

const salaryData: SalaryData[] = [
  {
    position: "matros",
    baseSalary: 450000,
    experienceMultiplier: { "0-2": 1.0, "2-5": 1.2, "5-10": 1.35, "10+": 1.5 },
    workTypeBonus: {
      havbruk: 0,
      offshore: 50000,
      servicefartoy: 20000,
      kystfart: 0,
    },
  },
  {
    position: "dekksoffiser",
    baseSalary: 550000,
    experienceMultiplier: { "0-2": 1.0, "2-5": 1.25, "5-10": 1.4, "10+": 1.6 },
    workTypeBonus: {
      havbruk: 30000,
      offshore: 80000,
      servicefartoy: 40000,
      kystfart: 10000,
    },
  },
  {
    position: "styrmann",
    baseSalary: 650000,
    experienceMultiplier: { "0-2": 1.0, "2-5": 1.3, "5-10": 1.45, "10+": 1.65 },
    workTypeBonus: {
      havbruk: 40000,
      offshore: 100000,
      servicefartoy: 50000,
      kystfart: 15000,
    },
  },
  {
    position: "kaptein",
    baseSalary: 750000,
    experienceMultiplier: { "0-2": 1.0, "2-5": 1.35, "5-10": 1.5, "10+": 1.7 },
    workTypeBonus: {
      havbruk: 50000,
      offshore: 120000,
      servicefartoy: 60000,
      kystfart: 20000,
    },
  },
  {
    position: "maskinoffiser",
    baseSalary: 600000,
    experienceMultiplier: {
      "0-2": 1.0,
      "2-5": 1.28,
      "5-10": 1.43,
      "10+": 1.62,
    },
    workTypeBonus: {
      havbruk: 35000,
      offshore: 90000,
      servicefartoy: 45000,
      kystfart: 12000,
    },
  },
  {
    position: "akvatekniker",
    baseSalary: 420000,
    experienceMultiplier: {
      "0-2": 1.0,
      "2-5": 1.24,
      "5-10": 1.43,
      "10+": 1.62,
    },
    workTypeBonus: {
      havbruk: 0,
      offshore: 40000,
      servicefartoy: 25000,
      kystfart: 5000,
    },
    certificationBonus: 80000, // Fagbrev-tillegg
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
    const certBonus =
      position === "akvatekniker" && hasCertification
        ? data.certificationBonus || 0
        : 0;

    const total = Math.round(
      baseSalary * expMultiplier + workBonus + certBonus
    );

    // Animate the number
    const start = calculatedSalary;
    const end = total;
    const duration = 500;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.round(
        start + (end - start) * easeOutCubic(progress)
      );

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

  const formatSalary = (salary: number) => {
    return salary.toLocaleString("nb-NO", { maximumFractionDigits: 0 });
  };

  const monthlySalary = Math.round(calculatedSalary / 12);

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.formSection}>
        <div className={styles.inputGroup}>
          <label htmlFor="position" className={styles.label}>
            <span className={styles.labelIcon}>👔</span>
            Velg stilling
          </label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value as Position)}
            className={styles.select}
          >
            {Object.entries(positionLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="experience" className={styles.label}>
            <span className={styles.labelIcon}>📊</span>
            Erfaring (år)
          </label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value as Experience)}
            className={styles.select}
          >
            <option value="0-2">0-2 år (Nyutdannet)</option>
            <option value="2-5">2-5 år (Erfaren)</option>
            <option value="5-10">5-10 år (Senior)</option>
            <option value="10+">10+ år (Expert)</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="workType" className={styles.label}>
            <span className={styles.labelIcon}>🚢</span>
            Type arbeid
          </label>
          <select
            id="workType"
            value={workType}
            onChange={(e) => setWorkType(e.target.value as WorkType)}
            className={styles.select}
          >
            {Object.entries(workTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {position === "akvatekniker" && (
          <div className={styles.inputGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={hasCertification}
                onChange={(e) => setHasCertification(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.labelIcon}>📜</span>
              Fagbrev (+80 000 kr/år)
            </label>
          </div>
        )}
      </div>

      <div className={styles.resultSection}>
        <div className={styles.resultCard}>
          <h3 className={styles.resultLabel}>Forventet årslønn</h3>
          <div
            className={`${styles.salaryAmount} ${isAnimating ? styles.animating : ""}`}
          >
            <span className={styles.currencySymbol}>kr</span>
            <span className={styles.amount}>
              {formatSalary(calculatedSalary)}
            </span>
          </div>
          <p className={styles.monthlySalary}>
            ≈ {formatSalary(monthlySalary)} kr per måned
          </p>

          <div className={styles.breakdown}>
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Grunnlønn:</span>
              <span className={styles.breakdownValue}>
                {formatSalary(
                  salaryData.find((d) => d.position === position)?.baseSalary ||
                    0
                )}{" "}
                kr
              </span>
            </div>
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Erfaringstillegg:</span>
              <span className={styles.breakdownValue}>
                {((salaryData.find((d) => d.position === position)
                  ?.experienceMultiplier[experience] || 1) -
                  1) *
                  100}
                %
              </span>
            </div>
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Arbeidstype bonus:</span>
              <span className={styles.breakdownValue}>
                +
                {formatSalary(
                  salaryData.find((d) => d.position === position)
                    ?.workTypeBonus[workType] || 0
                )}{" "}
                kr
              </span>
            </div>
            {position === "akvatekniker" && hasCertification && (
              <div className={styles.breakdownItem}>
                <span className={styles.breakdownLabel}>Fagbrev-tillegg:</span>
                <span className={styles.breakdownValue}>
                  +
                  {formatSalary(
                    salaryData.find((d) => d.position === position)
                      ?.certificationBonus || 0
                  )}{" "}
                  kr
                </span>
              </div>
            )}
          </div>

          <div className={styles.disclaimer}>
            <p>
              💡 <strong>Merk:</strong> Dette er estimerte tall basert på
              bransjesnitt i 2025. Faktisk lønn kan variere basert på
              arbeidsgiver, lokasjon, turnus og individuelle forhandlinger.
            </p>
            <p
              style={{ marginTop: "0.75rem", fontSize: "0.8rem", opacity: 0.8 }}
            >
              📊 <strong>Kilder:</strong> Lønnsdata basert på SSB (Statistisk
              sentralbyrå), NHO Sjøfart, tariffavtaler og Bluecrew sine egne
              markedsdata fra 2024-2025.
            </p>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h4 className={styles.ctaTitle}>Klar for å søke?</h4>
          <p className={styles.ctaText}>
            Vi har oppdrag som matcher din profil og lønnsforventning.
          </p>
          <a href="/jobbsoker/registrer" className={styles.ctaButton}>
            Registrer deg nå →
          </a>
        </div>
      </div>
    </div>
  );
}
