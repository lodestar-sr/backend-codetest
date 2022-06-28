import {Request, Response} from "express";
import {PROTOCOL} from "../resources/enums";
import {IEnemyInfo} from "../resources/interfaces";
import {RadarService} from "../services/radar.service";

class RadarController {

  async findIdealEnemy(req: Request, res: Response) {
    req.checkBody('protocols').notEmpty();
    req.checkBody('scan').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).send(errors);
    }

    const protocols: PROTOCOL[] = req.body.protocols;
    const enemies: IEnemyInfo[] = req.body.scan;

    const idealEnemy = RadarService.findIdealEnemy(protocols, enemies);

    res.status(200).send(idealEnemy?.coordinates);
  }
}

export default new RadarController();
