import {Router} from "express";
import RadarController from "./controllers/radar.ctrl";

export const RadarRouter = Router();
RadarRouter.post('/', RadarController.findIdealEnemy);
