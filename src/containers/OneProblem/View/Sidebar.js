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
import { Link, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}))

import {
  getAllEventsAction,
  allEvents,
} from '../../../redux/slices/event';
import {
  addProblemToGroupAction,
} from '../../../redux/slices/problem';

const Index = ({
  getAllEvents,
  problem,
  addProblemToGroup,

  allEvents,
}) => {
  const classes = useStyles();
  const { problemId, mode } = useParams();
  const [selectedProblemGroupId, setSelectedProblemGroupId] = useState();
  const [problemGroups, setProblemGroups] = useState([]);

  useEffect(() => {
    getAllEvents({});
  }, []);

  console.log(allEvents)
  const accessibleEvents = allEvents.filter((event) => event.role == 'mentor' || event.role == 'owner')

  const doAddProblemToGroupProblem = () => {
    addProblemToGroup({
      problemId,
      problemGroupId: selectedProblemGroupId,
    })
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
                    name='problem_type'
                    label='نوع مسئله'>
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
                    name='problem_type'
                    label='نوع مسئله'>
                    {problemGroups?.map((problemGroup) => (
                      <MenuItem key={problemGroup.id} value={problemGroup.id}>
                        {problemGroup.title}
                      </MenuItem>

                    ))}
                  </Select>
                </FormControl >
              </Grid>
              <Grid item xs={12}>
                <Button onClick={doAddProblemToGroupProblem} fullWidth variant='outlined'>
                  {'افزودن'}
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
  addProblemToGroup: addProblemToGroupAction,
})(Index);