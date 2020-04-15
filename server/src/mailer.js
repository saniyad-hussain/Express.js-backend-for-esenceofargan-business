'use strict';

const emailParts = ['to', 'from', 'subject', 'text', 'html'];

module.exports = function () {
  return {
    sendEmail: email => {
      const missingParts = emailParts.filter(key => !email[key]);
      if (missingParts.length > 0) {
        throw new Error(`Email missing these properties: "${missingParts.join('", "')}"`);
      }
      console.log(email);
    },
  };
};
