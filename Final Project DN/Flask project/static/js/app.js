// this function is run when the page loads
function main() {
    console.log("Beginning main()");
   // weeklyChart(); // draw the weeklyChart
    //matchesTable(); // draw the matches
    //playersTable(); // draw the players
    //salaryTable(); // draw the salaryTable
}

// this function plots a chart of weekly data (called from main, above)
function weeklyChart() {
    d3.json("/api/weeklydata").then(rows => { // call the server.py api for weeklydata
        // console.log(rows);
        let data = sqlToTrace(rows, "day", "value");
        let options = { margin: { t: 0 } };
        Plotly.newPlot("chartDiv", [data], options); // remember - plotly wants an array of data (one per trace)
    });
}

// this function plots a table of salary data (called from main, above)
function salaryTable() {
    d3.json("/api/salarydata").then(rows => { // call the server.py api for salarydata
        let values = sqlToTable(rows);
        let keys = [["<b>EXPENSES</b>"], ["<b>Q1</b>"], ["<b>Q2</b>"], ["<b>Q3</b>"], ["<b>Q4</b>"]]
        // console.log(values);
        let tableData = [{
            type: 'table',
            header: {
                values: keys,
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "grey" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: values,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }];

        Plotly.newPlot('tableDiv', tableData);
    });
}

function matchesTable() {
    d3.json("/api/matches").then(rows => { // call the server.py api for salarydata
        // console.log(rows);
        let values = transpose(sqlToTable(rows).slice(1));
        let keys = Object.keys(rows[0]).map(key => [key]);

        let tableData = [{
            type: 'table',
            header: {
                values: keys,
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "grey" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: values,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }];

        Plotly.newPlot('matchesDiv', tableData);
    });
}

function playersTable() {
    d3.json("/api/players").then(rows => { // call the server.py api for salarydata
        // console.log(rows);
        let values = transpose(sqlToTable(rows).slice(1));
        let keys = Object.keys(rows[0]).map(key => [key]);
        // console.log(keys);
        // console.log(values);
        let tableData = [{
            type: 'table',
            header: {
                values: keys,
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "grey" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: values,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }];

        Plotly.newPlot('playersDiv', tableData);
    });
}

// this is a utility function that rearranges the data from a SQL resultSet to x/y traces
// rows=data from sql
//   [{"age": 25, "name": "Willy"}, {"age": 57, "name": "Greg"}]
// xname=the name of the x data, ("name")
// yname = the name of the y data ("age")
// results: { x:["Willy", "Greg"], y:[25, 57] }
// NOTE: You can call this multiple times to create multiple traces
function sqlToTrace(rows, xname, yname) {  
    let x = [];
    let y = [];
    for (row of rows) {
        x.push(row[xname]);
        y.push(row[yname]);
    }
    return { x, y };
}

//
// makes all the rows columns, and all the columns rows
function transpose(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
}

// this is a utility function that rearranges the data from a SQL resultSet tabular datas
// rows=data from sql, 
//   [{"age": 25, "name": "Willy"}, {"age": 57, "name": "Greg"}]
// returns a single row of HEADINGS
// and each subsequent row
//  results: [ ["name", "age"], ["Willy", 25], ["Greg", 57] ]

function sqlToTable(rows) {
    let header = [];
    let body = [];
    for (heading in rows[0]) {// getting the object keys
        header.push(heading);
    }
    body.push(header);
    for (row of rows) {
        body.push(Object.values(row))
    }
    return body;
}

main(); // initialize the page