// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import SONAR from "../../src/backend/Sonar/getMatch"

export default function handler(req, res) {
  res.status(200).json(SONAR.match())
}
