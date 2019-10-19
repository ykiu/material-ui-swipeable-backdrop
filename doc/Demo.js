import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/styles/makeStyles';
import CodeIcon from '@material-ui/icons/Code';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Paper, IconButton } from '@material-ui/core';
import Code from './Code';

const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  code: {
    marginBottom: theme.spacing(1),
  },
  demoContainer: {
    textAlign: 'center',
    backgroundColor: grey[200],
    borderRadius: theme.spacing(0.5),
  },
  demoWrapper: {
    textAlign: 'initial',
    display: 'inline-block',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

function Demo({ className, code, demo }) {
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
        <IconButton onClick={handleCodeIconClick}>
          <GitHubIcon />
        </IconButton>
      </div>
      {codeOpen ? <Code code={code} className={classes.code} /> : null}
      <div className={classes.demoContainer}>
        <Paper className={classes.demoWrapper}>{demo}</Paper>
      </div>
    </div>
  );
}

Demo.defaultProps = {
  className: null,
};

Demo.propTypes = {
  code: PropTypes.string.isRequired,
  demo: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Demo;
