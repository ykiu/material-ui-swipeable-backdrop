import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Typography, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  spacer: {
    height: theme.spacing(13),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(8),
    },
  },
}));

function AppFrame({ main }) {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography>Material-UI Swipeable Backdrop</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.spacer} />
      <main>{main}</main>
    </>
  );
}

AppFrame.defaultProps = {
  main: null,
};

AppFrame.propTypes = {
  main: PropTypes.node,
};

export default AppFrame;
