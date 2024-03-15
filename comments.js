// Create a web server
// Create a route for the comments page
// The comments page should display the comments from the comments.json file
// The comments should be displayed as a list of comments
// Each comment should display the comment and the name of the person who posted the comment
// The comments should be displayed in reverse chronological order

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.get('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const comments = JSON.parse(data);
      res.send(`
        <h1>Comments</h1>
        <ul>
          ${comments.reverse().map(comment => `<li>${comment.name}: ${comment.comment}</li>`).join('')}
        </ul>
      `);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});