import {getJWTForUser} from "../helper/jwt.js";
import User from "../model/user.js";
import {hashPassword, isValidPassword} from "../helper/password.js";

const getSuccessResponse = async (user) => ({
    user: {
        id: user._id,
        email: user.email,
        name: user.name,
    },
    bearerToken: await getJWTForUser(user),
});

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    const user = new User({
        name,
        email,
        password: hashPassword(password),
    });

    try {
        const savedUser = await user.register();
        const response = await getSuccessResponse(user);
        response.message = "User registered successfully";
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            res.status(404).send({error: "User not found"});
        }
        if (!isValidPassword(password, user.password)) {
            res.status(401).send({error: "Invalid login credentials provided"});
        }
        const response = await getSuccessResponse(user);
        response.message = "Login successful";
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};
