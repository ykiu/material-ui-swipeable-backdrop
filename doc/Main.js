import React from 'react';
import { makeStyles, Typography, Container } from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import preval from 'preval.macro';
import 'prismjs/themes/prism-okaidia.css';
import { grey } from '@material-ui/core/colors';

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
      <code>
        <pre
          className={classes.code}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: preval`
  const fs = require('fs');
  const Prism = require('prismjs');
  const loadLanguages = require('prismjs/components/');
  loadLanguages('jsx')

  const code = fs.readFileSync('./demos/BasicUsage.js', 'utf8');

  module.exports = Prism.highlight(code, Prism.languages.jsx, 'jsx');
            `,
          }}
        />
      </code>
    </Container>
  );
}

Main.defaultProps = {};

Main.propTypes = {};

export default Main;
