import React, { useState } from 'react';
import { Button, Typography, Select, MenuItem, Box, FormControl, InputLabel } from "@mui/material";
import { EntryFormProps } from "../../../../types";

const OccupationalHealthCare = ({setType, healthCheckFormRef, handleNewEntry, diagnoses, entryDiagnoses, setEntryDiagnoses}: EntryFormProps): JSX.Element => {

  const [selected, setSelected] = useState<string>('M24.2');
  
  return (
    <form onSubmit={handleNewEntry} style={{marginTop: '20px', borderTop: '1px solid rgba(192,192,192,0.4)', borderRadius: '2px', outline: 'none'}} ref={healthCheckFormRef}>
      <Typography sx={{mt: 2}} variant="h5">Type: OccupationalHealthcare</Typography>

      <Typography variant="h6" sx={{mt: 2}}> Description </Typography>
      <input style={{marginTop: '5px', width: '100%', height: '30px', border: 0, borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}} name="description" type="text"/> 
      <Typography variant="h6" sx={{mt: 2}}> Date </Typography>    
      <input style={{marginTop: '5px', width: '100%', height: '30px', border: 0, borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}} name="date" type="date"/>     
      <Typography variant="h6" sx={{mt: 2}}> Specialist </Typography>
      <input style={{marginTop: '5px', width: '100%', height: '30px', border: 0, borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}} name="specialist" type="text"/> 
      <Typography variant="h6" sx={{mt: 2}}> Employer </Typography>
      <input style={{marginTop: '5px', width: '100%', height: '30px', border: 0, borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}} name="employer" type="text"/> 
      <Typography variant="h6" sx={{mt: 2}}> Sick leave </Typography>      
      <div style={{overflow: 'hidden', padding: '20px'}}>      
        <Typography variant="h6" sx={{mt: 2, fontSize: '1rem'}}> Start Date </Typography>  
        <input style={{marginTop: '5px', width: '100%', height: '30px', border: 0, borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}} name="startDate" type="date"/>
        <Typography variant="h6" sx={{mt: 2, fontSize: '1rem'}}> End date </Typography>  
        <input style={{marginTop: '5px', width: '100%', height: '30px', border: 0, borderBottom: '1px solid rgba(100, 100, 100, 0.2)'}} name="endDate" type="date"/>     
      </div> 

      <Typography variant="h6" sx={{mt: 2}}> Diagnosis Codes </Typography>    
      <Typography sx={{mt: 2}}>Added: {entryDiagnoses.map((code, i) => {
        return (
          <i key={i}>{code}{(entryDiagnoses.length - 1 !== i) ? ', ' : null}</i>
        );
      })}
      </Typography>

      <Box sx={{display: 'flex', justifyContent: 'start', gap: '20px', mt: 3}}>
        <FormControl sx={{width: '35vw'}}>
          <InputLabel id='diagnosis-selector-label'>Diagnosis</InputLabel>
          <Select value={selected} id='diagnosis-selector' labelId='diagnosis-select' label='diagnosis' onChange={({ target }) => setSelected(target.value)}>
            {diagnoses.map((diagnosis, i) => {
              return (
                <MenuItem key={i} value={diagnosis.code}>{diagnosis.code}</MenuItem>
              );
            })};
          </Select>
        </FormControl>
        <Button variant='contained' color='success' onClick={() => setEntryDiagnoses([...entryDiagnoses, selected])}>Add code</Button>
      </Box> 
      
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button color="error" variant="contained" sx={{mt: 4}} onClick={() => setType('')}>Cancel</Button>             
        <Button color="success" variant="contained" sx={{mt: 4}} type="submit">New entry</Button>  
      </div>                
    </form>
  );
};

export default OccupationalHealthCare;