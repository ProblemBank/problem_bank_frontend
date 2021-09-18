import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

import { toPersianNumber } from '../../utils/translateNumber';

const useStyles = makeStyles(() => ({
  notificationTitle: {
    color: '#4d4a70',
  },
  paper: {
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
  content: {
    padding: '10px !important',
  },
  noPadding: {
    padding: '0px !important',
  },
  eventImage: {
    height: '100%',
    maxHeight: '300px',
    width: '100%',
    objectFit: 'cover',
  },
}));

const Event = ({
  id,
  title,
}) => {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <Card className={classes.paper}>
      <CardContent>
        <Typography variant="h3" className={classes.notificationTitle} align='center'>
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          fullWidth
          component={Link}
          to={`/event/${id}/`}
          color="secondary">
          {'ورود'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Event;
