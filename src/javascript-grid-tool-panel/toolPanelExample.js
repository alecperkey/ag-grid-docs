var columnDefs = [
    {headerName: "Athlete", field: "athlete", width: 150, enableRowGroup: true, enablePivot: true},
    {headerName: "Age", field: "age", width: 90, enableValue: true},
    {headerName: "Country", field: "country", width: 120, enableRowGroup: true, enablePivot: true},
    {headerName: "Year", field: "year", width: 90, enableRowGroup: true, enablePivot: true},
    {headerName: "Date", field: "date", width: 110, enableRowGroup: true, enablePivot: true},
    {headerName: "Sport", field: "sport", width: 110, enableRowGroup: true, enablePivot: true},
    {headerName: "Gold", field: "gold", width: 100, hide: true, enableValue: true, toolPanelClass: 'tp-gold'},
    {headerName: "Silver", field: "silver", width: 100, hide: true, enableValue: true, toolPanelClass: ['tp-silver']},
    {headerName: "Bronze", field: "bronze", width: 100, hide: true, enableValue: true,
        toolPanelClass: function(params) {
            return 'tp-bronze';
        }},
    {headerName: "Total", field: "totalAgg", valueGetter: "node.group ? data.totalAgg : data.gold + data.silver + data.bronze", width: 100}
];

var gridOptions = {
    columnDefs: columnDefs,
    rowData: null,
    enableSorting: true,
    showToolPanel: true,
    rowGroupPanelShow: 'always'
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', '../olympicWinners.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            gridOptions.api.setRowData(httpResult);
        }
    };
});