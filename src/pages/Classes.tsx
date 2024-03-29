import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import ClassCard from '../components/Cards/ClassCard';
import {
  getEventsAction,
} from '../redux/slices/event';
import Layout from '../components/templates/Layout';

const Events = ({
  getEvents,
  events,
}) => {
  const { eventId } = useParams();
  const [showJoinEventDialog, setShowEventDialog] = useState(false);

  useEffect(() => {
    if (eventId) {
      setShowEventDialog(true);
    } else {
      setShowEventDialog(false);
    }
  }, [eventId])

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Layout backgroundImage=''>
      <Grid container spacing={4} justifyContent='center' alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1">
            {'همه کلاس‌ها'}
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {events.length > 0 ?
            events.slice().sort((a, b) => b.id - a.id).map((event, index) => (
              <Grid container key={index} item xs={12} sm={4} md={3} justifyContent='center'>
                <ClassCard {...event} />
              </Grid>
            )) :
            <Typography align='center' variant='h4'>
              {'کلاسی وجود ندارد!'}
            </Typography>
          }
        </Grid>
      </Grid >
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.events,
});

export default connect(
  mapStateToProps,
  {
    getEvents: getEventsAction,
  }
)(Events);
