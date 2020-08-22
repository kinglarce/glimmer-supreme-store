// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const layout = require('express-layout');
const routes = require('./routes');
const cron = require('node-cron');
const { popWish } = require('./model/Post');
const { sendMail } = require('./model/Mailer');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middlewares = [
  layout(),
  express.static(path.join(__dirname, 'public')),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  morgan(),
];
app.use(middlewares);
app.use('/', routes);

// Note: Only send 1 mail every 15 secs to prevent it from becoming spam
cron.schedule('*/15 * * * * *', () => sendMail(popWish()));

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
