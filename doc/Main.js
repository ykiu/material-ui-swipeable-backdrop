import React from 'react';
import { Typography, Container } from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import preval from 'preval.macro';
import 'prismjs/themes/prism-okaidia.css';
import Demo from './Demo';
import BasicUsage from './demos/BasicUsage';

function Main() {
  return (
    <Container>
      <Typography variant="h4">Introduction</Typography>
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
