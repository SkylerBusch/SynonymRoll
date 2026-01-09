const http = require('node:http');
const fs   = require('node:fs');

// Ganer's API
const getSynonyms = (word,cb) =>
  fetch(`http://192.168.1.25:1984/getSynonyms/${word}`)
    .then(req => req.json().then(j => cb(j)));

const randomWord = (cb) =>
  fetch(`http://192.168.1.25:1984/randomWord`)
    .then(req => req.json().then(j => cb(j.word)));

// Server Creation - Server Fetch Synonyms - Server Fetch randomWord
const server = http.createServer((req, res) => {
  if(req.url.startsWith("/getSynonyms/")) {
    const word = req.url.slice(13);
    getSynonyms(word, syn => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(syn));
    });
    return;
  }
  
  if(req.url.startsWith("/randomWord")) {
    randomWord(rWord => {
      res.writeHead(200, { "Content-Type": "application/json"});
      res.end(JSON.stringify(rWord));
    });
    return;
  }
  
  if(req.url.startsWith("/roll.png")) {
    fs.readFile('roll.png', (err, data) => {
      if(err) return console.error(err);
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(data); });
    return; }
  
  // Server Idle Animation
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

process.on('unhandledRejection', err => {
  console.error('Unhandled rejection:', err);
});

server.listen(8000);
