import express from 'express';
import { create } from "express-handlebars";
import { PORT, VIEWS_PATH } from './paths.js';
import bodyParser from "body-parser";
import handlebarsHelpers from "./lib/handlebarsHelpers.js";
import { getHome } from "./controllers/dataForWebiste.js";
import { handleUserPost, postRegister, renderLogin, renderRegister } from "./controllers/AuthLoginAndRegister.js";
import validationLogin from "./lib/middleware/validation/loginValidation.js";
import registerValidation from './lib/middleware/validation/registerValidation.js';
import { postLogin } from './controllers/AuthLoginAndRegister.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

const hbs = create({
    helpers: handlebarsHelpers,
    extname: ".hbs",
    defaultLayout: "main",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

//INHOUD VAN WEBPAGINA
app.get("/register", renderRegister);
app.post("/register", registerValidation, postRegister, handleUserPost);

app.get("/login", renderLogin);
app.post("/login", validationLogin, postLogin, renderLogin);

app.get("/", getHome);
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");

})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 