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
      <Paper className={classes.paper}>

        <Grid container spacing={2} justify='center'>

          <Grid item xs={12}>
            <Typography gutterBottom variant='h2'>
              {'صورت مسئله'}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TinyPreview
              content={problem?.text}
              frameProps={{
                frameBorder: '0',
                scrolling: 'no',
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant='h2'>
              {'پاسخ نمونه'}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TinyPreview
              content={problem?.answer?.text}
              frameProps={{
                frameBorder: '0',
                scrolling: 'no',
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant='h2'>
              {'پاسخ دانش‌آموز'}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TinyPreview
              content={answer?.text_answer?.text}
              frameProps={{
                frameBorder: '0',
                scrolling: 'no',
                width: '100%',
              }}
            />
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
                    history.push('/submitted_answers/');
                  })
                }}>
                {'غلط'}
              </Button>
              <Button
                onClick={() => {
                  judgeOneSubmittedProblem({ submitId, mark: 1 }).then(() => {
                    history.push('/submitted_answers/')
                  })
                }}>
                {'درست'}
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid >
      </Paper>
    </Layout >
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