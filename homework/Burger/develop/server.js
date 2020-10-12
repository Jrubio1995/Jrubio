const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");

//Static website page
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.static("public/images"));

const routes = require("./controllers/burger_controller");
app.use(routes);

//Adding 'http://localhost:' make it clickable in the command promt.
app.listen(PORT, function () {
  console.log("Listening on: http://localhost:" + PORT);
});
