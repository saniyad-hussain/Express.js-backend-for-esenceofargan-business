'use strict';
const scrypt = require('scrypt-for-humans');
const Promise = require('bluebird');

// async function sendLoginCodeEmail (mailer, email, code) {
//   return mailer.sendEmail({
//     to: email,
//     from: 'noreply@essenceofargan.com',
//     subject: 'Essence Of Argan registration',
//     text: `Hi! This is your registration code for essenceofargan.com: ${code}

// You used email address: ${email}

// If you didn't attempt to register, you can safely ignore this email.`,
//     html: `<p>Hi! This is your registration code for essenceofargan.com: <b>${code}</b></p>
// <p>You used email address: ${email}</p>
// <p style="font-size: .9em;">If you didn't attempt to register, you can safely ignore this email.</p>`,
//   });
// }

module.exports = ({ router, addDebugData }) => {
  router.post('/login_password', async (req, res) => {
    if (!req.body.email || !req.body.password) {
      addDebugData({ req, label: 'missing email or password', data: req.body });
      const formErrors = {};
      if (!req.body.email) {
        formErrors.email = 'Required';
      }
      if (!req.body.password) {
        formErrors.password = 'Required';
      }
      res.status(400);
      // create response
      // error: 'Email and Password are required.',
      return;
    }
    const user = req.knex('user').where({ email: req.body.email }).first();
    if (user == null) {
      addDebugData({ req, label: 'email not found', data: req.body.email });
      // TODO create response
      //  message: 'Email and Password combination is incorrect. Check what you entered and try again.',
      return;
    }
    const isPasswordCorrect = await scrypt
      .verifyHash(req.body.password, user.password)
      .then(() => true)
      .catch(scrypt.PasswordError, () => false);
    if (!isPasswordCorrect) {
      // TODO create response
      //  message: 'Email and Password combination is incorrect. Check what you entered and try again.',
      return;
    }
    addDebugData({ req, label: 'email/password valid' });
    await Promise.fromCallback(callback =>
      req.session.regenerate(callback)
    )
      .catch(error => {
        addDebugData({ req, label: 'failed to regerated session', data: error.message });
        res.set('csrf-token', req.csrfToken());
        console.log('Failed to regenerate session for login', error);
        throw error;
      });
    addDebugData({ req, label: 'user logged in', data: req.body.email });
    req.session.user_id = user.id;
    res.set('csrf-token', req.csrfToken());
    // TODO create response
    // respond(res, 'success', {
    //   message: 'Successfully logged in',
    //   user: {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //   },
    // });
  });
  return router;
};
