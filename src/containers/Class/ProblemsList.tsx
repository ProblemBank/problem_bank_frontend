import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import AreYouSure from '../../components/Dialog/AreYouSure';
import {
  getProblemGroupAction,
  removeProblemFromGroupAction,
} from '../../redux/slices/problemGroup';
import { toPersianNumber } from '../../utils/translateNumber';

type ProblemsListPropsType = {
  removeProblemFromGroup: any;
  getProblemGroup: any;
  role: string;
  problemGroupId: number;
  problemGroup: any;
}

const ProblemsList: FC<ProblemsListPropsType> = ({
  removeProblemFromGroup,
  getProblemGroup,

  role,
  problemGroupId,
  problemGroup,
}) => {
  const { eventId } = useParams();
  const [showAreYouSureDialog, setAreYouSureDialog] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(false);

  useEffect(() => {
    getProblemGroup({ problemGroupId });
  }, [problemGroupId])

  return <>
    <Paper>
      <Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>شناسه</TableCell>
                <TableCell align='center'>عنوان</TableCell>
                {(role == 'mentor' || role == 'owner') &&
                  <TableCell align='center'>حذف از صندوقچه</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {problemGroup?.problems.map((problem, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>
                    {toPersianNumber(problem.id)}
                  </TableCell>
                  <TableCell align='center'>
                    {(role == 'mentor' || role == 'owner') &&
                      <Button component={Link} to={`/event/${eventId}/problem-group/${problemGroupId}/problem/${problem.id}/mentor-view/`}>
                        {problem.title}
                      </Button>
                    }
                    {(role == 'participant') &&
                      <Button component={Link} to={`/event/${eventId}/problem-group/${problemGroupId}/problem/${problem.id}/submit/`}>
                        {problem.title}
                      </Button>
                    }
                  </TableCell>
                  {(role == 'mentor' || role == 'owner') &&
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
                </TableRow>)
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {role !== 'participant' &&
          <Button
            sx={{ m: 1 }}
            variant='contained'
            color='primary'
            component={Link}
            to={`/event/${eventId}/problem-group/${problemGroupId}/add/`}>
            {'افزودن مسئله‌ی جدید'}
          </Button>
        }
      </Stack>
    </Paper>
    <AreYouSure
      open={showAreYouSureDialog}
      handleClose={() => setAreYouSureDialog(!showAreYouSureDialog)}
      callBackFunction={() => {
        removeProblemFromGroup({
          problemId: selectedProblemId,
          problemGroupId,
        })
      }} />
  </>
};

const mapStateToProps = (state, ownProps) => ({
  event: state.event.event,
  problemGroup: state.problemGroup.problemGroups[ownProps.problemGroupId],
})

export default connect(mapStateToProps, {
  getProblemGroup: getProblemGroupAction,
  removeProblemFromGroup: removeProblemFromGroupAction,
})(ProblemsList);
