import express from 'express';
import { Log } from './logger.js';
import { Diablo2Path, MapCommand } from './map/map.process.js';
import { MapServer } from './server.js';
import * as fs from 'fs';

if (!fs.existsSync(MapCommand)) Log.warn({ path: MapCommand }, `Diablo2Map:Missing`);
if (!fs.existsSync(Diablo2Path)) Log.warn({ path: Diablo2Path }, `Diablo2Path:Missing`);

const html = fs.readFileSync('./www/index.html');
const js = fs.readFileSync('./www/index.js').toString().replace('process.env.MAP_HOST', "''");

MapServer.init().catch((e) => {
  MapServer.server.get('/', (ex: express.Request, res: express.Response) => {
    res.status(200);
    res.header('text/html');
    res.end(html);
  });
  MapServer.server.get('/index.js', (ex: express.Request, res: express.Response) => {
    res.status(200);
    res.header('text/javascript');
    res.end(js);
  });

  console.log(e);
  Log.fatal({ error: e }, 'Uncaught Exception');
});