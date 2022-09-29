import {
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import AreYouSure from '../../components/Dialog/AreYouSure';
import TinyPreview from '../../components/tiny_editor/react_tiny/Preview';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';
import {
  addProblemAction,
  addProblemToGroupAction,
  editProblemAction,
  getOneProblemAction,
} from '../../redux/slices/problem';
import Layout from '../../components/templates/Layout';
import AddProblemToProblemGroup from '../../components/molecules/AddProblemToProblemGroup';
import ViewProperties from '../../components/molecules/ViewProperties';

const ViewProblem = ({
  getProblem,
  problem,
}) => {
  const { eventId, problemGroupId, problemId, mode } = useParams();
  const [isDialogOpen, setDialogStatus] = useState(false);

  useEffect(() => {
    getProblem({ problemId });
  }, [])

  if (!problem) {
    return <></>
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
            <Stack spacing={2} component={Paper} sx={{ padding: 2 }}>
              <Typography gutterBottom variant='h2' align='center'>صورت</Typography>
              <Divider />
              <TinyPreview
                content={problem?.text}
                frameProps={{
                  frameBorder: '0',
                  scrolling: 'no',
                  width: '100%',
                }}
              />
              <Typography gutterBottom variant='h2' align='center'>پاسخ</Typography>
              <Divider />
              <TinyPreview
                content={problem?.answer?.text}
                frameProps={{
                  frameBorder: '0',
                  scrolling: 'no',
                  width: '100%',
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2} component={Paper} sx={{ padding: 2 }}>
              <ViewProperties problem={problem} />
              {mode === 'mentor-view' &&
                <Button component={Link} fullWidth
                  to={`/event/${eventId}/problem-group/${problemGroupId}/problem/${problemId}/edit/`}
                  size='large' variant='contained' color='primary'>
                  {'ویرایش'}
                </Button>
              }
              {mode !== 'mentor-view' &&
                <AddProblemToProblemGroup />
              }
            </Stack>
          </Grid>
        </Grid>
      </Grid >
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => { setDialogStatus(!isDialogOpen) }}
        callBackFunction={() => { }}
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

export default connect(mapStateToProps, {
  addProblemToGroup: addProblemToGroupAction,
  getProblem: getOneProblemAction,
  addProblem: addProblemAction,
  editProblem: editProblemAction,
  addNotification: addNotificationAction,
})(ViewProblem)