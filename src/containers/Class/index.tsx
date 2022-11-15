import { Grid, Typography } from '@mui/material';
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
import Layout from '../../components/templates/Layout';
import ProblemsList from './ProblemsList';
import Sidebar from './Sidebar';

const Class = ({
  getEvent,
  event,
}) => {
  const { eventId } = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  const [problemGroups, setProblemGroups] = useState([]);

  useEffect(() => {
    getEvent({ eventId }).then(({ payload: { response }, meta: { requestStatus } }) => {
      if (requestStatus === 'fulfilled') {
        setProblemGroups(response.problem_groups);
      };
    })
  }, []);

  return (
    <Layout>
      <Grid container spacing={2} justifyContent="center" alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>
            {event?.title && `«${event?.title}»`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Sidebar tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </Grid>
        <Grid item xs={12} sm={8}>
          {problemGroups[tabIndex] &&
            <ProblemsList role={event.role} problemGroupId={problemGroups[tabIndex].id} />
          }
        </Grid>
      </Grid>
    </Layout >
  );
};

const mapStateToProps = (state) => ({
  event: state.event.event,
})

export default connect(mapStateToProps, {
  getEvent: getOneEventAction,
  editEvent: editEventAction,
  getProblemGroup: getProblemGroupAction,
})(Class);
