export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string
  sickLeave: {
    startDate: string
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: {
    date: string
    criteria: string
  }
}

export type Entry = BaseEntry | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: BaseEntry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormProps = {
  setType: React.Dispatch<React.SetStateAction<string>>;
  healthCheckFormRef: React.RefObject<HTMLFormElement>;
  handleNewEntry: (e: React.FormEvent) => void;
  diagnoses: Diagnosis[];
  entryDiagnoses: string[];
  setEntryDiagnoses: React.Dispatch<React.SetStateAction<string[]>>
};