//from search URL paramter, determine what city is being called
function queryStringParser() {
  let results = {};
  let words = window.location.search.substring(1).split('&');
  for (word of words) {
    let [key, value] = word.split("=");
    results[key] = [value];
  }
  return results;
}

let parms = queryStringParser();
let city = decodeURIComponent(parms.city);
console.log(city);

let cityrank = "";
let state = "";
let averagesalary = "";
let mediahousingcost = "";
let medianrent = "";
let unemploymentrate = "";

//d3.csv("search.csv").then(data => { 
d3.csv("CityDataFinal.csv").then(data => { 
    console.log(data);

  // Loop through cities in the csv and find the row for the city 
  data.forEach(cities => {
    console.log(city);
    let citystatecodeDB = cities.city + ", " + cities.statecode;
    console.log(citystatecodeDB);
    if (city === citystatecodeDB) {
        document.getElementById("showcity").innerHTML = citystatecodeDB;
        document.getElementById("showaveragesalary").innerHTML = cities.avg_sal;
        document.getElementById("showmediahousingcost").innerHTML = cities.med_h;
        document.getElementById("showmedianrent").innerHTML = cities.med_r;
        document.getElementById("showunemploymentrate").innerHTML = cities.unemp;
        document.getElementById("showhightemp").innerHTML = cities.avg_h_temp;
        document.getElementById("showlowtemp").innerHTML = cities.avg_l_temp;
        document.getElementById("showmedianage").innerHTML = cities.med_age;
        document.getElementById("showaveragehouseprice").innerHTML = cities.avg_price;
        document.getElementById("showsalary").innerHTML = cities.salary;
        document.getElementById("showpositions").innerHTML = cities.positions;
        document.getElementById("showmonthlymortgage").innerHTML = cities.mtg30;
        document.getElementById("showmortgagebysalary").innerHTML = cities.mtg_by_sal;
      //  document.getElementById("showmortgagebysalaryN").innerHTML = cities.mbs;
        document.getElementById("showannualrent").innerHTML = cities.rent12;
        document.getElementById("showrentbysalary").innerHTML = cities.rent_by_sal;
        //document.getElementById("showrbs").innerHTML = cities.rbs;
       // document.getElementById("showourrank").innerHTML = cities.rank;
      } 
  })
}) 

