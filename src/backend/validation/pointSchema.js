import Ajv from "ajv";
import { INTERESTS } from "../../tools/constants";
const ajv = new Ajv();

const interestSchema = {
  type: "object",
  properties: {
    interest: {
      type: "number",
      minimum: 0,
      maximum: 10,
      multipleOf: 1,
    },
  },
  required: ["interest"],
};

function handler() {
  return ajv.compile(interestSchema);
}

export const validateIntPoint = handler();
