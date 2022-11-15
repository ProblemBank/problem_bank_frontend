import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Topic from '../../components/atoms/Topic';
import {
  getTopicsAction,
} from '../../redux/slices/problem';
import { toPersianNumber } from '../../utils/translateNumber';

const PERSIAN_DIFFICULTIES = {
  'VeryEasy': 'بسیار آسان',
  'Easy': 'آسان',
  'Medium': 'متوسط',
  'Hard': 'سخت',
  'VeryHard': 'خیلی سخت',
}

type ProblemsTablePropsType = {
  problems: any;
  topics: any;
}

const ProblemsTable: FC<ProblemsTablePropsType> = ({
  problems,
  topics,
}) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>
              {'شناسه'}
            </TableCell>
            <TableCell align='center'>
              {'نام'}
            </TableCell>
            <TableCell align='center'>
              {'موضوعات اصلی'}
            </TableCell>
            <TableCell align='center'>
              {'درجه سختی'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems?.map(
            (problem, index) =>
              <TableRow key={index}>
                <TableCell align='center'>
                  {toPersianNumber(problem.id)}
                </TableCell>
                <TableCell align='center'>
                  <Button component={Link} to={`/problem/${problem.id}/view/`}>
                    {problem.title}
                  </Button>
                </TableCell>
                <TableCell align='center'>
                  {topics
                    .filter(topic => problem.topics.includes(topic.id))
                    .map((topic, index) => (
                      <Topic
                        selected={false}
                        clickable={true}
                        onClick={() => { }}
                        name={topic.title}
                        key={index}
                      />
                    ))}
                </TableCell>
                <TableCell align='center'>
                  {PERSIAN_DIFFICULTIES[problem.difficulty]}
                </TableCell>
              </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapStateToProps = (state) => ({
  topics: state.problem.topics,
})

export default connect(mapStateToProps, {
  getTopics: getTopicsAction,
})(ProblemsTable);