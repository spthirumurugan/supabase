import styled from '@emotion/styled';
import { Box, Button, FormControl, Rating, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom';
import supabase from '../config/supabase';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export const StyledBox = styled(Box)(
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'column'
  })
)
export const StyledFormControl = styled(FormControl)`
  background: '#2d2d2d',
  margin: '20px 10px',
  borderRadius: 5,
  minWidth: 500,
  maxWidth: 900

  @media (max-width: 768px) {
    min-width: 300px;
    max-width: 600px;
  }
  
  @media (max-width: 480px) {
    min-width: 250px;
    max-width: 400px;
  }`

export const StyledTextField = styled(TextField)({
  margin: '20px 20px'
});
export const StyledButton = styled(Button)({
  margin: '20px 40%',
  background: '#3cb371'
})

const Create = () => {
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [cgpa, setcgpa] = useState(2);
  const [date, setDate] = useState(new Date());
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comments || cgpa == 0) {
      setFormError('All Fields are required')
      return
    }
    setFormError(null);


    const { error } = await supabase.from('Students').insert({ name, comments, cgpa });


    if (error) {
      console.log(error);
      setFormError('All fields are mandatory');
    }
    else {
      setFormError(null);
      navigate('/');
    }

    console.log({ name, comments, cgpa })

  }
  return (
    <StyledBox component='form'>
      <StyledFormControl>
        <StyledTextField
          color='secondary'
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          InputLabelProps={{
            sx: {
              color: '#a0a0a0'
            }
          }}
          onChange={e => setName(e.target.value)} />
        <StyledTextField
          color='secondary'
          id="comments"
          label="Comments"
          variant="outlined"
          value={comments}
          multiline={true}
          rows={3}
          InputLabelProps={{
            sx: {
              color: '#a0a0a0'
            }
          }}
          onChange={e => setComments(e.target.value)} />

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={Date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider> */}


        <Rating
          name="rating"
          value={cgpa}
          onChange={(e, newValue) => {
            setcgpa(parseInt(e.target.value));
          }}
          sx={{ color: '#3cb371', margin: '10px 30px' }}
        />
        {
          formError && <Typography color={'error'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formError}</Typography>
        }
        <StyledButton variant='contained' onClick={handleSubmit}>Submit</StyledButton>
      </StyledFormControl>
    </StyledBox>
  )
}

export default Create