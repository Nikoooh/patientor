import React from 'react';
import { Typography } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { Diagnosis, Patient, Entry } from "../../types";
import EntryDetails from "./Entry/EntryDetails";

const IndividualPatient: React.FC<{diagnoses: Diagnosis[]}> = ({diagnoses}): JSX.Element => {

  const [patient, setPatient] = useState<Patient>();
  
  const { id } = useParams();

  useEffect(() => {
    if (id && (typeof id === 'string')) {
      patients.getPatientData(id).then((data) => {
        setPatient(data);
      });
    } 
  }, [id]);

  
  if (!patient) return <>loading...</>;

  return (
    <div style={{marginTop: '20px'}}>
      <Typography variant="h4">{patient.name} {patient.gender === 'female' ? <FemaleIcon /> : <MaleIcon />}</Typography>
      <div style={{marginTop: '20px'}}>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
      </div>
      <div style={{marginTop: '20px'}}>
        <Typography variant="h5">Entries</Typography>
        {patient.entries.map((entry: Entry) => ( 
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />             
        ))}
      </div>
    </div>
  );
};

export default IndividualPatient;