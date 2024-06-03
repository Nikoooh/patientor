import React, { useRef } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { Diagnosis, Patient, Entry } from "../../types";
import EntryDetails from "./Entry/EntryDetails";
import HealthCheckForm from './Entry/EntryForms/HealthCheck';
import axios from 'axios';
import HospitalForm from './Entry/EntryForms/Hospital';
import OccupationalHealthCare from './Entry/EntryForms/OccupationalHealthcare';

const IndividualPatient: React.FC<{diagnoses: Diagnosis[]}> = ({diagnoses}): JSX.Element => {

  const [patient, setPatient] = useState<Patient | null>(null);
  const [type, setType] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [entryDiagnoses, setEntryDiagnoses] = useState<string[]>([]);

  const entryFormRef = useRef<HTMLFormElement>(null);

  const { id } = useParams();

  const handleNewEntry = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patient || !id) return null; 

    try {
      const baseEntry = {
        description: entryFormRef.current?.description.value,
        date: entryFormRef.current?.date.value,
        specialist: entryFormRef.current?.specialist.value,
        diagnosisCodes: entryDiagnoses,
        type: type
      };

      let newEntry;

      if (type === 'HealthCheck') {
        newEntry = {
          ...baseEntry,
          healthCheckRating: Number(entryFormRef.current?.healthRating.value)
        }; 
      }

      if (type === 'Hospital') {  
        newEntry = {
          ...baseEntry,
          discharge: {
            date: entryFormRef.current?.date.value,
            criteria: entryFormRef.current?.criteria.value,
          }
        };
      }

      if (type === 'OccupationalHealthcare') {       
        newEntry = {
          ...baseEntry,
          employerName: entryFormRef.current?.employer.value,
          sickLeave: {
            startDate: entryFormRef.current?.startDate.value,
            endDate: entryFormRef.current?.endDate.value,
          }
        };
      }

      if (newEntry === undefined) {
        setError('Unknown type');
        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }

      const request = await patients.newEntry(id, newEntry);
      setPatient({...patient, entries: patient.entries.concat(request)});        

    } catch (error) { 
      console.log(error);
      
      if (axios.isAxiosError(error)) {     
        setError(error.response?.data.error);
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setError('unknown error. Try again later');  
        setTimeout(() => {
          setError(null);
        }, 5000);     
      }
    }

  };

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
      <Typography variant='h5'>Add new Entry</Typography>
      <Box sx={{maxWidth: 260, mt: 2}}>
        <FormControl fullWidth>
        <InputLabel id='entryType-label'>Type</InputLabel>
        <Select value={type} id='entryType' labelId='entryTypelabel' label='Type' onChange={({target}) => { setType(target.value); setEntryDiagnoses([]); }}>
          <MenuItem value={'HealthCheck'}>Healthcheck</MenuItem>
          <MenuItem value={'OccupationalHealthcare'}>OccupationalHealthCare</MenuItem>
          <MenuItem value={'Hospital'}>Hospital</MenuItem>
        </Select>
        </FormControl>
      </Box>   

      <div>
        {(error !== null) ?
          <div style={{padding: '8px', backgroundColor: 'red', borderRadius: '4px', margin: '30px 0px 30px 0px'}}>
            <Typography variant='h5' sx={{color: 'whitesmoke'}}>ERROR: {error}</Typography>
          </div>
        :
          null
        }
      </div>  

      {(type === 'HealthCheck') ? 
        <HealthCheckForm setType={setType} healthCheckFormRef={entryFormRef} handleNewEntry={handleNewEntry} diagnoses={diagnoses} entryDiagnoses={entryDiagnoses} setEntryDiagnoses={setEntryDiagnoses}/> : null
      }

      {(type === 'Hospital') ?
        <HospitalForm setType={setType} healthCheckFormRef={entryFormRef} handleNewEntry={handleNewEntry} diagnoses={diagnoses} entryDiagnoses={entryDiagnoses} setEntryDiagnoses={setEntryDiagnoses}/> : null
      }

      {(type === 'OccupationalHealthcare') ?
        <OccupationalHealthCare setType={setType} healthCheckFormRef={entryFormRef} handleNewEntry={handleNewEntry} diagnoses={diagnoses} entryDiagnoses={entryDiagnoses} setEntryDiagnoses={setEntryDiagnoses}/> : null
      }

    </div>
  );
};

export default IndividualPatient;