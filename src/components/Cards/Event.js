import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  title: {
    color: '#4d4a70',
  },

  paper: {
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
  },
  media: {
    height: 200,
  },
}));

const Event = ({
  id: eventId,
  title,
  role,
}) => {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <Card className={classes.paper}>
      <CardActionArea disabled>
        <CardMedia
          className={classes.media}
          image="/logo.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h3" className={classes.title} align='center'>
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
            component={Link}
            to={`/events/join_event/${eventId}/`}
            color="secondary">
            {'عضویت'}
          </Button>
        }
      </CardActions>
    </Card>
  );
};

export default Event;
