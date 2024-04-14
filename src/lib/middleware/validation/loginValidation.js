import { body } from "express-validator";

export default [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email address"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
];