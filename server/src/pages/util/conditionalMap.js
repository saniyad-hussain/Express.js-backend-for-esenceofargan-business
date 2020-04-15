'use strict';

const none = {};
const conditionalMap = (array, func) => {
  return array.reduce((finished, item, index, array) => {
    const result = func(item, none, index, array);
    if (result !== none) {
      finished.push(result);
    }
    return finished;
  }, []);
};

module.exports = conditionalMap;
