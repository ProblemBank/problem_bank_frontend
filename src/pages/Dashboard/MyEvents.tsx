import {
  Grid,
  Typography,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import EventCard from '../../components/Cards/EventCard';
import CreateEventDialog from '../../components/organisms/dialogs/CreateEventDialog';
import {
  getEventsAction,
} from '../../redux/slices/event';


const MyEvents = ({
  getEvents,
  events,
}) => {
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);

  useEffect(() => {
    getEvents({ my_events: true });
  }, []);

  return (
    <Stack sx={{ width: '100%' }} spacing={4} alignItems='flex-start'>
      <Stack direction='row' alignItems='center'>
        <Typography variant="h1">
          {'کلاس‌های من'}
        </Typography>
        <Tooltip arrow title='ایجاد کلاس جدید'>
          <IconButton onClick={() => setShowCreateEventDialog(true)}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Stack>
        <Grid container spacing={2} justifyContent='center'>
          {events.length > 0 ?
            events.map((event, index) => (
              <Grid key={index} item xs={12} sm={4} md={3}>
                <EventCard {...event} />
              </Grid>
            )) :
            <Typography align='center' variant='h4'>
              {'کلاسی وجود ندارد!'}
            </Typography>
          }
        </Grid>
      </Stack>
      <CreateEventDialog
        open={showCreateEventDialog}
        handleClose={() => setShowCreateEventDialog(state => !state)} />
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.events,
});

export default connect(mapStateToProps, {
  getEvents: getEventsAction,
})(MyEvents);
