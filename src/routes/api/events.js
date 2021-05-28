'use strict';

module.exports.register = async (server) => {
  server.route({
    method: 'GET',
    path: '/api/events',
    config: {
      handler: async (request) => {
        try {
          // get the sql client registered as a plugin
          const db = request.server.plugins.sql.client;
          // TODO get the current authenticate user's ID
          const userId = 'userTest';

          // execute the query
          const res = await db.events.getEvents(userId);

          // return the recordset object
          return res.recordset;
        } catch (err) {
          console.log(err);
        }
      },
    },
  });
};