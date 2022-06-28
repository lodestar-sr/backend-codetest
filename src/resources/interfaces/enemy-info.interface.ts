import {IPoint} from "./point.interface";
import {ENEMY_TYPE} from "../enums";

export interface IEnemyInfo {
  coordinates: IPoint;
  allies?: number;
  enemies: {
    type: ENEMY_TYPE;
    number: number;
  };
  score: number;
  dist: number;
}
