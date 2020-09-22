const csvFile = require("./DB/clean_db.csv");
const parser = require("./modules/parser");
const dt = require("./modules/datatable");

parser.parseFile(csvFile).then((arr) => dt.makeDataTable(arr));
