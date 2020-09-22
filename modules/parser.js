const Papa = require("papaparse");

praserOptions = {
  header: true,
  download: true,
  skipEmptyLines: true,
};

module.exports.parseFile = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      ...praserOptions,
      error: (error) => reject(error),
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};
