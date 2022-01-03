import {
  Box,
  Button,
  Grid,
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
import ClearIcon from '@material-ui/icons/Clear';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import AreYouSure from '../../components/Dialog/AreYouSure';
import {
  removeProblemFromGroupAction,
} from '../../redux/slices/problemGroup';
import { toPersianNumber } from '../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

const Event = ({
  removeProblemFromGroup,
  event,
  tabIndex,
  problemGroup,
}) => {
  const classes = useStyles();
  const { eventId } = useParams();
  const [showAreYouSureDialog, setAreYouSureDialog] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(false);

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container item direction="column" spacing={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>شناسه</TableCell>
                  <TableCell align='center'>عنوان</TableCell>
                  {(event?.role == 'mentor' || event?.role == 'owner') &&
                    <TableCell align='center'>حذف از گروه‌مسئله</TableCell>
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {problemGroup?.problems?.map((problem, index) =>
                  <TableRow key={index}>
                    <TableCell align='center'>
                      {toPersianNumber(problem.id)}
                    </TableCell>
                    <TableCell align='center'>
                      {(event?.role == 'mentor' || event?.role == 'owner') &&
                        <Button component={Link} to={`/problem/mentor_view/${problem.id}/`}>
                          {problem.title}
                        </Button>
                      }
                      {(event?.role == 'participant') &&
                        <Button component={Link} to={`/problem/submit/${problem.id}/${event.problem_groups[tabIndex].id}/`}>
                          {problem.title}
                        </Button>
                      }
                    </TableCell>
                    {(event?.role == 'mentor' || event?.role == 'owner') &&
                      <TableCell align='center'>
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            setAreYouSureDialog(true);
                            setSelectedProblemId(problem.id)
                          }}
                          size='small'>
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    }
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {(event?.problem_groups?.length > 0 && event.role != 'participant') &&
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
      </Paper>
      <AreYouSure
        open={showAreYouSureDialog}
        handleClose={() => setAreYouSureDialog(!showAreYouSureDialog)}
        callBackFunction={() => {
          removeProblemFromGroup({
            problemId: selectedProblemId,
            problemGroupId: event.problem_groups[tabIndex].id,
          })
        }} />
    </ >
  );
};

const mapStateToProps = (state) => ({
  event: state.event.event,
  problemGroup: state.problemGroup.problemGroup,
})

export default connect(
  mapStateToProps,
  {
    removeProblemFromGroup: removeProblemFromGroupAction,
  }
)(Event);
