import express, { Express, Request, Response } from "express";
import morgan from 'morgan';
import config from 'config';
import router from './routes/router';
import logger from "./middlewares/logger";
import "dotenv/config";

const app: Express = express();

// import debug from 'debug';
// const debug = debug('app:startup');

// console.log(process.env.NODE_ENV);

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
    res.send(config.get('app_name'));
});

const port = process.env.NODE_DOCKER_PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});