import {IEnemyInfo} from "../resources/interfaces";
import {ENEMY_TYPE, PROTOCOL} from "../resources/enums";

class RadarServiceClass {

  findIdealEnemy(protocols: PROTOCOL[], enemies: IEnemyInfo[]) {
    // ignore enemies which are far way more than 100m
    let properEnemies = enemies.filter((enemy) => (
      enemy.coordinates.x * enemy.coordinates.x + enemy.coordinates.y * enemy.coordinates.y <= 10000
    ));

    // calculate enemies' score
    let maxScore = 0;
    properEnemies.forEach((enemy) => {
      enemy.score = 0;
      enemy.dist = enemy.coordinates.x * enemy.coordinates.x + enemy.coordinates.y * enemy.coordinates.y;

      if (enemy.allies && protocols.includes(PROTOCOL.ASSIST_ALLIES)) {
        enemy.score ++;
      } else if (!enemy.allies && protocols.includes(PROTOCOL.AVOID_CROSSFIRE)) {
        enemy.score ++;
      }

      if (enemy.enemies.type === ENEMY_TYPE.MECH && protocols.includes(PROTOCOL.PRIORITIZE_MECH)) {
        enemy.score ++;
      } else if (enemy.enemies.type !== ENEMY_TYPE.MECH && protocols.includes(PROTOCOL.AVOID_MECH)) {
        enemy.score ++;
      }

      if (enemy.score > maxScore) {
        maxScore = enemy.score;
      }
    });

    // find enemies with max score
    properEnemies = properEnemies.filter((enemy) => enemy.score === maxScore);

    // sort enemies by distance
    if (protocols.includes(PROTOCOL.CLOSEST_ENEMIES)) {
      properEnemies = properEnemies.sort((a, b) => a.dist - b.dist);
    } else if (protocols.includes(PROTOCOL.FURTHEST_ENEMIES)) {
      properEnemies = properEnemies.sort((a, b) => b.dist - a.dist);
    }

    return properEnemies[0];
  }
}

export const RadarService = new RadarServiceClass();
