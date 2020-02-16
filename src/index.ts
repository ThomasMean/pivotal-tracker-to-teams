import express from "express";
import path from "path";
import * as bodyParser from 'body-parser';
const PORT = process.env.PORT || 5000

import activity from "./activity";

express()
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .use('/api/activity', activity)
  // tslint:disable-next-line:no-console
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
