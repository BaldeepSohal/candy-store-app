import express, { Express, Request, Response } from "express";
import morgan from 'morgan';
import config from 'config';
import router from './routes/router';
import logger from "./middlewares/logger";
const app: Express = express();

// import debug from 'debug';
// const debug = debug('app:startup');

// console.log(process.env.NODE_ENV);
// console.log(config.get('name'));
// console.log(config.get('mail.email'));

app.use(express.json());

// app.use(logger);

// if(process.env.NODE_ENV == "development"){
    app.use(morgan('tiny'));
// }

app.use((req, res, next) => {
    console.log('Authenticating...');
    next();
})

app.use(router);

app.get('/', (req: Request, res: Response) => {
    res.send('Candy Store App!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});