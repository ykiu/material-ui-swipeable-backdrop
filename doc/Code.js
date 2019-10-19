import React from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/styles/makeStyles';
import PropTypes from 'prop-types';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2, 3),
    color: '#fff',
    backgroundColor: grey[900],
    overflowY: 'scroll',
    fontSize: '14px',
    borderRadius: theme.spacing(0.5),
  },
}));
function Code({ code, className }) {
  const classes = useStyles();
  return (
    <pre className={clsx(className, classes.root)}>
      <code
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: code,
        }}
      />
    </pre>
  );
}

Code.defaultProps = {
  className: null,
};

Code.propTypes = {
  code: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Code;
