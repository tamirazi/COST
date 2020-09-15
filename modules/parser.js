const Papa = require("papaparse");

praserOptions = {
  header: true,
  download: true,
};

module.exports.parseFile = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      ...praserOptions,
      error: (error) => reject(error),
      complete: (results) => {
        for (const element of results.data) {
          //delete all the empty properties
          Object.keys(element).forEach(
            (k) => !element[k] && element[k] !== undefined && delete element[k]
          );
        }
        const clean_data = results.data.filter((e) => {
          return e["Item Type"] != "Item Type";
        });
        resolve(clean_data);
      },
    });
  });
};
