'use strict';

const events = require('./events');
const sql = require('mssql');

// create an instance of the mssql package
const client = async (server, config) => {
  let pool = null;

  // close connection
  const closePool = async () => {
    try {
      // try to close the connection pool
      await pool.close();
      // set the pool to null to ensure a new one will be created by getConnection()
      pool = null;
    } catch (err) {
      // error closing the connection, set the pool to null to ensure a new one will be created by getConnection()
      pool = null;
      console.log(err);
      // server.log(['error', data], 'closePool error');
      // server.log(['error', 'data'], err);
    }
  };

  // returns the active connection pool or creates one if necessary
  const getConnection = async () => {
    try {
      if (pool) {
        // check if connection exist
        return pool;
      }
      // creat a new connection pool
      pool = await sql.connect(config);

      // cath any connection errors and close the pool
      pool.on('error', async (err) => {
        console.log(err);
        // server.log(['error', 'data'], 'connection pool error');
        // server.log(['error', 'data'], err);
        await closePool();
      });
      return pool;
    } catch (err) {
      // error connection to SQL server
      console.log(err);
      // server.log(['error', 'data', 'error connection to sql server']);
      // server.log(['error', 'data'], err);
      pool = null;
    }
  };

  // api the client exposes to the application
  return {
    events: await events.register({ sql, getConnection }),
  };
};

module.exports = client;
