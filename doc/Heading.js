import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  h4: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  h5: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  h6: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
function Heading({ variant, className, children }) {
  const classes = useStyles();
  return (
    <Typography variant={variant} className={className} classes={classes}>
      {children}
    </Typography>
  );
}

Heading.defaultProps = {
  className: null,
  children: null,
};

Heading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.string.isRequired,
};

export default Heading;
