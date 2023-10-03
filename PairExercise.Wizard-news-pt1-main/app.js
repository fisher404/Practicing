const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require ("./postBank");

app.use(morgan('dev'));
app.use(express.static('public'));

app.get("/", (req, res) => {
const posts = postBank.list();

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="new-list">
      <header><img src="/logo.png"/>Wizard News</header>
    ${posts.map((post) => `
      <div class="news-item">
        <p>
          <span class="news-position">${post.id}. ▲</span>${post.title}
          <small>(by ${post.name})</small
        </p>
        <small class="news-info">
        ${post.upvotes} upvotes | ${post.date}
        </small>
      </div>`
      ).join('')}
  </body>
<html>`;

res.send(html);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!id){
    throw new Error("Not Found")
  }
  else {
  const singlePost = `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="new-list">
        <header><img src="/logo.png"/>Wizard News</header>
      <div class='news-item'>
        <p>
          <span class="news-position">${post.id}. ▲</span>${post.title}
          <small>(by ${post.name})</small>
        </p>
        <small class="news-info">
          ${post.upvotes} upvotes | ${post.date}
        </small>
        <p>
          ${post.content}
        </p>
  </div>
    </body>
  <html>`;
  res.send(singlePost);
  }
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});


