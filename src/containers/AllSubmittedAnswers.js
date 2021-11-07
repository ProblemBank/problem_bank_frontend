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

const useStyles = makeStyles((theme) => ({
  centerItems: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
  textArea: {
    width: '100%',
    resize: 'vertical',
    borderRadius: '10px',
    minHeight: '100px',
    padding: theme.spacing(1),
  }
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

  return (
    <Layout>
      <Grid container spacing={2} justify='center'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>شناسه</TableCell>
                <TableCell align='center'>گروه‌مسئله</TableCell>
                <TableCell align='center'>وضعیت</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.map((data) =>
                <TableRow key={data.index}>
                  <TableCell align='center'>
                    <Button
                      variant='outlined'
                      component={Link}
                      to={`/submitted_answer/${data.id}/`}>
                      {data.id}
                    </Button>
                  </TableCell>
                  <TableCell align='center'>
                    {data.problem_group}
                  </TableCell>
                  <TableCell align='center'>
                    {data.status}
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