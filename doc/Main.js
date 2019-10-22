import React from 'react';
import { Typography, Container, Link } from '@material-ui/core';
import preval from 'preval.macro';
import 'prismjs/themes/prism-okaidia.css';
import { makeStyles } from '@material-ui/styles';
import Demo from './Demo';
import BasicUsage from './demos/BasicUsage';
import Code from './Code';
import Heading from './Heading';
import { GITHUB_BLOB_URL } from './constants';

const SPACE = ' ';

const PROPS = [
  {
    name: 'closedBackLayerHeight',
    type: 'number',
    default_: '56',
    description: 'The height of the back layer when it is collapsed.',
  },
  {
    name: 'openBackLayerHeight',
    type: 'number',
    default_: '300',
    description: 'The height of the back layer when it is expanded.',
  },
  {
    name: 'frontLayer',
    type: 'node',
    default_: '',
    description: 'The contents of the front layer.',
  },
  { name: 'backLayer', type: 'node', default_: '', description: 'The contents of the back layer.' },
  {
    name: 'backLayerOpen',
    type: 'bool',
    default_: 'true',
    description: 'Whether or not the back layer is open.',
  },
  {
    name: 'onFrontLayerUnfix',
    type: 'func',
    default_: '',
    description: 'Callback fired when a swipe starts.',
  },
  {
    name: 'onFrontLayerFix',
    type: 'func',
    default_: '',
    description: 'Callback fired when a swipe and the subsequent animation ends.',
  },
  {
    name: 'onBackLayerOpen',
    type: 'func (required)',
    default_: '',
    description: 'Callback fired when the back layer requires to be opened.',
  },
  {
    name: 'onBackLayerClose',
    type: 'func (required)',
    default_: '',
    description: 'Callback fired when the back layer requires to be closed.',
  },
  {
    name: 'classes',
    type: 'object',
    default_: '',
    description: 'Override or extend the styles applied to the component.',
  },
];

const useStyles = makeStyles(theme => ({
  demo: {
    marginBottom: theme.spacing(2),
  },
  code: {
    marginBottom: theme.spacing(2),
  },
  table: {
    overflowX: 'auto',
    width: '100%',
    display: 'block',
    borderSpacing: 0,
    borderCollapse: 'collapse',
    '& th,td': {
      color: theme.palette.text.primary,
      padding: theme.spacing(2),
      fontSize: '14px',
      whiteSpace: 'pre-wrap',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    '& th': {
      fontWeight: 500,
      lineHeight: '1.5rem',
    },
    '& td': {
      lineHeight: '1.43',
    },
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
        <Link href="https://material.io/components/backdrop/" target="_blank">
          Backdrop
        </Link>
        {SPACE}
        react component that is swipeable. An extension to the awesome
        {SPACE}
        <Link href="https://material-ui.com" target="_blank">
          Material-UI
        </Link>
        {SPACE}
        framework.
      </Typography>
      <Demo
        code={preval`
              module.exports = require(
                './preprocessors/processCode'
              )(
                './doc/demos/BasicUsage.js'
              );
            `}
        demo={<BasicUsage />}
        githubUrl={`${GITHUB_BLOB_URL}doc/demos/BasicUsage.js`}
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
      <Heading variant="h6">Props</Heading>
      <table className={classes.table}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Type</th>
            <th align="left">Default</th>
            <th align="left">Description</th>
          </tr>
        </thead>
        <tbody>
          {PROPS.map(({ name, type, default_, description }) => (
            <tr>
              <td>
                <code>{name}</code>
              </td>
              <td>
                <code>{type}</code>
              </td>
              <td>
                <code>{default_}</code>
              </td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
