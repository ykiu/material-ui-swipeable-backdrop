import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Typography, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  spacer: {
    height: theme.spacing(12),
  },
}));

function AppFrame({ main }) {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Swipeable Backdrop</Typography>
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
