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

import ClassCard from '../../components/Cards/ClassCard';
import CreateEventDialog from '../../components/organisms/dialogs/CreateEventDialog';
import {
  getEventsAction,
} from '../../redux/slices/event';


const MyClasses = ({
  getEvents,
  events,
}) => {
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);

  useEffect(() => {
    getEvents({ my_events: true });
  }, []);

  return (
    <Grid container spacing={4} justifyContent='center' alignItems='flex-start'>
      <Grid item xs={12}>
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
      <CreateEventDialog
        open={showCreateEventDialog}
        handleClose={() => setShowCreateEventDialog(state => !state)} />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.events,
});

export default connect(mapStateToProps, {
  getEvents: getEventsAction,
})(MyClasses);
