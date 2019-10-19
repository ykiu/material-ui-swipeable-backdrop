import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Backdrop from '../../src/Backdrop';

const useStyles = makeStyles(theme => ({
  backdrop: {
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    width: '80vw',
    maxWidth: 400,
    height: 324,
  },
  frontLayer: {
    height: '100%',
    overflowY: 'auto',
  },
  mainTextWrapper: {
    padding: theme.spacing(4, 2),
  },
  backLayer: {
    position: 'relative',
    height: '100%',
  },
  menuContainer: {
    position: 'absolute',
    width: '100%',
    padding: theme.spacing(0, 2),
  },
  menuItem: {
    display: 'block',
    background: 'none',
    padding: 0,
    border: 'none',
    color: theme.palette.primary.contrastText,
    transitionProperty: 'font-size',
    transitionDuration: '250ms',
    outline: 'none',
  },
}));

const menuItems = [
  {
    offset: 0,
    label: 'Step 1',
    height: 56,
    mainText:
      // https://loremipsum.io/
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    offset: 56,
    label: 'Step 2',
    height: 56,
    mainText:
      'Feugiat scelerisque varius morbi enim. Morbi tristique' +
      'senectus et netus et malesuada fames ac.',
  },
  {
    offset: 112,
    label: 'Step 3',
    height: 56,
    mainText:
      'Etiam tempor orci eu lobortis elementum nibh. Tincidunt nunc' +
      'pulvinar sapien et ligula ullamcorper malesuada proin libero',
  },
];

function accumulate(arr) {
  return arr.reduce((acc, cur) => {
    acc.push((acc[acc.length - 1] || 0) + cur);
    return acc;
  }, []);
}

export default function BasicUsage() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [backLayerOpen, setBackLayerOpen] = useState(false);
  const handleBackLayerClose = useCallback(() => {
    setBackLayerOpen(false);
  }, []);
  const handleBackLayerOpen = useCallback(() => {
    setBackLayerOpen(true);
  }, []);

  const offsets = [0, ...accumulate(menuItems.map(({ height }) => height))];
  const offset = offsets[activeStep];
  const maxHeight = offsets[offsets.length - 1];
  const minHeight = 56;
  const top = `calc(-${offset}px + (100% - ${minHeight}px) * ${offset} / ${maxHeight - minHeight})`;

  const backLayer = (
    <div className={classes.backLayer}>
      <div className={classes.menuContainer} style={{ top }}>
        {menuItems.map(({ label, height }, index) => (
          <Typography
            component="button"
            type="button"
            key={label}
            className={classes.menuItem}
            style={{ height }}
            onClick={() => setActiveStep(index)}
            variant={activeStep === index ? 'h6' : 'body1'}
          >
            {label}
          </Typography>
        ))}
      </div>
    </div>
  );

  const { mainText } = menuItems[activeStep];

  const frontLayer = (
    <div className={classes.frontLayer}>
      <div className={classes.mainTextWrapper}>
        <Typography>{mainText}</Typography>
      </div>
    </div>
  );

  return (
    <Backdrop
      classes={{ root: classes.backdrop }}
      backLayer={backLayer}
      frontLayer={frontLayer}
      backLayerOpen={backLayerOpen}
      collapsedBackLayerHeight={minHeight}
      expandedBackLayerHeight={maxHeight}
      onBackLayerClose={handleBackLayerClose}
      onBackLayerOpen={handleBackLayerOpen}
    />
  );
}
