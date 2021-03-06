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
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AreYouSure from '../../components/Dialog/AreYouSure';
import PropertiesBox from '../../components/problem/PropertiesBox';
import TinyEditor from '../../components/tiny_editor/react_tiny/TinyEditorComponent';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';
import {
  addProblemAction,
  addProblemToGroupAction,
  editProblemAction,
  getOneProblemAction,
  removeProblemAction,
} from '../../redux/slices/problem';
import Layout from '../Layout';

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
  getAllTopics,
  getAllSubtopics,
  getProblem,
  addProblemToGroup,
  removeProblem,

  addProblem,
  editProblem,

  allTopics,
  allSubtopics,
  problem,
  isFetching,
}) => {
  const classes = useStyles();
  const { mode, problemId, problemGroupId, eventId } = useParams();
  const [showAreYouSureDialog, setAreYouSureDialog] = useState(false);

  const [properties, setProperties] = useState({
    answer: {
      text: '',
    },
    problem_type: '',
    title: '',
    text: '',
    grade: '',
    difficulty: '',
    is_checked: false,
    source: '',
    topics: [],
    subtopics: [],
    author: 1,
  });
  const [isDialogOpen, setDialogStatus] = useState(false);

  useEffect(() => {
    // getAllSubjects({ gameId });
    if (mode == 'edit') {
      getProblem({ problemId });
    }
  }, [])

  useEffect(() => {
    if (problem && mode == 'edit') {
      const newProperties = {
        ...properties
      }
      for (const key in problem) {
        if ((Array.isArray(problem[key]) && problem[key].length > 0) ||
          (!Array.isArray(problem[key]) && problem[key])) {
          newProperties[key] = problem[key];
        }
      }
      setProperties(newProperties);
    }
  }, [problem]);

  const putData = (e) => {
    if (e.target.name == 'answer') {
      setProperties({
        ...properties,
        answer: {
          ...properties.answer,
          text: e.target.value,
        }
      })
    } else {
      setProperties({
        ...properties,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleAddProblem = () => {
    const { text, title, difficulty, problem_type, grade } = properties;
    if (!text || !title || !difficulty || !problem_type || !grade) {
      addNotification({
        message: '?????????? ??????????? ?????????? ???? ???? ????????.',
        type: 'error',
      });
      return;
    }
    if (mode == 'add') {
      addProblem(properties).then((action) => {
        if (action.type.includes('fulfilled') && problemGroupId) {
          addProblemToGroup({
            problemId: action.payload.response.id,
            problemGroupId,
            eventId,
          })
        }
      });
    } else {
      editProblem({ ...properties, problemId });
    }
  }

  return (
    <Layout>
      <Grid container spacing={2} justify='center'>
        <Grid item>
          {mode == 'add' &&
            <Typography variant="h1" align="center">{'?????????????? ????????????'}</Typography>
          }
          {mode == 'edit' &&
            <Typography variant="h1" align="center">{'?????????????? ????????????'}</Typography>
          }
        </Grid>
        <Grid item container spacing={2} alignItems='flex-start'>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Grid container spacing={2} justify='center'>
                <Grid item >
                  <Typography gutterBottom variant='h3' align='center'>????????</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TinyEditor
                    content={properties.text}
                    onChange={(text) => {
                      setProperties({
                        ...properties,
                        text,
                      })
                    }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h3' align='center'>????????</Typography>
                </Grid>
                <Grid item xs={12}>
                  {!properties.problem_type &&
                    <Typography align='center'>
                      {'???????? ?????? ?????????? ?????????? ?????????? ?????? ?????????? ???? ???????????? ????????.'}
                    </Typography>
                  }
                  {properties.problem_type == 'ShortAnswerProblem' &&
                    <TextField
                      fullWidth
                      variant='outlined'
                      label='????????'
                      name='answer'
                      onChange={putData}
                      value={properties.answer?.text} />
                  }
                  {properties.problem_type == 'DescriptiveProblem' &&
                    <TinyEditor
                      content={properties.answer.text}
                      onChange={(text) => {
                        setProperties({
                          ...properties,
                          answer: {
                            ...properties.answer,
                            text,
                          }
                        })
                      }} />
                  }
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant='contained' color='primary' onClick={() => setDialogStatus(true)}>??????????</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container xs={12} md={4}>
            <Paper className={classes.paper}>
              <Grid container direction='column' spacing={2} >
                <Grid item>
                  <TextField
                    fullWidth variant='outlined'
                    label='??????????'
                    name='title'
                    onChange={putData}
                    value={properties.title} />
                </Grid>
                {mode == 'add' &&
                  <Grid item>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>?????? ??????????</InputLabel>
                      <Select
                        value={properties.problem_type}
                        onChange={putData}
                        name='problem_type'
                        label='?????? ??????????'>
                        <MenuItem value={'ShortAnswerProblem'}>{'?????????????????????'}</MenuItem>
                        <MenuItem value={'DescriptiveProblem'}>{'????????????'}</MenuItem>
                      </Select>
                    </FormControl >
                  </Grid>
                }
                <Grid item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>????????</InputLabel>
                    <Select
                      value={properties.grade}
                      onChange={putData}
                      name='grade'
                      label='????????'
                    >
                      <MenuItem value={'ElementarySchoolFirstHalf'}>{'?????? ???? ?????? ??????????????'}</MenuItem>
                      <MenuItem value={'ElementarySchoolSecondHalf'}>{'?????????? ???? ?????? ??????????????'}</MenuItem>
                      <MenuItem value={'HighSchoolFirstHalf'}>{'???????????? ???????? ??????'}</MenuItem>
                      <MenuItem value={'HighSchoolSecondHalf'}>{'???????????? ???????? ??????'}</MenuItem>
                    </Select>
                  </FormControl >
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>????????</InputLabel>
                    <Select
                      value={properties.difficulty}
                      onChange={putData}
                      name='difficulty'
                      label='????????'
                    >
                      <MenuItem value={'VeryEasy'}>{'?????????????????????'}</MenuItem>
                      <MenuItem value={'Easy'}>{'????????'}</MenuItem>
                      <MenuItem value={'Medium'}>{'??????????'}</MenuItem>
                      <MenuItem value={'Hard'}>{'??????'}</MenuItem>
                      <MenuItem value={'VeryHard'}>{'????????????????'}</MenuItem>
                    </Select>
                  </FormControl >
                </Grid>
                <Grid item>
                  <PropertiesBox properties={properties} setProperties={setProperties} />
                </Grid>
                {mode == 'edit' &&
                  <Grid item>
                    <Button
                      onClick={() => setAreYouSureDialog(true)}
                      fullWidth variant='outlined' style={{ color: 'red' }}>
                      {'?????? ??????????'}
                    </Button>
                  </Grid>
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid >
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => { setDialogStatus(!isDialogOpen) }}
        callBackFunction={handleAddProblem}
      />
      <AreYouSure
        open={showAreYouSureDialog}
        handleClose={() => { setAreYouSureDialog(false) }}
        callBackFunction={() => removeProblem({ problemId, eventId })}
      />
    </Layout >
  )
}

const mapStateToProps = (state) => ({
  allTopics: state.problem.allTopics,
  allSubtopics: state.problem.allSubtopics,
  problem: state.problem.problem,
  isFetching: state.problem.isFetching,
})

export default connect(
  mapStateToProps,
  {
    removeProblem: removeProblemAction,
    addProblemToGroup: addProblemToGroupAction,
    getProblem: getOneProblemAction,
    addProblem: addProblemAction,
    editProblem: editProblemAction,
    addNotification: addNotificationAction,
  }
)(Index)