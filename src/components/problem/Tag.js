import React from 'react';
import { Chip, Typography } from '@mui/material';


import makeStyles from '@mui/styles/makeStyles';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  chip: {
    margin: '2px',
  },
}));

const Tag = ({
  name,
  selected = false,
  clickable,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Chip
      className={classes.chip}
      label={<Typography variant='h6'>{name}</Typography>}
      variant={selected ? 'default' : 'outlined'}
      color={selected ? 'primary' : ''}
      clickable={clickable}
      {...rest}
    />
  );
}

export default Tag;