import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getOneProblemAction,
} from '../../redux/slices/problem';
import TopicBox from './TopicBox';

const SetProperties = ({
  getProblem,
  setProperties,

  problem,
  properties,
}) => {
  const { mode, problemId } = useParams();

  useEffect(() => {
    if (mode == 'edit') {
      getProblem({ problemId });
    }
  }, [])

  useEffect(() => {
    if (problem && mode == 'edit') {
      const newProperties = {
        ...properties
      }
      for (const key in problem) {
        if ((Array.isArray(problem[key]) && problem[key].length > 0) ||
          (!Array.isArray(problem[key]) && problem[key])) {
          newProperties[key] = problem[key];
        }
      }
      setProperties(newProperties);
    }
  }, [problem]);

  const putData = (e) => {
    if (e.target.name == 'answer') {
      setProperties({
        ...properties,
        answer: {
          ...properties.answer,
          text: e.target.value,
        }
      })
    } else {
      setProperties({
        ...properties,
        [e.target.name]: e.target.value,
      })
    }
  }

  return (
    <>
      <TextField
        fullWidth variant='outlined'
        label='عنوان'
        name='title'
        onChange={putData}
        value={properties.title} />
      {mode == 'add' &&
        <FormControl variant="outlined" fullWidth>
          <InputLabel>نوع مسئله</InputLabel>
          <Select
            value={properties.problem_type}
            onChange={putData}
            name='problem_type'
            label='نوع مسئله'>
            <MenuItem value={'DescriptiveProblem'}>{'تشریحی'}</MenuItem>
            <MenuItem value={'ShortAnswerProblem'}>{'کوتاه‌پاسخ'}</MenuItem>
          </Select>
        </FormControl >
      }
      <FormControl variant="outlined" fullWidth>
        <InputLabel>پایه</InputLabel>
        <Select
          value={properties.grade}
          onChange={putData}
          name='grade'
          label='پایه'>
          <MenuItem value={'ElementarySchoolFirstHalf'}>{'اول تا سوم ابتدایی'}</MenuItem>
          <MenuItem value={'ElementarySchoolSecondHalf'}>{'چهارم تا ششم ابتدایی'}</MenuItem>
          <MenuItem value={'HighSchoolFirstHalf'}>{'متوسطه دوره اول'}</MenuItem>
          <MenuItem value={'HighSchoolSecondHalf'}>{'متوسطه دوره دوم'}</MenuItem>
        </Select>
      </FormControl >
      <FormControl variant="outlined" fullWidth>
        <InputLabel>سختی</InputLabel>
        <Select
          value={properties.difficulty}
          onChange={putData}
          name='difficulty'
          label='سختی'>
          <MenuItem value={'VeryEasy'}>{'بسیار‌آسان'}</MenuItem>
          <MenuItem value={'Easy'}>{'آسان'}</MenuItem>
          <MenuItem value={'Medium'}>{'متوسط'}</MenuItem>
          <MenuItem value={'Hard'}>{'سخت'}</MenuItem>
          <MenuItem value={'VeryHard'}>{'بسیارسخت'}</MenuItem>
        </Select>
      </FormControl >
      <TopicBox properties={properties} setProperties={setProperties} />
    </>
  );
}

const mapStateToProps = (state) => ({
  problem: state.problem.problem,
})

export default connect(mapStateToProps, {
  getProblem: getOneProblemAction,
})(SetProperties)