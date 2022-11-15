import {
  Grid,
  Paper,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  getProblemsByFilterAction,
} from '../../redux/slices/problem';
import Layout from '../../components/templates/Layout';
import ProblemTables from './ProblemsTable';
import TopicBox from '../../components/molecules/TopicBox';

const ProblemSet = ({
  getProblemsByFilter,

  filteredProblems,
  totalNumberOfPages,
}) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const [properties, setProperties] = useState({
    difficulties: [],
    grades: [],
    sources: [],
    topics: [],
    subtopics: [],
  });

  console.log(totalNumberOfPages)
  console.log(page)

  useEffect(() => {
    getProblemsByFilter({
      ...properties,
      page,
    });
  }, [properties, page])

  const handlePaginationChange = (event, value) => {
    navigate(`/problemset/${value}/`)
  }

  console.log(properties);

  return (
    <Layout>
      <Grid container spacing={2} justifyContent='center' alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>
            {'«مجموعه مسائل»'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            <ProblemTables problems={filteredProblems} />
            <Pagination
              size='small'
              variant="outlined"
              color="primary"
              shape='rounded'
              count={totalNumberOfPages}
              page={parseInt(page)}
              onChange={handlePaginationChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} component={Paper} sx={{ padding: 2 }}>
            <Typography variant="h2" align='center'>جستجو</Typography>
            <Divider />
            <TopicBox properties={properties}
              setProperties={(e) => {
                setProperties(e);
                navigate(`/problemset/1/`);
              }}
            />
            {/*
                <Grid item>
                  <PropertiesBox properties={properties} setProperties={setProperties} />
                </Grid>
                <Grid item>
                  <Button fullWidth variant='contained' color='primary' onClick={() => search(currentPage)}>جستجو کن</Button>
                </Grid> */}
          </Stack>
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

export default connect(mapStateToProps, {
  getProblemsByFilter: getProblemsByFilterAction,
})(ProblemSet)