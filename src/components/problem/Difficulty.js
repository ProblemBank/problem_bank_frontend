import React from 'react';
import {
  LinearProgress,
  withStyles,
  Typography,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { toPersianNumber } from '../../utils/translateNumber'

const grades = [
  'اول',
  'دوم',
  'سوم',
  'چهارم',
  'پنجم',
  'ششم',
  'هفتم',
  'هشتم',
  'نهم',
  'دهم',
  'یازدهم',
  'دوازدهم',
]

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  }
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#ff0000',
  },
}))(LinearProgress);

const Difficulty = ({ difficulty }) => {
  const classes = useStyles();
  return (
    <>
      <BorderLinearProgress variant="determinate" value={difficulty.level} />
      <Typography align='center'>
        سختی: {toPersianNumber(difficulty.level)}
      </Typography>
      <Paper className={classes.paper}>
        <Typography align='center'>
          پایین‌ترین پایه‌ی مناسب:
          <b>
            {' ' + grades[difficulty.appropriate_grades_min - 1]}
          </b>
          <br />
        بالاترین پایه‌ی مناسب:
          <b>
            {' ' + grades[difficulty.appropriate_grades_max - 1]}
          </b>
        </Typography>
      </Paper>
    </>
  );
}


export default Difficulty;