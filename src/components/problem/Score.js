import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button, Typography, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { toPersianNumber } from '../../utils/translateNumber';
import {
  scoreProblem,
} from '../../redux/actions/problem';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  chip: {
    margin: '2px',
  },
}));

const Score = ({ initialScore, problemId, scoreProblem }) => {
  const classes = useStyles();
  const [score, setScore] = useState(initialScore || 0);

  const doScore = (score) => {
    scoreProblem({ score, problem: problemId }).then((action) => {
      setScore(action?.response?.score || 0);
    });
  }

  return (
    <ButtonGroup variant='contained' size='small'>
      <Button color="primary" onClick={() => doScore(1)}>
        <Typography component='caption' variant='h4'>+</Typography>
      </Button>
      <Button disabled><div dir='ltr' style={{ fontSize: '16px' }} >{toPersianNumber(score)}</div></Button>
      <Button color="secondary" onClick={() => doScore(-1)}>
        <Typography component='caption' variant='h4'>-</Typography>
      </Button>
    </ButtonGroup>
  );
}

export default connect(
  undefined,
  {
    scoreProblem,
  }
)(Score);