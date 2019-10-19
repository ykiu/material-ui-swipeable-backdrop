import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Typography, Toolbar, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { GITHUB_BASE_URL } from './constants';

const useStyles = makeStyles(theme => ({
  appbarSpacer: {
    flex: 1,
  },
  spacer: {
    height: theme.spacing(12),
  },
  main: {
    marginBottom: theme.spacing(12),
  },
}));

function AppFrame({ main }) {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Swipeable Backdrop</Typography>
          <div className={classes.appbarSpacer} />
          <IconButton href={GITHUB_BASE_URL} target="_blank" color="inherit">
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.spacer} />
      <main className={classes.main}>{main}</main>
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
