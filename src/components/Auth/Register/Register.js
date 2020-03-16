import React, { Component } from 'react';
import { Card, Typography, Button, Container, Grid, Avatar, TextField, Link } from '@material-ui/core';
import { LockOutlined, LockOpenOutlined } from '@material-ui/icons';
import { pink } from '@material-ui/core/colors';
import Navbar from '../../Navbar';

import { register } from '../../../store/auth/authActions';
import { connect } from 'react-redux';

const styles = {
  card : {
    padding: '4rem 3rem',
    backgroundColor: 'rgba(250, 250, 250, 0.48)'
  }
}

class Register extends Component {
    constructor(props) {
      super();
      this.state = {
        fName: '',
        lName: '',
        username: '',
        email: '',
        password: '',
        fNameError: false,
        lNameError: false,
        usernameError: false,
        emailError: false,
        passError: false,
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      const name = e.target.name;
      const val = e.target.value;
      this.setState( prevState => ({
        ...prevState,
        [name]: val
      }));
    }

    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    
    validatePassword(pass) {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      return re.test(pass);
    }

    validateUsername(username) {
      const re = /^[a-zA-Z0-9]+$/;
      return re.test(username);
    }

    validateName(name) {
      const re = /^[a-zA-Z\-]+$/;
      return re.test(name);
    }

    handleSubmit(e) {
      e.preventDefault();
      const { fName, lName, username, email, password } = this.state;
      const fNameError = this.validateName(fName) ? false : true;
      const lNameError = this.validateName(lName) ? false : true;
      const usernameError = this.validateUsername(username) ? false : true;
      const emailError = this.validateEmail(email) ? false : true;
      const passError = this.validatePassword(password) ? false : true;
      
      this.setState( prevState => ({
        ...prevState,
        fNameError,
        lNameError,
        usernameError,
        emailError,
        passError,
      }));

      if(!fNameError && !lNameError && !usernameError && !emailError && !passError){
        console.log("making axios call");
        const user = {
          fName,
          lName,
          username,
          email,
          password,
        }
        this.props.register(user);
      }
    }

    render() {
      const { fName, lName, username, email, password,
              fNameError, lNameError, usernameError, emailError, passError } = this.state;

      return (
          <>
            <Navbar/>
            <Container maxWidth="sm" className='App-header'>
              <Card style={styles.card}>
                <Avatar style={{margin: 'auto', width: '70px', height: '70px', backgroundColor: pink[500]}}>
                  <LockOutlined style={{width: '50px', height: '50px'}}/>
                </Avatar>
                <Typography component="h1" variant="h5" style={{width: 'fit-content', margin: '1rem auto'}}>
                  Register
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} style={{height: '95px'}}>
                      <TextField
                        autoComplete="fname"
                        name="fName"
                        variant="outlined"
                        required
                        fullWidth
                        label="First Name"
                        error={fNameError}
                        value={fName}
                        onChange={this.handleChange}
                        helperText={ fNameError ? 'Enter a valid Name' : '' }
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{height: '95px'}}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Last Name"
                        name="lName"
                        autoComplete="lname"
                        error={lNameError}
                        value={lName}
                        onChange={this.handleChange}
                        helperText={ lNameError ? 'Enter a valid Name': '' }
                      />
                    </Grid>
                    <Grid item xs={12} style={{height: '95px'}}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        autoComplete="username"
                        error={usernameError}
                        value={username}
                        onChange={this.handleChange}
                        helperText={ usernameError ? 'Username must be 8 character in length': '' }
                      />
                    </Grid>
                    <Grid item xs={12} style={{height: '95px'}}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        error={emailError}
                        value={email}
                        onChange={this.handleChange}
                        helperText={ emailError ? 'Enter a valid email': '' }
                      />
                    </Grid>
                    <Grid item xs={12} style={{height: '95px'}}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        error={passError}
                        value={password}
                        onChange={this.handleChange}
                        helperText={ passError ? 'Must be 8 character with one upper, lower and special character': '' }
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ 'margin': '1rem auto' }}
                  >
                    Register
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link to='/login' variant="body2">
                        Already have an account? Login
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Card>
            </Container>
          </>
      );
    }
}

const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatetoProps, { register })(Register);