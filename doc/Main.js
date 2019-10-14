import React from 'react';
import { makeStyles, Typography, Container } from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import preval from 'preval.macro';
import 'prismjs/themes/prism-okaidia.css';
import { grey } from '@material-ui/core/colors';
import Demo from './Demo';
import BasicUsage from './demos/BasicUsage';

const useStyles = makeStyles(() => ({
  code: {
    color: '#fff',
    backgroundColor: grey[900],
  },
}));

function Main() {
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h5">Introduction</Typography>
      <Typography>Lorem imsum</Typography>
      <Demo
        code={preval`
              module.exports = require(
                './preprocessors/highlight'
              )(
                './doc/demos/BasicUsage.js'
              );
            `}
        demo={<BasicUsage />}
      />
    </Container>
  );
}

Main.defaultProps = {};

Main.propTypes = {};

export default Main;
