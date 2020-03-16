import React, { useState } from 'react';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { Person } from '@material-ui/icons'

const UserMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }


  return(
    <>
    <IconButton edge='start' color='inherit' aria-label='User' onClick={handleClick}>
        <Person/>
    </IconButton>
    <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
      <MenuItem onClick={handleClose}>My Profile</MenuItem>
      <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
    </>
  )
}

export default UserMenu;