import { Button, Divider, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AreYouSure from '../../components/Dialog/AreYouSure';
import TinyPreview from '../../components/tiny_editor/react_tiny/Preview';
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
import {
  submitAnswerAction,
} from '../../redux/slices/problem'
import Layout from '../Layout';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}))

const Index = ({
  getProblem,
  submitAnswer,
  addNotification,

  problem,
}) => {
  const classes = useStyles();
  const { problemGroupId, problemId } = useParams();
  const [text, setText] = useState();
  const [file, setFile] = useState({ file: '', value: '' });
  const [isDialogOpen, setDialogStatus] = useState(false);

  useEffect(() => {
    getProblem({ problemId });
  }, [])

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        setFile({
          file: e.target.files[0],
          value: e.target.value,
        });
      } else {
        setFile('')
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  const doSubmitAnswer = () => {
    if (!file?.file && !text) {
      addNotification({
        message: 'حداقل یک متن یا یک فایل برای پاسخ سوال قرار دهید.',
        type: 'error',
      });
      return;
    }

    if (problem?.problem_type == 'DescriptiveProblem') {
      submitAnswer({
        problemGroupId,
        problemId,
        text,
        file: file.file,
      })
    } else {
      submitAnswer({
        problemGroupId,
        problemId,
        text,
      })
    }
  }

  const clearFile = () => {
    setFile({ file: '', value: '' });
  }

  return (
    <Layout>
      <Grid container spacing={4} justifyContent="center" alignItems='flex-start'>
        <Grid item>
          <Typography variant="h1" align="center">
            {problem?.title && `«${problem?.title}»`}
          </Typography>
        </Grid>
        <Grid item container spacing={4} alignItems='flex-start'>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2} justifyContent='center' component={Paper}>
              <Grid item xs={12}>
                <Typography gutterBottom variant='h3' align='center'>صورت</Typography>
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
                <Grid item container direction='column' spacing={1}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant='h3' align='center'>پاسخ</Typography>
                    <Divider />
                  </Grid>
                  {problem?.problem_type == 'DescriptiveProblem' &&
                    <>
                      <Grid item>
                        <TinyEditor
                          initialValue={problem?.text_answer}
                          onChange={setText} />
                      </Grid>
                      <Grid item container spacing={2} alignItems='center'>
                        <Grid item>
                          <Button variant='contained' color='secondary' onClick={() => document.getElementById('userProfilePicture').click()}>
                            {'انتخاب فایل'}
                          </Button>
                          <input
                            value={file.value} accept="application/pdf,image/*"
                            id='userProfilePicture' type="file"
                            style={{ display: 'none' }} onChange={handleFileChange} />
                        </Grid>
                        <Grid item>
                          {file.file &&
                            <Grid container justifyContent='center' alignItems='center'>
                              <Grid item>
                                <Button
                                  size="small"
                                  startIcon={
                                    <IconButton size='small' onClick={clearFile}>
                                      <ClearIcon />
                                    </IconButton>}
                                  endIcon={<DescriptionOutlinedIcon />}
                                  className={classes.lastUploadButton}>
                                  {file.file?.name}
                                </Button>
                              </Grid>
                            </Grid>
                          }
                        </Grid>
                      </Grid>
                    </>
                  }
                  {problem?.problem_type == 'ShortAnswerProblem' &&
                    <Grid item>
                      <TextField
                        onChange={(e) => {
                          setText(e.target.value);
                        }}
                        variant='outlined'
                        fullWidth />
                    </Grid>
                  }
                  <Grid item>
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      onClick={() => setDialogStatus(true)}>
                      {'ثبت پاسخ'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={4}>
            <Grid container spacing={2} justifyContent='center' component={Paper}>
              <Grid item>
                <Typography gutterBottom variant='h3' align='center'>مشخصات</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => { setDialogStatus(!isDialogOpen) }}
        callBackFunction={doSubmitAnswer}
      />
    </Layout>
  );
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
    addNotification: addNotificationAction,
    submitAnswer: submitAnswerAction,
    addProblemToGroup: addProblemToGroupAction,
    getProblem: getOneProblemAction,
    addProblem: addProblemAction,
    editProblem: editProblemAction,
  }
)(Index)