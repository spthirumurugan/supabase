import { Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import { StyledBox, StyledButton, StyledFormControl, StyledTextField } from './Create';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../config/supabase';


const Update = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [cgpa, setcgpa] = useState(2);
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase.from('Students').select().eq('id', id).single();
      console.log(data);

      if (error) {
        console.log(error);
        setFormError('Something Went Wrong')
      }

      if (data) {
        setName(data.name);
        setComments(data.comments);
        setcgpa(data.cgpa);
      }
    }
    fetchStudent();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comments || cgpa == 0) {
      setFormError('All Fields are required')
      return
    }
    setFormError(null);


    const { error } = await supabase
      .from('Students')
      .update({ name, comments, cgpa })
      .eq('id', id);

    if (error) {
      console.log(error);
      setFormError('Something Went Wrong')
    } else {
      setFormError(null);
      navigate('/');
    }

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
        <StyledButton variant='contained' onClick={handleSubmit}>Update</StyledButton>
      </StyledFormControl>
    </StyledBox>
  )
}

export default Update