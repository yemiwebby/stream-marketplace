import {getUserIdFromJWT} from "../helper/jwt.js";
import User from "../model/user.js";

export const verifyToken = (req, res, next) => {
  const {header, body} = getJWTComponents(req);
  if (hasJWTInHeader(header)) {
    const _id = getUserIdFromJWT(body);
    User.findOne({_id}).exec((error, user) => {
      if (error) {
        return res
            .status(401)
            .json({message: "Could not verify Bearer token"});
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    req.user = undefined;
    next();
  }
}

const getJWTComponents = (req) => {
  const components = {header: undefined, body: undefined};
  if (req.headers && req.headers.authorization) {
    const splitToken = req.headers.authorization.split(" ");
    if (splitToken.length === 2) {
      components.header = splitToken[0];
      components.body = splitToken[1];
    }
  }
  return components;
};

const hasJWTInHeader = (header) => header === "Bearer";
