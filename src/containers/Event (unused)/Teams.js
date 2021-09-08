import { Grid, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import TeamInfoCard from '../../components/Cards/TeamInfo';
import { getRequestSubscription } from '../../parse/mentor';
import {
  createRequestMentorAction,
  getRequestMentorAction,
  removeRequestMentorAction,
} from '../../redux/slices/events';

function Teams({
  allEventTeams,
}) {
  const { fsmId } = useParams();

  return (
    <>
      <Grid container spacing={2} alignItems="center" justify="center">
        {allEventTeams?.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamInfoCard
              {...team}
              teamId={team.id}
              fsmId={fsmId}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  allWorkshops: state.events.myWorkshops || [],
  allEventTeams: state.events.allEventTeams || [],
  requestTeams: state.events.requestTeams || {},
});

export default connect(mapStateToProps, {
  getRequestMentor: getRequestMentorAction,
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
})(Teams);
