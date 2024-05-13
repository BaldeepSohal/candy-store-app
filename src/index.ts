import express, { Express, Request, Response } from "express";
import morgan from 'morgan';
import config from 'config';
import router from './routes/router';
import logger from "./middlewares/logger";
import "dotenv/config";

const app: Express = express();

app.use(express.json());

// app.use(logger);

app.use(morgan('tiny'));

app.use(router);

app.get('/', (req: Request, res: Response) => {
    res.send(config.get('app_name'));
});

const port = (config.get('env') == 'development') ? process.env.NODE_PORT : 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

export default app;