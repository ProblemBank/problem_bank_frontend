import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import TopicBox from './TopicBox';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  chip: {
    margin: '2px',
  },
  formControl: {
    width: '100%'
  },
}));

const Index = ({
  properties,
  setProperties,
}) => {
  const classes = useStyles();

  return (
    <Grid container item direction='column' justify='center' alignItems='center' spacing={2}>
      <TopicBox properties={properties} setProperties={setProperties} />
    </Grid>
  );
}

const mapStateToProps = (state, props) => ({

})

export default connect(
  mapStateToProps,
  {
  }
)(Index);