import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const app = express();
const port = 9000;

app.use(express.static('public'));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/data', (_, res) => {
    res.send('<div>Hello HTMX world!</div>');
});

app.get('/search', (_, res) => {

    const entries = [];

    for (let i = 0; i < Math.random()*100; i++) {
        entries.push(
            Math.random().toFixed(3)
        );
    }

    res.send(entries);
});

app.post('/data', (_, res) => {
    res.send('<div>Hello HTMX world!</div>');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
