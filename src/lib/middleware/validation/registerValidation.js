import { body } from "express-validator";

export default [
    body("firstname")
        .notEmpty()
        .withMessage("Firstname cannot be empty")
        .bail()
        .isLength({ min: 1 })
        .withMessage(" Firstname must be at least 1 character long")
        .bail(),
    body("lastname")
        .notEmpty()
        .withMessage(" Lastname cannot be empty")
        .bail()
        .isLength({ min: 1 })
        .withMessage(" Lastname must be at least 1 character long")
        .bail(),
    body("email")
        .notEmpty()
        .withMessage(" Email cannot be empty")
        .bail()
        .isLength({ min: 1 })
        .withMessage("Email must be at least 1 character long")
        .bail()
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .bail()
        .isLength({ min: 1 })
        .withMessage("Password must be at least 1 character long")
        .bail(),
]