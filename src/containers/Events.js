import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/Cards/Event';
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
  const classes = useStyles();

  useEffect(() => {
    getAllEvents({});
  }, []);

  return (
    <Layout>
      <Grid container spacing={4} justify='center' alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>
            {'«رویدادها»'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          {allEvents?.map((event, index) => (
            <Grid key={index} item>
              <EventCard {...event} />
            </Grid>
          ))}
        </Grid>
      </Grid >
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
