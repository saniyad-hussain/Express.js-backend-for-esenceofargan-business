const log = (...args) => {
  if (console) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

export default log;
