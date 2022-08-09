import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import EventCard from '../components/Cards/Event';
import JoinEvent from '../components/Dialog/JoinEvent';
import {
  getAllEventsAction,
} from '../redux/slices/event';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 40,
    fontWeight: 600,
    textShadow: '1px 1px #dbd9d9',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 400,
    textShadow: '1px 1px #dbd9d9',
  },
  listItem: {
    fontSize: 20,
    fontWeight: 300,
    textShadow: '1px 1px #dbd9d9',
  },
}));

const Events = ({
  getAllEvents,
  allEvents,
}) => {
  const { eventId } = useParams();
  const classes = useStyles();
  const [showJoinEventDialog, setShowEventDialog] = useState(false);

  useEffect(() => {
    if (eventId) {
      setShowEventDialog(true);
    } else {
      setShowEventDialog(false);
    }
  }, [eventId])

  useEffect(() => {
    getAllEvents({});
  }, []);

  return (
    <Layout>
      <Grid container spacing={4} justifyContent='center' alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>
            {'«رویدادها»'}
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {allEvents?.map((event, index) => (
            <Grid key={index} item xs={12} sm={4} md={3}>
              <EventCard {...event} />
            </Grid>
          ))}
        </Grid>
      </Grid >
      <JoinEvent eventId={eventId} open={showJoinEventDialog} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  allEvents: state.event.allEvents,
});

export default connect(
  mapStateToProps,
  {
    getAllEvents: getAllEventsAction,
  }
)(Events);
