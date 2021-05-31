'use strict';

const bell = require('@hapi/bell');
const cookie = require('@hapi/cookie');

const isSecure = process.env.NODE_ENV === 'production';

module.exports = {
  name: 'auth',
  version: '1.0.0',
  register: async (server) => {
    // register plugins

    await server.register([cookie, bell]);
    const config = server.app.config;

    // config cookie authorization strategy
    server.auth.strategy('session', 'cookie', {
      cookie: {
        name: 'okta-oauth',
        path: '/',
        password: config.cookiePwd,
        // should be set to true (default) in production
        isSecure,
      },
      // if there is no session, redirect
      redirectTo: '/authorization-code/callback',
    });

    // configure bell to use your Okta authorization server
    server.auth.strategy('okta', 'bell', {
      provider: 'okta',
      config: { uri: config.okta.url },
      password: config.cookiePwd,
      isSecure,
      location: config.url,
      clientId: config.okta.clientId,
      clientSecret: config.okta.clientSecret,
    });

    server.auth.default('session');

    server.ext('onPreResponse', (request, h) => {
      if (request.response.variety === 'view') {
        const auth = request.auth.isAuthenticated
          ? {
              isAuthenticated: true,
              isAnonymous: false,
              email: request.auth.artifacts.profile.email,
              firstName: request.auth.artifacts.profile.firstName,
              lastName: request.auth.artifacts.profile.lastName,
            }
          : {
              isAuthenticated: false,
              isAnonymous: true,
              email: '',
              firstName: '',
              lastName: '',
            };
        request.response.source.context.auth = auth;
      }
      // life cycle of the reponse
      return h.continue;
    });
  },
};
