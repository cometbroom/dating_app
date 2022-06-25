/*
Http Responder Tool:
This is a tool that transforms status codes into english variables and has methods
to decrease code writing.
It will take res from an app route and handles sending the response.
*/

export const HttpResponder = {
  //For 200 status code
  OK: (res, response) => {
    res.status(200).json(response);
  },
  //201
  CREATED: (res, response) => {
    res.status(201).json(response);
  },
  //404.
  NOT_FOUND: (res, response) => {
    res.status(404).json(response);
  },
  //400
  BAD_REQ: (res, response) => {
    res.status(400).send(response);
  },
  //401
  UNAUTHORIZED: (res, response) => {
    res.status(401).send(response);
  },
  //409
  CONFLICT: (res, response) => {
    res.status(409).send(response);
  },
};
