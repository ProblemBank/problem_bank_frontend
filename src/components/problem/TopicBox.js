import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  getAllSubtopicsAction,
  getAllTopicsAction,
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

const Index = ({
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
  }, [])

  // todo: make cleaner
  const handleClick = (id, listName) => {
    const temporaryList = [...properties[listName]];
    const temporarySubtopicsList = [...properties['subtopics']];
    if (temporaryList.includes(id)) {
      for (let i = 0; i < temporaryList.length; i++) {
        if (temporaryList[i] === id) {
          temporaryList.splice(i, 1);
        }
      }
      if (listName === 'topics') {
        for (var subtopic of allSubtopics) {
          if (subtopic.topic === id) {
            for (let i = 0; i < temporarySubtopicsList.length; i++) {
              if (temporarySubtopicsList[i] === subtopic.id) {
                temporarySubtopicsList.splice(i, 1);
              }
            }
          }
        }
      }
    } else {
      temporaryList.push(id)
    }
    setProperties({
      ...properties,
      'subtopics': temporarySubtopicsList,
      [listName]: temporaryList,
    })
  }

  return (
    <Grid container item direction='column' justifyContent='center' alignItems='center' spacing={2}>
      <Grid item container>
        <Typography gutterBottom variant='h3'>موضوعات کلی</Typography>
        <Paper className={classes.paper}>
          {allTopics?.map((topic) => (
            <Tag key={topic.id} name={topic.title} selected={properties?.topics?.includes(topic.id)}
              clickable={true}
              onClick={() => handleClick(topic.id, 'topics')}
            />
          ))}
        </Paper>
      </Grid>
      <Grid item container>
        <Typography gutterBottom variant='h3'>موضوعات جزئی</Typography>
        <Paper className={classes.paper}>
          {
            allSubtopics?.filter((subtopic) => properties?.topics?.includes(subtopic.topic)).length == 0 &&
            <Typography>موضوع جزئی وجود ندارد!</Typography>
          }
          {
            allSubtopics?.filter((subtopic) => properties?.topics?.includes(subtopic.topic)).map((subtopic) => (
              <Tag key={subtopic.id} name={subtopic.title} selected={properties.subtopics.includes(subtopic.id)}
                clickable={true}
                onClick={() => handleClick(subtopic.id, 'subtopics')}
              />
            ))
          }
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  // todo; FIX TOF
  allTopics: [],
  allSubtopics: [],
})

export default connect(
  mapStateToProps,
  {
    getAllTopics: getAllTopicsAction,
    getAllSubtopics: getAllSubtopicsAction,

  }
)(Index);