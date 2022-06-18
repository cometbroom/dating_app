import SONAR from "../../../src/backend/Sonar/getMatch";
import { INTERESTS } from "../../../src/backend/Sonar/interests";

export default function handler(req, res) {
  res
    .status(200)
    .json(SONAR.match([INTERESTS[0], INTERESTS[2], INTERESTS[1], INTERESTS[3]]));
}
