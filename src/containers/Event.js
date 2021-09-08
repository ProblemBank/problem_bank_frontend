import {
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  Typography,
  IconButton,
  makeStyles,
  Paper,
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Tooltip,
  TableRow,
  TextField,
} from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
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
  addProblemGroupAction,
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
  addProblemGroup,


  event,
  problemGroup,
  isFetching,
}) => {
  const t = useTranslate();
  const { eventId } = useParams();
  const [problemGroupName, setProblemGroupName] = useState();

  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    getEvent({ eventId });
  }, []);

  useEffect(() => {
    if (event?.problem_groups.length > 0) {
      getProblemGroup({ problemGroupId: event.problem_groups[tabIndex].id });
    }
  }, [event, tabIndex])

  console.log(event)
  console.log(problemGroup)

  const doAddProblemGroup = () => {
    addProblemGroup({
      title: problemGroupName,
      event: eventId,
      problems: [],
    })
  }

  return (
    <Layout>
      <Grid container spacing={2} direction="row" justify="center">
        <Grid
          container
          item
          sm={3}
          xs={12}
          direction="column"
          spacing={2}
          justify="flex-start">
          {event?.problem_groups.length > 0 &&
            <Grid item>
              <Typography align='center' variant='h3' gutterBottom>
                {'گروه‌مسئله‌ها'}
              </Typography>
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
          }
          <Grid item container justify='center' alignItems='center'>
            <Typography align='center' variant='h3' gutterBottom>
              {'گروه‌مسئله‌ی جدید'}
            </Typography>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  setProblemGroupName(e.target.value);
                }}
                fullWidth
                value={problemGroupName}
                label='عنوان'
                variant="outlined"
                size='small' />
            </Grid>
            <Grid item>
              <Button
                onClick={doAddProblemGroup}
                color='primary'
                variant='outlined'>
                {'ایجاد'}
              </Button>
            </Grid>
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
            <Grid item container justify='center'>
              <Box mt={1}>
                <Button
                  variant='contained'
                  color='primary'
                  component={Link}
                  to={`/problem/add/problem_group/${event?.problem_groups[tabIndex].id}/`}>
                  {'افزودن مسئله‌ی جدید'}
                </Button>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout >
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
    addProblemGroup: addProblemGroupAction,
  }
)(Event);
