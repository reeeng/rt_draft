import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import './Navbar.scss';
import UserMenu from './UserMenu';

class Navbar extends Component {
    constructor(props){
        super(props)
    }

    renderLink() {
        const currentTime = new Date();
        const isAuthenticated = this.props.isAuthenticated;

        if(isAuthenticated && currentTime < this.props.expireTime){
            return (
                <UserMenu/>
            );
        }else if(!isAuthenticated){
            return(
                <>
                <Link to='/login' className='nav-btn'>
                    <Button variant='outlined' style={{ marginRight: '.5rem' }}>Login</Button>
                </Link>
                <Link to='/register' className='nav-btn'>
                    <Button variant='contained' color='secondary'>Register</Button>
                </Link>
                </>
            )
        }
    }
    render() {
        const { transparent } = this.props;
        return (
            <div>
                <AppBar position='static' className={ transparent ? 'nav-transparent' : ''}>
                    <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='Menu'>
                        <MenuIcon />
                    </IconButton>

                    <Link to='/' className='nav-btn' style={{ 'flexGrow': 1 }}>
                        <Typography variant='h6'>
                            Exam Trainer
                        </Typography>
                    </Link>
                    
                    {this.renderLink()}
                     
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    expireTime: state.auth.expireTime
});

export default connect(mapStateToProps, {})(Navbar);