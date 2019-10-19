import React, { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSwipeable } from 'react-swipeable';
import sleep from './sleep';

const TRANSITION_DURATION = 250;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    backgroundColor: theme.palette.primary.main,
  },
  backLayer: {
    overflow: 'hidden',
  },
  backlayerTransition: {
    transitionDuration: `${TRANSITION_DURATION}ms`,
    transitionProperty: 'height',
    transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
  },
  swipeMark: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    width: 'calc(20px + 10%)',
    height: theme.spacing(0.5),
    backgroundColor: theme.palette.grey[300],
    borderRadius: theme.spacing(0.5),
  },
  swipeHandle: {
    position: 'absolute',
    height: theme.spacing(7),
    width: '100%',
    touchAction: 'none',
  },
  frontLayer: {
    width: '100%',
    flex: 1,
    borderRadius: theme.spacing(2, 2, 0, 0),
    display: 'flex',
    flexDirection: 'column',
  },
  frontLayerContentWrapper1: {
    position: 'relative',
    flex: 1,
  },
  frontLayerContentWrapper2: {
    position: 'absolute',
    height: '100%',
  },
}));

const COLLAPSE = 0;
const EXPAND = 1;

function calcDistance(a, b) {
  return Math.abs(a - b);
}

/**
 * Positive when swiping down, negative when swiping up.
 */
function calcVelocity(prevEvent, curEvent) {
  const velocity =
    (prevEvent.deltaY - curEvent.deltaY) / (curEvent.event.timeStamp - prevEvent.event.timeStamp);
  return velocity;
}

function calcPostSwipeAction(currentHeight, velocity, closedBackLayerHeight, openBackLayerHeight) {
  const action =
    calcDistance(currentHeight + velocity * 1000, closedBackLayerHeight) <
    calcDistance(currentHeight + velocity * 1000, openBackLayerHeight)
      ? COLLAPSE
      : EXPAND;
  return action;
}

function Backdrop({
  frontLayer,
  backLayer,
  backLayerOpen,
  closedBackLayerHeight,
  openBackLayerHeight,
  onFrontLayerUnfix,
  onFrontLayerFix,
  onBackLayerOpen,
  onBackLayerClose,
  classes: extraClasses,
  className,
}) {
  const classes = useStyles();
  const [swipeSurfaceY, setSwipeSurfaceY] = useState(
    backLayerOpen ? openBackLayerHeight : closedBackLayerHeight,
  );
  const [underTransition, setUnderTransition] = useState(false);
  const [prevEvent, setPrevEvent] = useState(null);
  const [postSwipeAction, setPostSwipeAction] = useState(EXPAND);
  const swipeHandleY = backLayerOpen ? openBackLayerHeight : closedBackLayerHeight;

  const handleSwiping = curEvent => {
    if (prevEvent) {
      const currentHeight = -curEvent.deltaY + swipeHandleY;
      const velocity = calcVelocity(prevEvent, curEvent);
      const action = calcPostSwipeAction(
        currentHeight,
        velocity,
        closedBackLayerHeight,
        openBackLayerHeight,
      );
      setPostSwipeAction(action);
    } else {
      onFrontLayerUnfix();
    }
    setPrevEvent(curEvent);
    setSwipeSurfaceY(-curEvent.deltaY + swipeHandleY);
  };

  const snapBackLayer = useCallback(async () => {
    const snappedY = backLayerOpen ? openBackLayerHeight : closedBackLayerHeight;
    setPrevEvent(null);
    setUnderTransition(true);
    setSwipeSurfaceY(snappedY);
    await sleep(TRANSITION_DURATION);
    setUnderTransition(false);
    onFrontLayerFix();
  }, [backLayerOpen, closedBackLayerHeight, openBackLayerHeight, onFrontLayerFix]);

  const handleSwiped = useCallback(async () => {
    if (postSwipeAction === EXPAND && !backLayerOpen) {
      onBackLayerOpen();
    } else if (postSwipeAction === COLLAPSE && backLayerOpen) {
      onBackLayerClose();
    } else {
      snapBackLayer();
    }
  }, [postSwipeAction, backLayerOpen, snapBackLayer, onBackLayerClose, onBackLayerOpen]);

  useEffect(() => {
    snapBackLayer();
  }, [snapBackLayer]);

  const swipeHandlers = useSwipeable({
    onSwiping: handleSwiping,
    onSwiped: handleSwiped,
    preventDefaultTouchmoveEvent: true,
  });

  return (
    <div className={clsx(className, classes.root, extraClasses.root)}>
      <div
        className={clsx(
          classes.backLayer,
          underTransition ? classes.backlayerTransition : null,
          extraClasses.backLayer,
        )}
        style={{
          height: swipeSurfaceY,
        }}
      >
        {backLayer}
      </div>
      <Paper className={clsx(classes.frontLayer, extraClasses.frontLayer)}>
        <div className={classes.swipeMark} />
        <div className={classes.frontLayerContentWrapper1}>
          <div className={classes.frontLayerContentWrapper2}>{frontLayer}</div>
          {/* This series of wrapping divs is ugly, but is neccessary */}
          {/* to make `height: 100%` work inside the front layer */}
        </div>
      </Paper>
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...swipeHandlers}
        style={{ top: swipeHandleY - 16 }}
        className={classes.swipeHandle}
      />
    </div>
  );
}

Backdrop.defaultProps = {
  closedBackLayerHeight: 56,
  openBackLayerHeight: 300,
  frontLayer: null,
  backLayer: null,
  backLayerOpen: true,
  onFrontLayerUnfix() {},
  onFrontLayerFix() {},
  className: null,
  classes: {},
};

Backdrop.propTypes = {
  closedBackLayerHeight: PropTypes.number,
  openBackLayerHeight: PropTypes.number,
  frontLayer: PropTypes.node,
  backLayer: PropTypes.node,
  backLayerOpen: PropTypes.bool,
  onFrontLayerUnfix: PropTypes.func,
  onFrontLayerFix: PropTypes.func,
  onBackLayerOpen: PropTypes.func.isRequired,
  onBackLayerClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.any),
};

export default Backdrop;
