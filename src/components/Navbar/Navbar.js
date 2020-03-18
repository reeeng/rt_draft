import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'

import './Navbar.scss';

class Navbar extends Component {
    constructor(props){
        super(props)
    }

    renderLink() {
    }
    render() {
        const { transparent } = this.props;
        return (
            <Menu attached='top'>
                <Menu.Menu position='left'>
                    <div className='ui left aligned category search item'>
                        R.E.E.Enginggering Drafting
                    <div className='results' />
                    </div>
                </Menu.Menu>

                <Menu.Menu position='right'>
                    <div className='ui right aligned category search item'>
                    <div className='ui transparent icon input'>
                        <input
                        className='prompt'
                        type='text'
                        placeholder='Search animals...'
                        />
                        <i className='search link icon' />
                    </div>
                    <div className='results' />
                    </div>
                </Menu.Menu>
                </Menu>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    expireTime: state.auth.expireTime
});

export default Navbar;