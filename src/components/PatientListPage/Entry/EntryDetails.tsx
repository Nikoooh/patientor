import React from 'react';
import { Diagnosis, Entry } from "../../../types";
import { Typography } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';

const EntryDetails: React.FC<{entry: Entry, diagnoses: Diagnosis[]}> = ({entry, diagnoses}): JSX.Element => {

  let icon: JSX.Element | null;

  if ('type' in entry && typeof entry.type === 'string') {
    switch (entry?.type) {
      case "Hospital":
        icon = <LocalHospitalIcon />;
        break;
      case "HealthCheck":
        icon = <FavoriteIcon />;
        break;
      case "OccupationalHealthcare":
        icon = <WorkIcon />;
        break;
      default: 
        icon = null;
    }
  } else {
    icon = null;
  }

  return (
    <div style={{marginTop: '20px'}}>
      <Typography> {entry.date} {entry.description} {icon} </Typography>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          const diagnosisName = diagnoses.find((x) => x.code === code);
          
          return (
            <li key={code}>
              {code} {diagnosisName ? diagnosisName.name : ''}
            </li>
          );                
        })}
      </ul>
    </div>
  );
};

export default EntryDetails;