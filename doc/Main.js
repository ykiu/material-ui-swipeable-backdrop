import React from 'react';
import { Typography, Container, Link } from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import preval from 'preval.macro';
import 'prismjs/themes/prism-okaidia.css';
import { makeStyles } from '@material-ui/styles';
import Demo from './Demo';
import BasicUsage from './demos/BasicUsage';
import Code from './Code';
import Heading from './Heading';

const SPACE = ' ';

const useStyles = makeStyles(theme => ({
  demo: {
    marginBottom: theme.spacing(2),
  },
  code: {
    marginBottom: theme.spacing(2),
  },
}));

function Main() {
  const classes = useStyles();
  return (
    <Container>
      <Heading variant="h4">Introduction</Heading>
      <Typography gutterBottom>
        Material-ish
        {SPACE}
        <Link href="https://material.io/components/backdrop/">Backdrop</Link>
        {SPACE}
        react component that is swipeable. An extension to the awesome
        {SPACE}
        <Link href="https://material-ui.com">Material-UI</Link>
        {SPACE}
        library.
      </Typography>
      <Demo
        code={preval`
              module.exports = require(
                './preprocessors/highlight'
              )(
                './doc/demos/BasicUsage.js'
              );
            `}
        demo={<BasicUsage />}
        className={classes.demo}
      />
      <Heading variant="h4">Installing</Heading>
      <Code code="$ npm install material-ui-swipeable-backdrop" className={classes.code} />
      <Typography gutterBottom>
        Also, this package depends on the following packages. You have to install them your self.
      </Typography>
      <ul>
        <Typography component="li">
          <Link href="https://www.npmjs.com/package/@material-ui/core">@material-ui/core</Link>
        </Typography>
        <Typography component="li">
          <Link href="https://www.npmjs.com/package/@material-ui/styles">@material-ui/styles</Link>
        </Typography>
      </ul>
      <Heading variant="h4">API</Heading>
      <Heading variant="h5">Backdrop</Heading>
      <Typography gutterBottom>Props: ...</Typography>
      <Heading variant="h4">Why Material&quot;ish&quot;?</Heading>
      <Typography gutterBottom>
        This component is not strictly compliant with the Material Design specification because the
        {SPACE}
        spec explicitly requires backdrops not to be swipeable. Although my assumption is that
        {SPACE}
        backdrops being swipeable won&apos;t confuse users in most cases, it&apos; up to you whether
        {SPACE}
        to stick to the spec or deviate a little bit from it
        <span role="img" aria-label="emoji">
          😉
        </span>
        .
      </Typography>
    </Container>
  );
}

Main.defaultProps = {};

Main.propTypes = {};

export default Main;
