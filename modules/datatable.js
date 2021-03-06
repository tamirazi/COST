const $ = require("jquery");
require("datatables.net-se")();

const dtOptions = {
  autoWidth: false,
  columnDefs: [
    { width: "5%", targets: 0 },
    { width: "5%", targets: 1 },
    { width: "45%", targets: 2 },
    { width: "30%", targets: 3 },
    { width: "10%", targets: 4 },
  ],

  columns: [
    {
      className: "details-control",
      orderable: false,
      data: null,
      defaultContent: "",
    },
    { data: "ID" },
    { data: "Title" },
    { data: "Author" },
    { data: "Publication Year" },
  ],
};

module.exports.makeDataTable = (data) => {
  $("#dataset tfoot th").each(function () {
    var title = $("#dataset thead th").eq($(this).index()).text();
    $(this).html('<input type="text" placeholder="' + title + '" />');
  });
  const table = $("#dataset").DataTable({
    searchHighlight: true,
    data: data,
    ...dtOptions,
  });
  // Apply the search
  table.columns().every(function () {
    var that = this;

    $("input", this.footer()).on("keyup change", function () {
      that.search(this.value).draw();
    });
  });
  $("#dataset tbody").on("click", "td.details-control", function () {
    var tr = $(this).closest("tr");
    var row = table.row(tr);

    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass("shown");
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass("shown");
    }
  });
};

function format(d) {
  // `d` is the original data object for the row
  return (
    `<h3 class="abstract"><u>${d["Title"]}</u></h3>` +
    `<p class="abstract">` +
    `<strong>Abstract: </strong><br>` +
    d["Abstract Note"] +
    `</p>` +
    `
    <table class="extra-table ui fixed single line selectable table" style="width: 100%;" >
    <tbody>
    <tr>
    <td>Article type</td>
    <td>` +
    d["Article type"] +
    `</td>
    <td>Acid type used</td>
    <td>` +
    d["Acid type used"] +
    `</td>
    </tr>
    <tr>
    <td>DOI</td>
    <td>` +
    d["DOI"] +
    `</td>
    <td>Volume</td>
    <td>` +
    d["Volume"] +
    `</td>
    </tr>
    <tr>
    <td>Field of research</td>
    <td>` +
    d["Field of research"] +
    `</td>
    <td>Genius species identifier</td>
    <td>` +
    d["Genius species identifier"] +
    `</td>
    </tr>
    <tr>
    <td>ISSN</td>
    <td>` +
    d["ISSN"] +
    `</td>
    <td>Item Type</td>
    <td>` +
    d["Item Type"] +
    `</td>
    </tr>
    <tr>
    <td>Key</td>
    <td>` +
    d["Key"] +
    `</td>
    <td>pH range invastigated</td>
    <td>` +
    d["pH range invastigated"] +
    `</td>
    </tr>
    <tr>
    <td>Library Catalog</td>
    <td>` +
    d["Library Catalog"] +
    `</td>
    <td>Medium/Matrix used</td>
    <td>` +
    d["Medium/Matrix used"] +
    `</td>
    </tr>
    <tr>
    <td>Pages</td>
    <td>` +
    d["Pages"] +
    `</td>
    <td>Relevance</td>
    <td>` +
    d["Relevance"] +
    `</td>
    </tr>
    <tr>
    <td>Strains invastigated</td>
    <td>` +
    d["Strains invastigated"] +
    `</td>
    <td>Url</td>
    <td> <a href= ` +
    d["Url"] +
    `  >` +
    d["Url"] +
    `</a>` +
    `</td>
    </tr>
    </tbody>
    </table>
    `
  );
}
