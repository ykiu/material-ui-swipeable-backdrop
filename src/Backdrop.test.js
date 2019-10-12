import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';
import Backdrop from './Backdrop';
import theme from './testTheme';

const TRANSITION_DURATION = 250;

let onSwiping;
let onSwiped;
jest.mock('react-swipeable', () => {
  return {
    useSwipeable: options => {
      onSwiping = options.onSwiping;
      onSwiped = options.onSwiped;
    },
  };
});

jest.useFakeTimers();

function Wrapper(props) {
  return (
    <ThemeProvider theme={theme}>
      <Backdrop {...props} />
    </ThemeProvider>
  );
}

function createTestEnv({ backLayerOpen = false, ...rest } = {}) {
  const onSwipeStart = jest.fn();
  const onTransitionEnd = jest.fn();
  const onBackLayerClose = jest.fn();
  const onBackLayerOpen = jest.fn();
  const wrapper = mount(
    <Wrapper
      backLayerOpen={backLayerOpen}
      onSwipeStart={onSwipeStart}
      onTransitionEnd={onTransitionEnd}
      onBackLayerClose={onBackLayerClose}
      onBackLayerOpen={onBackLayerOpen}
      {...rest}
    />,
  );
  return {
    onSwipeStart,
    onTransitionEnd,
    onBackLayerClose,
    onBackLayerOpen,
    backLayerHeight() {
      return wrapper
        .render()
        .children()
        .first()
        .prop('style').height;
    },
    update() {
      wrapper.update();
    },
    setProps(props) {
      wrapper.setProps(props);
    },
  };
}

/**
 * A helper function to simulate a swipe.
 */
function swipe({ deltaY, speed }) {
  // Emulate the real world situation where onSwiping() is
  // called multiple times during a swipe.
  const absDeltaY = Math.abs(deltaY);
  onSwiping({ deltaY: deltaY / 2, event: { timeStamp: absDeltaY / 2 / speed } });
  onSwiping({ deltaY: deltaY, event: { timeStamp: absDeltaY / speed } });
  onSwiped({ deltaY: deltaY, event: { timeStamp: absDeltaY / speed } });
}

describe('Backdrop', () => {
  describe("Back layer's height", () => {
    it('equals to <collapsedBackLayerHeight>', () => {
      const { backLayerHeight: defaultBackLayerHeight } = createTestEnv();
      expect(defaultBackLayerHeight()).toEqual('56px');
      const { backLayerHeight } = createTestEnv({ collapsedBackLayerHeight: 80 });
      expect(backLayerHeight()).toEqual('80px');
    });
    it('equals to <expandedBackLayerHeight> if backLayerOpen is true', () => {
      const { backLayerHeight: defaultBackLayerHeight } = createTestEnv({ backLayerOpen: true });
      expect(defaultBackLayerHeight()).toEqual('300px');
      const { backLayerHeight } = createTestEnv({
        backLayerOpen: true,
        expandedBackLayerHeight: 280,
      });
      expect(backLayerHeight()).toEqual('280px');
    });
    it('equals to <collapsedBackLayerHeight> after a swipe collapsed the back layer', () => {
      const { backLayerHeight, setProps } = createTestEnv({ backLayerOpen: true });
      expect(backLayerHeight()).toEqual('300px');
      setProps({ backLayerOpen: false });
      expect(backLayerHeight()).toEqual('56px');
    });
    it('equals to <expandedBackLayerHeight> after a swipe collapsed the back layer', () => {
      const { backLayerHeight, setProps } = createTestEnv();
      expect(backLayerHeight()).toEqual('56px');
      setProps({ backLayerOpen: true });
      expect(backLayerHeight()).toEqual('300px');
    });
    it('tracks swipe', () => {
      const { backLayerHeight } = createTestEnv();
      onSwiping({ deltaY: -10, event: { timeStamp: 0 } });
      expect(backLayerHeight()).toEqual('66px');
    });
  });
  it('fires onSwipeStart() every time a swipe starts', () => {
    const { onSwipeStart } = createTestEnv();
    onSwiping({ deltaY: -10, event: { timeStamp: 0 } });
    onSwiping({ deltaY: -20, event: { timeStamp: 10000 } });
    // During a swipe, onSwiping() is invoked many times,
    // but only the first invokation triggers onSwipeStart()
    expect(onSwipeStart).toHaveBeenCalledTimes(1);

    // Once a swipe is complete, the internal state of Backdrop is reset
    // and onSwipeStart() is invoked when another swipe starts.
    onSwiped({ deltaY: -20, event: { timeStamp: 10000 } });
    onSwiping({ deltaY: -10, event: { timeStamp: 10000 } });
    expect(onSwipeStart).toHaveBeenCalledTimes(2);
  });
  it('does NOT fire onBackLayerOpen() if the swipe velocity is low', () => {
    const { onBackLayerOpen } = createTestEnv();
    swipe({ deltaY: -20, speed: 0.1 });
    expect(onBackLayerOpen).toHaveBeenCalledTimes(0);
  });
  it('fires onBackLayerOpen() if the swipe velocity is high', () => {
    const { onBackLayerOpen } = createTestEnv();
    swipe({ deltaY: -20, speed: 1 });
    expect(onBackLayerOpen).toHaveBeenCalledTimes(1);
  });
  it('fires onBackLayerOpen() if the swipe have almost opened the back layer', () => {
    const { onBackLayerOpen } = createTestEnv();
    // Swipe velocity is low, but the back layer is already almost open
    swipe({ deltaY: -290, speed: 0.1 });
    expect(onBackLayerOpen).toHaveBeenCalledTimes(1);
  });
  it('does NOT fire onBackLayerClose() if the swipe velocity is low', () => {
    const { onBackLayerClose } = createTestEnv({ backLayerOpen: true });
    swipe({ deltaY: 20, speed: 0.1 });
    expect(onBackLayerClose).toHaveBeenCalledTimes(0);
  });
  it('fires onBackLayerClose() if the swipe velocity is high', () => {
    const { onBackLayerClose } = createTestEnv({ backLayerOpen: true });
    swipe({ deltaY: 20, speed: 1 });
    expect(onBackLayerClose).toHaveBeenCalledTimes(1);
  });
  it('fires onBackLayerClose() if the swipe have almost opened the back layer', () => {
    const { onBackLayerClose } = createTestEnv({ backLayerOpen: true });
    // Swipe velocity is low, but the back layer is already almost open
    swipe({ deltaY: 290, speed: 0.1 });
    expect(onBackLayerClose).toHaveBeenCalledTimes(1);
  });
  it('fires onTransitionEnd() if the value of backLayerOpen changes', async () => {
    // Nice guide to async tests
    // https://stackoverflow.com/a/52196951
    const { setProps, onTransitionEnd, update } = createTestEnv();
    setProps({ backLayerOpen: true });
    update();
    jest.advanceTimersByTime(TRANSITION_DURATION);
    await Promise.resolve();
    expect(onTransitionEnd).toHaveBeenCalled();
  });
});
