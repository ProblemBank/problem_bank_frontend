import {
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import PropertiesBox from '../components/problem/PropertiesBox'
import Tag from '../components/problem/Tag';
import {
  // fetchProblemsListByPage,
} from '../redux/slices/problem';
// import { getAllTags } from '../redux/actions/properties'
import { toPersianNumber } from '../utils/translateNumber'
import Layout from './Layout';


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

const ProblemSet = ({
  fetchProblemsListByPage,
  getAllTags,

  // tags: allTags,
  totalNumberOfPages,
  problems,
  isFetching
}) => {
  const classes = useStyles();
  const { pageNumber } = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  const [properties, setProperties] = useState({ tags: [], subtags: [], events: [], sources: [] });

  useEffect(() => {
    // search(currentPage);
    // getAllTags();
  }, [])

  const handlePaginationChange = (event, value) => {
    search(value);
    setCurrentPage(value);
  }

  const search = (currentPage) => {
    fetchProblemsListByPage({ properties, pageNumber: currentPage });
  }

  return (
    <Layout>
      <Grid container spacing={2} justify='center'>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">«سوالات»</Typography>
        </Grid>
        <Grid item container spacing={2} xs={12} md={10} lg={8}>
          <Grid item container xs={12} md={8} direction='column' spacing={2}>
            <Grid item>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>شناسه</TableCell>
                      <TableCell>نام</TableCell>
                      {/* <TableCell>موضوعات اصلی</TableCell> */}
                      <TableCell>درجه سختی</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {problems.map((problem, index) =>
                      <TableRow key={index}>
                        <TableCell>{toPersianNumber(problem.id)}</TableCell>
                        <TableCell >
                          <a as={Link} href={'/problem/' + problem.id}>{problem.name}</a>
                        </TableCell>
                        {/* <TableCell>
                          {allTags
                            .filter(tag => problem.tags.includes(tag.id))
                            .map((tag, index) => (
                              <Tag
                                label={tag.name}
                                key={index}
                              />
                            ))}
                        </TableCell> */}
                        <TableCell>{toPersianNumber(problem.hardness.level)}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item>
              <Pagination
                count={totalNumberOfPages}
                page={currentPage}
                onChange={handlePaginationChange}
                hidePrevButton hideNextButton
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} md={4}>
            <Paper className={classes.paper}>
              {/* <Grid item container direction='column' spacing={2}>
                <Grid item>
                  <Typography variant="h2" align='center'>جستجو</Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <PropertiesBox properties={properties} setProperties={setProperties} />
                </Grid>
                <Grid item>
                  <Button fullWidth variant='contained' color='primary' onClick={() => search(currentPage)}>جستجو کن</Button>
                </Grid>
              </Grid> */}
            </Paper>
          </Grid>
        </Grid>
      </Grid >
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return ({
    tags: state.problem.tags
      ? state.problem.tags
      : [],
    problems: state.problem.problems
      ? state.problem.problems
      : [],
    totalNumberOfPages: state.problem.numberOfPages,
    isFetching: state.problem.isFetching,
  })
}

export default connect(
  mapStateToProps,
  {
    // fetchProblemsListByPage,
    // getAllTags,
  }
)(ProblemSet)