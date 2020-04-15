import EventEmitter from 'eventemitter3';

const appTarget = new EventEmitter();

const makeHandler = (handlerType, listener) => {
  return (incomingType, ...args) => {
    if (handlerType === incomingType) {
      listener(...args);
    }
  };
};

const dispatch = (type, ...args) => {
  appTarget.emit('appEvent', type, ...args);
};
Object.assign(dispatch, {
  subscribe: (type, listener) => {
    const handler = makeHandler(type, listener);
    appTarget.on('appEvent', handler);
    return () => {
      appTarget.removeListener('appEvent', handler);
    };
  },
  once: (type, listener) => {
    const handler = makeHandler(type, listener);
    appTarget.once('appEvent', handler);
    return () => {
      appTarget.removeListener('appEvent', handler);
    };
  },
});

export default dispatch;
