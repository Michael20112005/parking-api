const http = require("http");

const TARGET_URL = "http://localhost:3000/api/vehicles";
const REQUEST_INTERVAL_MS = 50;

let counter = 0;

function sendRequest() {
  http
    .get(TARGET_URL, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        counter++;
        console.log(
          `[${counter}] GET ${TARGET_URL} -> status ${res.statusCode}`
        );
      });
    })
    .on("error", (err) => {
      console.error("Request error:", err.message);
    });
}

console.log("Load test started...");
console.log(`Target: ${TARGET_URL}`);
console.log(`Interval: ${REQUEST_INTERVAL_MS} ms`);

setInterval(sendRequest, REQUEST_INTERVAL_MS);