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
    opacity: 0.3,
  },
  frontLayer: {
    width: '100%',
    flex: 1,
    borderRadius: theme.spacing(2, 2, 0, 0),
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

function calcPostSwipeAction(
  currentHeight,
  velocity,
  collapsedBackLayerHeight,
  expandedBackLayerHeight,
) {
  const action =
    calcDistance(currentHeight + velocity * 1000, collapsedBackLayerHeight) <
    calcDistance(currentHeight + velocity * 1000, expandedBackLayerHeight)
      ? COLLAPSE
      : EXPAND;
  return action;
}

function Backdrop({
  frontLayer,
  backLayer,
  backLayerOpen,
  collapsedBackLayerHeight,
  expandedBackLayerHeight,
  onSwipeStart,
  onTransitionEnd,
  onBackLayerOpen,
  onBackLayerClose,
  classes: extraClasses,
}) {
  const classes = useStyles();
  const [swipeSurfaceY, setSwipeSurfaceY] = useState(
    backLayerOpen ? expandedBackLayerHeight : collapsedBackLayerHeight,
  );
  const [underTransition, setUnderTransition] = useState(false);
  const [prevEvent, setPrevEvent] = useState(null);
  const [postSwipeAction, setPostSwipeAction] = useState(EXPAND);
  const swipeHandleY = backLayerOpen ? expandedBackLayerHeight : collapsedBackLayerHeight;

  const handleSwiping = curEvent => {
    if (prevEvent) {
      const currentHeight = -curEvent.deltaY + swipeHandleY;
      const velocity = calcVelocity(prevEvent, curEvent);
      const action = calcPostSwipeAction(
        currentHeight,
        velocity,
        collapsedBackLayerHeight,
        expandedBackLayerHeight,
      );
      setPostSwipeAction(action);
    } else {
      onSwipeStart();
    }
    setPrevEvent(curEvent);
    setSwipeSurfaceY(-curEvent.deltaY + swipeHandleY);
  };

  const snapBackLayer = useCallback(async () => {
    const snappedY = backLayerOpen ? expandedBackLayerHeight : collapsedBackLayerHeight;
    setPrevEvent(null);
    setUnderTransition(true);
    setSwipeSurfaceY(snappedY);
    await sleep(TRANSITION_DURATION);
    setUnderTransition(false);
    onTransitionEnd();
  }, [backLayerOpen, collapsedBackLayerHeight, expandedBackLayerHeight, onTransitionEnd]);

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
    <div className={clsx(classes.root, extraClasses.root)}>
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
        {frontLayer}
      </Paper>
      <div {...swipeHandlers} style={{ top: swipeHandleY - 16 }} className={classes.swipeHandle} />
    </div>
  );
}

Backdrop.defaultProps = {
  collapsedBackLayerHeight: 56,
  expandedBackLayerHeight: 300,
  frontLayer: null,
  backLayer: null,
  onSwipeStart() {},
  onTransitionEnd() {},
  classes: {},
};

Backdrop.propTypes = {
  collapsedBackLayerHeight: PropTypes.number,
  expandedBackLayerHeight: PropTypes.number,
  frontLayer: PropTypes.node,
  backLayer: PropTypes.node,
  onSwipeStart: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  onBackLayerOpen: PropTypes.func.isRequired,
  onBackLayerClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.any),
};

export default Backdrop;
