import {
  Button,
  ButtonGroup,
  Chip,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import TinyPreview from '../components/editor/tiny_editor/react_tiny/Preview';
import Comment from '../components/problem/Comment';
import CreateComment from '../components/problem/CreateComment';
import Difficulty from '../components/problem/Difficulty';
import ProblemMaker from '../components/problem/ProblemMaker';
import Score from '../components/problem/Score';
import Tag from '../components/problem/Tag';
import {
  getUser,
} from '../redux/actions/account'
import {
  fetchProblem,
} from '../redux/actions/problem';
import {
  getAllEvents,
  getAllSources,
  getAllSubtags,
  getAllTags,
} from '../redux/actions/properties'
import { toPersianNumber } from '../utils/translateNumber';

const problemId = parseInt(window.location.pathname.split('/')[2]);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const ViewProblem = ({
  fetchProblem,
  getAllTags,
  getAllSubtags,
  getAllEvents,
  getAllSources,
  problem,
  scoreProblem,
  tags,
  subtags,
  events,
  sources,
  getUser,
  user,
}) => {
  const classes = useStyles();
  const [score, setScore] = useState(0)
  const [questionMaker, setQuestionMaker] = useState()
  let history = useHistory();

  useEffect(() => {
    fetchProblem(problemId);
    getAllTags();
    getAllSubtags();
    getAllEvents();
    getAllSources();
  }, [fetchProblem, getAllTags, getAllSubtags, getAllEvents, getAllSources]);

  useEffect(() => {
    if (problem?.question_maker) {
      getUser(problem.question_maker);
    }
  }, [getUser, problem?.question_maker])

  useEffect(() => {
    if (user) {
      setQuestionMaker(user)
    }
  }, [user])

  return (
    <>
      <Container className={classes.container}>
        {problem && questionMaker &&
          <Grid container spacing={2} justify='center'>
            <Grid item xs={12}>
              <Typography variant='h1' align="center">{`«${problem.name}»`}</Typography>
            </Grid>
            <Grid container item spacing={2} xs={12} md={10} lg={8}>
              <Grid container item direction='column' xs={12} md={8} spacing={2}>
                <Grid item>
                  <Paper className={classes.paper}>
                    <Grid item container direction='column'>
                      <Grid item>
                        <Typography gutterBottom variant='h3' align='center'>صورت مسئله</Typography>
                      </Grid>
                      <Divider className={classes.divider} />
                      <Grid item>
                        <TinyPreview
                          frameProps={{
                            frameBorder: '0',
                            scrolling: 'no',
                            width: '100%',
                          }}
                          content={problem.text} />
                      </Grid>
                      <Divider className={classes.divider} />
                      <Grid item container justify='space-between' alignItems='center' spacing={2}>
                        <Grid item container xs={12} md={5} justify='flex-start'>
                          <Score problemId={problemId} initialScore={problem.score} />
                        </Grid>
                        <Grid item container xs={12} md={5} justify='flex-end'>
                          <ProblemMaker problemMaker={questionMaker} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item>
                  <Paper className={classes.paper}>
                    <Grid item container direction='column'>
                      <Grid item>
                        <Typography gutterBottom variant='h3' align='center'>نظرات</Typography>
                      </Grid>
                      {problem.comments &&
                        problem.comments.map(comment => {
                          return <Comment text={comment.text} commenterId={comment.writer} />
                        })
                      }
                      <CreateComment id={problemId} />
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>

              <Grid item container xs={12} md={4} direction='column' spacing={2}>
                <Grid item>
                  <Button variant='contained' color='primary' href={'/editproblem/' + problemId} fullWidth>ویرایش</Button>
                </Grid>
                <Grid item>
                  <Paper className={classes.paper}>
                    <Grid item container direction='column' spacing={2}>
                      <Grid item>
                        <Typography gutterBottom variant='h3' align='center'>اطلاعات</Typography>
                      </Grid>
                      <Divider className={classes.divider} />
                      <Grid item>
                        <Difficulty difficulty={problem.hardness} />
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant='h5'>مباحث کلی:</Typography>
                        {
                          tags
                            .filter(tag => problem.tags.includes(tag.id))
                            .map((tag, index) =>
                              <Tag name={tag.name} key={index} />)
                        }
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant='h5'>مباحث جزئی‌تر:</Typography>
                        {
                          subtags
                            .filter(subtag => problem.sub_tags.includes(subtag.id))
                            .map((subtag, index) =>
                              <Tag name={subtag.name} key={index} />)
                        }
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant='h5'>منبع:</Typography>
                        {
                          sources
                            .filter(source => problem.source === source.id)
                            .map((source, index) =>
                              <Tag name={source.name} key={index} />)
                        }
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant='h5'>رویدادهای به‌کاررفته:</Typography>
                        {
                          events
                            .filter(event => problem.events.includes(event.id))
                            .map((event, index) =>
                              <Tag name={event.name} key={index} />)
                        }
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid >
        }
      </Container>
    </>
  );

}

const mapStateToProps = (state) => {
  return ({
    problem: state.problem.problem,
    user: state.account.user,
    tags: state.properties.tags,
    subtags: state.properties.subtags,
    events: state.properties.events,
    sources: state.properties.sources,
  });
}

export default connect(
  mapStateToProps,
  {
    fetchProblem,
    getAllTags,
    getAllSubtags,
    getAllEvents,
    getAllSources,
    getUser,
  }
)(ViewProblem);
