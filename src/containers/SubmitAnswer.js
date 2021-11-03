import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import TinyPreview from '../components/tiny_editor/react_tiny/Preview';
import {
  getOneSubmittedProblemAction,
  judgeOneSubmittedProblemAction,
} from '../redux/slices/mentor';
import {
  addNotificationAction,
} from '../redux/slices/notifications';
import {
  getOneProblemAction,
} from '../redux/slices/problem';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
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
  getOneSubmittedProblem,
  judgeOneSubmittedProblem,
  getProblem,

  problem,
  answer,
  isFetching,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const { submitId } = useParams();

  React.useEffect(() => {
    getOneSubmittedProblem({ submitId });
  }, [])

  React.useEffect(() => {
    if (answer?.problem) {
      getProblem({ problemId: answer?.problem });
    }
  }, [answer])


  return (
    <Layout>
      <Grid container spacing={2} justify='center'>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant='h2'>
              {'مسئله'}
            </Typography>
            <TinyPreview
              content={problem?.text}
              frameProps={{
                frameBorder: '0',
                scrolling: 'no',
                width: '100%',
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant='h2'>
              {'پاسخ نمونه'}
            </Typography>
            <TinyPreview
              content={problem?.answer?.text}
              frameProps={{
                frameBorder: '0',
                scrolling: 'no',
                width: '100%',
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant='h2'>
              {'پاسخ'}
            </Typography>
            <TinyPreview
              content={answer?.text_answer?.text}
              frameProps={{
                frameBorder: '0',
                scrolling: 'no',
                width: '100%',
              }}
            />
          </Paper>
          <Box mt={2}>
            <Button variant='outlined' fullWidth
              disabled={!answer?.upload_file_answer}
              href={'https://bankbackend.esfoly.ir/' + answer?.upload_file_answer}
              component="a" target="_blank">
              {'دانلود فایل پاسخ'}
            </Button>
          </Box>

        </Grid>
        <Grid item xs={12}>
          <ButtonGroup variant='contained' fullWidth color='primary'>
            <Button
              onClick={() => {
                judgeOneSubmittedProblem({ submitId, mark: 0 }).then(() => {
                  history.push('/answer/');
                })
              }}>
              {'غلط'}
            </Button>
            <Button
              onClick={() => {
                judgeOneSubmittedProblem({ submitId, mark: 1 }).then(() => {
                  history.push('/answer/')
                })
              }}>
              {'درست'}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid >
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  problem: state.problem.problem,
  answer: state.mentor.answer,
})

export default connect(
  mapStateToProps,
  {
    getProblem: getOneProblemAction,
    getOneSubmittedProblem: getOneSubmittedProblemAction,
    judgeOneSubmittedProblem: judgeOneSubmittedProblemAction,
  }
)(Index)