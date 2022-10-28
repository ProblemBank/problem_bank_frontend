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
  getProblemGroup,

  event,
}) => {
  const { eventId } = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  
  useEffect(() => {
    getEvent({ eventId });
  }, []);

  useEffect(() => {
    if (event?.problem_groups?.length > 0) {
      getProblemGroup({ problemGroupId: event.problem_groups?.[tabIndex]?.id });
    }
  }, [tabIndex, event])

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
          <ProblemsList tabIndex={tabIndex} setTabIndex={setTabIndex} />
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
