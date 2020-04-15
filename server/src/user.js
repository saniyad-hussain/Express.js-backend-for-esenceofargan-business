'use strict';
const Promise = require('bluebird');

function userRoutes ({ router, addDebugData }) {
  router.use(async (req, res, next) => {
    if (req.session.user_id) {
      const [user] = await req.knex('user')
        .select('id', 'name', 'email')
        .where({ id: req.session.user_id });
      if (!user) {
        await Promise.fromCallback(cb => req.session.destroy(cb));
        addDebugData({ req, label: 'Session user not found!', data: req.session.user_id });
      } else {
        addDebugData({ req, label: 'Session user loaded', data: user});
        req.user = { id: user.id, name: user.name, email: user.email, password: user.password };
        req.hasRole = (role) => {
          if (role === 'user') {
            return true;
          }
          return false;
        };
      }
    } else {
      req.hasRole = () => false;
    }
    next();
  });
  return router;
}

module.exports = userRoutes;
