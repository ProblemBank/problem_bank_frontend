import {
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  getOneProblemAction,
} from '../../redux/slices/problem';
import { ProblemPropsType } from '../../types/Models';
import TopicBox from './TopicBox';

const persianGrade = {
  ElementarySchoolFirstHalf: 'اول تا سوم دبستان',
  ElementarySchoolSecondHalf: 'چهارم تا ششم دبستان',
  HighSchoolFirstHalf: 'دوره اول متوسطه',
  HighSchoolSecondHalf: 'دوره دوم متوسطه',
}

const persianDifficulty = {
  VeryEasy: 'بسیار آسان',
  Easy: 'آسان',
  Medium: 'متوسط',
  Hard: 'سخت',
  VeryHard: 'خیلی سخت',
}

type ViewPropertiesPropsType = {
  problem: ProblemPropsType;
}

const ViewProperties: FC<ViewPropertiesPropsType> = ({
  problem,
}) => {

  return (
    <>
      <Chip
        sx={{ margin: '2px' }}
        label={<Typography variant='h6'>{`پایه: ${persianGrade[problem.grade]}`}</Typography>}
        variant='outlined'
      />

      <Chip
        sx={{ margin: '2px' }}
        label={<Typography variant='h6'>{`درجه سختی: ${persianDifficulty[problem.difficulty]}`}</Typography>}
        variant='outlined'
      />

      <TopicBox
        mode='view'
        properties={{
          topics: problem.topics,
          subtopics: problem.subtopics,
        }}
        setProperties={null} />
    </>
  );
}

export default connect(null, {
  getProblem: getOneProblemAction,
})(ViewProperties);