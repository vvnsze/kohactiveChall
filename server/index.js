const express = require('express');
require('dotenv').config();
const chalk = require('chalk');
const apiRoutes = require('./apiRoutes');

const port = process.env.PORT || 1337
const app = express();

app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(chalk.cyan(`<Kohactive> is listening on ${port}`));
})
