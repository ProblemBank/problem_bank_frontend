import { Container, Grid, Paper, Typography, Button, TextField } from '@mui/material';
import React, { useState, FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  createAccountAction,
} from '../redux/slices/account';
import { toast } from 'react-toastify';
import { toEnglishNumber } from '../utils/translateNumber';
import isPhoneNumber from '../utils/validators/isPhoneNumber';
import isNumber from '../utils/validators/isNumber';

type createAccountPropsType = {
  token: string,
  isFetching: boolean,
  createAccount: any,
}

const CreateAccount: FC<createAccountPropsType> = ({
  token,
  isFetching,
  createAccount,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    phone_number: '',
    password: '',
    confirmationPassword: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    if (token) {
      navigate('/dashboard/');
    }
  }, [token])

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const doRegistration = () => {
    const { phone_number, password, confirmationPassword, first_name, last_name } = data;
    if (!phone_number || !password || !confirmationPassword || !first_name || !last_name) {
      toast.error('لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن!');
      return;
    }
    if (!isPhoneNumber(phone_number)) {
      toast.error('شماره تلفن همراهی که وارد کردی معتبر نیست.');
      return;
    }
    if (password !== confirmationPassword) {
      toast.error('رمزهایی که وارد کردی مشابه هم نیستند.');
      return;
    }
    createAccount({ ...data, username: data.phone_number });
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Grid
        container item
        justifyContent='center'
        alignItems='center'
        xs={12} sm={8} md={4}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid item container>
              <Grid
                container
                item
                direction='column'
                justifyContent='center'
                spacing={2}>
                <Grid item>
                  <Typography gutterBottom variant='h2' align='center'>{'ایجاد حساب کاربری'}</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      if (isNumber(e.target.value)) {
                        putData(e);
                      }
                    }}
                    value={data.phone_number}
                    name="phone_number"
                    label="شماره تلفن همراه"
                    inputProps={{ className: 'ltr-input' }}
                    type="tel"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={putData}
                    label="گذرواژه"
                    name="password"
                    inputProps={{ className: 'ltr-input' }}
                    type="password"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={putData}
                    label="تکرار گذرواژه"
                    type="password"
                    inputProps={{ className: 'ltr-input' }}
                    name="confirmationPassword"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={putData}
                    value={data.first_name}
                    name="first_name"
                    label="نام"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={putData}
                    value={data.last_name}
                    name="last_name"
                    label="نام خانوادگی"
                  />
                </Grid>

                <Grid container item direction="row" justifyContent="center">
                  <Button
                    onClick={doRegistration}
                    variant="contained"
                    color="primary"
                    disabled={isFetching}
                    fullWidth>
                    ثبت
                  </Button>
                </Grid>

                <Grid item>
                  <Typography align="center">
                    {' اگه از قبل حساب داشتی، می‌تونی از '}
                    <Link to="/login">{'این‌جا'}</Link>
                    {' وارد بشی.'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}


const mapStateToProps = (state) => ({
  token: state.account.token,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  createAccount: createAccountAction,
})(CreateAccount);
