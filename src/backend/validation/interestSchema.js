import Ajv from "ajv";
import { INTERESTS } from "../../tools/constants";
const ajv = new Ajv();

const interestSchema = {
  type: "object",
  properties: {
    interest: {
      type: "string",
      pattern: "^[a-zA-Z'-]+$",
      enum: INTERESTS,
    },
  },
  required: ["interest"],
};

function handler() {
  return ajv.compile(interestSchema);
}

export const validateInterest = handler();
