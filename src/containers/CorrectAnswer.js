import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import TextWidget from '../components/Widget/TextWidget';
import {
  getAllGameSubjectsAction,
  getOneAnswerForCorrectionAction,
  setAnswerMarkAction,
} from '../redux/slices/problem';
import {
  addNotificationAction,
} from '../redux/slices/notifications';
import Layout from './Mentor/Layout';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  textArea: {
    width: '100%',
    resize: 'vertical',
    borderRadius: '10px',
    minHeight: '100px',
    padding: theme.spacing(1),
  }
}))

const Index = ({
  addNotification,
  getOneAnswerForCorrection,
  setAnswerMark,
  getAllGameSubjects,

  playerAnswer,
  allGameSubjects,
  isFetching,
}) => {
  const classes = useStyles();
  const { gameId } = useParams();

  const [properties, setProperties] = useState({ mark: '', subject: '' });
  const [problemText, setProblemText] = useState();
  const [answerText, setAnswerText] = useState()

  useEffect(() => {
    getAllGameSubjects({ gameId });
  }, [getAllGameSubjects])

  useEffect(() => {
    if (playerAnswer?.text_answer) {
      setAnswerText(<TextWidget text={playerAnswer?.text_answer} />)
    }
    if (playerAnswer?.problem?.text) {
      setProblemText(<TextWidget text={playerAnswer?.problem?.text} />)
    }
  }, [playerAnswer])

  const getOneAnswer = () => {
    if (!properties.subject) {
      addNotification({
        message: 'لطفاً مبحث مسئله را انتخاب کنید.',
        type: 'error',
      });
      return;
    }
    getOneAnswerForCorrection({ gameId, subject: properties.subject })
  }

  const handleSelect = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: e.target.value,
    })
  }

  const calculateMark = (e) => {
    const status = e.target.value;
    const difficulty = playerAnswer?.problem?.difficulty;
    const from_auction = !playerAnswer?.from_auction ? 0 : 1; //todo: fix strange bug :?
    const TABLE = [
      {
        EASY: [-1, -1],
        MEDIUM: [0, 0],
        HARD: [1, 1],
      },
      {
        EASY: [-1, -1],
        MEDIUM: [2, 1],
        HARD: [4, 2],
      },
      {
        EASY: [-1, -1],
        MEDIUM: [3, 2],
        HARD: [6, 3],
      },
    ]
    setProperties({
      ...properties,
      mark: TABLE[status][difficulty][from_auction],
    })
  }


  console.log(properties)

  const submitMark = () => {
    if (properties.mark == -1) {
      addNotification({
        message: 'لطفاً ابتدا نمره را تعیین کنید.',
        type: 'error',
      });
      return;
    }
    setAnswerMark({ mark: properties.mark, gameId, AnswerId: playerAnswer?.id })
  }

  return (
    <Layout>
      <Grid container spacing={2} justify='center'>
        <Grid item>
          <Typography variant="h1" align="center">{'«تصحیح»'}</Typography>
        </Grid>
        <Grid item container spacing={2} alignItems='flex-start'>
          <Grid item container xs={12} md={8} direction='column'>
            <Paper className={classes.paper}>
              <Grid container direction='column' spacing={2} >
                <Grid item>
                  <Typography variant='h2'>
                    {'عنوان مسئله: ' + (playerAnswer?.problem?.title || '؟')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {problemText}
                </Grid>
                <Grid item>
                  <Typography variant='h2'>
                    {'پاسخ تایپ‌شده:'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {answerText}
                </Grid>
                <Grid item xs={12}>
                  <Button variant='outlined' fullWidth
                    disabled={!playerAnswer?.file_answer}
                    href={playerAnswer?.file_answer}
                    component="a" target="_blank">
                    {'دانلود فایل پاسخ'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container xs={12} md={4}>
            <Paper className={classes.paper}>
              <Grid container direction='column' spacing={2} >

                <Grid item>
                  <Typography align='center' variant='h2'>
                    {'انتخاب مسئله'}
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl size='small' variant="outlined" fullWidth>
                    <InputLabel>مبحث</InputLabel>
                    <Select
                      className={classes.dropDown}
                      onBlur={handleSelect}
                      name='subject'
                      label='مبحث'
                    >
                      {allGameSubjects.map((subject, index) => (
                        <MenuItem key={index} value={subject.id}>{subject.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl >
                </Grid>
                <Grid item >
                  <Button disabled={isFetching} variant='contained'
                    fullWidth color='primary'
                    onClick={getOneAnswer}>
                    {'دریافت'}
                  </Button>
                </Grid>
                {playerAnswer &&
                  <>
                    <Divider />
                    <Grid item>
                      <Typography align='center' variant='h2'>
                        {'نمره‌دهی'}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <FormControl size='small' variant="outlined" fullWidth>
                        <InputLabel>وضعیت</InputLabel>
                        <Select
                          className={classes.dropDown}
                          onBlur={calculateMark}
                          label='وضعیت'
                        >
                          <MenuItem value={0}>{'۰ - ۳۰'}</MenuItem>
                          <MenuItem value={1}>{'۳۰ - ۷۰'}</MenuItem>
                          <MenuItem value={2}>{'۷۰ - ۱۰۰'}</MenuItem>
                        </Select>
                      </FormControl >
                    </Grid>
                    <Grid item >
                      <Button disabled={isFetching} variant='contained'
                        fullWidth color='primary'
                        onClick={submitMark}>
                        {'ثبت'}
                      </Button>
                    </Grid>
                  </>
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid >
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  allGameSubjects: state.problem.allGameSubjects,
  isFetching: state.problem.isFetching,
  playerAnswer: state.problem.playerAnswer,
})

export default connect(
  mapStateToProps,
  {
    getAllGameSubjects: getAllGameSubjectsAction,
    addNotification: addNotificationAction,
    setAnswerMark: setAnswerMarkAction,
    getOneAnswerForCorrection: getOneAnswerForCorrectionAction,
  }
)(Index)