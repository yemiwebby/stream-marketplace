import jwt from 'jsonwebtoken';

export const getJWTForUser = async user => {
    const secretKey = process.env.JWT_SIGNING_KEY;
    const expiresIn = process.env.JWT_TTL;

    const payload = {id: user.id};
    return await jwt.sign(payload, secretKey, {expiresIn});
}

export const getUserIdFromJWT = body => {
    const secretKey = process.env.JWT_SIGNING_KEY;
    try {
        const {id} = jwt.verify(body, secretKey);
        return id;
    } catch (error) {
        return undefined;
    }
}