'use strict';
const React = require('react');

const Context = React.createContext();
module.exports.Context = Context;
module.exports.Provider = Context.Provider;
module.exports.Consumer = Context.Consumer;

module.exports.withContext = Component => props => {
  return (
    <module.exports.Context.Consumer>
      {context => <Component {...props} {...context} />}
    </module.exports.Context.Consumer>
  );
};
