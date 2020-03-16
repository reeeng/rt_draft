import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router'
import { Avatar, Card } from '@material-ui/core';
import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Container } from '@material-ui/core';
import { LockOutlined, LockOpenOutlined } from '@material-ui/icons';
import { pink } from '@material-ui/core/colors';

import Navbar from '../../Navbar';
import PropTypes from 'prop-types'
import { login } from '../../../store/auth/authActions';
import { connect } from 'react-redux';

const styles = {
  card : {
    height: '40vh',
    padding: '4rem 3rem',
    backgroundColor: 'rgba(250, 250, 250, 0.48)'
  }
}
class Login extends Component {
  constructor(props){
    super();
    this.state = {
      username: {
        value: '',
        error: false,
      },
      password: {
        value: '',
        error: false,
      },
      loginAttempt: undefined,
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.validateUser = this.validateUser.bind(this);
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    expireTime: PropTypes.instanceOf(Date).isRequired,
  }

  redirectIfLoggedIn() {
    const { isAuthenticated, expireTime } = this.props;
    const currentTime = new Date();
    if(isAuthenticated && expireTime > currentTime){
      this.props.history.push('/dashboard')
    }
  }

  validateUser() {
    const username = this.state.username.value;
    const password = this.state.password.value;

    const user_error = username === '' ? true : false;
    const pass_error = password === '' ? true : false;
    console.log(user_error, pass_error);
    this.setState(prevState => ({
      username: {
        ...prevState.username,
        error: user_error,
      },
      password: {
        ...prevState.password,
        error: pass_error,
      }
    }));
    console.log(this.state.username, this.state.password);
    if(user_error || pass_error){
      return 0;
    }
    
    this.props.login(username, password);
  }

  handleChange(e) {
    let val = e.target.value;
    if(e.target.name === 'username'){
      this.setState(prevState => ({
        username:{
          ...prevState.username,
          value: val
        },
        password: {
          ...prevState.password
        }
      }));
    }else{
      this.setState(prevState => ({
        password:{
          ...prevState.password,
          value: val,
        },
        username: {
          ...prevState.username
        }
      }));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  
  render() {
    const { value: username, error: user_error } = this.state.username;
    const { value: password, error: pass_error } = this.state.password;

    return (
      <Fragment>
        {this.redirectIfLoggedIn()}
        <Navbar transparent={false} />
        <Container maxWidth="sm" className='App-header'>
          <Card style={styles.card}>
            <Avatar style={{margin: 'auto', width: '70px', height: '70px', backgroundColor: pink[500]}}>
              <LockOutlined style={{width: '50px', height: '50px'}} />
            </Avatar>
            <Typography component="h1" variant="h5" style={{width: 'fit-content', margin: '1rem auto'}}>
              Login
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username or Email Address"
                name="username"
                autoComplete="email"
                autoFocus
                error={user_error}
                value={username}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                error={pass_error}
                value={password}
                onChange={this.handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.validateUser}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/register' variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  expireTime: state.auth.expireTime
});

export default connect(mapStatetoProps, { login })(Login);