import {
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useParams } from 'react-router-dom';

import {
  editEventAction,
  getEventAction,
} from '../redux/slices/event';
import {
  editProblemGroupAction,
  getProblemGroupAction,
} from '../redux/slices/problemGroup';
import { toPersianNumber } from '../utils/translateNumber';
import Layout from './Event (unused)/Layout';

const useStyles = makeStyles((theme) => ({
  rightBox: {
    padding: theme.spacing(2),
  },
}));

const Event = ({
  getEvent,
  editEvent,
  editProblemGroup,
  getProblemGroup,


  event,
  problemGroup,
  isFetching,
}) => {
  const t = useTranslate();
  const { eventId } = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    getEvent({ eventId });
  }, []);

  useEffect(() => {
    if (event?.problem_groups) {

      getProblemGroup({ problemGroupId: event.problem_groups[tabIndex].id });
    }
  }, [event, tabIndex])

  console.log(event)
  console.log(problemGroup)

  return (
    <Layout>
      <Grid container spacing={2} direction="row" justify="center">
        <Grid
          container
          item
          sm={3}
          xs={12}
          direction="column"
          justify="space-between">
          <Grid item>
            <ButtonGroup orientation="vertical" color="primary" fullWidth>
              {event?.problem_groups?.map((problemGroup, index) => (
                <Button
                  key={index}
                  onClick={() => setTabIndex(index)}
                  variant={tabIndex == index && 'contained'}>
                  {problemGroup.title}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              color="primary"
              component={Link}
              to="/"
              startIcon={<ExitToAppIcon />}>
              {t('back')}
            </Button>
          </Grid>
        </Grid>
        <Grid item sm={9} xs={12}>
          <Paper elevation={3} className={classes.rightBox}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>شناسه</TableCell>
                    <TableCell align='center'>عنوان</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {problemGroup?.problems?.map((problem, index) =>
                    <TableRow key={index}>
                      <TableCell align='center'>
                        {toPersianNumber(problem.id)}
                      </TableCell>
                      <TableCell align='center'>
                        <Button component={Link} to={`/problem/edit/${problem.id}/`}>
                          {problem.title}
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state, props) => ({
  event: state.event.event,
  problemGroup: state.problemGroup.problemGroup,
})


export default connect(
  mapStateToProps,
  {
    getEvent: getEventAction,
    editEvent: editEventAction,
    editProblemGroup: editProblemGroupAction,
    getProblemGroup: getProblemGroupAction,
  }
)(Event);
