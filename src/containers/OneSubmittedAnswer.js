import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, {  } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import TinyPreview from '../components/tiny_editor/react_tiny/Preview';
import {
  getOneSubmittedProblemAction,
  judgeOneSubmittedProblemAction,
} from '../redux/slices/mentor';
import {
  getOneProblemAction,
} from '../redux/slices/problem';
import Layout from '../components/templates/Layout';

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
  const navigate = useNavigate();
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

        <Grid container spacing={2} justifyContent='center'>

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
                href={answer?.upload_file_answer?.answer_file}
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
                    navigate('/submitted_answer/');
                  })
                }}>
                {'غلط'}
              </Button>
              <Button
                onClick={() => {
                  judgeOneSubmittedProblem({ submitId, mark: 1 }).then(() => {
                    navigate('/submitted_answer/')
                  })
                }}>
                {'درست'}
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid >
      </Paper>
    </Layout >
  );
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