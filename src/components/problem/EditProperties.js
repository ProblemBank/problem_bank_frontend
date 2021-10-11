import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  getAllTopicsAction,
  getAllSubtopicsAction,
} from '../../redux/slices/problem';
import Tag from './Tag';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  chip: {
    margin: '2px',
  },
  formControl: {
    width: '100%'
  },
}));

const PropertiesBox = ({
  getAllTopics,
  getAllSubtopics,

  allTopics,
  allSubtopics,

  setProperties,
  properties,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getAllTopics({});
    getAllSubtopics({});
  })

  const handleSelect = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = (id, listName) => {
    const temporaryTagsList = properties[listName];
    if (temporaryTagsList.includes(id)) {
      for (let i = 0; i < temporaryTagsList.length; i++) {
        if (temporaryTagsList[i] === id) {
          temporaryTagsList.splice(i, 1);
        }
      }
      if (listName === 'tags') {
        const temporarySubtagsList = properties['subtags'];
        for (var subtag of allSubtopics) {
          if (subtag.parent === id) {
            for (let i = 0; i < temporarySubtagsList.length; i++) {
              if (temporarySubtagsList[i] === subtag.id) {
                temporarySubtagsList.splice(i, 1);
              }
            }
          }
        }
        setProperties({
          ...properties,
          'subtags': temporarySubtagsList,
        })
      }
    } else {
      temporaryTagsList.push(id)
    }
    setProperties({
      ...properties,
      [listName]: temporaryTagsList,
    })
  }

  return (
    <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
      <Grid item container>
        <Typography gutterBottom variant='h3'>موضوعات کلی</Typography>
        <Paper className={classes.paper}>
          {allTopics.map((tag) => (
            <Tag key={tag.id} name={tag.name} selected={properties.tags.includes(tag.id)}
              clickable={true}
              onClick={() => handleClick(tag.id, 'tags')}
            />
          ))}
        </Paper>
      </Grid>
      <Grid item container>
        <Typography gutterBottom variant='h3'>موضوعات جزئی</Typography>
        <Paper className={classes.paper}>
          {allSubtopics.filter((subtag) => properties.tags.includes(subtag.parent)).length == 0 &&
            <Typography>موضوع جزئی وجود ندارد!</Typography>}
          {allSubtopics.filter((subtag) => properties.tags.includes(subtag.parent)).map((subtag) => (
            <Tag key={subtag.id} name={subtag.name} selected={properties.subtags.includes(subtag.id)}
              clickable={true}
              onClick={() => handleClick(subtag.id, 'subtags')}
            />
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state, props) => ({
  allTopics: state.problem.topics,
  allSubtopics: state.problem.subtopics,
})

export default connect(
  mapStateToProps,
  {
    getAllTopics: getAllTopicsAction,
    getAllSubtopics: getAllSubtopicsAction,

  }
)(PropertiesBox);