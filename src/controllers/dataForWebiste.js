import user from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getHome = async (req, res) => {
    const token = req.cookies ? req.cookies.token : null;
    console.log(token);
    if (token) {
        const userData = jwt.verify(token, process.env.TOKEN_SALT);
        if (userData) {
            const userFound = await user.query().findOne({ id: userData.id });
            console.log(userFound);
            res.render("home", { title: "Home", userFound });
        }
    }
}