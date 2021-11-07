import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import {
  getAllSubmittedProblemsAction,
} from '../redux/slices/mentor';
import {
  addNotificationAction,
} from '../redux/slices/notifications';
import Layout from './Layout';
import { toPersianNumber } from '../utils/translateNumber'

const useStyles = makeStyles((theme) => ({
}))

const Index = ({
  addNotification,
  getAllSubmittedProblems,

  allSubmittedProblems,
  isFetching,
}) => {
  const classes = useStyles();

  React.useEffect(() => {
    getAllSubmittedProblems();
  }, [])

  const filteredData = allSubmittedProblems?.slice()?.sort((a, b) => a.id - b.id);

  console.log(filteredData)

  return (
    <Layout>
      <Grid container spacing={4} justify='center' alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>
            {'«پاسخ‌های ارسال‌شده»'}
          </Typography>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>شناسه</TableCell>
                <TableCell align='center'>گروه‌مسئله</TableCell>
                <TableCell align='center'>نمره</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.map((problem) =>
                <TableRow key={problem.index}>
                  <TableCell align='center'>
                    <Button
                      variant='outlined'
                      component={Link}
                      to={`/submitted_answer/${problem.id}/`}>
                      {toPersianNumber(problem.id)}
                    </Button>
                  </TableCell>
                  <TableCell align='center'>
                    {toPersianNumber(problem.problem_group)}
                  </TableCell>
                  <TableCell align='center'>
                    {problem.status == 'Judged' ? toPersianNumber(problem.mark) : 'نامعین'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid >
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  allSubmittedProblems: state.mentor.allSubmittedProblems,
})

export default connect(
  mapStateToProps,
  {
    getAllSubmittedProblems: getAllSubmittedProblemsAction,
  }
)(Index)