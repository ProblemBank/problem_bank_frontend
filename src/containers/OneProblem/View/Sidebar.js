import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles, FormLabel,
  MenuItem,
  Paper,
  RadioGroup,

  Select,
  TextField,
  FormControlLabel,
  Radio,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}))

import {
  getAllEventsAction,
} from '../../../redux/slices/event';
import {
  addProblemToGroupAction,
  copyProblemToGroupAction,
} from '../../../redux/slices/problem';
import {
  addNotificationAction,
} from '../../../redux/slices/notifications';

const Index = ({
  getAllEvents,
  problem,
  copyProblemToGroup,
  addProblemToGroup,
  addNotification,

  allEvents,
}) => {
  const classes = useStyles();
  const { problemId, mode } = useParams();
  const [selectedProblemGroupId, setSelectedProblemGroupId] = useState();
  const [selectedCopyType, setSelectCopyType] = useState('add');
  const [problemGroups, setProblemGroups] = useState([]);

  useEffect(() => {
    getAllEvents({});
  }, []);

  const accessibleEvents = allEvents.filter((event) => event.role == 'mentor' || event.role == 'owner')

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
      <Grid container spacing={3} justify='center'>
        {mode == 'mentor_view' &&
          <Grid item xs={12}>
            <Button component={Link} to={`/problem/edit/${problemId}/`}
              size='large' variant='contained' fullWidth color='primary'>
              {'ویرایش'}
            </Button>
          </Grid>
        }
        <Grid item xs={12}>
          <Paper elevation={4} className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom variant='h5' align='center'>{'افزودن مسئله به گروه‌مسئله'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>رویداد</InputLabel>
                  <Select
                    onChange={(e) => setProblemGroups(allEvents.filter((event) => event.id == e.target.value)?.[0]?.problem_groups)}
                    label='رویداد'>
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
                  <InputLabel>گروه‌مسئله</InputLabel>
                  <Select
                    onChange={(e) => setSelectedProblemGroupId(e.target.value)}
                    label='گروه‌مسئله'>
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
  )
}

const mapStateToProps = (state) => ({
  allEvents: state.event.allEvents,
});

export default connect(mapStateToProps, {
  getAllEvents: getAllEventsAction,
  copyProblemToGroup: copyProblemToGroupAction,
  addProblemToGroup: addProblemToGroupAction,
  addNotification: addNotificationAction,
})(Index);