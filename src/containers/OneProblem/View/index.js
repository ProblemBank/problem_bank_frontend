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

import AreYouSure from '../../../components/Dialog/AreYouSure';
import TinyPreview from '../../../components/tiny_editor/react_tiny/Preview';
import {
  addNotificationAction,
} from '../../../redux/slices/notifications';
import {
  addProblemAction,
  addProblemToGroupAction,
  editProblemAction,
  getOneProblemAction,
} from '../../../redux/slices/problem';
import Layout from '../../Layout';
import SideBar from './Sidebar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}))

const Index = ({
  getProblem,

  problem,
}) => {
  const classes = useStyles();
  const { problemId } = useParams();
  const [isDialogOpen, setDialogStatus] = useState(false);

  useEffect(() => {
    getProblem({ problemId });
  }, [])

  return (
    <Layout>
      <Grid container spacing={4} justify="center" alignItems='flex-start'>
        <Grid item>
          <Typography variant="h1" align="center">
            {problem?.title && `«${problem?.title}»`}
          </Typography>
        </Grid>
        <Grid item container spacing={4} alignItems='flex-start'>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2} justify='center' component={Paper}>
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
                <Typography gutterBottom variant='h3' align='center'>پاسخ</Typography>
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
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <SideBar />
          </Grid>
        </Grid>
      </Grid >
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => { setDialogStatus(!isDialogOpen) }}
        callBackFunction={() => { }}
      />
    </Layout>
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