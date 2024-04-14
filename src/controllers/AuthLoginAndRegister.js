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


export const renderLogin = async (req, res) => {
    const errors = req.formErrorFields;
    const login = [{
        type: "text",
        name: "email",
        label: "Email",
        id: "email",
        placeholder: "example@mail.com",
        err: req.formErrorFields?.email ? req.formErrorFields.email : ""
    }, {
        type: "password",
        name: "password",
        label: "Password",
        id: "password",
        placeholder: "password",
        err: req.formErrorFields?.password ? req.formErrorFields.password : ""
    }]

    const flash = req.flash || {};
    res.render("login", { title: "Login", login, errors, flash });
}

export const renderRegister = async (req, res) => {
    const errors = req.formErrorFields;
    const register = [{
        type: "text",
        name: "firstname",
        label: "Voornaam",
        id: "firstname",
        placeholder: "Dirk",
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
        placeholder: "dirk@example.com",
        err: req.formErrorFields?.email ? req.formErrorFields.email : ""
    }, {
        type: "password",
        name: "password",
        label: "Password",
        id: "password",
        placeholder: "password",
        err: req.formErrorFields?.password ? req.formErrorFields.password : ""
    }]
    const flash = req.flash || {};
    res.render("register", { title: "Registreer", register, errors, flash });
}

export const postRegister = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach((error) => {
            req.formErrorFields[error.path] = error.msg;
        })
        return next();
    }
    next();
};

const createUser = async (req, res, next) => {
    let error = req.formErrorFields;
    if (error === undefined) {
        const userExists = await user.query().findOne({ email: req.body.email });
        if (userExists) {
            req.flash = {
                type: "danger",
                message: "Email bestaat al"
            }
            renderRegister(req, res);
            return
        }
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const pass = bcrypt.hashSync(req.body.password, 10);
        const userItem = await user.query().insert({ firstname: firstname, lastname: lastname, email: email, password: pass })
        res.redirect("/login");
    }
    else {
        renderRegister(req, res, error);
    }
}


export const postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach((error) => {
            req.formErrorFields[error.path] = error.msg;
        })
        return next();
    }
    const userExists = await user.query().findOne({ email: req.body.email });
    if (!userExists) {
        req.flash = {
            type: "danger",
            message: "Email bestaat niet !"
        }
        renderLogin(req, res);
        return
    }
    const matchPassword = bcrypt.compareSync(req.body.password, userExists.password);
    if (!matchPassword) {
        req.flash = {
            type: "danger",
            message: "Password is niet correct"
        }
        renderLogin(req, res);
        return
    }
    const token = jwt.sign({
        id: userExists.id,
        email: userExists.email
    }, process.env.TOKEN_SALT, {
        expiresIn: "1h"
    })
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");

}

export const handleUserPost = (req, res) => {
    const action = req.body.action;
    console.log(action);
    if (action === "create") {
        createUser(req, res);
    } else if (action === "delete") {
        deleteUser(req, res);
    }
}