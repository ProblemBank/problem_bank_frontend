import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  Divider,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClassIcon from '@material-ui/icons/Class';
import ClearIcon from '@material-ui/icons/Clear';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useParams } from 'react-router-dom';

import {
  editEventAction,
  getOneEventAction,
} from '../../redux/slices/event';
import {
  removeProblemFromGroupAction
} from '../../redux/slices/problem';
import {
  addProblemGroupAction,
  editProblemGroupAction,
  getProblemGroupAction,
  removeProblemGroupAction,
} from '../../redux/slices/problemGroup';
import { toPersianNumber } from '../../utils/translateNumber';
import Layout from '../Event (unused)/Layout';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const Event = ({
  getEvent,
  editEvent,
  editProblemGroup,
  getProblemGroup,
  addProblemGroup,
  removeProblemGroup,
  removeProblemFromGroup,


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
      <Grid container spacing={4} justify="center" alignItems='flex-start'>
        <Grid item xs={12} sm={4} >
          <Grid
            component={Paper}
            container item
            direction="column"
            spacing={2}>
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
              <Grid item container justify='flex-end'>
                <Button
                  onClick={doAddProblemGroup}
                  color='primary'
                  variant='outlined'>
                  {'ایجاد'}
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            {event?.problem_groups.length > 0 &&
              <Grid item>
                <Typography align='center' variant='h3' gutterBottom>
                  {'گروه‌مسئله‌ها'}
                </Typography>
                <ButtonGroup disableFocusRipple orientation="vertical" color="primary" fullWidth>
                  {event?.problem_groups?.map((problemGroup, index) => (
                    <Button
                      size='small'
                      key={index}
                      onClick={() => setTabIndex(index)}
                      variant={tabIndex == index && 'contained'}>
                      {problemGroup.title}
                      <IconButton
                        onClick={() => {
                          removeProblemGroup({ problemGroupId: event.problem_groups[tabIndex].id })
                        }}
                        size='small'>
                        <ClearIcon style={{ fontSize: 15, color: 'red' }} />
                      </IconButton>
                    </Button>
                  ))}
                </ButtonGroup>
              </Grid>
            }
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid
            component={Paper}
            container item
            direction="column"
            spacing={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>شناسه</TableCell>
                    <TableCell align='center'>عنوان</TableCell>
                    <TableCell align='center'>حذف از گروه‌مسئله</TableCell>
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
                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            removeProblemFromGroup({
                              problemId: problem.id,
                              problemGroupId: event.problem_groups[tabIndex].id,
                            })
                          }}
                          size='small'>
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {event?.problem_groups?.length > 0 &&
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
            }
          </Grid>
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
    getEvent: getOneEventAction,
    editEvent: editEventAction,
    removeProblemGroup: removeProblemGroupAction,
    editProblemGroup: editProblemGroupAction,
    getProblemGroup: getProblemGroupAction,
    addProblemGroup: addProblemGroupAction,
    removeProblemFromGroup: removeProblemFromGroupAction,
  }
)(Event);
