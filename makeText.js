/** Command-line tool to generate Markov text. */

const fs = require("fs");
const process = require("process");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

// Generate text from Markov Machine
function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

// Generate text from a file
function generateFromFile(filename) {
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) {
      console.error(`Can't read ${filename}: ${err}`);
      process.exit(1);
    }
    console.log(`... generated text from file "${filename}" ...`);
    generateText(data);
  });
}

// Generate text from an URL
async function generateFromURL(url) {
  try {
    let res = await axios.get(url);
    console.log("... generated text from that URL ...");
    generateText(res.data);
  } catch (err) {
    console.error(`Can't read URL ${url}: ${err}`);
    process.exit(1);
  }
}

// Conditions
const idx = process.argv;
const method = idx[2];
if (method === "file") {
  generateFromFile(idx[3]);
} else if (method === "url") {
  generateFromURL(idx[3]);
} else {
  console.error(`Unknown method ${method}.`);
  process.exit(1);
}
