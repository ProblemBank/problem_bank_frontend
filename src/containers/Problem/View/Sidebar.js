import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  FormLabel,
  MenuItem,
  Paper,
  RadioGroup,
  Select,
  TextField,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  getEventsAction,
} from '../../../redux/slices/event';
import {
  addProblemToGroupAction,
  copyProblemToGroupAction,
} from '../../../redux/slices/problem';
import {
  addNotificationAction,
} from '../../../redux/slices/notifications';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}))

const Index = ({
  getEvents,
  problem,
  copyProblemToGroup,
  addProblemToGroup,
  addNotification,

  events,
}) => {
  const classes = useStyles();
  const { problemId, mode } = useParams();
  const [selectedProblemGroupId, setSelectedProblemGroupId] = useState();
  const [selectedCopyType, setSelectCopyType] = useState('add');
  const [problemGroups, setProblemGroups] = useState([]);
  const { eventId, problemGroupId } = useParams();

  useEffect(() => {
    getEvents();
  }, []);

  const accessibleEvents = events.filter((event) => event.role == 'mentor' || event.role == 'owner')

  const doCopyProblemToGroup = () => {
    if (!selectedCopyType || !selectedProblemGroupId) {
      addNotification({
        message: 'لطفاً همه‌ی موارد خواسته شده را پر کنید.',
        type: 'error',
      });
      return;
    }
    if (selectedCopyType == 'add') {
      addProblemToGroup({
        problemId,
        problemGroupId: selectedProblemGroupId,
      })
    } else if (selectedCopyType == 'copy') {
      copyProblemToGroup({
        problemId,
        problemGroupId: selectedProblemGroupId,
      })
    }
  }

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} justifyContent='center'>
        {mode == 'mentor_view' &&
          <Grid item xs={12}>
            <Button component={Link} to={`/event/${eventId}/problem-group/${problemGroupId}/problem/${problemId}/edit/`}
              size='large' variant='contained' fullWidth color='primary'>
              {'ویرایش'}
            </Button>
          </Grid>
        }
        <Grid item xs={12}>
          <Paper elevation={4} className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom variant='h5' align='center'>{'افزودن مسئله به صندوقچه'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>کلاس</InputLabel>
                  <Select
                    onChange={(e) => setProblemGroups(events.filter((event) => event.id == e.target.value)?.[0]?.problem_groups)}
                    label='کلاس'>
                    {accessibleEvents.map((event) => (
                      <MenuItem key={event.id} value={event.id}>
                        {event.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl >
              </Grid>
              <Grid item xs={12}>
                <FormControl disabled={problemGroups?.length == 0 ? true : false} variant="outlined" fullWidth>
                  <InputLabel>صندوقچه</InputLabel>
                  <Select
                    onChange={(e) => setSelectedProblemGroupId(e.target.value)}
                    label='صندوقچه'>
                    {problemGroups?.map((problemGroup) => (
                      <MenuItem key={problemGroup.id} value={problemGroup.id}>
                        {problemGroup.title}
                      </MenuItem>

                    ))}
                  </Select>
                </FormControl >
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>نوع عملیات</FormLabel>
                  <RadioGroup row value={selectedCopyType} onChange={(e) => setSelectCopyType(e.target.value)}>
                    <FormControlLabel value="add" control={<Radio />} label="اضافه‌کردن" />
                    <FormControlLabel value="copy" control={<Radio />} label="کپی‌کردن" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={doCopyProblemToGroup} fullWidth variant='outlined'>
                  {'ثبت'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  events: state.event.events,
});

export default connect(mapStateToProps, {
  getEvents: getEventsAction,
  copyProblemToGroup: copyProblemToGroupAction,
  addProblemToGroup: addProblemToGroupAction,
  addNotification: addNotificationAction,
})(Index);