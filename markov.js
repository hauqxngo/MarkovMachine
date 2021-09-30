/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord]);
      }
    }
    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // get a random key
    function randomKey(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    let keys = Array.from(this.chains.keys());
    let key = randomKey(keys);
    let output = [];

    while (output.length <= numWords && key !== null) {
      output.push(key);
      key = randomKey(this.chains.get(key));
    }
    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
