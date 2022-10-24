import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import JoinEvent from '../Dialog/JoinEventDialog';

const EventCard = ({
  id: eventId,
  title,
  role,
}) => {
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const joinEventId = query.get('join_event_id');
  const [showJoinDialog, setShowJoinDialog] = useState(joinEventId == eventId);

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%',

        width: '100%',
        padding: '0px !important',
        maxWidth: '400px',
        backgroundColor: 'rgb(255, 255, 255, 0.94)',
        fontSize: '1rem',
        textDecoration: 'none',
        overflow: 'hidden',
        boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.1s ease-in-out',
        '&:hover': {
          transform: 'translateY(-0.1rem) scale(1.01)',
          boxShadow: '0 0.5em 1rem -1rem rgba(0, 0, 0, 0.5)',
        },
      }}>
      <CardActionArea disabled>
        <CardMedia
          sx={{ height: 200 }}
          image="/logo.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h3" sx={{ color: '#4d4a70', }} align='center'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {(role == 'participant' || role == 'mentor' || role == 'owner') ?
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to={`/event/${eventId}/`}
            color="secondary">
            {'ورود'}
          </Button> :
          <Button
            variant='outlined'
            fullWidth
            onClick={() => setShowJoinDialog(true)}
            // component={Link}
            // to={`/events/join_event/${eventId}/`}
            color="secondary">
            {'عضویت'}
          </Button>
        }
      </CardActions>
      <JoinEvent open={showJoinDialog} eventId={eventId} handleClose={() => setShowJoinDialog(false)} />
    </Card>
  );
};

export default EventCard;
