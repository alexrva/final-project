
$(document).ready(function () {
    $('#search').keyup(function () {
        console.log("Huh");
        search_table($(this).val());
    });
    function search_table(value) {
        $('#search_table tr').each(function () {
            var found = 'false';
            $(this).each(function () {
                if (($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) || ($(this).attr('id') === 'tr-header')) {
                    found = 'true';
                }
            });
            if (found == 'true' && value) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    }

});

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'currency', minimumFractionDigits: 0,
    maximumFractionDigits: 0, currency: 'USD' });
}

function makeTable() {
    let header = `\
    <tr id="tr-header" style="display:none">
    <th style="text-align:center" title="Field #1">City Rank</th>
    <th style="text-align:center" title="Field #2">City</th>
    <th style="text-align:center" title="Field #3">State</th>
    <th style="text-align:center" title="Field #4">Average Salary</th>
    <th style="text-align:center" title="Field #5">Median House Price</th>
    <th style="text-align:center" title="Field #6">Median Rent</th>
    <th style="text-align:center" title="Field #7">Unemployment Rate</th>
    <th style="text-align:center" title="Field #8">State Tax Rate</th>    
    <th style="text-align:center" title="Field #9">Local Tax Low</th>    
    <th style="text-align:center" title="Field #10">Local Tax High</th>    
    <th style="text-align:center" title="Field #11">Safety Rank</th>    
    <th style="text-align:center" title="Field #12">Fast Growth Rank</th>    
    <th style="text-align:center" title="Field #13">City To Retire Rank</th>
    <th style="text-align:center" title="Field #14">Learn More</th>
</tr>`;
    $("#search_table").append(header);

    d3.json(`/api/tabledata`).then(rows => { // call the server.py api for salarydata
        console.log(rows);
        for (row of rows) {
            let html = `
        <tr style="display:none">
        <td align="center">${row.cityrank}</td>
        <td><a href="/House_Unemp.html?city=${row.city}, ${row.abbr}">${row.city}</a></td>
        <td>${row.state}</td>
        <td align="right">${formatMoney(row.averagesalary)}</td>
        <td align="right">${formatMoney(parseInt(row.medianhousingcost))}</td>
        <td align="right">${formatMoney(parseInt(row.medianrent))}</td>
        <td align="center">${row.unemploymentrate}%</td>
        <td align="center">${row.state_rate}%</td>
        <td align="center">${row.local_tax_low}%</td>
        <td align="center">${row.local_tax_high}%</td>
        <td align="center">${row.safe_rank_25}</td>
        <td align="center">${row.fast_growing_25}</td>
        <td align="center">${row.retirerank}</td>
        <td align="center"><a href="${row.href}" target="_blank">Explore</a></td>
        </tr>`;
            console.log(html);
            $("#search_table").append(html);
        }
    });

}

makeTable();
