import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import PropTypes from 'prop-types';
import { grey } from '@material-ui/core/colors';
import clsx from 'clsx';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  code: {
    color: '#fff',
    backgroundColor: grey[900],
  },
  demoContainer: {
    backgroundColor: grey[100],
  },
  demoWrapper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function Demo({ className, code, demo, classes: extraClasses }) {
  const classes = useStyles();
  return (
    <div className={clsx(className)}>
      <code className={extraClasses.code}>
        <pre
          className={classes.code}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: code,
          }}
        />
      </code>
      <div className={classes.demoContainer}>
        <Paper className={classes.demoWrapper}>{demo}</Paper>
      </div>
    </div>
  );
}

Demo.defaultProps = {
  className: null,
  classes: {},
};

Demo.propTypes = {
  code: PropTypes.string.isRequired,
  demo: PropTypes.node.isRequired,
  classes: PropTypes.objectOf(PropTypes.string.isRequired),
  className: PropTypes.string,
};

export default Demo;
