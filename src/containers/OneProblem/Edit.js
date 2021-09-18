/* eslint-disable no-prototype-builtins */
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
import TinyEditor from '../../components/tiny_editor/react_tiny/TinyEditorComponent';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';
import {
  addProblemAction,
  addProblemToGroupAction,
  editProblemAction,
  getOneProblemAction,
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

  addProblem,
  editProblem,

  allTopics,
  allSubtopics,
  problem,
  isFetching,
}) => {
  const classes = useStyles();
  const { mode, problemId, problemGroupId, eventId } = useParams();

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
      const newProblem = {}
      for (const key in problem) {
        if ((Array.isArray(problem[key]) && problem[key].length > 0) ||
          (!Array.isArray(problem[key]) && problem[key])) {
          newProblem[key] = problem[key];
        }
      }
      setProperties(newProblem);
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

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(number)) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddProblem = () => {
    const { text, title, difficulty, problem_type, grade } = properties;
    if (!text || !title || !difficulty || !problem_type || !grade) {
      addNotification({
        message: 'لطفاً همه‌ی موارد رو پر کنید.',
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
            <Typography variant="h1" align="center">{'«افزودن مسئله»'}</Typography>
          }
          {mode == 'edit' &&
            <Typography variant="h1" align="center">{'«ویرایش مسئله»'}</Typography>
          }
        </Grid>
        <Grid item container spacing={2} alignItems='flex-start'>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Grid container spacing={2} justify='center'>
                <Grid item >
                  <Typography gutterBottom variant='h3' align='center'>صورت</Typography>
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
                  <Typography gutterBottom variant='h3' align='center'>پاسخ</Typography>
                </Grid>
                <Grid item xs={12}>
                  {!properties.problem_type &&
                    <Typography align='center'>
                      {'برای ثبت پاسخ، لطفاً ابتدا نوع مسئله را انتخاب کنید.'}
                    </Typography>
                  }
                  {properties.problem_type == 'ShortAnswerProblem' &&
                    <TextField
                      fullWidth
                      variant='outlined'
                      label='پاسخ'
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
                <Grid item>
                  <Button fullWidth variant='contained' color='primary' onClick={() => setDialogStatus(true)}>ذخیره</Button>
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
                    label='عنوان'
                    name='title'
                    onChange={putData}
                    value={properties.title} />
                </Grid>
                {mode == 'add' &&
                  <Grid item>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>نوع مسئله</InputLabel>
                      <Select
                        value={properties.problem_type}
                        onChange={putData}
                        name='problem_type'
                        label='نوع مسئله'>
                        <MenuItem value={'ShortAnswerProblem'}>{'کوتاه‌پاسخ'}</MenuItem>
                        <MenuItem value={'DescriptiveProblem'}>{'تشریحی'}</MenuItem>
                      </Select>
                    </FormControl >
                  </Grid>
                }
                <Grid item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>پایه</InputLabel>
                    <Select
                      value={properties.grade}
                      onChange={putData}
                      name='grade'
                      label='پایه'
                    >
                      <MenuItem value={'ElementarySchoolFirstHalf'}>{'اول تا سوم ابتدایی'}</MenuItem>
                      <MenuItem value={'ElementarySchoolSecondHalf'}>{'چهارم تا ششم ابتدایی'}</MenuItem>
                      <MenuItem value={'HighSchoolFirstHalf'}>{'متوسطه دوره اول'}</MenuItem>
                      <MenuItem value={'HighSchoolSecondHalf'}>{'متوسطه دوره دوم'}</MenuItem>
                    </Select>
                  </FormControl >
                </Grid>
                {/* <Grid item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>مبحث</InputLabel>
                    <Select
                      value={properties.subject}
                      onChange={putData}
                      name='subject'
                      label='مبحث'
                    >
                      {allGameSubjects.map((subject, index) => (
                        <MenuItem key={index} value={subject.id}>{subject.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl >
                </Grid> */}
                <Grid item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>سختی</InputLabel>
                    <Select
                      value={properties.difficulty}
                      onChange={putData}
                      name='difficulty'
                      label='سختی'
                    >
                      <MenuItem value={'VeryEasy'}>{'بسیار‌آسان'}</MenuItem>
                      <MenuItem value={'Easy'}>{'آسان'}</MenuItem>
                      <MenuItem value={'Medium'}>{'متوسط'}</MenuItem>
                      <MenuItem value={'Hard'}>{'سخت'}</MenuItem>
                      <MenuItem value={'VeryHard'}>{'بسیارسخت'}</MenuItem>
                    </Select>
                  </FormControl >
                </Grid>
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
    addProblemToGroup: addProblemToGroupAction,
    getProblem: getOneProblemAction,
    addProblem: addProblemAction,
    editProblem: editProblemAction,
    addNotification: addNotificationAction,
  }
)(Index)