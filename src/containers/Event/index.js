import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  editEventAction,
  getOneEventAction,
} from '../../redux/slices/event';
import {
  getProblemGroupAction,
} from '../../redux/slices/problemGroup';
import Layout from '../Layout';
import ProblemsList from './ProblemsList';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const Event = ({
  getEvent,
  getProblemGroup,

  event,
}) => {
  const classes = useStyles();
  const { eventId } = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    getEvent({ eventId });
  }, []);

  useEffect(() => {
    if (event?.problem_groups.length > 0) {
      getProblemGroup({ problemGroupId: event.problem_groups[tabIndex].id });
    }
  }, [tabIndex])

  return (
    <Layout>
      <Grid container spacing={2} justify="center" alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>
            {event?.title && `«${event?.title}»`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Sidebar tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <ProblemsList tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </Grid>
      </Grid>
    </Layout >
  );
};

const mapStateToProps = (state) => ({
  event: state.event.event,
  problemGroup: state.problemGroup.problemGroup,
})

export default connect(
  mapStateToProps,
  {
    getEvent: getOneEventAction,
    editEvent: editEventAction,
    getProblemGroup: getProblemGroupAction,
  }
)(Event);
