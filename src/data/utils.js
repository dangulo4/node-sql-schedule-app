'use strict';

const fse = require('fs-extra');
const { join } = require('path');

const loadSqlQueries = async (folderName) => {
  // determine the fie path for the folder
  const filePath = join(process.cwd(), 'src', 'data', folderName);

  // get a list of all the files in the folder
  const files = await fse.readdir(filePath);

  // only files that have the .sql extention
  const sqlFiles = files.filter((f) => f.endsWith('.sql'));

  // loop over the files and read in their contents
  const queries = {};
  sqlFiles.map((sqlFile) => {
    const query = fse.readFileSync(join(filePath, sqlFiles[i]), {
      encoding: 'UTF-8',
    });
    queries[sqlFile.replace('.sql', '')] = query;
  });
  return queries;
};

module.exports = {
  loadSqlQueries,
};
