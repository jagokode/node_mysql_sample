const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: '****',
  password: '********',
  database: 'acme'
});

db.connect();

app.get('/users', (req, res) => {
  // const sql = 'select * from users';
  // const sql =
  //   'select first_name, last_name, email from users order by last_name';
  const sql = `select
    comments.body,
    posts.title,
    users.first_name,
    users.last_name
    from comments
    inner join posts on posts.id = comments.post_id
    inner join users on users.id = comments.user_id
    order by posts.title`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

app.listen(3000, () => console.log('Server started at port 3000'));
