import express from 'express';
import { create } from "express-handlebars";
import { PORT, VIEWS_PATH } from './paths.js';
import bodyParser from "body-parser";
import handlebarsHelpers from "./lib/handlebarsHelpers.js";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = create({
    helpers: handlebarsHelpers,
    extname: ".hbs",
    defaultLayout: "main",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 