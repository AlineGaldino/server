import { Application } from './app';
import './database/connect';

const port = Number(3001);
const app = new Application();

app.start(port);
