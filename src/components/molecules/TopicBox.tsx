import {
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import {
  getSubtopicsAction,
  getTopicsAction,
} from '../../redux/slices/problem';
import Topic from '../atoms/Topic';
import { TopicType, SubtopicType } from '../../types/Models';

type TopicBoxPropsType = {
  mode?: 'view' | 'edit';
  getTopics: any;
  getSubtopics: any;

  topics: TopicType[];
  subtopics: SubtopicType[];

  setProperties: any;
  properties: any;
}

const TopicBox: FC<TopicBoxPropsType> = ({
  getTopics,
  getSubtopics,
  setProperties,

  topics,
  subtopics,
  mode = 'edit',
  properties,
}) => {

  useEffect(() => {
    getTopics({});
    getSubtopics({});
  }, [])

  const handleClickTopic = (id) => {
    const selectedTopics = [...properties.topics];
    const selectedSubtopics = [...properties.subtopics];
    const index = selectedTopics.indexOf(id);
    if (index > -1) {
      selectedTopics.splice(index, 1);
      subtopics
        .filter(subtopic => subtopic.topic === id)
        .forEach(subtopic => {
          const index = selectedSubtopics.indexOf(subtopic.id);
          if (index > -1) {
            selectedSubtopics.splice(index, 1);
          }
        })
    } else {
      selectedTopics.push(id)
    }
    setProperties({
      ...properties,
      topics: selectedTopics,
      subtopics: selectedSubtopics,
    })
  }

  const handleClickSubtopic = (id) => {
    const selectedSubtopics = [...properties.subtopics];
    const index = selectedSubtopics.indexOf(id);
    if (index > -1) {
      selectedSubtopics.splice(index, 1);
    } else {
      selectedSubtopics.push(id)
    }
    setProperties({
      ...properties,
      subtopics: selectedSubtopics,
    })
  }

  const shownTopics = topics.filter(topic => mode == 'edit' || (mode == 'view' && properties.topics.includes(topic.id)))
  const shownSubtopics = subtopics.filter((subtopic) =>
    properties.topics.includes(subtopic.topic) &&
    (mode == 'edit' || (mode == 'view' && properties.subtopics.includes(subtopic.id))))

  return (
    <Stack justifyContent='center' alignItems='stretch' spacing={2}>
      <Stack spacing={1}>
        <Typography gutterBottom variant='h3'>{'موضوعات'}</Typography>
        <Paper sx={{ padding: 2 }}>
          {
            shownTopics.length == 0
              ? <Typography>موضوعی وجود ندارد</Typography>
              : shownTopics.map(topic => (
                <Topic
                  key={topic.id} name={topic.title}
                  selected={properties.topics.includes(topic.id)}
                  clickable={mode === 'edit'}
                  onClick={() => handleClickTopic(topic.id)}
                />
              ))
          }
        </Paper>
      </Stack>
      <Stack spacing={1}>
        <Typography gutterBottom variant='h3'>{'زیرموضوعات'}</Typography>
        <Paper sx={{ padding: 2 }}>
          {
            shownSubtopics.length == 0
              ? <Typography>زیرموضوعی وجود ندارد</Typography>
              : shownSubtopics.map((subtopic) => (
                <Topic
                  key={subtopic.id} name={subtopic.title}
                  selected={properties.subtopics.includes(subtopic.id)}
                  clickable={mode === 'edit'}
                  onClick={() => handleClickSubtopic(subtopic.id)}
                />
              ))
          }
        </Paper>
      </Stack>
    </Stack>
  );
}

const mapStateToProps = (state) => ({
  topics: state.problem.topics,
  subtopics: state.problem.subtopics,
})

export default connect(mapStateToProps, {
  getTopics: getTopicsAction,
  getSubtopics: getSubtopicsAction,
})(TopicBox);