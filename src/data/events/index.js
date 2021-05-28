'use strict';

const utils = require('../utils');

const register = async ({ sql, getConnection }) => {
  // read all .sql files
  const sqlQueries = await utils.loadSqlQueries('events');

  const getEvents = async (userId) => {
    // get a connection to SQL server
    const cnx = await cnx.request();

    // create a new request
    const request = await cnx.request();

    // configure sql query parameters
    request.input('userId', sql.VarChar(50), userId);

    // return the executed query
    return request.query(sqlQueries.getEvents);
  };

  return { getEvents };
};

module.exports = { register };
