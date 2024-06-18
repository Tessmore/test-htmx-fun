import express from 'express';
import path from 'path';
import seedrandom from "seedrandom";

/** LIBRARY */

function generateWord(rng, length = 5) {
    const characters = 'abcdefghijklmnoprstuvwy';

    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(rng() * characters.length));
    }

    return result;
}


/** SERVER */
const __dirname = path.resolve();

const app = express();
const port = 9000;

/** Serve static site */
app.use(express.static('public'));
app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

/** Calculate random seed for the day */
app.get('/seed', (_, res) => {
    const today = new Date().toLocaleDateString();
    const rng = seedrandom(today);
    const seed = Math.floor(rng() * 10000);

    res.send(`<div>${today}: ${seed}</div>`);
});

app.post('/words', (_, res) => {
    const today = new Date();
    const rng = seedrandom(today);

    const words = [];

    for (let i = 0; i < 20; i++) {
        words.push(generateWord(rng));
    }

    res.send(`<ul><li>${words.join("</li><li>")}</li></ul>`);
});

app.get('/search', (_, res) => {
    const rng = seedrandom();

    const entries = [];

    // Random number of words
    const N = Math.floor(Math.random() * 14) + 8;

    for (let i = 0; i < N; i++) {
        entries.push(generateWord(rng));
    }

    res.send(entries);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
