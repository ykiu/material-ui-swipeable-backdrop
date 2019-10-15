import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/styles/makeStyles';
import CodeIcon from '@material-ui/icons/Code';
import { Paper, IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  code: {
    margin: 0,
    padding: theme.spacing(2),
    color: '#fff',
    backgroundColor: grey[900],
    overflowY: 'scroll',
  },
  demoContainer: {
    textAlign: 'center',
    backgroundColor: grey[100],
  },
  demoWrapper: {
    display: 'inline-block',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

function Demo({ className, code, demo, classes: extraClasses }) {
  const classes = useStyles();
  const [codeOpen, setCodeOpen] = useState(false);
  const handleCodeIconClick = useCallback(() => {
    setCodeOpen(state => !state);
  }, []);
  return (
    <div className={clsx(className)}>
      <div className={classes.toolbar}>
        <IconButton onClick={handleCodeIconClick}>
          <CodeIcon />
        </IconButton>
      </div>
      {codeOpen ? (
        <code className={extraClasses.code}>
          <pre
            className={classes.code}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: code,
            }}
          />
        </code>
      ) : null}
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
