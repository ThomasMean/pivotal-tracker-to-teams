import express from "express";
import path from "path";
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  // tslint:disable-next-line:no-console
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
