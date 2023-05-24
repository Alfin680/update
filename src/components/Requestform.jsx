import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Requestform = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState({});
  const [purpose, setPurpose] = React.useState('');

  const onSubmit = (data) => {
    axios.post('http://localhost:15000/acc/request', data)
      .then((response) => {
        console.log(response.data);
        alert('Registration completed');
        setResult(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    setPurpose(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }} className="RequestForm">
      <Typography variant="h4" style={{ fontFamily: 'Segoe UI', color: 'brown', fontWeight: 'bold' }}>
        REQUEST FORM
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <TextField
          required
          id="name"
          label="Name"
          variant="outlined"
          {...register('name', { required: 'Name is required.' })}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          style={{ margin: '0px 5px 0px 10px' }}
        />
        <TextField
          required
          id="age"
          label="Age"
          variant="outlined"
          {...register('age', { required: 'Age is required.' })}
          error={Boolean(errors.age)}
          helperText={errors.age?.message}
          style={{ margin: '0px 5px 0px 1px' }}
        />
        <br /><br />
        <TextField
          required
          id="email"
          label="Email"
          variant="outlined"
          {...register('email', { required: 'Email is required.' })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          style={{ margin: '0px 5px 0px 1px' }}
        />
        <TextField
          required
          id="phone"
          label="Phone Number"
          variant="outlined"
          {...register('phone', { required: 'Phone number is required.' })}
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
          style={{ margin: '0px 5px 0px 1px' }}
        />
        <br /><br />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }}>Blood Group</FormLabel>
          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
            <FormControlLabel value="A+" control={<Radio />} label="A+" {...register('bloodGroup')} />
            <FormControlLabel value="A-" control={<Radio />} label="A-" {...register('bloodGroup')} />
            <FormControlLabel value="B+" control={<Radio />} label="B+" {...register('bloodGroup')} />
            <FormControlLabel value="B-" control={<Radio />} label="B-" {...register('bloodGroup')} />
            <FormControlLabel value="O+" control={<Radio />} label="O+" {...register('bloodGroup')} />
            <FormControlLabel value="O-" control={<Radio />} label="O-" {...register('bloodGroup')} />
            <FormControlLabel value="AB+" control={<Radio />} label="AB+" {...register('bloodGroup')} />
            <FormControlLabel value="AB-" control={<Radio />} label="AB-" {...register('bloodGroup')} />
          </RadioGroup>
        </FormControl>
        <br /><br />
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-label">Purpose</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="purpose"
            value={purpose}
            label="Purpose"
            onChange={handleChange}

          >
            <MenuItem value="Donor" {...register('purpose')}>Donor</MenuItem>
            <MenuItem value="Receiver" {...register('purpose')}>Receiver</MenuItem>
          </Select>
        </FormControl>
        <br /><br />
        <TextField
          sx={{ m: 1, minWidth: 500 }}
          id="ailments"
          label="Ailments (if any)"
          {...register('ailments')}
          multiline
          rows={4}
        />
        <br /><br />
        {purpose === 'Receiver' && (
          <TextField
            required
            id="bloodUnits"
            label="Number of Blood Units Required"
            variant="outlined"
            {...register('bloodUnits', { required: 'Number of blood units is required.' })}
            error={Boolean(errors.bloodUnits)}
            helperText={errors.bloodUnits?.message}
            style={{ margin: '0px 5px 0px 1px' }}
          />
        )}
        <br /><br />
        <Button variant="contained" color="error" type="submit" className="btns">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Requestform;
