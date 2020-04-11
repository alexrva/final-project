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
// alert (parms.city)
let city = decodeURIComponent(parms.city);
console.log(city);
