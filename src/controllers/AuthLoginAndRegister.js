import user from "../models/user.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
    const errors = req.formErrorFields;
    const register = [{
        type: "text",
        name: "firstname",
        label: "Voornaam",
        id: "firstname",
        placeholder: "John",
        err: req.formErrorFields?.firstname ? req.formErrorFields.firstname : ""
    }, {
        type: "text",
        name: "lastname",
        label: "Achternaam",
        id: "lastname",
        placeholder: "Janssens",
        err: req.formErrorFields?.lastname ? req.formErrorFields.lastname : ""
    }, {
        type: "text",
        name: "email",
        label: "Email",
        id: "email",
        placeholder: "John@example.com",
        err: req.formErrorFields?.email ? req.formErrorFields.email : ""
    }, {
        type: "password",
        name: "password",
        label: "Password",
        id: "password",
        placeholder: "password",
        err: req.formErrorFields?.password ? req.formErrorFields.password : ""
    }];

    const flash = req.flash || {};
    res.render("register", { register, errors, flash });
};
