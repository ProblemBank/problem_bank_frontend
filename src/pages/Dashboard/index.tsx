import {
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import EventCard from '../../components/Cards/EventCard';
import JoinEvent from '../../components/Dialog/JoinEventDialog';
import {
  getEventsAction,
} from '../../redux/slices/event';
import Layout from '../../components/templates/Layout';
import MyEvents from './MyEvents';

const Dashboard = ({

}) => {
  return (
    <Layout backgroundImage=''>
      <MyEvents />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.events,
});

export default connect(mapStateToProps, {
  getEvents: getEventsAction,
})(Dashboard);
