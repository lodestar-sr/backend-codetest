import * as express from 'express';
import * as compression from 'compression'; // compresses requests
import * as bodyParser from 'body-parser';
import * as expressValidator from 'express-validator';
import * as cors from 'cors';

import {CONFIG} from "./config";
import {RadarRouter} from "./routes";


// Create Express server
const app = express();

// Express configuration
app.set('port', CONFIG.PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cors());


app.use('/radar', RadarRouter);

app.use((req: express.Request, resp: express.Response) => {
  resp.status(404).send({
    msg: 'Not Found!'
  });
});

module.exports = app;
