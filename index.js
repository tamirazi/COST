const csvFile = require("./DB/db.csv");
const parser = require("./modules/parser");
const dt = require("./modules/datatable");

parser.parseFile(csvFile).then((arr) => dt.makeDataTable(arr));
