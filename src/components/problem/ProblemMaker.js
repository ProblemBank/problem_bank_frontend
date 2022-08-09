import React from 'react';
import { Chip, Typography } from '@mui/material';


import makeStyles from '@mui/styles/makeStyles';


const useStyles = makeStyles((theme) => ({
}));

const ProblemMaker = ({ problemMaker }) => {
  const classes = useStyles();
  return (
    <Chip
      variant='outlined'
      color='primary'
      label={
        <Typography variant='h6' align='right'>
          {`اضافه‌کننده: ${problemMaker?.first_name} ${problemMaker?.last_name}`}
        </Typography>
      }
    />
  );
}

export default ProblemMaker;