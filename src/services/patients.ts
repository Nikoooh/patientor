import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatientData = async (id: string) => {
  
  const { data } = await axios.get(`${apiBaseUrl}/patients/${id}`);
  return data;
  
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/diagnoses`);
  return data;
};

const newEntry = async (id: string | undefined, object: EntryWithoutId) => {
  
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object); 
  return data;
  
};

export default {
  getAll, getPatientData, create, getDiagnoses, newEntry
};

