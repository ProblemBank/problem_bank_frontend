import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Chip,
  Grid,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

import { toPersianNumber } from '../../utils/translateNumber';

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
  id,
  title,
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
        <Button
          size="small"
          variant="contained"
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
