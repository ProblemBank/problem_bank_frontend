import { Grid, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  getProblemsByFilterAction,
} from '../../redux/slices/problem';
// import { getAllTags } from '../redux/actions/properties'
import Layout from '../../components/templates/Layout';
import ProblemTables from './ProblemsTable';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
  },
}))

const Index = ({
  getProblemsByFilter,

  filteredProblems,
  totalNumberOfPages,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { page: currentPage } = useParams();
  const [page, setPage] = useState(parseInt(currentPage));
  const [properties, setProperties] = useState({
    difficulties: [],
    grades: [],
    sources: [],
    topics: [],
    subtopics: [],
  });

  useEffect(() => {
    getProblemsByFilter(properties);
  }, [])

  const handlePaginationChange = (event, value) => {
    setPage(value);
    getProblemsByFilter({
      ...properties,
      page: value,
    });
    navigate(`/problem-set/${value}/`)
  }

  return (
    <Layout>
      <Grid container spacing={4} justifyContent='center' alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>
            {'«مجموعه مسائل»'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} container spacing={2}>
          <ProblemTables problems={filteredProblems} />
          <Grid item>
            <Pagination
              variant="outlined"
              color="primary"
              shape='rounded'
              count={totalNumberOfPages}
              page={page}
              onChange={handlePaginationChange}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={4}>
          <Grid item container direction='column' spacing={2} component={Paper}>
            <Grid item>
              <Typography variant="h2" align='center'>جستجو</Typography>
            </Grid>
            {/* <Divider />
                <Grid item>
                  <PropertiesBox properties={properties} setProperties={setProperties} />
                </Grid>
                <Grid item>
                  <Button fullWidth variant='contained' color='primary' onClick={() => search(currentPage)}>جستجو کن</Button>
                </Grid> */}
          </Grid>
        </Grid>
      </Grid >
    </Layout >
  );
}

const mapStateToProps = (state) => ({
  totalNumberOfPages: state.problem.totalNumberOfPages,
  filteredProblems: state.problem.filteredProblems,
  tags: state.problem.tags,
  isFetching: state.problem.isFetching,
})

export default connect(
  mapStateToProps,
  {
    getProblemsByFilter: getProblemsByFilterAction,
  }
)(Index)