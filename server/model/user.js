import mongoose from "mongoose";

const DUPLICATE_ERROR_CODE = 11000;
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "{VALUE} is not a valid email!",
        },
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
        default: null,
    }
});

UserSchema.methods.register = async function () {
    try {
        const savedUser = await this.save();
        return savedUser;
    } catch (error) {
        if (error.code === DUPLICATE_ERROR_CODE) {
            throw new Error("A user already exists with the provided email address");
        }
    }
}

export default mongoose.model("User", UserSchema);
